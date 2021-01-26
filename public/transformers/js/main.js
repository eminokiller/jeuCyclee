$(document).ready(function () {
    function initControl() {
        $(".container_ipad_view#level2_transformers .popup_lvl1_2").fadeIn();
        $(".chat_btn").click(function (e) {
            $('.chat_box').addClass('shown');
        });
        $(".chat_q_btn").click(function (e) {
            $('.chat_box').removeClass('shown');
        });
        $(".title_equipe_chat").click(function (e) {
            $('.trform_equipe').toggleClass('trednone');
            $('.title_equipe_chat span').toggleClass('open');
        });
        $(".delete_lvl1").click(function (e) {
            $('.delete_lvl1').toggleClass('active');
        });
        // $(".right_arrow_scroller").click(function (e) {
        //     $('.box_x_scrollabele').addClass('tred_month_table');
        // });
        // $(".left_arrow_scroller").click(function (e) {
        //     $('.box_x_scrollabele').removeClass('tred_month_table');
        // });
        $(".project_in_queue").click(function (e) {
            $('.popup_lvl1_1').fadeIn();
        });
        $(".close_popup,.btn_continuer_lvl2,.btn_terminer_lvl2").click(function (e) {
            $('.popup_lvl1_1').fadeOut();
            $('.popup_lvl1_2').fadeOut();
            $('.popup_lvl1_3').fadeOut();
        });
     /*   $(".right_arrow_scroller").click(function(e){
            $('.box_x_scrollabele_1').addClass('tred_month_table');
        });
        $(".left_arrow_scroller").click(function(e){
            $('.box_x_scrollabele_1').removeClass('tred_month_table');
        });
        $(".right_arrow_scroller_2").click(function (e) {
            $('.box_x_scrollabele_2').addClass('tred_month_table');
        });
        $(".left_arrow_scroller_2").click(function (e) {
            $('.box_x_scrollabele_2').removeClass('tred_month_table');
        });*/
        // $('.scroll_up_list').click(function(){
        //     $('html, .section_left_project_container').animate({scrollTop : 0},400);
        //     return false;
        // });
        // $(".scroll_down_list").click(function() {
        //     $('html,.section_left_project_container').animate({scrollTop: $(".section_left_project_container li:last-child").offset().top},1200);
        // });

    //     var counters = $(".counterper");
    //     var countersQuantity = counters.length;
    //     var counter = [];
    //
    //     for (i = 0; i < countersQuantity; i++) {
    //         counter[i] = parseInt(counters[i].innerHTML);
    //     }
    //
    //     var count = function(start, value, id) {
    //         var localStart = start;
    //         setInterval(function() {
    //             if (localStart < value) {
    //                 localStart++;
    //                 counters[id].innerHTML = localStart;
    //             }
    //         }, 100);
    //     }
    //
    //     for (j = 0; j < countersQuantity; j++) {
    //         count(0, counter[j], j);
    //     }
    //
     }




    initControl();

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

(function($) {

    $('.scroll_up_list').click(function(){
        $('html, .section_left_project_container').animate({scrollTop : '-=40'},200);
        return false;
    });

    $(".scroll_down_list").click(function() {
        $('html,.section_left_project_container').animate({scrollTop: '+=40'},200);
    });

})(jQuery);