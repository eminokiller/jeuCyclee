offreID = $( "#id_offre" ).data( "offre" );
console.log('offre'+offreID);

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
                    url: Routing.generate("candidatures_list_recruiter_validee", {
                        'id_offre': offreID
                    }),
                    type: "POST",
                    data: {
                        columnsDef: [

                        ]
                    },
                },
                columns: [
                    {data: "id"},
                    {data: "refCandidature"},
                    {data: "lieu"},
                    {data: "category"},
                    {data: "poste"},
                    {data: "specialites"},
                    {data: "score"},
                    {data: "rang"},

                ],

                columnDefs: [
                    {
                        targets: 1,
                        render: function (a, t, e, n) {
                            return e ? e.acCandidature.refCandidature : '';
                        }
                    },
                    {
                        targets: 2,
                        render: function (a, t, e, n) {
                            return e ? e.completudeInscription.lieu.libelleAr : '';
                        }
                    },
                    {
                        targets: 3,
                        render: function (a, t, e, n) {
                            return e ? e.acOffreEtape.offre.category.libelleAr : '';
                        }
                    },
                    {
                        targets: 4,
                        render: function (a, t, e, n) {
                            return e ? e.acOffreEtape.offre.poste.libelleAr : '';
                        }
                    },
                    {
                        targets: 5,
                        render: function (a, t, e, n) {
                            return e ? renderSpecialites(e.acOffreEtape.offre.specialites) : '';
                        }
                    },


                ],

            }))


               ;
        },
    };
})();
jQuery(document).ready(function () {
    DatatablesSearchOptionsAdvancedSearch.init();
});
