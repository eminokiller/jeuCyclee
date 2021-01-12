(function ($) {
    $.fn.draggableList = function (config) {
        const defaultConfig = {
            data: [],
            containerClass: 'tasker',
            itemClass: 'draggable-task',
            ondragstart: function(evt){},
            ondragend: function(evt){},
            mapFn:function (item) {
                return {
                    id: item.id,
                    text: item.text,
                    draggable: true,
                }
            }
        };
        const  current = $.extend(defaultConfig, config)
        this.each(function () {
            let _that = this;
            let $ul = $('<ul></ul>', {'class': current['containerClass']});
            let data = current['data'].map(current['mapFn']);
            data.forEach(function (item) {
                let $li = $('<li></li>', {'class':current['itemClass']}).append(`<span>${item.text}</span>`)
                $li.data('id', item.id)
                $li.attr('data-id', item.id)
                $li.attr('draggable', item.draggable)
                if(item.draggable){
                    $li.bind('dragstart', current['ondragstart'])
                    $li.bind('dragend', current['ondragend'])
                }
                $ul.append($li[0])
            })
            $(_that).append($ul)
        })
    }
})($);
