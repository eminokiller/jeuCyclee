class Application {
    constructor() {
        window.show = function (selector) {
            let element = document.querySelector(selector);
            if (element.classList.contains('hide')) {
                element.classList.remove('hide')
            }
        };
        window.hide = function (selector) {
            let element = document.querySelector(selector);
            if (!element.classList.contains('hide')) {
                element.classList.add('hide')
            }
        };
        let steps = {
            '#login': {
                '#login': 'show',
                '#videoTeaser': 'hide',
                '#gamePlay': 'hide',
                '#result': 'hide'
            },
            '#videoTeaser': {
                '#login': 'hide',
                '#videoTeaser': 'show',
                '#gamePlay': 'hide',
                '#result': 'hide'
            },
            '#gamePlay': {
                '#login': 'hide',
                '#videoTeaser': 'hide',
                '#gamePlay': 'show',
                '#result': 'hide'
            },
            '#result': {
                '#login': 'hide',
                '#videoTeaser': 'hide',
                '#gamePlay': 'hide',
                '#result': 'show'
            },
        };

        this.applyStep = function(stepName) {
            for (let selector in  steps[stepName]) {
                let fnstring = steps[stepName][selector];
                let fn = window[fnstring];
                if (typeof fn === "function") fn.apply(null, [selector]);
            }
            this.applyStepHandler(stepName);
            localStorage.setItem('currentStep', stepName);
        }

        this._loginSuccessHandler = function () {
            this.applyStep('#videoTeaser')
        };
        this._teaserStartHandler = function () {
            (function () {
                let myVideo = document.getElementById("video1");
                myVideo.addEventListener('ended',function () {
                    dispatchTeaserEnded();
                },false)
                function playPause() {
                    if (myVideo.paused)
                        myVideo.play();
                    else
                        myVideo.pause();
                }
                playPause();
            })();
        };
        this._teaserTerminateHandler = function () {
            this.applyStep('#gamePlay')
        };
        this._gameStartHandler = function () {
            ajaxInterceptor({
                secured:true,
                mocks:false,
                url:'/api/getGamePlay',
                success:function (response) {
                    function mockData() {
                        return response.gamePlayModel.actionMarketings.map(function (item) {
                            return {
                                id: item.id,
                                text: item.nomAction,
                                draggable: true,
                                level: item.level,
                                color: item.color
                            };
                        })
                    }
                    const startWeek = 1;
                    const endWeek = 9;
                    let data = mockData()
                    const game = new Game(1, startWeek, endWeek, data);
                    const gameModel = Game.createInstance(1, startWeek, endWeek, data);
                    $('.draggable-list').draggableList({
                        data: data,
                        containerClass: 'tasker',
                        itemClass: 'draggable-task',
                        ondragstart: function (evt) {
                            evt.originalEvent.dataTransfer.setData('data-id', $(evt.target).data('id'))
                            evt.originalEvent.dataTransfer.setData('data-parent', $(evt.target).parent().attr('class'))
                            evt.originalEvent.dataTransfer.setData('data-index', $(evt.target).index())
                            if (!$(evt.target).parent().hasClass('tasker')) {
                                let weekIndex = $(evt.target).parents('.droppable-list').first().data('id')
                                evt.originalEvent.dataTransfer.setData('data-week-index', weekIndex)
                            } else {
                                evt.originalEvent.dataTransfer.setData('data-week-index', false)
                            }
                        },
                        ondragend: function (evt) {
                            let clonable = $(evt.target).parent().hasClass('tasker');
                            $('#exampleModal').data('clone', clonable);
                        },
                        touchend: function (evt) {
                            evt.preventDefault();
                            let target = $(evt.target).hasClass('draggable-task') ? evt.target : $(evt.target).parent()[0]
                            let changedTouch = event.changedTouches[0];
                            let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
                            let $target = $(elem)
                            let $container = $('<div></div>');
                            if ($target.hasClass('droppable-list')) {
                                $container = $target;
                            } else {
                                $container = $($target.parents('.droppable-list').first())

                            }
                            if (!$container.length) {
                                evt.stopPropagation();
                                return;
                            }
                            let targetId = $container.data('id');
                            let dataId = $(target).data('id');
                            if (!$(target).hasClass('done')) {
                                $('#exampleModal').data('clone', true)
                                $('#exampleModal').data('id', dataId);
                                $('#exampleModal').data('target-id', targetId);
                                $('#exampleModal').data('target-hook', $(elem).index());
                                $('#exampleModal').modal('toggle')
                            } else {
                                //here we displace the element
                                let $taskList = $($container.find('ul.task-week').first());
                                if ($(target).parent().hasClass('tasker')) {
                                    $target.replaceWith($(target).addClass('done').clone(true)[0]);
                                } else {
                                    //we swap
                                    let $targetCloned = $target.clone(true)
                                    let $$target = $(target).clone(true);
                                    $(target).replaceWith($targetCloned);
                                    $target.replaceWith($$target);
                                }

                                dispatchGameChangeEvent();
                            }

                        },
                        mapFn: function (item) {
                            return {
                                id: item.id,
                                text: item.text,
                                draggable: item.draggable,
                            }
                        }
                    })
                    $('.target-table').gameBoard({
                        startWeek: startWeek,
                        endWeek: endWeek,
                        'ondragover': function (evt) {
                            console.log('dragover', evt);
                            evt.preventDefault();
                        },
                        'ondrop': function (evt) {
                            evt.preventDefault();
                            let dataId = parseInt(evt.originalEvent.dataTransfer.getData('data-id'));
                            let dataParent = evt.originalEvent.dataTransfer.getData('data-parent');
                            let dataIndex = parseInt(evt.originalEvent.dataTransfer.getData('data-index'));
                            let dataWeekIndex = evt.originalEvent.dataTransfer.getData('data-week-index');
                            let $source = $('<div></div>');
                            if (dataWeekIndex != "false") {
                                $source = $($($($($(`.droppable-list[data-id="${dataWeekIndex}"]`).first()).find('.week-container').first()).find('.task-week').first()).find(`li:nth-child(${dataIndex + 1})`).first());
                            } else {
                                $source = $($('.tasker > li.draggable-task[data-id="' + dataId + '"]').first())
                            }

                            let $target = $(evt.target);
                            let $container = $('<div></div>')
                            if ($target.hasClass('droppable-list')) {
                                $container = $target;
                            } else {
                                $container = $($target.parents('.droppable-list').first())
                            }
                            let targetId = $container.attr('data-id');
                            if (!$source.hasClass('done')) {
                                $('#exampleModal').data('clone', true);
                                $('#exampleModal').data('id', dataId);
                                $('#exampleModal').data('target-id', targetId);
                                $('#exampleModal').data('target-hook', $(evt.target).index());
                                $('#exampleModal').modal('toggle')
                            } else {
                                let $taskList = $($container.find('ul.task-week').first());
                                let $hook = $(evt.target)
                                let $clonedHook = $hook.clone(true);
                                if ($source.parent().hasClass('tasker')) {
                                    $hook.replaceWith($source.addClass('done').clone(true)[0])
                                } else {
                                    let cloned = $source.addClass('done').clone(true)[0];
                                    $hook.replaceWith(cloned)
                                    $source.replaceWith($clonedHook)
                                }

                                dispatchGameChangeEvent();
                            }


                        }
                    }, game);
                    $('div.stopwatch').timer({'mainTime': 3000}, game)
                    $('#myScore').score({}, gameModel, game);
                    $('#chat-component').chat({
                        'chatTeam': [
                            {id: 1, username: 'XYZ', 'picUrl':'/css/image/me.png'}
                        ],
                        'chatRoom': '#chat-room',
                        'chatSearch': '#chat-component-search',
                        'chatConsole': '#chat-console',
                        'memberMapFn': function (member) {
                            return member
                        }
                    }, {});
                },
                error:function (error) {
                    console.log(error);
                    alert('SORRY........');
                }
            })

        };
        this._gameTerminateHandler = function () {
            this.applyStep('#result')
        };
        this._resultShownHandler = function () {

        };

        let stepper = ['#login', '#videoTeaser', '#gamePlay', '#result']
        let stepHandlerRegistry = {
            '#login': [],
            '#videoTeaser': [this._teaserStartHandler],
            '#gamePlay': [this._gameStartHandler ],
            '#result': [],
        }
        this.applyStepHandler = function (stepName) {
            stepHandlerRegistry[stepName].forEach(function (fn) {
                if(typeof fn === 'function') fn();
            })

        };
        this.init = function () {
            let currentStep = localStorage.getItem('currentStep')? localStorage.getItem('currentStep'): '#login';
            this.applyStep(currentStep);
        };
        this.getNextStep = function () {
            let currentStep = localStorage.getItem('currentStep');
            let next = stepper.indexOf(currentStep) + 1
            return stepper[next];

        }

    }
    boot(){
        this.init();
    }
    next() {
        let next = this.getNextStep();
        console.log(next)
        this.applyStep(next);
    }
}
