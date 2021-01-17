(function ($) {
    $.fn.gameBoard = function (config, game1) {
        if (!game1 instanceof Game) throw  new Error('must have a game play instance');
        const defaultConfig = {
            containerClass: 'droppable-list',
            startWeek: 1,
            endWeek: 9,
            ondragover: function (evt) {
                console.log(evt)
            },
            ondrop: function (evt) {
                console.log(evt)
            }
        }
        const current = $.extend(defaultConfig, config)

        this.each(function () {
            let _that = this;
            for (let i = current['startWeek']; i < current['endWeek'] + 1; i++) {
                let $div = $('<div></div>', {'class': current['containerClass']})
                $div.attr('data-id', `${i}_${$(_that).attr('data-phase')}`)
                $div.append(`<div class="week-header">Semaine ${i}</div>`);
                $div.append('<div class="week-container"><ul class="task-week"></ul></div>');
                $div.bind('dragover', current['ondragover']);
                $div[0].addEventListener('touchmove', function (evt) {
                    console.log('touchmove', evt)
                });
                $div.bind('drop', function(evt){
                    current['ondrop'](evt);
                });
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
                game1.weeks = weeks
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
