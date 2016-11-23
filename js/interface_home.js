// interface_home.js
// 2013 Lucas Leal, Miguel Freitas
//
// Specific interface functions for home.html

var promotedPostsOnly = false;

//***********************************************
//******************* DECLARATIONS **************
//***********************************************
var InterfaceFunctions = function()
{
    //faço os binds no init
    this.init = function()
    {
        $( ".wrapper .postboard-news").click(function() {
            requestTimelineUpdate("latest",postsPerRefresh,followingUsers,promotedPostsOnly);});
        $( ".promoted-posts-only").click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            promotedPostsOnly = !promotedPostsOnly;
            $(this).text( promotedPostsOnly ? "Promoted posts" : "Normal posts" );
            $(".postboard h2").animate({backgroundColor: promotedPostsOnly ? '#48577d' : '#768fce'}, 200);
            timelineChangedUser();
            $.MAL.getStreamPostsParent().empty();
            requestTimelineUpdate("latestFirstTime",postsPerRefresh,followingUsers,promotedPostsOnly);
            });
            
        initInterfaceCommon();
        initUserSearch();
        initInterfaceDirectMsg();

        initUser(initHome);
    }

    function initHome(cbFunc, cbArg) {
        if( !defaultScreenName ) {
            alert(polyglot.t("username_undefined"));
            $.MAL.goLogin();
            return;
        }
        checkNetworkStatusAndAskRedirect();

        //$("span.screen-name").text('@' + user);
        var $miniProfile = $(".mini-profile");
        $miniProfile.find("a.mini-profile-name").attr("href",$.MAL.userUrl(defaultScreenName));
        $miniProfile.find("a.open-profile-modal").attr("href",$.MAL.userUrl(defaultScreenName));
        $miniProfile.find(".mini-profile-name").text(defaultScreenName);
        getFullname( defaultScreenName, $miniProfile.find(".mini-profile-name") );
        getAvatar( defaultScreenName, $miniProfile.find(".mini-profile-photo").find("img") );
        getPostsCount( defaultScreenName,  $miniProfile.find(".posts-count") );

        updateFollowers();

        loadFollowing( function(args) {
                     $(".mini-profile .following-count").text(followingUsers.length-1);
                     requestLastHave();
                     setInterval("requestLastHave()", 1000);
                     initMentionsCount();
                     initDMsCount();
                     requestTimelineUpdate("latestFirstTime",postsPerRefresh,followingUsers,promotedPostsOnly);

                     // install scrollbottom handler to load more posts as needed
                     $(window).scroll(function(){
                        if  ($(window).scrollTop() >= $(document).height() - $(window).height() - 20){
                            if( timelineLoaded ) {
                                requestTimelineUpdate("older", postsPerRefresh, followingUsers, promotedPostsOnly);
                            }
                        }
                     });

                     setTimeout(updateFollowSuggestion, 1000);
                     updateTrendingHashtags();
                     
                     if( args.cbFunc )
                        args.cbFunc(args.cbArg);
                 }, {cbFunc:cbFunc, cbArg:cbArg});

        $('.refresh-users').on('click', function () {
            updateFollowSuggestion();
        });
        $('.follow-suggestions').on('click', 'a.twister-user-remove', function () {
            $(this).closest('li').remove();
        });
    }

    function updateFollowers()
    {
        getFollowers( defaultScreenName, $(".mini-profile .followers-count") );
        // update followers every 10 minutes
        setTimeout(updateFollowers, 10*60*1000);
    }

    function updateFollowSuggestion()
    {
        $('.follow-suggestions').empty();
        getRandomFollowSuggestion(processSuggestion);
        getRandomFollowSuggestion(processSuggestion);
        getRandomFollowSuggestion(processSuggestion);
    }

    function updateTrendingHashtags()
    {
        $(".toptrends-list").empty();
        twisterRpc("gettrendinghashtags", [100],
                function(args, ret) {
                    var opts = {};
                        opts.all = $.Options.getOption("trendsFilterAll", true);
                        opts.lat = $.Options.getOption('trendsFilterLat', false);
                        opts.cyr = $.Options.getOption('trendsFilterCyr', false);
                        opts.han = $.Options.getOption('trendsFilterHan', false);
                        opts.cust = $.Options.getOption('trendsFilterCustom', '');

                    if (opts.all || (!opts.all && !opts.lat && !opts.cyr && !opts.han && opts.cust === '')) {
                        ret = ret.slice(0, 10);
                    } else {
                        ret = filterTrends(ret, opts);
                    }

                    for( var i = 0; i < ret.length; i++ ) {
                        var $li = $("<li>");
                        var hashtagLinkTemplate = $("#hashtag-link-template").clone(true);
                        hashtagLinkTemplate.removeAttr("id");
                        hashtagLinkTemplate.attr("href",$.MAL.hashtagUrl(ret[i]));
                        hashtagLinkTemplate.text("#"+ret[i]);
                        $li.append(hashtagLinkTemplate);
                        $(".toptrends-list").append($li);
                    }
                }, {},
                function(args, ret) {
                    console.log("Error with gettrendinghashtags. Older twister daemon?");
                }, {});
        setTimeout(updateTrendingHashtags, 20*60*1000);
    }
}
function filterTrends(ret, opts) {
    var isEng = function (str) {return franc(str, {whitelist: ['eng','rus','cmn']}) === 'eng'};
    var isRus = function (str) {return franc(str, {whitelist: ['eng','rus','cmn']}) === 'rus'};
    var isCmn = function (str) {return franc(str, {whitelist: ['eng','rus','cmn']}) === 'cmn'};

    var filterArr = opts.cust !== '' ? $.Options.getOption('trendsFilterCustom', '').split(',') : [];
    var newRet = [];

    for (var i = 0; i < ret.length; i++) {
        if ( (((opts.lat && isEng(ret[i])) || (opts.cyr && isRus(ret[i])) || (opts.han && isCmn(ret[i])) ) && filterArr.indexOf(ret[i]) === -1) || ((!opts.lat && !opts.cyr && !opts.han) && filterArr.indexOf(ret[i]) === -1)) {
            newRet.push(ret[i]);
        };
        if (newRet.length === 10 || i === ret.length-1) return newRet;
    }
}

//***********************************************
//******************* INIT **************
//***********************************************
var interfaceFunctions = new InterfaceFunctions;
$( document ).ready( interfaceFunctions.init );


//função no window que fixa o header das postagens
function fixDiv()
{
  var $cache = $('.postboard h2');
  if ($(window).scrollTop() > 26) 
    $cache.addClass( "fixed" ); 
  else
    $cache.removeClass( "fixed" );
}

$(window).scroll(fixDiv);
