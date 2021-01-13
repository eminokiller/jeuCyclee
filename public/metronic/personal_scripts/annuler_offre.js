/**
 * Created by tritux on 11/12/20.
 */

function annulerOffre(id){

    swal({
        title: 'إلغاء العرض',
        text: 'هل أنت متاكد من إلغاء هذا العرض',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'إلغاء',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'تأكيد',
        confirmButtonClass: 'btn btn-success',
        reverseButtons: true
    }).then(function (e) {
        if (!e.value) return;

        $('#idOffre1').val(id);
        $('select#pv').val('');


        $.ajax({
            url: Routing.generate('annuler_offre'),
            type: 'POST',
            dataType: 'json',
            data: {
                'id':id,
            },
            cache: false,
            success: function(reponse) {
                $('#formulaireScore').val(reponse);
            },
            error: function(e) {
                console.log('error',e);
            }
        });
        $('#form_annuler').modal('toggle');
    });
}


function impossibleAnnulerOffre(id){
    alert('لا تستطيع إلغاء العرض ، انطلقت مرحلة الفحص الطبي');
}