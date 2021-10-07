// UI
function showAsside(element) {
    $($(element).data('target')).toggleClass('open')
}

function prepareRemove(element) {
    dispatchPrepareRemoveEvent();
}

(function ($) {
    const startWeek = 1;
    const endWeek = 8;
    let data = mockData()
    const game1 = Game.loadInstance(1, startWeek, endWeek, data, JSON.parse($('#campagne_config_weeksLevel1').val()) );
    const game2 = Game.loadInstance(2, startWeek, endWeek, data, JSON.parse($('#campagne_config_weeksLevel2').val()));
    $('.draggable-list').draggableList({
        data: data,
        containerClass: 'tasker',
        itemClass: 'draggable-task',
        ondragstart: function (evt) {
            evt.originalEvent.dataTransfer.setData('data-id', $(evt.target).data('id'))
            evt.originalEvent.dataTransfer.setData('data-parent', $(evt.target).parent().attr('class'))
            evt.originalEvent.dataTransfer.setData('data-index', $(evt.target).index())
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
            console.log('touch end');
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
                level:item.level,
                color: item.color,
                draggable: item.draggable,
            }
        }
    })
    $('.target-table[data-id="1"]').gameBoard({
        startWeek: startWeek,
        endWeek: endWeek,
        'ondragover': function (evt) {
            evt.preventDefault();
        },
        'ondrop': function (evt) {
            evt.preventDefault();
            let dataId = parseInt(evt.originalEvent.dataTransfer.getData('data-id'));
            let dataIndex = parseInt(evt.originalEvent.dataTransfer.getData('data-index'));
            let dataWeekIndex = evt.originalEvent.dataTransfer.getData('data-week-index');
            let level =  evt.originalEvent.dataTransfer.getData('data-level');
            if(level!=1) return;
            let $source = $('<div></div>');
            if (dataWeekIndex != "false") {
                $source = $($($($($(`.droppable-list[data-id="${dataWeekIndex}"]`).first()).find('.week-container').first()).find('.task-week').first()).find(`li:nth-child(${dataIndex + 1})`).first());
            } else {
                $source = $($('.tasker > li.draggable-task[data-id="' + dataId + '"]').first())
            }
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
    }, game1);
    $('.target-table[data-id="2"]').gameBoard({
        startWeek: startWeek,
        endWeek: endWeek,
        'ondragover': function (evt) {
            evt.preventDefault();
        },
        'ondrop': function (evt) {
            evt.preventDefault();
            let dataId = parseInt(evt.originalEvent.dataTransfer.getData('data-id'));
            let dataIndex = parseInt(evt.originalEvent.dataTransfer.getData('data-index'));
            let dataWeekIndex = evt.originalEvent.dataTransfer.getData('data-week-index');
            let level =  evt.originalEvent.dataTransfer.getData('data-level');
            if(level!=2) return;
            let $source = $('<div></div>');
            if (dataWeekIndex != "false") {
                $source = $($($($($(`.droppable-list[data-id="${dataWeekIndex}"]`).first()).find('.week-container').first()).find('.task-week').first()).find(`li:nth-child(${dataIndex + 1})`).first());
            } else {
                $source = $($('.tasker > li.draggable-task[data-id="' + dataId + '"]').first())
            }
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
    }, game2);
    $('div.stopwatch').timer({'mainTime': 3000}, game1)
})($);
