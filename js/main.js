// location replace

if (location.href == 'https://rachaelthemes.com/ask') location.replace('https://rachaelthemes.com/help');
if (location.href == 'https://rachaelthemes.com/submit') location.replace('https://rachaelthemes.com/help');

// dark mode cookies (using js.cookie)

var dm = Cookies.get("dark");

function darkOn() {
    Cookies.set('dark', 'on');
    $('body').addClass('dark');
    dm = "on";
};

function darkOff() {
    Cookies.set('dark', 'off');
    $('body').removeClass('dark');
    dm = "off";
};
jQuery(document).ready(function() {
    if (Cookies.get("dark")) {
        dm = Cookies.get("dark");
        if (dm == "on") {
            darkOn();
        }
    } else {
        Cookies.set('dark', 'off', {
            expires: 90
        });
    };
    $('#dark-mode').click(function() {
        if (dm == "off") {
            darkOn();
        } else if (dm == "on") {
            darkOff();
        }
    });
    
    // mobile nav open/close trigger
    
    $('#mobile-open').click(function() {
        $('#mobile-nav').fadeIn(300);
    });
    $('#mobile-close').click(function() {
        $('#mobile-nav').fadeOut(300);
    });
});
