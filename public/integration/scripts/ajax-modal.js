$(function () {
    function loadQuestionForm(dataId){
        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: true,
                url: '/getQuestion/' + dataId,
                method: 'GET',
                success:function (response) {
                    resolve(response);
                },
                error:function (error) {
                    reject(error)
                }
            })
        })
    }
    function submitQuestionForm(form, dataId){
        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: true,
                url: '/getQuestion/' + dataId,
                method: 'POST',
                success:function (response) {
                    resolve(response);
                },
                error:function (error) {
                    reject(error)
                }
            })
        })
    }
    $('#exampleModal').on('shown.bs.modal', function () {
        let dataId= $(this).data('id');
        let targetId = $(this).data('target-id')
        let $element = $($('li.draggable-task[data-id="' + dataId + '"]').first());
        let $targetContainer = $($('div.droppable-list[data-id="' + targetId + '"]').first());
        loadQuestionForm(dataId).then(function (response) {
            let $form = $(response);
            $form.bind('submit', function (e) {
                e.preventDefault();
                submitQuestionForm($form.serialize(), dataId).then(function (response2) {
                    let $taskList = $($targetContainer.find('ul.task-week').first());
                    $taskList.append($element[0]);
                    $('#exampleModal').modal('hide')
                }).catch(function (error) {
                    $('#exampleModal').modal('hide')
                })
                
            })
            let $container = $('#exampleModal').find('div.modal-content').first()
            $($container).html('');
            $form.appendTo($container[0]);
            $('#exampleModalLabel').text($element.text())
        }).catch(function (error) {
            $('#exampleModal').modal('hide')
        })
    });
})
