(function ($) {
    $.fn.timer = function (config, game1) {
        if (!game1 instanceof Game) throw  new Error('must have a game play instance');
        const defaultConfig = {
            'minutes': 20,
            'seconds': 0
        };

        function countdown(element, minutes, seconds) {
            let endTime, hours, mins, msLeft, time;

            function twoDigits(n) {
                return (n <= 9 ? "0" + n : n);
            }

            function updateTimer() {
                msLeft = endTime - (+new Date);
                if (msLeft < 1000) {
                    element.innerHTML = "<span style='font-size:30px;display: inline-block; line-height: initial;'>temps écoulé!</span>";
                    $(".popup_lvl1_3").fadeIn();
                    dispatchTimeElapsedEvent()
                } else {
                    time = new Date(msLeft);
                    hours = time.getUTCHours();
                    mins = time.getUTCMinutes();
                    element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
                    setTimeout(() => {
                        localStorage.setItem('minutes', twoDigits(mins))
                        localStorage.setItem('seconds', twoDigits(time.getUTCSeconds()))
                        updateTimer()
                    }, time.getUTCMilliseconds() + 500);
                }
            }

            endTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;
            updateTimer();

        }





        const current = $.extend(defaultConfig, config)
        this.each(function () {
            let _that = this;
            let minuteStored = localStorage.getItem('minutes');
            let secondStored = localStorage.getItem('seconds');
            if (minuteStored !== null) {
                let currentMinute = parseInt(minuteStored);
                let currentSeconds = parseInt(secondStored);
                countdown(_that, currentMinute, currentSeconds);
            } else {
                countdown(_that, current['minutes'], current['seconds']);
            }

        })
    }
})($);
