$(document).ready(function() {


function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "<span style='font-size:30px;display: inline-block; line-height: initial;'>temps écoulé!</span>";
            $(".popup_lvl1_3").fadeIn();
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();

}

countdown( "ten-countdown", 10, 0 );



$(".container_ipad_view#level2_transformers .popup_lvl1_2").fadeIn();


$(".chat_btn").click(function(e){
    $('.chat_box').addClass('shown');
});
$(".chat_q_btn").click(function(e){
    $('.chat_box').removeClass('shown');
});

$(".title_equipe_chat").click(function(e){
    $('.trform_equipe').toggleClass('trednone');
    $('.title_equipe_chat span').toggleClass('open');
});

$(".delete_lvl1").click(function(e){
    $('.delete_lvl1').toggleClass('active');
});



$(".project_in_queue").click(function(e){
    $('.popup_lvl1_1').fadeIn();
});
$(".close_popup,.btn_continuer_lvl2,.btn_terminer_lvl2").click(function(e){
    $('.popup_lvl1_1').fadeOut();
    $('.popup_lvl1_2').fadeOut();
    $('.popup_lvl1_3').fadeOut();
});
/*
$(".right_arrow_scroller_1").click(function(e){
    $('.box_x_scrollabele_1').addClass('tred_month_table');
});
$(".left_arrow_scroller_1").click(function(e){
    $('.box_x_scrollabele_1').removeClass('tred_month_table');
});

$(".right_arrow_scroller_2").click(function(e){
    $('.box_x_scrollabele_2').addClass('tred_month_table');
});
$(".left_arrow_scroller_2").click(function(e){
    $('.box_x_scrollabele_2').removeClass('tred_month_table');
});
*/

$('.scroll_up_list').click(function(){
    $('html, .section_left_project_container').animate({scrollTop : 0},400);
    return false;
}); 

$(".scroll_down_list").click(function() {
    $('html,.section_left_project_container').animate({scrollTop: $(".project_waiting:last-child").offset().top},1200);
});







/*
$(".right_arrow_scroller").click(function(e){
    $('.box_x_scrollabele').addClass('tred_month_table');
});
$(".left_arrow_scroller").click(function(e){
    $('.box_x_scrollabele').removeClass('tred_month_table');
});

*/







});


(function($) {

    console.log( 'init-scroll: ' + $(".box_x_scrollabele").scrollLeft() );
    $(".right_arrow_scroller").on("click", function(){
        $(".cata-sub-nav").animate( { scrollLeft: '+=183.5' }, 200);
        
    });
    $(".left_arrow_scroller").on("click", function(){
        $(".cata-sub-nav").animate( { scrollLeft: '-=183.5' }, 200);
    });

})(jQuery);

(function($) {

    console.log( 'init-scroll: ' + $(".box_x_scrollabele_1").scrollLeft() );
    $(".right_arrow_scroller_1").on("click", function(){
        $(".cata-sub-nav1").animate( { scrollLeft: '+=183.5' }, 200);
        
    });
    $(".left_arrow_scroller_1").on("click", function(){
        $(".cata-sub-nav1").animate( { scrollLeft: '-=183.5' }, 200);
    });

})(jQuery);

(function($) {

    console.log( 'init-scroll: ' + $(".box_x_scrollabele_2").scrollLeft() );
    $(".right_arrow_scroller_2").on("click", function(){
        $(".cata-sub-nav2").animate( { scrollLeft: '+=183.5' }, 200);
        
    });
    $(".left_arrow_scroller_2").on("click", function(){
        $(".cata-sub-nav2").animate( { scrollLeft: '-=183.5' }, 200);
    });

})(jQuery);