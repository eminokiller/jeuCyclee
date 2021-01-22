(function ($) {
    $.fn.score = function (config, model1, game1,model2,game2) {
        let defaultConfig = {
            'event': 'score'
        }
        const current = $.extend(defaultConfig, config)
        this.each(function () {
            let _that = this;
            let score = 0;
            document.addEventListener(current['event'], function () {
                score = ScoreManager.score(model1, game1,model2,game2)
                score = score + 5;
                $(_that).text(`${score} %`)
                console.log(model1.weeks, game.weeks);
            })
            $(_that).text(`${score} %`)

        })
    }
})($)
