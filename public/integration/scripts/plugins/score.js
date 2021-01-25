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





                if(score >= 60 && localStorage.getItem('level') == 1){
                    dispatchChangeLevelEvent();
                }
                score = ScoreManager.score(model1, game1,model2,game2)
                console.log(score);

                if (score > 10 && !($('#b1').hasClass('active'))){
                    $('#exampleModal3').modal('toggle');
                }

                if (score > 20 && !($('#b2').hasClass('active'))){
                    $('#exampleModal4').modal('toggle');
                }

                if (score > 40 && !($('#b3').hasClass('active'))){
                    $('#exampleModal4').modal('toggle');
                }





                $(_that).text(`${score} %`)
            })
            $(_that).text(`${score} %`)

        })
    }
})($)
