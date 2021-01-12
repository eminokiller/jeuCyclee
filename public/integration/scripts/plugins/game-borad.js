(function ($) {
    $.fn.gameBoard = function (config) {
        const defaultConfig = {
            containerClass: 'droppable-list',
            startWeek:1,
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
            for(let i = current['startWeek']; i<current['endWeek']+1;i++){
                let $div = $('<div></div>', {'class':current['containerClass']})
                $div.attr('data-id', `${i+1}_${$(_that).attr('data-phase')}` )
                $div.append(`<div class="week-header">Semaine ${i}</div>`);
                $div.append('<div class="week-container"><ul class="task-week"></ul></div>');
                $div.bind('dragover', current['ondragover']);
                $div.bind('drop', current['ondrop']);
                $(_that).append($div[0])
            }

        });
    }
})($)
