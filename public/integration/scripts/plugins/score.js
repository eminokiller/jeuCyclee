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
                score = ScoreManager.score(model1, game1, model2, game2)
                if(score >= 30 && localStorage.getItem('level') == 1){
                    dispatchChangeLevelEvent();
                }
                score = ScoreManager.score(model1, game1,model2,game2)
                $(_that).text(`${score} %`)
            })
            $(_that).text(`${score} %`)

        })
    }
})($)
