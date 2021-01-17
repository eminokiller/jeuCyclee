(function ($) {
    $.fn.gameBoard = function (config, game) {
        if (!game instanceof Game) throw  new Error('must have a game play instance');
        const defaultConfig = {
            containerClass: 'droppable-list',
            startWeek: 1,
            endWeek: 9,
            nbrOfHooks: 10,
            level: 1,
            ondragover: function (evt) {
                console.log(evt)
            },
            ondrop: function (evt) {
                console.log(evt)
            }
        }
        const current = $.extend(defaultConfig, config)
        function getHook(){
            let $li = $('<li class="task-hook"><span>&nbsp</span></li>');
            $li.bind('dragover', function(evt){
                console.log(evt)
                current['ondragover'](evt);
            });
            $li[0].addEventListener('touchmove', function (evt) {
                console.log('touchmove', evt)
            });
            $li.bind('drop', function(evt){
                console.log(evt)
                current['ondrop'](evt)
            });
            $li[0].addEventListener('touchcancel', function (evt) {
                console.log('touchcancel', evt)
            });
            return $li;
        }
        function prepareWeekHooks($weekContainer) {
            let $taskWeek = $($weekContainer.find('.task-week').first());
            for(let i =0; i<current['nbrOfHooks'];i++){
                $taskWeek.append(getHook())
            }
        }
        function loadData(game, $container, weekIndexPlus1) {
            let $taskWeek = $($container.find('ul.task-week').first());
            if(game.weeks[weekIndexPlus1-1]){
                game.weeks[weekIndexPlus1-1].tasks.forEach(function (item,i) {
                    if(item.id){
                        let $li = $($('ul.tasker').find(`li.draggable-task[data-id="${item.id}"]`).first());
                        if($li[0]){
                            $taskWeek.find(`li.task-hook:nth-child(${i+1})`).first().replaceWith($li.clone(true)[0])
                        }
                    }
                })
            }
        }
        this.each(function () {
            let _that = this;
            for (let i = current['startWeek']; i < current['endWeek'] + 1; i++) {
                let $div = $('<div></div>', {'class': current['containerClass']})
                $div.attr('data-id', `${i}_${$(_that).attr('data-id')}`)
                $div.append(`<div class="week-header">Semaine ${i}</div>`);
                let $weekContainer = $('<div class="week-container"><ul class="task-week"></ul></div>');
                prepareWeekHooks($weekContainer);
                loadData(game, $weekContainer,i)
                loadData(game, $div,i);
                $div.append($weekContainer);
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
                game.weeks = weeks;
                dispatchSaveDataEvent(game.normalize())
                dispatchScoreEvent();
            })
            document.addEventListener('prepareRemove', function () {
                $(this).find('.week-container > ul.task-week').each(function () {
                    $(this).find('li.draggable-task').each(function () {
                        if($(this).find('i.fa.fa-trash').length ===0){
                            let $trash = $('<i></i>', {'class': 'fa fa-trash fa-2x'}).css('float','right');
                            $trash[0].addEventListener('click', function (evt) {
                                evt.preventDefault()
                                console.log('ect---->', evt.target)
                                let $node = $($(evt.target).parents('li').first())
                                $node.replaceWith(getHook())
                                dispatchGameChangeEvent();
                            },false)
                            $(this).prepend($trash[0])
                        }

                    })
                });
            })

        });
    }
})($)
