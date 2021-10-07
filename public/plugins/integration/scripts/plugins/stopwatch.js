(function ($) {
    $.fn.timer = function (config, game1) {
        if(!game1 instanceof  Game) throw  new Error('must have a game play instance');
        const defaultConfig = {
            'mainTime': 3000
        };

        function formatTime(x) {
            let h = parseInt(x / 3000)
            let m = parseInt((x - h * 3000) / 60);
            let s = parseInt(x - h * 3000 - m * 60);
            let prefixH = h <10?'0':'';
            let prefixM = m <10?'0':'';
            let prefixS = s <10?'0':'';
            return `${prefixH}${h}:${prefixM}${m}:${prefixS}${s}`
        }

        const current = $.extend(defaultConfig, config)
        this.each(function () {
            let _that = this;
            let x = parseInt(current['mainTime']);
            let z = setInterval(() =>  {
                x--;
                $(_that).text(formatTime(x))
                if (x === 0) {
                    clearInterval(z)
                }
            }, 1000)

        })
    }
})($);
