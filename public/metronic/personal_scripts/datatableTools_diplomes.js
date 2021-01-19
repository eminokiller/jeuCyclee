/**
 * @author RABAOUI Saber
 */
var table;
$(document).ready(function () {
    table = $("#m_table_1").DataTable({
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
            url: Routing.generate("diplomes_list_admin"),
            type: "POST",
            data: {
                columnsDef: [
                ]
            },
        },
        columns: [
            {data: "id"},
            {data: "libelleAr"},
            {data: "category"},
            {data: "niveaux"},
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
                    return a ? a.libelleAr : '';
                }
            },
            {
                targets: 3,
                render: function (a, t, e, n) {
                    chaine = "";
                    for (var variable in a) {
                        chaine = chaine  + a[variable].libelleAr + '</br>';
                    }
                    return chaine;
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
