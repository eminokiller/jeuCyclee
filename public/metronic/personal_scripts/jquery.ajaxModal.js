/**
 * @Author <ubuntu@tritux.com>
 */
(function ($) {
    $.fn.ajaxModal = function (config) {
        return this.each(function () {
            let _that = this;
            let $that = $(this);
            let  _currentModal;
            let _default = {
                url: '',
                postSuccess: function(res, modal){
                    console.log(res);
                },
                postError: function(error, modal, instance){
                    console.log(error);
                },
                bodyLoader: {
                    url: '',
                    method: 'GET',
                },
                validationFunction:'',
                data: null

            };
            const currentConfig = $.extend({}, _default, config);
            function submit(e) {
                console.log(e)
                const __inner = this;
                e.preventDefault();
                let multipart = false;
                let dataEnvoye = '';


                console.log('currentConfig.data.formule'+currentConfig.data.formule);

                if(currentConfig.data != null){
                    dataEnvoye = $(__inner).serialize() + '&formule='+ currentConfig.data.formule;
                }else{
                    dataEnvoye = $(__inner).serialize();
                }

                // var data = {$(__inner).serialize(), 'formule' : currentConfig.data.formule};

                // var json = JSON2.stringify(data );
                console.log($(__inner).serialize());
                // console.log(dataEnvoye);
                
                let postAjax = {
                    url:currentConfig.url,
                    method: 'POST',
                    data: dataEnvoye ,
                    // data: data,
                    success: function (res) {
                        currentConfig.postSuccess(res, _currentModal);
                    },
                    error: function (err) {
                        currentConfig.postError(err, _currentModal, _that);
                    }
                };
                if(e.target.enctype === 'multipart/form-data'){
                    let formData = new FormData($(this)[0]);
                    postAjax = {
                        url:currentConfig.url,
                        async: false,
                        cache: false,
                        processData:false,
                        contentType:false,
                        enctype:'multipart/form-data',
                        method: 'POST',
                        data: formData,
                        success: function (res) {
                            currentConfig.postSuccess(res, _currentModal);
                        },
                        error: function (err) {
                            currentConfig.postError(err, _currentModal, _that);
                        }
                    };
                }
                if(currentConfig.validationFunction != ''){
                    if(window[currentConfig.validationFunction]() == true){
                        $.ajax(postAjax);
                        return;
                    }else{
                        return;
                    }
                }else{
                    $.ajax(postAjax);
                    return;
                }
            }
            function init() {
                let ajaxConfig = $.extend({}, currentConfig.bodyLoader);
                ajaxConfig.success = function (res) {
                    let $resBody = $(res);
                    $(_that).append($resBody);
                    _currentModal = $(_that).find('div.modal').first().modal();
                    _currentModal.show();
                    $(_that).find('form').first().bind('submit', submit);
                };
                ajaxConfig.error = function (error) {
                    if(error.status === 400){
                        let $resBody = $(error.responseText);
                        console.log(error);
                        $(_that).append($resBody);
                        _currentModal = $(_that).find('div.modal').first().modal();
                        _currentModal.show();
                        $(_that).find('form').first().bind('submit', submit);
                    }
                };
                $.ajax(ajaxConfig);
            }
            function destroy() {
                try{
                    _currentModal.hide();
                    _currentModal.remove();
                    $('.modal-backdrop').remove()
                    $(_that).html('');
                } catch (e) {
                    console.log(e);
                }

            }

            $(document).one('ajax-modal-show', function () {
                destroy();
                init();
            });
            $(document).one('ajax-modal-hide', function () {
                destroy();
            });

        });
    };
}($));
function editElementWithUrl(url, msg){
    let instanceCurrent;
    $('#cur_modals').html('');
    $('#cur_modals').ajaxModal({
        url: url,
        postSuccess: function(res, modal){
            $(document).trigger('ajax-modal-hide');
            toastr.success(msg.success.title, msg.success.content);
            dispatchReloadDt();
        },
        postError:function(err, modal, instance){
            if(err.status !== 400){
                $(document).trigger('ajax-modal-hide');
                toastr.error(msg.success.title, msg.success.content);
            } else {
                let $form1 = $(modal).find('form').first();
                let $form2 = $(err.responseText).find('form').first();
                instanceCurrent = instance;
                $form1.html($form2.html());
                a2lix_lib.sfCollection.init();
            }

        },
        bodyLoader: {
            url: url,
        }
    });
    $(document).trigger('ajax-modal-show');
}
function editElement(elm, msg)
{
    let url = $(elm).data('href');
    let instanceCurrent;
    $('#cur_modals').html('');
    $('#cur_modals').ajaxModal({
        url: url,
        postSuccess: function(res, modal){
            $(document).trigger('ajax-modal-hide');
            toastr.success(msg.success.title, msg.success.content);
            dispatchReloadDt();
        },
        postError:function(err, modal, instance){
            if(err.status !== 400){
                $(document).trigger('ajax-modal-hide');
                toastr.error(msg.success.title, msg.success.content);
            } else {
                let $form1 = $(modal).find('form').first();
                let $form2 = $(err.responseText).find('form').first();
                instanceCurrent = instance;
                $form1.html($form2.html());
                a2lix_lib.sfCollection.init();
            }

        },
        bodyLoader: {
            url: url,
        }
    });
    $(document).trigger('ajax-modal-show');
}
