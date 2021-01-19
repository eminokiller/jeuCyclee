/**
 * @author BOURAS AMine
 */
function getValue(id){
    $('#idOffre').val(id);
    $('select#formulaireScore').val('');
    $.ajax({
        url: Routing.generate('getFormulaire'),
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
    $('#form').modal('toggle');
}