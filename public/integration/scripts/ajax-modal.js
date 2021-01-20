$(function () {
    function loadQuestionForm(dataId) {
        return new Promise((resolve, reject) => {
            ajaxInterceptor({
                mocks: true,
                secured: false,
                url: '/getQuestion/' + dataId,
                method: 'GET',
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error)
                }
            })
        })
    }

    function submitQuestionForm(form, dataId) {
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
