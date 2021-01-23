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
                console.log('imm',item)
                return {
                    id: item.id,
                    text: item.text,
                    draggable: true,
                    color: item.color

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
            console.log('data',data)
            data.forEach(function (item) {
                console.log('here item',item)
                let $li = $('<li></li>', {'class':current['itemClass']}).append(`<span>${item.text}</span>`)
                $li.data('id', item.id)
                $li.attr('data-id', item.id)
                $li.attr('data-level', item.level)
                $li.attr('draggable', item.draggable)
                $li.css("background-color", item.color);
                if(item.draggable){
                    $li.bind('dragstart', current['ondragstart'])
                    $li.bind('touchstart', function (evt) {
                        console.log('touchstart',item.id)
                        if (item.id == 1){
                            wd = parseInt(document.getElementById('f2f').style.width);
                            widthf = wd + 12.5;
                            $('#f2f').width(widthf);
                        }
                        if (item.id == 3){
                            wdV = parseInt(document.getElementById('vr').style.width);
                            widthV = wdV + 12.5;
                            $('#vr').width(widthV);
                        }
                        if(item.id == 4){
                            wdt = parseInt(document.getElementById('triggerMail').style.width);
                            widthT = wdt + 12.5;
                            $('#triggerMail').width(widthT);
                        }

                    })
                    $li.bind('dragend', current['ondragend'])
                    $li.bind('touchend', current['touchend'])
                }

                console.log('la liiiiiiiiiiiiiiiste',$li[0]);
                $ul.append($li[0])
            })
            $(_that).append($ul)
        })
    }
})($);
