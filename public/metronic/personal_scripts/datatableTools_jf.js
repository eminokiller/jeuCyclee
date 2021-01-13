/**
 * @author RABAOUI Saber
 */
var table;
$(document).ready(function () {
    table = $("#m_table_1").DataTable({
        responsive: !0,
        dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
        lengthMenu: [5, 10, 25, 50],
        pageLength: 10,
        language: {
            url: language
        },
        searchDelay: 500,
        processing: !0,
        serverSide: !0,
        ajax: {
            url: Routing.generate("jf_list"),
            type: "POST",
            data: {
                columnsDef: [
                    "title",
                    "jfDate",
                    "actions"
                ]
            },
        },
        columns: [
            {data: "title"},
            {data: "jfDate"},
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
                    console.log(a);
                    return a ? formatDate(a, 'long1') : '';
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
    });
});
