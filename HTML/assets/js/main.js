"use strict";

/*Scroll blur effect*/
var scrollSlider = function() {
  if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
	$(window).scroll(function() {
		var st = $(this).scrollTop();
		if (st <= $('[data-scroll="blur"]').height()) {
			$('[data-scroll="blur"] .backstretch').css({
				'-webkit-filter': 'blur(' + (st/35) + 'px)',
				'-moz-filter': 'blur(' + (st/35) + 'px)',
				'-ms-filter': 'blur(' + (st/35) + 'px)',
				'-o-filter': 'blur(' + (st/35) + 'px)',
				'filter': 'blur(' + (st/35) + 'px)'
			});
			$('[data-scroll="blur"] .carousel-caption').css({
				'margin-top' : -(st/2.03)+"px",
				'opacity' : 1 - st/900
			});
			$('[data-scroll="blur"] .mute-video').css({
				'margin-top' : -(st/2.03)+"px",
				'opacity' : 1 - st/900
			});
		} else {
			$('[data-scroll="blur"] .backstretch').css({
				'-webkit-filter': 'none',
				'-moz-filter': 'none',
				'-ms-filter': 'none',
				'-o-filter': 'none',
				'filter': 'none'
			});
		}
	}).scroll();
  }
};
/*End*/

/* Set background image */
function banerBgFn() {
  $('[data-banner]').each(function(){
	var imgSrc = $(this).attr('data-imgsrc');
	$(this).css('background-image','url('+imgSrc+')');
  });
}

/* Header fixed */
function headerFixed() {
	$(window).scroll(function(){
	  if ($(window).scrollTop() > 60) {
		$('header').removeClass('navbar-transparent').addClass('fixed-top top-hide');

		if ($(window).scrollTop() > 100) {
			$('header').addClass('top-zero').removeClass('top-hide');
		}
	  } else {
		  $('header').addClass('navbar-transparent').removeClass('fixed-top top-zero');
	  }
	}).scroll();
}

/* Back to top page */
function backToTop() {
  $('[data-back="top"]').on('click', function(){
	$('html, body').animate({scrollTop: $('body').offset().top}, 800);
  });
}

function focusSection(ID) {
	$('html, body').animate({scrollTop: $('#' + ID).offset().top-70}, 800);
}

/* Main Navebar for mobile */
function navbarMobile() {
  $('#navbar .user > a').on('click', function(e){
	var that = $(this);
	setTimeout(function(){
		if(that.closest('.user').hasClass('open')){
			that.closest('.user').siblings('li').addClass('hidden-xs');
			that.closest('.navbar-nav').removeClass('search-pad');
		} else {
			that.closest('.user').siblings('li').removeClass('hidden-xs');
			that.closest('.navbar-nav').addClass('search-pad');
		}
		e.stopPropagation();
	},0);
  });
  $('.navbar-default .navbar-toggle').on('click', function(){
	  $('#navbar').find('.navbar-nav').addClass('search-pad');
	  setTimeout(function(){
		if(!$('#navbar').hasClass('in')){
			$('#navbar').find('.navbar-nav').removeClass('search-pad');
		}
	  },400);
  });
  $(document.body).on('click touchstart', function(){
	  $('#navbar').find('.navbar-nav').addClass('search-pad');
	  $('#navbar .user').siblings('li').removeClass('hidden-xs');
  });
}

/* Back to top page */
function minHeight() {
	setTimeout(function(){
		if ($(window).width() > 767) {
			$('[data-min-height]').css({minHeight:$('[data-height-source]').height()});
		} else {
			$('[data-min-height]').css({minHeight:""});
		}
	},0);
}

/*Dropdown get value*/
$('[data-getvalue="dropdown"] > li > a').click(function(){	
	var ico = $(this).find('.icon').html();
	$(this).closest('.dropup, .dropdown').find('.btn > .icon, .dropdown-toggle > .icon').html(ico);
	$(this).closest('.dropup, .dropdown').find('.btn > .text').text($(this).text());

	
});

/* Detail Image height */
function detailImgFull() {
	var exclude = $('.top-action').outerHeight() + $('.bottom-action').outerHeight();
	if ($(window).width() > 767) {
		$('.detail-img').height($(window).height()-exclude);
	} else {
		$('.detail-img').height("auto");
	}
}

/* Detail Image height */
function detailPostHeight() {
	var height = 0;
	$('[data-exclude="height"]').each(function() {
      height += $(this).outerHeight();
    });
	var exclude = height + 21;
	if ($(window).width() > 767) {
		$('[data-post="height"]').height($(window).height() - exclude);
	} else {
		$('[data-post="height"]').height("auto");
	}
}

/* Costum Scroll */
function scrollbox() {
	if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || navigator.userAgent.indexOf('Mac OS X') === -1) {
		$('.scrollbox').enscroll();
	}
}
function scrollboxHorizontal() {
	if(!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || navigator.userAgent.indexOf('Mac OS X') === -1) {
		$('.scrollbox-horizontal').enscroll({
			verticalScrolling:false,
			horizontalScrolling:true
		});
	}
}

$(function() {
	$('[data-toggle="pophover"]').popover();
	$('[data-toggle="tooltip"]').tooltip();
	navbarMobile();
	scrollSlider();
	banerBgFn();
	svg4everybody();
	loadSvg();
	backToTop();
	scrollbox();
	scrollboxHorizontal();
	$(window).resize(minHeight).resize();
	$(window).resize(detailImgFull).resize();
	$(window).resize(detailPostHeight).resize();

	$('[data-dropdown="onhold"] .dropdown-menu').on('click touchstart', function(e) {
		e.stopPropagation();
	});
	$('[data-dropdown="onhold"]').on('shown.bs.dropdown', function() {
		$('[data-toggle="dropdown"]').dropdown();
		$('[data-dropdown="onhold"] .dropdown-menu [data-toggle="dropdown"]').on('click', function(){
			$(this).closest('[data-dropdown="onhold"]').addClass('open');
		});
    });
	$('[data-onhold]').on('click touchstart', function(e) {
		e.stopPropagation();
	});
	$('[data-onhold]').closest(document.body).on('click touchstart', function() {
		if($('[data-onhold]').parent('.open').length > 0){
			$('[data-onhold]').parent('.open').removeClass('open');
		}
	});
	groupNamelist();
	messageBlock();
	attachedmediaWd();
	RadioCheckFocused();
	globalSearch();
    BackToTopSticky();
});

/*Navigation active*/
function mainNav(index){
	setTimeout(function(){
		 var allLinks=$('#navbar ul > li');
		 allLinks.removeClass('active');
		 $(allLinks[index-1]).addClass('active');
	},0);
}

/*Wall post comment*/
$('[data-type="wall-post"]').on('focusin', function(){
	$('.post-btn-group').fadeIn();
});


// Function for Message section
function messageColresize() {

    if ($(window).width() >= 700) {

        var winHt = $(window).height(),
            divideht = 200,
            totalHt = winHt - divideht;

        $('.message-left').height(totalHt);
        var mszLeftht = $('.message-left').height() - 112;
        $('.m-left-scroll').height(mszLeftht);
        var mszLeftht = $('.m-left-scroll').height() + 52,
            replyBlockht = $('.m-write-reply').innerHeight(),
            mszCoverHt = mszLeftht - replyBlockht;

        $('.m-conversation-block').height(mszCoverHt);
        var lefColheight = $('.message-left').height();
        var newsectionHt = lefColheight - replyBlockht;

        $('.m-attachment-view').height(mszCoverHt);
        var lefColheight = $('.message-left').height();
        var newsectionHt = lefColheight - replyBlockht;

        $('.message-right').height(newsectionHt);
        $('.message-right').css({
            'padding-bottom': replyBlockht
        });
    }
}


$(function() {
    messageColresize();
    $('#sendMszto').on('keyup', function() {
        $(this).next('.m-message-to-list').fadeIn();
    });

    $(document).on('mouseup', function() {
        $('.m-message-to-list').hide();
    });

});

$(window).resize(function() {
    messageColresize();
});

//Function for image center to according to parent element width
function imageCenter() {
    $('.attached-list > img').each(function() {
        var eachimgwd = $(this).width(),
            parentWd = $(this).parent().width(),
            totlawd = eachimgwd - parentWd,
            addedwd = totlawd / 2;
        $(this).css({
            'margin-left': -addedwd
        });
    });
}

//Custom Tooltip
function groupNamelist() {
    var TooltipTimer;
    $('[data-rel="group-usertip"]').on("mouseenter", function() {
        $('.customTooltip').css({
            left: $(this).offset().left,
            top: $(this).offset().top + 35
        });
        $('.customTooltip').fadeIn();
    });


    $('[data-rel="group-usertip"]').on("mouseleave", function() {
        TooltipTimer = setTimeout(function() {
            $('.customTooltip').hide();
        }, 200);
    });
    $('.customTooltip').on("mouseenter", function() {
        if (TooltipTimer){
            clearTimeout(TooltipTimer);
		}
    });
    $('.customTooltip').on("mouseleave", function() {
        $(this).fadeOut('slow');
    });
}

//Message samll view
function messageBlock() {
    if ($(window).width() <= 767) {
        $(document).on('click', '.m-user-listing > li', function() {
            $('.message-left').addClass('hidden-xs');
            $('.message-right').removeClass('hidden-xs');
            $('.m-conversation-content, .m-add-people-button').show();
            //$('.newcomposemail-wrap').hide();
        });

        $('#backTolist').on('click', function() {
            $('.message-left').removeClass('hidden-xs');
            $('.message-right').addClass('hidden-xs');
            // $('.message-info').hide();
            //$('.newcomposemail-wrap').show();
        });

        $(document).on('touchstart click', '#newMessage', function() {

            $('.m-new-message').show();
            $('.m-conversation-content, .m-add-people-button').hide();

            $('.message-left').addClass('hidden-xs');
            $('.message-right').removeClass('hidden-xs');
        });

    }
}

//Attached list
function attachedmediaWd() {
    var totalLiof = $('.m-media-attached-list > ul > li').size(),
        totalulWd = totalLiof * 108;
    $('.m-media-attached-list > ul').width(totalulWd);
}

function pollExpiryDateDropdown() {
    $(document).on('click', '.pollExpiryDate .btn-link', function() {
        $('.pollExpiryDate').removeClass('open');
        $(this).parent().toggleClass("open");
    }); 
    $('body, document ').on('touchstart click', function(e) {
        if (!$('.pollExpiryDate').is(e.target) && $('.pollExpiryDate').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
            $('.pollExpiryDate').removeClass('open');
        }
    });
}
function selectedDatetime(name) {
    $('input[name="' + name + '"]').on('change', function() {

        if (!$(this).hasClass('selected')) {
            $('input[name="' + name + '"]').parent().removeClass('selected');
            $(this).parent().toggleClass('selected');
        }

    });
}

function createPoll(){
    $('#CreatePoll').on('click',function(){
        $(this).closest('[data-poll="creation"]').addClass('active');
    });
}
 
pollExpiryDateDropdown();
selectedDatetime('MM');
selectedDatetime('HH');
selectedDatetime('time');
createPoll();

/* Input focused */
function RadioCheckFocused(){
    $('.btn-checkbox .radio input').focus(function(){
        $(this).closest('.radio').addClass('focused');
    });
	$('.btn-checkbox .radio input').blur(function(){
        $(this).closest('.radio').removeClass('focused');
    });
}

function globalSearch(){
	$('.search-form .form-control').on('keyup', function(){
		if($.trim($(this).val())===""){
			$(this).closest('.search-form').parents('.navbar').removeClass('open');
		} else {
			$(this).closest('.search-form').parents('.navbar').addClass('open');
		}
	});
}

/* Back to top Button */
function BackToTopSticky() {
    if($('body').find('.btn-gotop').length > 0){
        $(window).scroll(function(){
            var WindowTop = $(window).scrollTop();
            var BackToTop = parseInt($('.btn-gotop').offset().top) + 40;
            var WindowHeight = $('body').height() - $('footer').height();
            if (WindowTop > 100) {
                $('.btn-gotop').addClass('active');
            } else {
                $('.btn-gotop').removeClass('active');
            }
            if (WindowHeight < BackToTop) {
                $('.btn-gotop').css({bottom: $('footer').height()+10});
            } else {
                $('.btn-gotop').css({bottom: ''});
            }
        }).scroll();
    }
}