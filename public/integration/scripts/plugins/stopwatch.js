(function ($) {
    $.fn.timer = function (config, game1) {
        if (!game1 instanceof Game) throw  new Error('must have a game play instance');
        const defaultConfig = {
            'minutes': 59,
            'seconds': 59
        };
        //badge1
        const TM1 = 45
        const TS1 = 0;
        //badge2
        const TM2 = 30
        const TS2 = 0;
        //badge3
        const TM3 = 15
        const TS3 = 0;

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
                        let twdm = twoDigits(mins)
                        localStorage.setItem('minutes', twdm)
                        let tds = twoDigits(time.getUTCSeconds());
                        localStorage.setItem('seconds', tds)
                        //
                        if(twdm==TM1 && tds==TS1){
                            showBage1Modal()
                        }
                        if(twdm==TM2 && tds==TS2){
                            showBage2Modal()
                        }
                        if(twdm==TM3 && tds==TS3){
                            showBage3Modal()
                        }
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
