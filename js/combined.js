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

/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

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
