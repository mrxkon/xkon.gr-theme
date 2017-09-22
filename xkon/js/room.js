

/* room stuff */
(function ($) {

    $(document).ready(function () {
        if ($(window).width() > 768) {
            startVivusLogo();
            $('#roomstuff').centerX();
        } else {
            $('.svgsection ').remove();
            $('.hellosection').css('padding-top', '120px');
        }
    });

    /* center logo */
    $(window).resize(function () {
    	if ($(window).width() > 768 && $('.svgsection').length) {
	        $('#xkonlogo').centerX();
	        $('#roomstuff').centerX();
	        centerClock();
	    }
    });

    /* find centers */

    $.fn.centerX = function () {
        this.css("position", "absolute");
        this.css("left", Math.max(0, (($('#room').outerWidth() - $(this).outerWidth()) / 2)) + "px");
        return this;
    }

    $.fn.centerY = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($('#room').outerHeight() - $(this).outerHeight()) / 2)) + "px");
        return this;
    }

    function resetVivusLogo() {
        $('#pclines').css('opacity', '1');
        startVivusLogo();
    }

    function startVivusLogo(){
        /* vivus outline effect */
        var theVivus = new Vivus('pclogo', {
            type: 'delayed',
            duration: 400,
            animTimingFunction: Vivus.EASE_IN_OUT
        }, drawLogo);
    }

    function drawLogo(){
        $('#pcxf1').delay(2000).animate({opacity: 1}, 400);
        $('#pcxf2').delay(6000).animate({opacity: 1}, 400);
        $('#pcxf3').delay(6000).animate({opacity: 1}, 400);
        $('#pcxf4').delay(8400).animate({opacity: 1}, 400);
        $('#pcxf5').delay(7200).animate({opacity: 1}, 400);
        $('#pcxf6').delay(4000).animate({opacity: 1}, 400);
        $('#pcxf7').delay(4000).animate({opacity: 1}, 400);

        $('#pckf1').delay(3200).animate({opacity: 1}, 400);
        $('#pckf2').delay(5200).animate({opacity: 1}, 400);
        $('#pckf3').delay(6400).animate({opacity: 1}, 400);
        $('#pckf4').delay(7600).animate({opacity: 1}, 400);

        $('#pcof1').delay(3600).animate({opacity: 1}, 400);
        $('#pcof2').delay(2400).animate({opacity: 1}, 400);
        $('#pcof4').delay(4400).animate({opacity: 1}, 400);
        $('#pcof3').delay(8800).animate({opacity: 1}, 400);

        $('#pcnf1').delay(5600).animate({opacity: 1}, 400);
        $('#pcnf2').delay(4800).animate({opacity: 1}, 400);
        $('#pcnf3').delay(2800).animate({opacity: 1}, 400);
        $('#pcnf4').delay(6800).animate({opacity: 1}, 400);
        $('#pcnf5').delay(8000).animate({opacity: 1}, 400);

        $('#pclines').delay(9400).animate({opacity:0},800);

        $('#pcfills').children().children().delay(10000).animate({opacity:0},800);

        $('#pcwin2').delay(20000).animate({opacity:1});
        $('#pcwin3').delay(20600).animate({opacity:1});
        $('#pcwin1').delay(21300).animate({opacity:1});

        $('#pcwin2').delay(3000).animate({opacity:0});
        $('#pcwin3').delay(3000).animate({opacity:0});
        $('#pcwin1').delay(3000).animate({opacity:0});

        setTimeout(resetVivusLogo, 25000);
    }

})(jQuery);

/* DayOrNight */

var startTime = '07:00 AM';
var endTime = '08:00 PM';

var curr_time = getval();

if (get24Hr(curr_time) > get24Hr(startTime) && get24Hr(curr_time) < get24Hr(endTime)) {
    // yes
    jQuery('#roomoverlay').css('opacity', '.3');
    jQuery('#citysky').css('fill', '#ACD8F3');
    jQuery('#smoke').css('opacity', '.5');
    jQuery('#theclouds').css('opacity', '1');
    jQuery('#shadylayer').css('display', 'none');
    jQuery('#lamplight').css('display', 'none');
    jQuery('#lampcolor').css('display', 'none');
    jQuery('#bulb').css('fill', '#fff');
    jQuery('#bulbhacks').css('fill', '#fff');
    jQuery('.mobile_menu_bar:before').css('color', '#000');
} else {
    //no
    jQuery('#roomoverlay').css('opacity', '.8');
    jQuery('#citysky').css('fill', '#444');
    jQuery('#smoke').css('opacity', '.1');
    jQuery('#theclouds').css('opacity', '.3');
    jQuery('#shadylayer').css('display', 'block');
    jQuery('#lamplight').css('display', 'block');
    jQuery('#lampcolor').css('display', 'block');
    jQuery('#bulb').css('fill', '#F6CC44');
    jQuery('#bulbhacks').css('fill', '#F6CC44');
    jQuery('.mobile_menu_bar').addClass('menuBlue');
}

function get24Hr(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;

    var minutes = Number(time.match(/:(\d+)/)[1]);
    hours = hours * 100 + minutes;
    //console.log(time + " - " + hours);
    return hours;
}

function getval() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()

    if (minutes < 10) minutes = "0" + minutes;

    var suffix = "AM";
    if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    var current_time = hours + ":" + minutes + " " + suffix;

    return current_time;

}
