(function ($) {
    $.fn.draggableList = function (config) {
        const defaultConfig = {
            data: [],
            containerClass: 'tasker',
            itemClass: 'draggable-task',
            ondragstart: function(evt){},
            ondragend: function(evt){},
            touchend: function(evt){},
            mapFn:function (item) {
                return {
                    id: item.id,
                    text: item.text,
                    level: item.level,
                    color: item.color,
                    draggable: true,
                }
            }
        };
        const  current = $.extend(defaultConfig, config)
        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        this.each(function () {
            let _that = this;
            let $ul = $('<ul></ul>', {'class': current['containerClass']});
            let data = current['data'].map(current['mapFn']);
            data.forEach(function (item) {
                console.log(item)
                let $li = $('<li></li>', {'class':current['itemClass']}).append(`<span>${item.text}</span>`)
                $li.data('id', item.id)
                $li.attr('data-id', item.id)
                $li.attr('data-level', item.level)
                $li.attr('draggable', item.draggable)
                $li.css('background-color', item.color)
                if(item.draggable){
                    $li.bind('dragstart', current['ondragstart'])
                    $li.bind('touchstart', function (evt) {
                        console.log('touchstart', evt)
                    })
                    $li.bind('dragend', current['ondragend'])
                    $li.bind('touchend', current['touchend'])
                }
                $ul.append($li[0])
            })
            $(_that).append($ul)
        })
    }
})($);
