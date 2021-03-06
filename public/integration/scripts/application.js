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
        window.initPhase1 = function () {
            if (localStorage.getItem('level') == 2) return;
            window.hide('div.right_arrow_scroller_2');
            window.hide('div.left_arrow_scroller_2');
            window.hide('div.cata-sub-nav2[data-id="2"]')
            window.show('#score_container')
            let gameMainElement = document.querySelector('#gameMain');
            let gameLevelElement = document.querySelector('#gameLevel');
            gameLevelElement.innerHTML = '1'
            if (!gameMainElement.classList.contains('level1_transformers')) {
                gameMainElement.classList.add('level1_transformers')
            }
            if (gameMainElement.classList.contains('level2_transformers')) {
                gameMainElement.classList.remove('level2_transformers')
            }
        };
        window.initPhase2 = function () {
            if (localStorage.getItem('level') == 1) return;
            window.show('div.right_arrow_scroller_2');
            window.show('div.left_arrow_scroller_2');
            window.show('div.cata-sub-nav2[data-id="2"]')
            window.hide('#score_container')
            let gameMainElement = document.querySelector('#gameMain');
            let gameLevelElement = document.querySelector('#gameLevel');
            gameLevelElement.innerHTML = '2'
            if (!gameMainElement.classList.contains('level2_transformers')) {
                gameMainElement.classList.add('level2_transformers')
            }
            if (gameMainElement.classList.contains('level1_transformers')) {
                gameMainElement.classList.remove('level1_transformers')
            }
        };
        window.save = function (keyStore, campaign, remote) {
            localStorage.setItem(keyStore, JSON.stringify(campaign));
            if (remote) {
                //post the data to the server;
            }
        };
        window.reInitialize = function (keyStore) {
            let storedCampaignString = localStorage.getItem(keyStore);
            if (storedCampaignString) {
                return JSON.parse(storedCampaignString);

            }
            return false;
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
        this._mainTime = 600;
        this._elapsedTime = 0;
        this.applyStep = function (stepName) {
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
                // let myVideo = document.getElementById("video1");
                // myVideo.addEventListener('ended', function () {
                //     dispatchTeaserEnded();
                // }, false)
                //
                // function playPause() {
                //     if (myVideo.paused)
                //         myVideo.play();
                //     else
                //         myVideo.pause();
                // }
                //
                // playPause();
            })();
        };
        this._teaserTerminateHandler = function () {
            this.applyStep('#gamePlay')
        };
        this._gameStartHandler = () => {
            ajaxInterceptor({
                secured: true,
                mocks: false,
                url: '/api/getGamePlay',
                success: (response) => {
                    // console.log('all',response);
                    document.querySelector('#team').innerHTML = response.player.equipe.libelle
                    document.querySelector('#nomPlayer').innerHTML = response.player.Nom;
                    if(localStorage.getItem('badge1')) activateBadge1();
                    if(localStorage.getItem('badge2')) activateBadge2();
                    if(localStorage.getItem('badge3')) activateBadge3();
                    initPhase1();
                    initPhase2();
                    document.addEventListener('changeLevelEvent', function () {
                        $('#exampleModal2').modal('toggle')
                    });
                    function mockData() {
                        return response.gamePlayModel.actionMarketings.map(function (item) {
                            console.log('mockData', item)
                            return {
                                id: item.id,
                                text: item.nomAction,
                                draggable: true,
                                level: item.level,
                                color: item.color,
                                task: item.task,
                                impact: item.impact,
                                jauge: item.task.id
                            };
                        })
                    }
                    $('div#cible').text('tableau trimestriel ' + response.gamePlayModel.cible)
                    const startWeek = 1;
                    const endWeek = 8;
                    let data = mockData()
                    let game1 = new Game(1, startWeek, endWeek, data);
                    let game2 = new Game(2, startWeek, endWeek, data);
                    let gameModel1 = Game.loadInstance(1, startWeek, endWeek, data, response.gamePlayModel.weeksLevel1);
                    let gameModel2 = Game.loadInstance(1, startWeek, endWeek, data, response.gamePlayModel.weeksLevel2);
                    // console.log('this is gamemodel',gameModel1);

                    $('.draggable-list').draggableList({
                        data: data,
                        containerClass: 'tasker',
                        itemClass: 'draggable-task',
                        ondragstart: function (evt) {
                            evt.originalEvent.dataTransfer.setData('data-id', $(evt.target).data('id'))
                            evt.originalEvent.dataTransfer.setData('type', $(evt.target).data('type'))
                            evt.originalEvent.dataTransfer.setData('data-parent', $(evt.target).parent().attr('class'))
                            evt.originalEvent.dataTransfer.setData('data-index', $(evt.target).index())
                            // console.log('drag start data level---->', $(evt.target).attr('data-level'))
                            evt.originalEvent.dataTransfer.setData('data-level', $(evt.target).attr('data-level'))
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
                            let touchedElement = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
                            if ($(touchedElement).parents('.target-table').length) {
                                let $touchedParent = $($(touchedElement).parents('.target-table').first());
                                if ($touchedParent.attr('data-id') != $(target).data('level')) return;
                                if ($(touchedElement).hasClass('task-hook')) {
                                    if ($(target).hasClass('done')) {
                                        if ($(target).parents('.target-table').length) {

                                            let $li = $('<li></li>', {'class': 'task-hook'});
                                            $(touchedElement).replaceWith($(target).clone(true));
                                            $(target).replaceWith($li[0])
                                            dispatchGameChangeEvent();
                                        } else if ($(target).parents('.tasker').length) {

                                            $(touchedElement).replaceWith($(target).addClass('done').clone(true));
                                            dispatchGameChangeEvent();
                                        }
                                    } else {
                                        //target-id'
                                        $('#exampleModal').data('clone', true);
                                        $('#exampleModal').data('id', $(target).attr('data-id'));
                                        $('#exampleModal').data('target-id', $($(touchedElement).parents('.droppable-list').first()).attr('data-id'));
                                        $('#exampleModal').data('target-hook', $(touchedElement).index());
                                        let liste = getElement(data, $(target).attr('data-id'))
                                        $('#exampleModal').data('lalist', liste);
                                        $('#exampleModal').modal('toggle')
                                    }
                                }
                            }


                        },
                        mapFn: function (item) {

                            return {
                                id: item.id,
                                text: item.text,
                                level: item.level,
                                color: item.color,
                                draggable: item.draggable,
                            }
                        }
                    })
                    $('.target-table[data-id="1"]').gameBoard({
                        startWeek: startWeek,
                        endWeek: endWeek,
                        keystore: 'game1',
                        'ondragover': function (evt) {

                            evt.preventDefault();
                        },
                        'ondrop': function (evt) {
                            evt.preventDefault();
                            let dataId = parseInt(evt.originalEvent.dataTransfer.getData('data-id'));
                            let dataIndex = parseInt(evt.originalEvent.dataTransfer.getData('data-index'));
                            let dataWeekIndex = evt.originalEvent.dataTransfer.getData('data-week-index');
                            let level = evt.originalEvent.dataTransfer.getData('data-level');

                            if (level != 1) return;
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
                                let liste = getElement(data, $source.attr('data-id'))
                                console.log(liste)
                                $('#exampleModal').data('lalist', liste);
                                $('#exampleModal').modal('toggle')
                            } else {
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
                    }, game1);
                    $('.target-table[data-id="2"]').gameBoard({
                        startWeek: startWeek,
                        endWeek: endWeek,
                        keystore: 'game2',
                        level: 2,
                        'ondragover': function (evt) {

                            evt.preventDefault();
                        },
                        'ondrop': function (evt) {
                            evt.preventDefault();
                            let dataId = parseInt(evt.originalEvent.dataTransfer.getData('data-id'));
                            let dataIndex = parseInt(evt.originalEvent.dataTransfer.getData('data-index'));
                            let dataWeekIndex = evt.originalEvent.dataTransfer.getData('data-week-index');
                            let level = evt.originalEvent.dataTransfer.getData('data-level');
                            if (level != 2) return;
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
                                let liste = getElement(data, $source.attr('data-id'))
                                console.log(liste)
                                $('#exampleModal').data('lalist', liste);
                                $('#exampleModal').modal('toggle')
                            } else {
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
                    }, game2);
                    $('#ten-countdown').timer({'minute': 59, 'seconds': 59}, game1)
                    $('#myScore').score({}, gameModel1, game1, gameModel2, game2);
                    $('#myScoreUp').score({}, gameModel1, game1, gameModel2, game2);
                    $('#chat-component').chat({
                        'chatTeam': [
                            {id: 1, username: 'XYZ', 'picUrl': '/css/image/me.png'}
                        ],
                        'chatRoom': '#chat-room',
                        'chatSearch': '#chat-component-search',
                        'chatConsole': '#chat-console',
                        'memberMapFn': function (member) {
                            return member
                        }
                    }, {});
                    // $('.impact-1').flag({type: 1}, gameModel1, game1, gameModel2, game2, data)
                    let accumlateur = {}
                    $('.impact_progress_2').flag({type: 1}, gameModel1, game1, gameModel2, game2, data, accumlateur)
                    $('.impact_progress_3').flag({type: 2}, gameModel1, game1, gameModel2, game2, data, accumlateur)
                    $('.impact_progress_6').flag({type: 3}, gameModel1, game1, gameModel2, game2, data, accumlateur)
                    $('.impact_progress_5').flag({type: 4}, gameModel1, game1, gameModel2, game2, data, accumlateur)
                    $('.impact_progress_4').flag({type: 5}, gameModel1, game1, gameModel2, game2, data, accumlateur)
                    $('.impact_progress_7').flag({type: 8}, gameModel1, game1, gameModel2, game2, data, accumlateur)
                    $('.impact_progress_8').flag({type: 9}, gameModel1, game1, gameModel2, game2, data, accumlateur);
                    document.addEventListener('gamechanged', function () {
                        let xy = 0;
                        for(let pro in accumlateur){
                            xy += parseInt(accumlateur[pro])
                        }
                        $('.impact_progress_1').find('div').first().css('width', `${100*xy/35}`)
                    })

                    dispatchGameChangeEvent();
                    window.onbeforeunload = () => {
                        dispatchMasterSaveEvent();
                        return "Dude, are you sure you want to leave? Think of the kittens!";
                    };
                },
                error: (error) => {

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
            '#gamePlay': [this._gameStartHandler],
            '#result': [],
        }
        this.applyStepHandler = function (stepName) {
            stepHandlerRegistry[stepName].forEach(function (fn) {
                if (typeof fn === 'function') fn();
            })

        };
        this.init = function () {
            let currentStep = localStorage.getItem('currentStep') ? localStorage.getItem('currentStep') : '#login';
            this.applyStep(currentStep);
        };
        this.getNextStep = function () {
            let currentStep = localStorage.getItem('currentStep');
            let next = stepper.indexOf(currentStep) + 1
            return stepper[next];

        }

    }

    boot() {
        this._mainTime = parseInt(localStorage.getItem('mainTime')) | 600;
        this._elapsedTime = parseInt(localStorage.getItem('elapsedTime')) | 0;
        this.init();
    }

    next() {
        let next = this.getNextStep();
        this.applyStep(next);
    }


}
