$(function () {
    function getResponseTemplate(response,idQuestion,idTask) {
        return `<div class="form-check">
  <input class="form-check-input" type="checkbox" name="exampleRadios" id="exampleRadios_${response.id}_${idQuestion}_${idTask}">
  <label class="form-check-label" for="exampleRadios1">
    ${response.libelle}
  </label>
</div>`;
    }
function getResponsesTemplate(question,idTask) {

    return question.reponses.reduce((t,reponse)=>{
        t +=getResponseTemplate(reponse,question.id,idTask);
        return t;
    },'')
}
    function getQuestionTemplate(question,idTask) {
            return `<div class="form-group question-container">
<p class="question_text">${question.libelle}</p>
<div class="response-container">
${getResponsesTemplate(question,idTask)}
</div>
</div>`;
    }
    function getQuestionsTemplate(task) {
        return task.questions.reduce((t,question) => {
            t+=getQuestionTemplate(question,task.id);
            return t
        }, '')
    }

    function getTaskTemplate(resp) {
        return `<form name="question" method="post">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <!---------->
                    ${getQuestionsTemplate(resp.task)}
                <!------------>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
            </form>`;
    }

    function loadQuestionForm(dataId) {
        console.log('data id ------->', dataId)
        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: false,
                secured: true,
                url: '/api/getQuestion/' + dataId,
                method: 'GET',
                success: (response) =>{
                    resolve(getTaskTemplate(response));
                },
                error: (error) =>{
                    reject(error)
                }
            })
        })
    }

    function submitQuestionForm(form, dataId) {
        console.log('data id ------->', dataId)
        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: true,
                secured: false,
                url: '/getQuestion/' + dataId,
                method: 'POST',
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error)
                }
            })
        })
    }

    //  ajax modal
    $('#exampleModal').on('shown.bs.modal', function () {
        let dataId = $(this).data('id');
        let targetId = $(this).data('target-id');
        let clone = $(this).data('clone');
        let hookIndex = $(this).data('target-hook');
        console.log('hooke---->', hookIndex);
        let $element = $($('.tasker > li.draggable-task[data-id="' + dataId + '"]').first());
        if (!clone) {
            $element = $($('.task-week > li.draggable-task[data-id="' + dataId + '"]').first());
        }
        let $targetContainer = $($('div.droppable-list[data-id="' + targetId + '"]').first());
        loadQuestionForm(dataId).then(function (response) {
            let $form = $(response);
            $form.bind('submit', function (e) {
                e.preventDefault();
                submitQuestionForm($form.serialize(), dataId).then(function (response2) {
                    let $taskList = $($targetContainer.find('ul.task-week').first());
                    let $hook = $taskList.find(`li:nth-child(${hookIndex + 1})`);
                    $hook.css('background-color', 'red');
                    if (clone) {
                        $hook.replaceWith($element.addClass('done').clone(true)[0])
                        // $taskList.append();
                    } else {
                        $hook.replaceWith($element.addClass('done')[0])
                    }
                    $('#exampleModal').modal('hide')
                    dispatchGameChangeEvent();
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

    // login form
    function submitLoginForm(form) {
        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: false,
                secured: false,
                data: JSON.stringify({username: $('#exampleInputEmail1').val(), password: "xyz"}),
                url: '/api/login_check',
                method: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error)
                }
            })
        })
    }

    $('#loginForm').on('submit', function (evt) {
        evt.preventDefault();
        submitLoginForm(evt.target).then(function (resp) {
            if (!$('#emailHelp').hasClass('fade')) $('#emailHelp').toggleClass('fade');
            localStorage.setItem('token', resp.token)
            dispatchUserConnectedEvent();
        }).catch(function (err) {
            if ($('#emailHelp').hasClass('fade')) $('#emailHelp').toggleClass('fade');
        })

    })
})
