// UI
function showAsside(element) {
    $($(element).data('target')).toggleClass('open')
}

function prepareRemove(element) {
    dispatchPrepareRemoveEvent();
}

(function ($) {
    function mockData() {
        let data = [];
        let textGrise = 'Action medeo';
        for (let i = 0; i < 30; i++) {
            let text = (i > 27) ? textGrise : 'Promotion planing';
            let draggable = i <= 27;
            let item = {id: i + 1, text: `${text} ${i + 1}`, draggable: draggable};
            data.push(item)
        }
        return data;
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
                $('#exampleModal').modal('toggle')
            } else {
                //here we displace the element
                let $taskList = $($container.find('ul.task-week').first());
                if ($(target).parent().hasClass('tasker')) {
                    $taskList.append($(target).addClass('done').clone(true)[0]);
                } else {
                    $taskList.append($(target).addClass('done')[0]);
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
                $('#exampleModal').modal('toggle')
            } else {
                let $taskList = $($container.find('ul.task-week').first());
                if ($source.parent().hasClass('tasker')) {
                    $taskList.append($source.clone(true).addClass('done')[0]);
                } else {
                    $taskList.append($source.addClass('done')[0]);
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
})($);
