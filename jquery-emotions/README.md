# Emotions: a jQuery plugin

Emotions is a jQuery plugin that makes it easy to convert some emotion text to images. ( e.g. 8) => img )

## Usage

First, load css, jQuery and the plugin:

```html
<link rel="stylesheet" href="jquery.emotions.icq.css">
<script src="jquery.min.js" type="text/javascript"></script>
<script src="jquery.emotions.js" type="text/javascript"></script>
```

Now, let's attach it to your dom elements:

```html
<script type="text/javascript">
   jQuery(document).ready(function() {
     $(".txt").emotions();
   });
</script>
```

Create dom elements which text should be transformed:

```html
<div class="txt">Some text with smile 8)</div>
<div class="txt">o.O o.O o.O :D :D :D</div>
<div class="txt">o:) o.O 3:) :D <3 :* :) 8| :/ ;) :'( :( 8) >:( :p</div>
```

## Links
[Смайлы в чате как в Facebook или ICQ c помощью JQuery](http://www.itlessons.info/javascript/facebook-or-icq-jquery-emotions-plugin/)

## Author
[itlessons](http://www.itlessons.info) ([@itlessonsinfo](http://twitter.com/itlessonsinfo))

## Other
[MIT License](http://www.opensource.org/licenses/mit-license.php)