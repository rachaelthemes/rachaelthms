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
    $('#mobile-open').click(function() {
        $('#mobile-nav').fadeIn(300);
    });
    $('#mobile-close').click(function() {
        $('#mobile-nav').fadeOut(300);
    });
});
