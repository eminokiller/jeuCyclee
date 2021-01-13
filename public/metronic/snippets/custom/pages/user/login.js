var SnippetLogin = (function () {
    var e = $("#m_login"),
        i = function (e, i, a) {
            var l = $('<div class="m-alert m-alert--outline alert alert-' + i + ' alert-dismissible" role="alert">\t\t\t<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\t\t\t<span></span>\t\t</div>');
            e.find(".alert").remove(), l.prependTo(e), mUtil.animateClass(l[0], "fadeIn animated"), l.find("span").html(a);
        },
        a = function () {
            e.removeClass("m-login--forget-password"), e.removeClass("m-login--signup"), e.addClass("m-login--signin"), mUtil.animateClass(e.find(".m-login__signin")[0], "flipInX animated");
        },
        l = function () {
            $("#m_login_forget_password").click(function (i) {
                i.preventDefault(), e.removeClass("m-login--signin"), e.removeClass("m-login--signup"), e.addClass("m-login--forget-password"), mUtil.animateClass(e.find(".m-login__forget-password")[0], "flipInX animated");
            }),
                $("#m_login_forget_password_cancel").click(function (e) {
                    e.preventDefault(), a();
                }),
                $("#m_login_signup").click(function (i) {
                    i.preventDefault(), e.removeClass("m-login--forget-password"), e.removeClass("m-login--signin"), e.addClass("m-login--signup"), mUtil.animateClass(e.find(".m-login__signup")[0], "flipInX animated");
                }),
                $(document).on('click', "#m_login_signup_cancel", function (e) {
                    e.preventDefault(), a();
                });
        };
    return {
        init: function () {
            l(),
                $(document).on('click', "#m_login_forget_password_submit", function (b) {
                    b.preventDefault();
                    var t = $(this),
                        r = $(this).closest("form");
                    (t.addClass("m-loader m-loader--right m-loader--light").attr("disabled", !0),
                        r.ajaxSubmit({
                            url: Routing.generate('resetting_password'),
                            success: function (l, s, n, o) {
                                let m = l;
                                setTimeout(function () {
                                    t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm(), a();
                                    var l = e.find(".m-login__signin form");
                                    l.clearForm(), l.validate().resetForm(), i(l, "success", m);
                                }, 2e3);
                            },
                            error: function (l, s, n, o) {
                                console.log(l);
                                let msg = l;
                                t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm();
                                e.find("#resetpwd form").remove();
                                e.find("#resetpwd").html(l.responseText);

                            }
                        }));
                }),
                $(document).on('click', "#m_login_signup_submit", function (l) {
                    l.preventDefault();
                    var t = $(this),
                        r = $(this).closest("form");
                    (t.addClass("m-loader m-loader--right m-loader--light").attr("disabled", !0),
                        r.ajaxSubmit({
                            url: Routing.generate('candidate_register'),
                            success: function (l, s, n, o) {
                                let msg = l;
                                t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1);
                                $('.m-login__signin').hide();
                                $('.m-login__signup').hide();
                                $('.m-login__forget-password').hide();
                                $('.m-login__otp-pass').show();
                                mUtil.animateClass(e.find(".m-login__otp-pass")[0], "flipInX animated");
                            },
                            error: function (l, s, n, o) {
                                console.log(l);
                                let msg = l;
                                t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm();
                                e.find("#registrationForm form").remove();
                                e.find("#registrationForm").html(l.responseText);

                            }
                        }));
                }),

                $(document).on('click', "#m_login_otppass_submit", function (l) {
                    l.preventDefault();
                    var t = $(this),
                        r = $(this).closest("form");
                    (t.addClass("m-loader m-loader--right m-loader--light").attr("disabled", !0),
                        r.ajaxSubmit({
                            url: Routing.generate('candidate_register_check_otp'),
                            success: function (l, s, n, o) {
                                setTimeout(function () {
                                    t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm();
                                    let url = Routing.generate('profile_resetting_password_home');
                                    location.replace(url);
                                }, 2e3);
                            },
                            error: function (l, s, n, o) {
                                console.log(l);
                                let msg = l;
                                t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm();
                                e.find("#otpPass form").remove();
                                e.find("#otpPass").html(l.responseText);

                            }
                        }));
                })
            $(document).on('click', "#m_login_newotp", function (l) {
                l.preventDefault();
                var t = $(this),
                    r = $(this).closest("form");
                (t.addClass("m-loader m-loader--right m-loader--light").attr("disabled", !0),
                    r.ajaxSubmit({
                        url: Routing.generate('request_new_otp'),
                        success: function (l, s, n, o) {
                            let msg = l;
                            t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1);
                            $('.m-login__signin').hide();
                            $('.m-login__signup').hide();
                            $('.m-login__forget-password').hide();
                            $('.m-login__otp-pass').show();

                            mUtil.animateClass(e.find(".m-login__otp-pass")[0], "flipInX animated");
                            var l = e.find(".m-login__otp-pass form");
                            i(l, "success", msg);
                        },
                        error: function (l, s, n, o) {
                            console.log(l);
                            let msg = l;
                            t.removeClass("m-loader m-loader--right m-loader--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm();
                            e.find("#otpPass form").remove();
                            e.find("#otpPass").html(l.responseText);

                        }
                    }));
            })

            ;

        },
    };
})();
jQuery(document).ready(function () {
    SnippetLogin.init();
});
