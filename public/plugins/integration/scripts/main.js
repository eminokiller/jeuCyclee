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
    const gameModel = Game.createInstance(1, startWeek, endWeek, data);
    $('.draggable-list').draggableList({
        data: data,
        containerClass: 'tasker',
        itemClass: 'draggable-task',
        ondragstart: function (evt) {
            evt.originalEvent.dataTransfer.setData('data-id', $(evt.target).data('id'))
            evt.originalEvent.dataTransfer.setData('data-parent', $(evt.target).parent().attr('class'))
            evt.originalEvent.dataTransfer.setData('data-index', $(evt.target).index())
            evt.originalEvent.dataTransfer.setData('data-level', $(evt.target).data('level'));
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
            let $parentTable = $($container.parents('.target-table').first())
            if($parentTable.data('id') != $(target).data('level')) return;
            if (!$container.length) {
                evt.stopPropagation();
                return;
            }
            let targetId = $container.data('id');
            let dataId = $(target).data('id');
            //here we displace the element
            let $taskList = $($container.find('ul.task-week').first());
            if ($(target).parent().hasClass('tasker')) {
                $taskList.append($(target).addClass('done').clone(true)[0]);
            } else {
                $taskList.append($(target).addClass('done')[0]);
            }
            dispatchGameChangeEvent();

        },
        mapFn: function (item) {
            return {
                id: item.id,
                text: item.text,
                level:item.level,
                draggable: item.draggable,
            }
        }
    })
    $('.target-table[data-id="1"]').gameBoard({
        startWeek: startWeek,
        endWeek: endWeek,
        level: 1,
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
            let level = evt.originalEvent.dataTransfer.getData('data-level');
            if(level!=1) return;
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
            let $taskList = $($container.find('ul.task-week').first());
            if ($source.parent().hasClass('tasker')) {
                $taskList.append($source.clone(true).addClass('done')[0]);
            } else {
                $taskList.append($source.addClass('done')[0]);
            }

            dispatchGameChangeEvent();


        }
    }, game1);
    $('.target-table[data-id="2"]').gameBoard({
        startWeek: startWeek,
        endWeek: endWeek,
        level: 2,
        'ondragover': function (evt) {
            evt.preventDefault();
        },
        'ondrop': function (evt) {
            evt.preventDefault();
            let dataId = parseInt(evt.originalEvent.dataTransfer.getData('data-id'));
            let dataParent = evt.originalEvent.dataTransfer.getData('data-parent');
            let dataIndex = parseInt(evt.originalEvent.dataTransfer.getData('data-index'));
            let dataWeekIndex = evt.originalEvent.dataTransfer.getData('data-week-index');
            let level = evt.originalEvent.dataTransfer.getData('data-level');
            if(level!=2) return;
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
            let $taskList = $($container.find('ul.task-week').first());
            if ($source.parent().hasClass('tasker')) {
                $taskList.append($source.clone(true).addClass('done')[0]);
            } else {
                $taskList.append($source.addClass('done')[0]);
            }

            dispatchGameChangeEvent();


        }
    }, game2);
    $('div.stopwatch').timer({'mainTime': 3000}, game1)
    $('#myScore').score({}, gameModel, game1);
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
})($);
