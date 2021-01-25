(function ($) {
    $.fn.gameBoard = function (config, game1) {
        if (!game1 instanceof Game) throw  new Error('must have a game play instance');
        const defaultConfig = {
            containerClass: 'droppable-list column_tab_semaine',
            startWeek: 1,
            endWeek: 8,
            level: 1,
            nbrOfHooks: 10,
            keystore: 'game',
            saveCallback: save,
            refreshCallback: reInitialize,
            ondragover: function (evt) {
                console.log(evt)
            },
            ondrop: function (evt) {
                console.log(evt)
            }
        }
        const current = $.extend(defaultConfig, config)
        function getOrginalHook() {
            let $li = $('<li class="task-hook"><span>&nbsp</span></li>');
            $li.bind('dragover', function (evt) {
                console.log(evt)
                current['ondragover'](evt);
            });
            $li[0].addEventListener('touchmove', function (evt) {
                console.log('touchmove', evt)
            });
            $li.bind('drop', function (evt) {
                current['ondrop'](evt)
            });
            $li[0].addEventListener('touchcancel', function (evt) {
                console.log('touchcancel', evt)
            });
            return $li;
        }
        function getHook(savedGame, weekIndex, currentHookIndex) {
            // console.log('heeere savedGme', savedGame, weekIndex)
            if (savedGame) {
                if (savedGame._weeks) {
                    if (savedGame._weeks[weekIndex]) {
                        if (savedGame._weeks[weekIndex]._tasks) {
                            if (savedGame._weeks[weekIndex]._tasks[currentHookIndex]) {
                                let currentId = savedGame._weeks[weekIndex]._tasks[currentHookIndex]._id?savedGame._weeks[weekIndex]._tasks[currentHookIndex]._id:false;
                                if (currentId) {
                                    let $li = $($('ul.tasker').find(`li[data-id="${currentId}"]`).first()).addClass('done').clone(true);
                                    if($li){
                                        return ()=>{
                                            return $li;
                                        }
                                    }


                                }
                            }
                        }
                    }
                }
            }
            return getOrginalHook;
        }

        function prepareWeekHooks($weekContainer, savedGame, weekIndex) {
            let $taskWeek = $($weekContainer.find('.task-week').first());
            for (let i = 0; i < current['nbrOfHooks']; i++) {
                $taskWeek.append(getHook(savedGame, weekIndex, i)())
            }
        }

        this.each(function () {
            let _that = this;
            //global event listeners
            document.addEventListener('gamechanged',  (evt)=> {

                let weeks = []
                $(_that).find('.droppable-list').each(function () {
                    let weekIndex = $(this).index();
                    $(this).find('div.week-container > ul.task-week').each(function () {
                        $(this).find('li.draggable-task').each(function () {
                            let taskIndex = $(this).index()
                            weeks[weekIndex] = weeks[weekIndex] ? weeks[weekIndex] : new Week(weekIndex)
                            weeks[weekIndex].tasks[taskIndex] = new Task($(this).attr('data-id'), $(this).text())
                            $(this).find('i.fa-trash').each(function () {
                                console.log('tra');
                                $(this).remove()
                            })
                        })
                    })
                })
                game1._weeks = weeks
                current.saveCallback(current.keystore, game1);
                dispatchScoreEvent();

            });
            document.addEventListener('dismissRemove', function () {
                $(_that).find('.week-container > ul.task-week').each(function () {
                    $(this).find('li.draggable-task').each(function () {
                        $(this).find('i.fa.fa-trash').each(function () {
                            $(this).remove();
                        })
                    })
                });
            })
            document.addEventListener('prepareRemove', function (e) {
                console.log('event remove dispatched', e);
                $(_that).find('.week-container > ul.task-week').each(function () {
                    $(this).find('li.draggable-task').each(function () {
                        if ($(this).find('i.fa.fa-trash').length === 0) {
                            let $trash = $('<i></i>', {'class': 'fa fa-trash fa-2x'}).css('float', 'right');
                            $trash[0].addEventListener('touchstart', function (evt) {
                                evt.preventDefault()
                                let $node = $($(evt.target).parents('li').first())
                                $node.replaceWith(getOrginalHook())
                                dispatchGameChangeEvent();
                            }, false)
                            $(this).prepend($trash[0])
                        }

                    })
                })
            })
            document.addEventListener('timeElapsedEvent', function (evt) {
                $('[draggable="true"]').each(function () {
                    $(this).attr('draggable', false);
                })
                const app = new Application();
                app.boot();
                app.next();

            });
            document.addEventListener('gameRefreshEvent', function () {
                $('li.draggable-task').each(function () {
                    $(this).attr('draggable', true);
                })
            })

            function initialize() {
                let savedGame = window.reInitialize(current.keystore);
                if(savedGame){
                    Game.refresh(game1,savedGame)
                }
                $(".task-week").css("max-height", ($(".parent").height()-$(".title_column_tab_semaine").height()));
                for (let i = current['startWeek']; i < current['endWeek'] + 1; i++) {
                    let mois = 'FÉVRIER - S' + i;
                    let $div = $('<div></div>', {'class': current['containerClass']})
                    $div.attr('data-id', `${i}_${$(_that).attr('data-id')}`)
                    if (i > 4) {
                        let j = i - 4;
                        mois = 'MARS - S' + j;
                    }
                    $div.append(`<div class="title_column_tab_semaine" hidden> ${mois}  </div>`);
                    let extraClass = current['level'] == 1 ? 'zone_drg_1' : 'zone_drg_2';
                    let $weekContainer = $(`<div class="week-container zone_dragger ${extraClass}"><ul class="task-week"></ul></div>`);
                    prepareWeekHooks($weekContainer, savedGame, i - 1);
                    $div.append($weekContainer);
                    $(_that).append($div[0]);
                }
                dispatchGameChangeEvent();
            }
            initialize();

        });
    }
})($)
