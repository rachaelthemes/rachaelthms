// location replace

if (location.href == 'https://rachaelthemes.com/ask') location.replace('https://rachaelthemes.com/help');
if (location.href == 'https://rachaelthemes.com/submit') location.replace('https://rachaelthemes.com/help');

// activate tippy.js
// mobile nav open/close trigger

jQuery(document).ready(function() {
    tippy('[data-tippy-content]');
    $('#mobile-open').click(function() {
        $('#mobile-nav').fadeIn(300);
    });
    $('#mobile-close').click(function() {
        $('#mobile-nav').fadeOut(300);
    });
    });
});

// page transitions

$('#screen').show();
window.onload = function() {
    $('#screen').fadeOut(500);
};

$(document).on("click", "a.internal", function() {
    var redirect = $(this).attr("href");
    if (!redirect || redirect[0] === "#") {
        location.hash = redirect;
        return;
    }
    $("#screen").fadeIn(500, function() {
        location = redirect;
       });
    return false;
});
