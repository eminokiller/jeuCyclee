(function ($) {
    $.fn.gameBoard = function (config, game) {
        if (!game instanceof Game) throw  new Error('must have a game play instance');
        const defaultConfig = {
            containerClass: 'droppable-list',
            startWeek: 1,
            endWeek: 9,
            level: 1,
            ondragover: function (evt) {
                console.log(evt)
            },
            ondrop: function (evt) {
                console.log(evt)
            }
        }
        const current = $.extend(defaultConfig, config)
        function loadData(game, $container, weekIndexPlus1) {
            console.log('preload', game.weeks)
            console.log('preload', $container)
            console.log('preload', $container)
            let $taskWeek = $($container.find('ul.task-week').first());
            if(game.weeks[weekIndexPlus1-1]){
                console.log('Must be cloned',game.weeks[weekIndexPlus1-1]);
                game.weeks[weekIndexPlus1-1].tasks.forEach(function (item,i) {
                    console.log(item,i)
                    let $li = $($('ul.tasker').find(`li.draggable-task[data-id="${item.id}"]`).first());
                    $taskWeek.append($li.clone(true)[0]);
                })
            }
        }
        this.each(function () {
            let _that = this;
            for (let i = current['startWeek']; i < current['endWeek'] + 1; i++) {
                let $div = $('<div></div>', {'class': current['containerClass']})
                $div.attr('data-id', `${i}_${$(_that).attr('data-id')}`)
                $div.append(`<div class="week-header">Semaine ${i}</div>`);
                $div.append('<div class="week-container"><ul class="task-week"></ul></div>');
                loadData(game, $div,i);
                $div.bind('dragover', current['ondragover']);
                $div[0].addEventListener('touchmove', function (evt) {
                    console.log('touchmove', evt)
                });
                $div.bind('drop', current['ondrop']);
                $div[0].addEventListener('touchcancel', function (evt) {
                    console.log('touchcancel', evt)
                });
                $(_that).append($div[0])
            }
            document.addEventListener('gamechanged', function (evt) {
                console.log(evt)
                let weeks = []
                $(_that).find('.droppable-list').each(function () {
                    let weekIndex = $(this).index();
                    $(this).find('.week-container > ul.task-week').each(function () {
                        $(this).find('li.draggable-task').each(function () {
                            let taskIndex = $(this).index()
                            weeks[weekIndex] = weeks[weekIndex] ? weeks[weekIndex] : new Week(weekIndex)
                            weeks[weekIndex].tasks[taskIndex] = new Task($(this).attr('data-id'), $(this).text())
                            $(this).find('i.fa-trash').each(function () {
                                $(this).remove()
                            })
                        })
                    })
                })
                game.weeks = weeks
                dispatchSaveDataEvent(game.normalize())
                dispatchScoreEvent();
            })
            document.addEventListener('prepareRemove', function (evt) {
                $(this).find('.week-container > ul.task-week').each(function () {
                    $(this).find('li.draggable-task').each(function () {
                        if($(this).find('i.fa.fa-trash').length ===0){
                            let $trash = $('<i></i>', {'class': 'fa fa-trash fa-2x'}).css('float','right');
                            $trash.bind('click', function () {
                                $(this).parent().remove();
                                dispatchGameChangeEvent();
                            })
                            $(this).prepend($trash[0])
                        }

                    })
                });
            })

        });
    }
})($)
