(function ($) {
    $.fn.score = function (config, model, game) {
        let defaultConfig = {
            'event': 'score'
        }
        const current = $.extend(defaultConfig, config)
        this.each(function () {
            let _that = this;
            let score = 0;
            document.addEventListener(current['event'], function () {
                score = ScoreManager.score(model, game)
                $(_that).text(`${score} %`)
                console.log(model.weeks, game.weeks);
            })
            $(_that).text(`${score} %`)

        })
    }
})($)
