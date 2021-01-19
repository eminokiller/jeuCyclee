/**
 * Created by tritux on 11/12/20.
 */

function annulerConcours(id){

    swal({
        title: 'إلغاء المناظرة',
        text: 'هل أنت متاكد من إلغاء هذه المناظرة',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'إلغاء',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'تأكيد',
        confirmButtonClass: 'btn btn-success',
        reverseButtons: true
    }).then(function (e) {
        if (!e.value) return;

        $('#idConcours').val(id);
        console.log($('#idConcours').val());
        $('select#pv').val('');


        $.ajax({
            url: Routing.generate('annuler_concours'),
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


function impossibleAnnulerConcours(id){
    alert('لا تستطيع إلغاء هذه المناظرة ، انطلقت مرحلة الفحص الطبي في إحدى العروض');
}