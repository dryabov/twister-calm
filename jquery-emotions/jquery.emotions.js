/**
 * Emotions is a jQuery plugin that makes it easy to convert some emotion text to images (e.g 8) )
 *
 * @name emotions
 * @version 0.0.1
 * @requires jQuery v1.2.3+
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * https://github.com/itlessons/jquery-emotions
 * http://www.itlessons.info/javascript/facebook-or-icq-jquery-emotions-plugin/
 *
 * Copyright (c) 2013, www.itlessons.info
 */
(function ($) {

    $.emotions = function (text) {
        return $.emotions.parse(text);
    };

    var $t = $.emotions;

    $.extend($.emotions, {

        settings: {
            replacement: '<span class="emotions emo-{eId}">$2</span>',
            map: {
                "o:)": "angel",
                "0:)": "angel",
                "O:)": "angel",
                "o:-)": "angel",
                "O:-)": "angel",
                "0:-)": "angel",
                ":beer:": "beer",
                "o.O": "confused",
                "o_O": "confused",
                ":'(": "cry",
                "3:)": "devil",
                ":friends:": "friends",
                ":(": "frown",
                "=(": "frown",
                ":-(": "frown",
                "8)": "glasses",
                ":D": "grin",
                ":-D": "grin",
                ">:(": "grumpy",
                "<3": "heart",
                ":*": "kiss",
                "^_^": "mimi",
                "^^": "mimi",
                "^ ^": "mimi",
                "^-^": "mimi",
                ":-)": "smile",
                ":]": "smile",
                ":)": "smile",
                "=)": "smile",
                "(:": "smile",
                "(-:": "smile",
                "[:": "smile",
                "(=": "smile",
                "8|": "sunglasses",
                ":p": "tongue",
                ":P": "tongue",
                ":/": "unsure",
                ":\\": "unsure",
                ";)": "wink",
                ";-)": "wink",
                "(;": "wink",
                "(-;": "wink"
            }
        },
        shortcode: function(eId){
            var $s = $t.settings;
            for (var pattern in $s.map) {
                if($s.map[pattern] == eId)
                    return pattern;
            }

            return "";
        },
        parse: function (text) {

            var $s = $t.settings;

            for (var pattern in $s.map) {

                var encPattent = $t.encode(pattern);

                if (text.indexOf(pattern) < 0 && text.indexOf(encPattent) < 0) {
                    continue;
                }

                var rep = $s.replacement
                    .replace(/\{eId\}/g, $s.map[pattern]);

                text = text.replace(
                    new RegExp("(^|\\s)(" + $t.quote(pattern) + "|" + $t.quote(encPattent) + ")(?=\\s|$)", "g"),
                    "$1" + rep
                );
            }

            return text;
        },
        encode: function (str) {
            return (str + '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        },
        quote: function (str) {
            return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        }
    });

    $.fn.emotions = function (action, options) {
        this.each(function () {
            var el = $(this);
            el.html($.emotions(el.html()));
        });
    };
})(jQuery);