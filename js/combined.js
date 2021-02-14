// location replace

if (location.href == 'https://rachaelthemes.com/ask') location.replace('https://rachaelthemes.com/help');
if (location.href == 'https://rachaelthemes.com/submit') location.replace('https://rachaelthemes.com/help');

// mobile nav open/close trigger

jQuery(document).ready(function() {
    $('#mobile-open').click(function() {
        $('#mobile-nav').fadeIn(300);
    });
    $('#mobile-close').click(function() {
        $('#mobile-nav').fadeOut(300);
    });
});

// page transitions

$('#screen').show();
window.onload = function() {
    $('#screen').fadeOut(300);
};

$(document).on("click", "a.internal", function() {
    var redirect = $(this).attr("href");
    if (!redirect || redirect[0] === "#") {
        location.hash = redirect;
        return;
    }
    $("#screen").fadeIn(300, function() {
        location = redirect;
       });
    return false;
}); 

// NPF IMAGES READJUSTMENT | @glenthemes
$(document).ready(function() {
    // wrap each row
    $(".npf_row").each(function() {
        $(this).wrap("<div class='npf_row_set'>");
    });
    // make each row (and its items) even
    $(".tmblr-full").each(function() {
        if ($(this).closest(".npf_col").length) {
            $(this).unwrap()
        }
        var imgheight = $(this).height();
        if (imgheight < $(this).parents(".npf_row").height()) {
            $(this).parents(".npf_row").height(imgheight)
        }
        if (!$(this).closest(".npf_row").length) {
            $(this).wrap("<div class='npf_row_parent'>");
        };
    });
    $(".npf_row_parent").each(function() {
        if ($(this).siblings(".npf_row_parent").length) {
            $(this).addClass("bROTHER");
        }
        if (!$(this).closest(".npf_row_set").length) {
            $(this).wrap("<div class='npf_row_set'>");
        }
        if (!$(this).siblings().length) {
            if ($(this).closest(".npf_row_set").length) {
                $(this).unwrap();
            }
        }
        if (!$(this).hasClass("bROTHER")) {
            $(this).wrap("<div class='npf_inst'>");
        }
    });
    var divs = $(".bROTHER");
    for (var i = 0; i < divs.length;) {
        i += divs.eq(i).nextUntil(':not(.bROTHER)').andSelf().wrapAll('<div class="npf_inst">').length;
    }
    $(".npf_row_set").each(function() {
        if (!$(this).closest(".npf_inst").length) {
            if (!$(this).parent("blockquote").length) {
                $(this).parent().children(".npf_row_set").wrapAll("<div class='npf_inst'>");
            }
        };
    });
    $(".tmblr-full").click(function() {
        var img = $(this).find("img"),
            imgsrc = img.attr("src");
        Tumblr.Lightbox.init([{
            low_res: imgsrc,
            high_res: imgsrc
        }]);
        $("body").toggleClass("tumblr_lightbox_active");
        return false;
    });
    $("blockquote").each(function() {
        $(this).children(".npf_row_set").wrapAll("<div class='npf_inst'>");
    });
    $("*").filter('[post-type="text"]').addClass('textpost');
    $(".textpost").each(function() {
        if ($(this).find("blockquote").next(".npf_row_set").length) {
            $(this).find("blockquote").siblings(".npf_row_set").wrapAll('<div class="npf_inst">')
        }
    });
    $(".npf_inst img").each(function() {
        var ogwidth = $(this).attr("data-orig-width"),
            imgurl = $(this).attr("src").split("_").pop(),
            imgnum = parseInt(imgurl);
        if (imgnum < ogwidth) {
            var newsrc = $(this).attr("src").replace("_" + imgnum + ".", "_" + 1280 + ".");
            $(this).attr("src", newsrc);
        }
    });
    $(".npf_inst").each(function() {
        var checkpara = $(this).next("p");
        if (checkpara.length) {
            if (checkpara.children("br").length == 1) {
                checkpara.remove();
            }
        }
    });
    $(".textpost p").each(function() {
        if ($(this).text().length == 0) {
            if ($(this).children().length == 0) {
                if ($(this).prev().length == 0) {
                    if ($(this).next(".npf_inst")) {
                        $(this).remove();
                    }
                }
            }
        }
    });
    $(".tmblr-full img").each(function() {
        $(this).attr("genheight", $(this).height());
    });
    $(".npf_row_set").each(function() {
        var que = $(this).find(".tmblr-full img").map(function() {
            return $(this).attr("genheight");
        }).get();
        var shortest = Math.min.apply(Math, que);
        $(this).find(".npf_row").height(shortest);
        $(this).find(".tmblr-full").height(shortest)
    });
});
