
/*FUNCTION FOR SCROLLING BACK TO A CERTAIN PART OF THE PAGE ------------------------------------------------------------
- parameter of 2000: scrolls to "What is the purpose of this website?" on the home page
- parameter of 0: scrolls to Footer
 */
function whereToScroll(x){
    $("html, body").animate({ scrollTop: $(document).height()-x}, 600);
    return false;
}

/*FUNCTIONS DEALING WITH FADE IN -------------------------------------------------------------------------------------*/

//fade in for page intro
window.onload = $("#pageintro").fadeTo(800, 1);

//fade in for headers
window.onload = $("#headingFade").fadeTo(800, 1);

//Fade in for the entire page
$(function() {
    $(document).ready(function(){
        $("body").fadeTo(200, 1);
    });
});

/*FUNCTIONS FOR DEALING WITH IMAGE SLIDER ----------------------------------------------------------------------------*/
$(document).ready(function() {
    $("#slider").bxSlider({
        randomStart: true,
        auto: true,
        pause: 3e3,
        moveSlides: 1,
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 250,
        slideMargin: 10
    });
});

/* DEALS WITH THE "SCROLL BACK UP" CHEVRON BUTTON --------------------------------------------------------------------*/
//Sets the visibility of the chevron up arrow
$(window).scroll(function () {
    if ($(window).scrollTop() > 150) {
        $("#backtotop").addClass("visible");
    } else {
        $("#backtotop").removeClass("visible");
    }
});

//the function for smoothly scrolling back up the page
function backtotop(){
    $("body,html").animate({
        scrollTop: 0
    }, 600);
}

/* DEALS WITH THE MOBILE MENU ------------------------------------------------------------------------------------------
Thanks to:
"Convert a Menu to a Dropdown for Small Screens" from Chris Collier - http://css-tricks.com/convert-menu-to-dropdown/
"Submenu's with a dash" Daryn St. Pierre - http://jsfiddle.net/bloqhead/Kq43X/
*/
$('<form action="#"><select /></form>').appendTo("#mainav");
$("<option />", {selected: "selected", value: "", text: "MENU"}).appendTo("#mainav select");
$("#mainav a").each(function () {
    var e = $(this);
    if ($(e).parents("ul ul ul").length >= 1) {
        $("<option />", {value: e.attr("href"), text: "- - - " + e.text()}).appendTo("#mainav select")
    } else if ($(e).parents("ul ul").length >= 1) {
        $("<option />", {value: e.attr("href"), text: "- - " + e.text()}).appendTo("#mainav select")
    } else if ($(e).parents("ul").length >= 1) {
        $("<option />", {value: e.attr("href"), text: "" + e.text()}).appendTo("#mainav select")
    } else {
        $("<option />", {value: e.attr("href"), text: e.text()}).appendTo("#mainav select")
    }
});
$("#mainav select").change(function () {
    if ($(this).find("option:selected").val() !== "#") {
        window.location = $(this).find("option:selected").val()
    }
})














