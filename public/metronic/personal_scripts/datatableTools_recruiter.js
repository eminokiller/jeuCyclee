/**
 * @author nasri thamer
 */
var DatatablesSearchOptionsAdvancedSearch = (function () {
    $.fn.dataTable.Api.register("column().title()", function () {
        return $(this.header()).text().trim();
    });
    return {
        init: function () {
            var a;
            (a = $("#m_table_1").DataTable({
                responsive: !0,
                dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                lengthMenu: [5, 10, 25, 50],
                pageLength: 5,
                language: {
                    url: language
                },
                searchDelay: 500,
                processing: !0,
                serverSide: !0,
                ajax: {
                    url: Routing.generate("recruiter_list"),
                    type: "POST",
                    data: {
                        columnsDef: [

                        ]
                    },
                },
                columns: [
                    {data: "firstname"},
                    {data: "lastname"},
                    {data: "admin"},
                    {data: "admin"},
                    {data: "lieu"},
                    {data: "enabled"},
                    {data: "actions"}
                ],

                columnDefs: [
                    {
                        targets: 0,
                        render: function (a, t, e, n) {
                            return a ? a : '';
                        }
                    },
                    {
                        targets: 1,
                        render: function (a, t, e, n) {
                            return a ? a : '';
                        }
                    },
                    {
                        targets: 2,
                        render: function (a, t, e, n) {
                            return a ? a.username : '';
                        }
                    },
                    {
                        targets: 3,
                        render: function (a, t, e, n) {
                            return a ? a.email : '';
                        }
                    },
                    {
                        targets: 4,
                        render: function (a, t, e, n) {
                            return a ? a.libelleAr : '';
                        }
                    },
                    {
                        targets: 5,
                        render: function (a, t, e, n) {
                            let status = '<span class="m-badge m-badge--success"></span>';
                            if(!a.enabled){
                                status = '<span class="m-badge m-badge--danger"></span>';
                            }
                            return a;
                        }
                    },

                    {
                        targets: -1,
                        orderable: !1,
                        render: function (a, t, e, n) {
                            return renderMenu(a);
                        },
                    },
                ],
            })),
                $("#m_search").on("click", function (t) {
                    t.preventDefault();
                    var e = {};
                    $(".m-input").each(function () {
                        var a = $(this).data("col-index");
                        console.log(a);
                        e[a] ? (e[a] += "|" + $(this).val()) : (e[a] = $(this).val());
                    }),
                        $.each(e, function (t, e) {
                            a.column(t).search(e || "", !1, !1);
                        }),
                        a.table().draw();
                }),
                $("#m_reset").on("click", function (t) {
                    t.preventDefault(),
                        $(".m-input").each(function () {
                            $(this).val(""), a.column($(this).data("col-index")).search("", !1, !1);
                        }),
                        a.table().draw();
                }),
                $("#m_datepicker").datepicker({todayHighlight: !0,
                    templates: {
                        leftArrow: '<i class="la la-angle-left"></i>',
                        rightArrow: '<i class="la la-angle-right"></i>'
                    }
                });

            return a;
        },
    };
})();
jQuery(document).ready(function () {
    var dt = DatatablesSearchOptionsAdvancedSearch.init();
    console.log(dt)
});
