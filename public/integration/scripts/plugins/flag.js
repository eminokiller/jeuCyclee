(function ($) {
    $.fn.flag = function (config, model1, game1, model2, game2, data, ac) {
        let defaultConfig = {
            'type': '1'
        }
        const current = $.extend(defaultConfig, config)

        function updateWidth(id) {
            let query = getTask(data, id);
            //let wdV = parseInt(document.getElementById(query[0]).style.width);
            //let wid = 100/query[1];
            return query[2] * 20;
        }

        this.each(function () {
            let _that = this;
            console.log('this', this);
            document.addEventListener('score', function () {
                console.log('here listen to the score event', game1);
                let gameBordTask = []
                game1._weeks.forEach(function (week) {
                    if (week) {
                        week._tasks.forEach(function (task) {
                            if (gameBordTask.filter(function (item) {
                                return item == task._id;
                            }).length == 0) {
                                gameBordTask.push(parseInt(task._id))
                            }
                        })
                    }

                })
                console.log('here game board task', gameBordTask)
                let filterData = data.filter(function (item) {
                    console.log('here item of data', item);
                    return gameBordTask.indexOf(item.id) !== -1
                });

                let a = filterData.filter(function (item) {
                    console.log('test filtred  ', item)
                    return item.jauge == current['type']
                }).reduce(function (s, item) {
                    console.log('item---->', item)
                    s = parseInt(item.impact);
                    return s;
                }, 0);

               // if ($($(_that).find('div').first()).css('width') == 0){
                    $($(_that).find('div').first()).css('width', `${0}%`)
                    $($(_that).find('div').first()).css('width', `${a * 20}%`)

                //}
                ac[current['type']] = a;


            })
        })
    }
})($)