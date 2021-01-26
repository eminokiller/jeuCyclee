$(function () {
    function getResponseTemplate(i, j, response, idQuestion, idTask) {
        return `<div class="form-check">
<input type="hidden" name="task[questions][${i}][reponses][${j}][id]" value="${response.id}">
 
  <input class="form-check-input" type="checkbox" name="task[questions][${i}][reponses][${j}][status]" id="exampleRadios_${response.id}_${idQuestion}_${idTask}">

  <label class="form-check-label" for="exampleRadios_${response.id}_${idQuestion}_${idTask}">
    ${response.libelle}
  </label>
</div>`;
    }

    function getResponsesTemplate(i, question, idTask) {
        let j = 0;
        return question.reponses.reduce((t, reponse) => {
            t += getResponseTemplate(i, j, reponse, question.id, idTask);
            j++;
            return t;
        }, '')
    }

    function getQuestionTemplate(i, question, idTask) {
        return `<div class="form-group question-container">
<p class="question_text"><strong>${question.libelle}</strong></p>
<input type="hidden" name="task[questions][${i}][id]" value="${question.id}">
<div class="response-container">
${getResponsesTemplate(i, question, idTask)}
</div>
</div>`;
    }

    function getQuestionsTemplate(task) {
        let i = 0;
        return task.questions.reduce((t, question) => {
            t += getQuestionTemplate(i, question, task.id);
            i++;
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
            <div class="alert alert-success" role="alert">
            Attention il ne peut y avoir qu'une bonne réponse!<br>
            Seule une bonne réponse vous permet de placer l'action.
</div>
                <!---------->
                    <input type="hidden" name="task[id]" value="${resp.task.id}"/>
                    ${getQuestionsTemplate(resp.task)}
                <!------------>
            </div>
            <div class="modal-footer">
                
                <button type="submit" class="transformerstype">SOUMETTRE</button>
            </div>
            </form>`;
    }

    function loadQuestionForm(dataId) {

        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: false,
                secured: true,
                url: '/api/getQuestion/' + dataId,
                method: 'GET',
                success: (response) => {
                    resolve(getTaskTemplate(response));
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }

    function submitQuestionForm(data, dataId) {

        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: false,
                secured: true,
                data: data,
                url: '/api/checkQuestion/' + dataId,
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
    $('#enableLevelTwoForm').on('submit',function (evt) {
        evt.preventDefault();
        localStorage.setItem('level', '2');
        $('#exampleModal2').modal('hide');
        initPhase2();
    })
    //  ajax modal
    $('#exampleModal').on('shown.bs.modal', function () {
        let dataId = $(this).data('id');
        let targetId = $(this).data('target-id');

        let clone = $(this).data('clone');
        let hookIndex = $(this).data('target-hook');
        let list = $(this).data('lalist')

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
                        list.forEach(ie => {
                            let $element_ = $($('.tasker > li.draggable-task[data-id="' + ie + '"]').first());
                            $hook.replaceWith($element_.addClass('done').clone(true)[0])
                        })
                    } else {
                        $hook.replaceWith($element.addClass('done')[0])
                    }
                    $('#exampleModal').modal('hide')
                    dispatchGameChangeEvent();
                }).catch(function (error) {
                    $('#exampleModal').find('p.question_text').each(function () {
                        $(this).addClass('wrong-answer');
                        $('div#ques').show();

                    })
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
