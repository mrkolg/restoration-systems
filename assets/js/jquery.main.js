var $ = jQuery.noConflict();

jQuery(function() {
	headerScrollUp();
	initMobileNav();
	initMobileNavOpener();
	initTouchNav();
	initSlickSlider();
	initTabs();
	initAOS();
	initAnchors();
	moveImg();
	initSmartMenu();
	initScrollUse();
	if(jQuery('.about').length){
		initCountUpDown();
	};
	if(jQuery('.hero-video').length){
		bgVideo();
	}
	initCustomForms();
	initFancybox();
});

jQuery(window).on('load', function(){
	var hash;
});

function bgVideo(){
	jQuery(".player").mb_YTPlayer();
};

function initCountUpDown(){
	var options = {
		useEasing : true,
		useGrouping : true,
		separator : ',',
		decimal : '.'
	};

	var target1 = new CountUp("target1", 0, 26800, 0, 2.5, options);
	target1.start();
	var target2 = new CountUp("target2", 0, 12500, 0, 2.5, options);
	target2.start();
	var target3 = new CountUp("target3", 0, 98000, 0, 2.5, options);
	target3.start();
	var target4 = new CountUp("target4", 0, 56000, 0, 2.5, options);
	target4.start();
}

(function() {
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
				// in case the input is already filled..
				if( inputEl.value.trim() !== '' ) {
					classie.add( inputEl.parentNode, 'input--filled' );
				}

				// events:
				inputEl.addEventListener( 'focus', onInputFocus );
				inputEl.addEventListener( 'blur', onInputBlur );
			} );

	function onInputFocus( ev ) {
		classie.add( ev.target.parentNode, 'input--filled' );
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove( ev.target.parentNode, 'input--filled' );
		}
	}
})();

//Animation on scroll down
function initAOS(){
	AOS.init({
		disable: function () {
			var maxWidth = 1024;
			return window.innerWidth < maxWidth;
		}
	});
}

//move image to the top
function moveImg(){
	jQuery('.anchor-block .img-holder img').on('click', function(){
		jQuery('.anchor-block .img-holder img').removeClass('img-top');
		jQuery(this).addClass('img-top');
	})
}

function initScrollUse(){
	jQuery(window).on('resize scroll orientationchange', function(){
		if(jQuery('#wrapper').hasClass('sticky-header') || jQuery('#wrapper').hasClass('sticky-hide')){
			jQuery('body').removeClass('nav-active');
			$.SmartMenus.hideAll();
		}
	});
};

// initialize smooth anchor links
function initAnchors() {
	// hash case:
	var hashOption = new SmoothScroll({
		anchorLinks: '.anchor-nav a',
		// extraOffset: jQuery('.anchor-nav').outerHeight() || 0,
		extraOffset: 0,
		activeClasses: 'link'
	});

	var hash;

	//scrollto when click to link
	jQuery(hashOption.options.anchorLinks).on('click', function() {
		var url = jQuery(this).attr('href');
		hash = url.substring(url.indexOf('#'));
		jQuery('body').removeClass('nav-active');
	});

	//scrollto when click to other link with hash
	hash = window.location.hash.replace('#', '');

	if (hash != '') {
		hash = '#' + hash;
		// scrollToWithHash(hash);
		return scrollToWithHash(hash);
	}

	function scrollToWithHash(hash){
		if (jQuery(hash).length) {
			jQuery('html, body').animate({
				scrollTop: jQuery(hash).offset().top - hashOption.options.extraOffset
			}, 600 );
			return false;
		}
	}
}

// mobile menu init
function initMobileNav() {
	ResponsiveHelper.addRange({
		'..1023': {
			on: function() {
				jQuery('body').mobileNav({
					menuActiveClass: 'nav-active',
					menuOpener: '.nav-opener',
					hideOnClickOutside: false,
					menuDrop: 'ul'
				});
			},
			off: function() {
				jQuery('body').mobileNav('destroy');
			}
		}
	});
}

function headerScrollUp() {
	jQuery('#wrapper').scroolly([
	{
		to: 'vp-top = el-top + 105px',
		direction: 1,
		addClass: 'sticky-hide',
		removeClass: 'sticky-show',
	},
	{
		direction: -1,
		from: 'el-top + 105px',
		addClass: 'sticky-header sticky-show',
		removeClass: 'sticky-hide',
	},
	{
		direction: -1,
		from: 'vp-top = el-top + 105px',
		removeClass: 'sticky-show',
	},
	{
		to: 'el-top = vp-top',
		direction: -1,
		removeClass: 'sticky-header sticky-hide sticky-show',
	}]
	);
}

// mobile navopener init
function initMobileNavOpener() {
	jQuery("#nav").find(".drop").parent('li').append('<span class="drop-opener"></span>');
	var opener = jQuery("#nav").find(".drop-opener").parent();
	jQuery("#nav").on("click", ".drop-opener", function() {
		var $this = jQuery(this);
		if ($this.parent().hasClass("actives")) {
			$this.parent().removeClass("actives").children('.drop').stop().slideUp(200);
		}else {
			$this.parent().siblings().removeClass("actives").children('.drop').stop().slideUp(200);
			$this.parent().addClass("actives").children('.drop').stop().slideDown(200);
		}
		if($this.siblings('.drop').find('li').hasClass("actives")){
			opener.removeClass("actives").children('.drop').stop().slideUp(200);
		}
		return false;
	});
	jQuery(document).click(function() {
		if (opener.hasClass("actives")) {
			opener.removeClass("actives").children('.drop').stop().slideUp(200);
		}
	});
}

// handle dropdowns on mobile devices
function initTouchNav() {
	ResponsiveHelper.addRange({
		'1024..': {
			on: function() {
				jQuery('#nav').each(function() {
					new TouchNav({
						navBlock: this
					});
				});
			},
			off: function() {
				jQuery('#nav').each(function() {
					new TouchNav({
						navBlock: null
					});
				});
			}
		}
	});
}

function initSlickSlider() {
	jQuery('.slider').slick({
		slide: '.slide',
		infinite: true,
		draggable: true,
		autoplay:true,
		swipe: true,
		speed: 400,
		verticalSwiping:true,
		vertical:true,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.slider-bg',
		focusOnSelect: true,
		dots: true,
		arrows: false
	});
	jQuery('.slider-bg').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight:false,
		asNavFor: '.slider'
	});
	jQuery('.slider-testimonials').slick({
		slide: '.slide',
		infinite: true,
		draggable: true,
		autoplay:true,
		swipe: true,
		speed: 400,
		dots: true,
		arrows: false
	});
	jQuery('.slider-full').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay:true,
		centerMode: true,
		variableWidth: true,
		infinite: true,
		focusOnSelect: true,
		touchMove: true,
		responsive: [
		{
			breakpoint: 767,
			settings: {
				centerMode: false,
				variableWidth: false,
				slidesToShow: 1,
			}
		},
		]
	});

	var imgs = jQuery('.slider-full img');
	imgs.each(function(){
		var item = jQuery(this).closest('.slide');
		item.css({
			'background-image': 'url(' + jQuery(this).attr('src') + ')',
			'background-position': 'center',
			'-webkit-background-size': 'cover',
			'background-size': 'cover',
		});
		jQuery(this).hide();
	});
}

// content tabs init
function initTabs() {
	jQuery('.tabset-hover').tabset({
		tabLinks: 'a',
		event: 'mouseenter',
		attrib: 'data-tab',
		defaultTab: true
	});
	jQuery(".tabset-hover a").on('click', function(event){
		event.preventDefault();
	})
	jQuery('.tabset').tabset({
		tabLinks: 'a',
		event: 'click',
		defaultTab: true
	});
	jQuery('.team-list').tabset({
		tabLinks: 'ul li > a',
		attrib: 'data-tab',
		defaultTab: true
	});
	jQuery(".team-list li > a").on('click', function(event){
		event.preventDefault();
	})
	jQuery(".team-list > li > ul a").on('click', function(event){
		event.preventDefault();
		var item = jQuery("#tab-content-id");
		setTimeout(() => {
			jQuery('html, body').animate({
				scrollTop: item.offset().top
			}, 500);
		}, 250);
	})
}

function initSmartMenu(){
	jQuery('.team-list').smartmenus({
		collapsibleBehavior: 'accordion-toggle',
		subMenusMinWidth: '18em',
		mainMenuSubOffsetY: 35,
		mainMenuSubOffsetX: 0,
    // rightToLeftSubMenus: true
    // showOnClick: true
});
}

// lightbox init
function initFancybox() {
	jQuery('.lightbox-opener, [data-fancybox]').fancybox({
		parentEl: 'body',
		margin: [50, 0]
	});
}

// initialize custom form elements
function initCustomForms() {
	jcf.replaceAll();
}


/*!
* classie - class helper functions
* from bonzo https://github.com/ded/bonzo
*
* classie.has( elem, 'my-class' ) -> true/false
* classie.add( elem, 'my-new-class' )
* classie.remove( elem, 'my-unwanted-class' )
* classie.toggle( elem, 'my-class' )
*/

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

	'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg( className ) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
		};
		removeClass = function( elem, c ) {
			elem.classList.remove( c );
		};
	}
	else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function( elem, c ) {
			elem.className = elem.className.replace( classReg( c ), ' ' );
		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	var classie = {
	// full names
	hasClass: hasClass,
	addClass: addClass,
	removeClass: removeClass,
	toggleClass: toggleClass,
	// short names
	has: hasClass,
	add: addClass,
	remove: removeClass,
	toggle: toggleClass
};

	// transport
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( classie );
	} else {
		// browser global
		window.classie = classie;
	}

})( window );


/*
* Simple Mobile Navigation
*/
;(function($) {
	function MobileNav(options) {
		this.options = $.extend({
			container: null,
			hideOnClickOutside: false,
			menuActiveClass: 'nav-active',
			menuOpener: '.nav-opener',
			menuDrop: '.nav-drop',
			toggleEvent: 'click',
			outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
		}, options);
		this.initStructure();
		this.attachEvents();
	}
	MobileNav.prototype = {
		initStructure: function() {
			this.page = $('html');
			this.container = $(this.options.container);
			this.opener = this.container.find(this.options.menuOpener);
			this.drop = this.container.find(this.options.menuDrop);
		},
		attachEvents: function() {
			var self = this;

			if(activateResizeHandler) {
				activateResizeHandler();
				activateResizeHandler = null;
			}

			this.outsideClickHandler = function(e) {
				if(self.isOpened()) {
					var target = $(e.target);
					if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
						self.hide();
					}
				}
			};

			this.openerClickHandler = function(e) {
				e.preventDefault();
				self.toggle();
			};

			this.opener.on(this.options.toggleEvent, this.openerClickHandler);
		},
		isOpened: function() {
			return this.container.hasClass(this.options.menuActiveClass);
		},
		show: function() {
			this.container.addClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		hide: function() {
			this.container.removeClass(this.options.menuActiveClass);
			if(this.options.hideOnClickOutside) {
				this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
			}
		},
		toggle: function() {
			if(this.isOpened()) {
				this.hide();
			} else {
				this.show();
			}
		},
		destroy: function() {
			this.container.removeClass(this.options.menuActiveClass);
			this.opener.off(this.options.toggleEvent, this.clickHandler);
			this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
		}
	};

	var activateResizeHandler = function() {
		var win = $(window),
		doc = $('html'),
		resizeClass = 'resize-active',
		flag, timer;
		var removeClassHandler = function() {
			flag = false;
			doc.removeClass(resizeClass);
		};
		var resizeHandler = function() {
			if(!flag) {
				flag = true;
				doc.addClass(resizeClass);
			}
			clearTimeout(timer);
			timer = setTimeout(removeClassHandler, 500);
		};
		win.on('resize orientationchange', resizeHandler);
	};

	$.fn.mobileNav = function(opt) {
		var args = Array.prototype.slice.call(arguments);
		var method = args[0];

		return this.each(function() {
			var $container = jQuery(this);
			var instance = $container.data('MobileNav');

			if (typeof opt === 'object' || typeof opt === 'undefined') {
				$container.data('MobileNav', new MobileNav($.extend({
					container: this
				}, opt)));
			} else if (typeof method === 'string' && instance) {
				if (typeof instance[method] === 'function') {
					args.shift();
					instance[method].apply(instance, args);
				}
			}
		});
	};
}(jQuery));

/*
* Responsive Layout helper
*/
window.ResponsiveHelper = (function($){
	// init variables
	var handlers = [],
	prevWinWidth,
	win = $(window),
	nativeMatchMedia = false;

	// detect match media support
	if(window.matchMedia) {
		if(window.Window && window.matchMedia === Window.prototype.matchMedia) {
			nativeMatchMedia = true;
		} else if(window.matchMedia.toString().indexOf('native') > -1) {
			nativeMatchMedia = true;
		}
	}

	// prepare resize handler
	function resizeHandler() {
		var winWidth = win.width();
		if(winWidth !== prevWinWidth) {
			prevWinWidth = winWidth;

			// loop through range groups
			$.each(handlers, function(index, rangeObject){
				// disable current active area if needed
				$.each(rangeObject.data, function(property, item) {
					if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
						item.currentActive = false;
						if(typeof item.disableCallback === 'function') {
							item.disableCallback();
						}
					}
				});

				// enable areas that match current width
				$.each(rangeObject.data, function(property, item) {
					if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
						// make callback
						item.currentActive = true;
						if(typeof item.enableCallback === 'function') {
							item.enableCallback();
						}
					}
				});
			});
		}
	}
	win.bind('load resize orientationchange', resizeHandler);

	// test range
	function matchRange(r1, r2) {
		var mediaQueryString = '';
		if(r1 > 0) {
			mediaQueryString += '(min-width: ' + r1 + 'px)';
		}
		if(r2 < Infinity) {
			mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
		}
		return matchQuery(mediaQueryString, r1, r2);
	}

	// media query function
	function matchQuery(query, r1, r2) {
		if(window.matchMedia && nativeMatchMedia) {
			return matchMedia(query).matches;
		} else if(window.styleMedia) {
			return styleMedia.matchMedium(query);
		} else if(window.media) {
			return media.matchMedium(query);
		} else {
			return prevWinWidth >= r1 && prevWinWidth <= r2;
		}
	}

	// range parser
	function parseRange(rangeStr) {
		var rangeData = rangeStr.split('..');
		var x1 = parseInt(rangeData[0], 10) || -Infinity;
		var x2 = parseInt(rangeData[1], 10) || Infinity;
		return [x1, x2].sort(function(a, b){
			return a - b;
		});
	}

	// export public functions
	return {
		addRange: function(ranges) {
			// parse data and add items to collection
			var result = {data:{}};
			$.each(ranges, function(property, data){
				result.data[property] = {
					range: parseRange(property),
					enableCallback: data.on,
					disableCallback: data.off
				};
			});
			handlers.push(result);

			// call resizeHandler to recalculate all events
			prevWinWidth = null;
			resizeHandler();
		}
	};
}(jQuery));


/*!
* SmoothScroll module
*/
;(function($, exports) {
	// private variables
	var page,
	win = $(window),
	activeBlock, activeWheelHandler,
	wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll');

	// animation handlers
	function scrollTo(offset, options, callback) {
		// initialize variables
		var scrollBlock;
		if (document.body) {
			if (typeof options === 'number') {
				options = {
					duration: options
				};
			} else {
				options = options || {};
			}
			page = page || $('html, body');
			scrollBlock = options.container || page;
		} else {
			return;
		}

		// treat single number as scrollTop
		if (typeof offset === 'number') {
			offset = {
				top: offset
			};
		}

		// handle mousewheel/trackpad while animation is active
		if (activeBlock && activeWheelHandler) {
			activeBlock.off(wheelEvents, activeWheelHandler);
		}
		if (options.wheelBehavior && options.wheelBehavior !== 'none') {
			activeWheelHandler = function(e) {
				if (options.wheelBehavior === 'stop') {
					scrollBlock.off(wheelEvents, activeWheelHandler);
					scrollBlock.stop();
				} else if (options.wheelBehavior === 'ignore') {
					e.preventDefault();
				}
			};
			activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
		}

		// start scrolling animation
		scrollBlock.stop().animate({
			scrollLeft: offset.left,
			scrollTop: offset.top
		}, options.duration, function() {
			if (activeWheelHandler) {
				scrollBlock.off(wheelEvents, activeWheelHandler);
			}
			if ($.isFunction(callback)) {
				callback();
			}
		});
	}

	// smooth scroll contstructor
	function SmoothScroll(options) {
		this.options = $.extend({
			anchorLinks: 'a[href^="#"]', // selector or jQuery object
			container: null, // specify container for scrolling (default - whole page)
			extraOffset: null, // function or fixed number
			activeClasses: null, // null, "link", "parent"
			easing: 'swing', // easing of scrolling
			animMode: 'duration', // or "speed" mode
			animDuration: 800, // total duration for scroll (any distance)
			animSpeed: 1500, // pixels per second
			anchorActiveClass: 'anchor-active',
			sectionActiveClass: 'section-active',
			wheelBehavior: 'stop', // "stop", "ignore" or "none"
			useNativeAnchorScrolling: false // do not handle click in devices with native smooth scrolling
		}, options);
		this.init();
	}
	SmoothScroll.prototype = {
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.isInit = true;
		},
		initStructure: function() {
			var self = this;

			this.container = this.options.container ? $(this.options.container) : $('html,body');
			this.scrollContainer = this.options.container ? this.container : win;
			this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
				return jQuery(self.getAnchorTarget(jQuery(this))).length;
			});
		},
		getId: function(str) {
			try {
				return '#' + str.replace(/^.*?(#|$)/, '');
			} catch (err) {
				return null;
			}
		},
		getAnchorTarget: function(link) {
			// get target block from link href
			var targetId = this.getId($(link).attr('href'));
			return $(targetId.length > 1 ? targetId : 'html');
		},
		getTargetOffset: function(block) {
			// get target offset
			var blockOffset = block.offset().top;
			if (this.options.container) {
				blockOffset -= this.container.offset().top - this.container.prop('scrollTop');
			}

			// handle extra offset
			if (typeof this.options.extraOffset === 'number') {
				blockOffset -= this.options.extraOffset;
			} else if (typeof this.options.extraOffset === 'function') {
				blockOffset -= this.options.extraOffset(block);
			}
			return {
				top: blockOffset
			};
		},
		attachEvents: function() {
			var self = this;

			// handle active classes
			if (this.options.activeClasses && this.anchorLinks.length) {
				// cache structure
				this.anchorData = [];

				for (var i = 0; i < this.anchorLinks.length; i++) {
					var link = jQuery(this.anchorLinks[i]),
					targetBlock = self.getAnchorTarget(link),
					anchorDataItem = null;

					$.each(self.anchorData, function(index, item) {
						if (item.block[0] === targetBlock[0]) {
							anchorDataItem = item;
						}
					});

					if (anchorDataItem) {
						anchorDataItem.link = anchorDataItem.link.add(link);
					} else {
						self.anchorData.push({
							link: link,
							block: targetBlock
						});
					}
				};

				// add additional event handlers
				this.resizeHandler = function() {
					if (!self.isInit) return;
						self.recalculateOffsets();
					};
					this.scrollHandler = function() {
						self.refreshActiveClass();
					};

					this.recalculateOffsets();
					this.scrollContainer.on('scroll', this.scrollHandler);
					win.on('resize load orientationchange refreshAnchor', this.resizeHandler);
				}

				// handle click event
				this.clickHandler = function(e) {
					self.onClick(e);
				};
				if (!this.options.useNativeAnchorScrolling) {
					this.anchorLinks.on('click', this.clickHandler);
				}
			},
			recalculateOffsets: function() {
				var self = this;
				$.each(this.anchorData, function(index, data) {
					data.offset = self.getTargetOffset(data.block);
					data.height = data.block.outerHeight();
				});
				this.refreshActiveClass();
			},
			toggleActiveClass: function(anchor, block, state) {
				anchor.toggleClass(this.options.anchorActiveClass, state);
				block.toggleClass(this.options.sectionActiveClass, state);
			},
			refreshActiveClass: function() {
				var self = this,
				foundFlag = false,
				containerHeight = this.container.prop('scrollHeight'),
				viewPortHeight = this.scrollContainer.height(),
				scrollTop = this.options.container ? this.container.prop('scrollTop') : win.scrollTop();

				// user function instead of default handler
				if (this.options.customScrollHandler) {
					this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
					return;
				}

				// sort anchor data by offsets
				this.anchorData.sort(function(a, b) {
					return a.offset.top - b.offset.top;
				});

				// default active class handler
				$.each(this.anchorData, function(index) {
					var reverseIndex = self.anchorData.length - index - 1,
					data = self.anchorData[reverseIndex],
					anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

					if (scrollTop >= containerHeight - viewPortHeight) {
						// handle last section
						if (reverseIndex === self.anchorData.length - 1) {
							self.toggleActiveClass(anchorElement, data.block, true);
						} else {
							self.toggleActiveClass(anchorElement, data.block, false);
						}
					} else {
						// handle other sections
						if (!foundFlag && (scrollTop >= data.offset.top - 1 || reverseIndex === 0)) {
							foundFlag = true;
							self.toggleActiveClass(anchorElement, data.block, true);
						} else {
							self.toggleActiveClass(anchorElement, data.block, false);
						}
					}
				});
			},
			calculateScrollDuration: function(offset) {
				var distance;
				if (this.options.animMode === 'speed') {
					distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
					return (distance / this.options.animSpeed) * 1000;
				} else {
					return this.options.animDuration;
				}
			},
			onClick: function(e) {
				var targetBlock = this.getAnchorTarget(e.currentTarget),
				targetOffset = this.getTargetOffset(targetBlock);

				e.preventDefault();
				scrollTo(targetOffset, {
					container: this.container,
					wheelBehavior: this.options.wheelBehavior,
					duration: this.calculateScrollDuration(targetOffset)
				});
				this.makeCallback('onBeforeScroll', e.currentTarget);
			},
			makeCallback: function(name) {
				if (typeof this.options[name] === 'function') {
					var args = Array.prototype.slice.call(arguments);
					args.shift();
					this.options[name].apply(this, args);
				}
			},
			destroy: function() {
				var self = this;

				this.isInit = false;
				if (this.options.activeClasses) {
					win.off('resize load orientationchange refreshAnchor', this.resizeHandler);
					this.scrollContainer.off('scroll', this.scrollHandler);
					$.each(this.anchorData, function(index) {
						var reverseIndex = self.anchorData.length - index - 1,
						data = self.anchorData[reverseIndex],
						anchorElement = (self.options.activeClasses === 'parent' ? data.link.parent() : data.link);

						self.toggleActiveClass(anchorElement, data.block, false);
					});
				}
				this.anchorLinks.off('click', this.clickHandler);
			}
		};

		// public API
		$.extend(SmoothScroll, {
			scrollTo: function(blockOrOffset, durationOrOptions, callback) {
				scrollTo(blockOrOffset, durationOrOptions, callback);
			}
		});

		// export module
		exports.SmoothScroll = SmoothScroll;
	}(jQuery, this));


// navigation accesibility module
function TouchNav(opt) {
	this.options = {
		hoverClass: 'hover',
		menuItems: 'li',
		menuOpener: 'a',
		menuDrop: 'ul',
		navBlock: null
	};
	for (var p in opt) {
		if (opt.hasOwnProperty(p)) {
			this.options[p] = opt[p];
		}
	}
	this.init();
}
TouchNav.isActiveOn = function(elem) {
	return elem && elem.touchNavActive;
};
TouchNav.prototype = {
	init: function() {
		if (typeof this.options.navBlock === 'string') {
			this.menu = document.getElementById(this.options.navBlock);
		} else if (typeof this.options.navBlock === 'object') {
			this.menu = this.options.navBlock;
		}
		if (this.menu) {
			this.addEvents();
		}
	},
	addEvents: function() {
		// attach event handlers
		var self = this;
		var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
		this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

		var initMenuItem = function(item) {
			var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
			currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

			// only for touch input devices
			if (currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice)) {
				lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
				lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
				lib.event.add(currentOpener, touchEvent, function(e) {
					if (!self.isTouchPointerEvent(e)) {
						self.preventCurrentClick = false;
						return;
					}
					self.touchFlag = true;
					self.currentItem = item;
					self.currentLink = currentOpener;
					self.pressHandler.apply(self, arguments);
				});
			}
			// for desktop computers and touch devices
			jQuery(item)
			.bind('mouseenter', function() {
				if (!self.touchFlag) {
					self.currentItem = item;
					self.mouseoverHandler();
				}
			});
			jQuery(item)
			.bind('mouseleave', function() {
				if (!self.touchFlag) {
					self.currentItem = item;
					self.mouseoutHandler();
				}
			});
			item.touchNavActive = true;
		};

		// addd handlers for all menu items
		for (var i = 0; i < this.menuItems.length; i++) {
			initMenuItem(self.menuItems[i]);
		}

		// hide dropdowns when clicking outside navigation
		if (this.isTouchDevice || this.isPointerDevice) {
			lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
			lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
		}
	},
	mousedownHandler: function(e) {
		if (this.touchFlag) {
			e.preventDefault();
			this.touchFlag = false;
			this.preventCurrentClick = false;
		}
	},
	mouseoverHandler: function() {
		lib.addClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem)
		.trigger('itemhover');
	},
	mouseoutHandler: function() {
		lib.removeClass(this.currentItem, this.options.hoverClass);
		jQuery(this.currentItem)
		.trigger('itemleave');
	},
	hideActiveDropdown: function() {
		for (var i = 0; i < this.menuItems.length; i++) {
			if (lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
				lib.removeClass(this.menuItems[i], this.options.hoverClass);
				jQuery(this.menuItems[i])
				.trigger('itemleave');
			}
		}
		this.activeParent = null;
	},
	pressHandler: function(e) {
		// hide previous drop (if active)
		if (this.currentItem !== this.activeParent) {
			if (this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
				lib.removeClass(this.activeParent, this.options.hoverClass);
			} else if (!this.isParent(this.activeParent, this.currentLink)) {
				this.hideActiveDropdown();
			}
		}
		// handle current drop
		this.activeParent = this.currentItem;
		if (lib.hasClass(this.currentItem, this.options.hoverClass)) {
			this.preventCurrentClick = false;
		} else {
			e.preventDefault();
			this.preventCurrentClick = true;
			lib.addClass(this.currentItem, this.options.hoverClass);
			jQuery(this.currentItem)
			.trigger('itemhover');
		}
	},
	clickHandler: function(e) {
		// prevent first click on link
		if (this.preventCurrentClick) {
			e.preventDefault();
		}
	},
	clickOutsideHandler: function(event) {
		var e = event.changedTouches ? event.changedTouches[0] : event;
		if (this.activeParent && !this.isParent(this.menu, e.target)) {
			this.hideActiveDropdown();
			this.touchFlag = false;
		}
	},
	isParent: function(parent, child) {
		while (child.parentNode) {
			if (child.parentNode == parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	isTouchPointerEvent: function(e) {
		return (e.type.indexOf('touch') > -1) ||
		(navigator.pointerEnabled && e.pointerType === 'touch') ||
		(navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
	},
	isPointerDevice: (function() {
		return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
	}()),
	isTouchDevice: (function() {
		return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	}())
};

/*
* Utility module
*/
lib = {
	hasClass: function(el,cls) {
		return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
	},
	addClass: function(el,cls) {
		if (el && !this.hasClass(el,cls)) el.className += " "+cls;
		},
		removeClass: function(el,cls) {
			if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
			},
			extend: function(obj) {
				for(var i = 1; i < arguments.length; i++) {
					for(var p in arguments[i]) {
						if(arguments[i].hasOwnProperty(p)) {
							obj[p] = arguments[i][p];
						}
					}
				}
				return obj;
			},
			each: function(obj, callback) {
				var property, len;
				if(typeof obj.length === 'number') {
					for(property = 0, len = obj.length; property < len; property++) {
						if(callback.call(obj[property], property, obj[property]) === false) {
							break;
						}
					}
				} else {
					for(property in obj) {
						if(obj.hasOwnProperty(property)) {
							if(callback.call(obj[property], property, obj[property]) === false) {
								break;
							}
						}
					}
				}
			},
			event: (function() {
				var fixEvent = function(e) {
					e = e || window.event;
					if(e.isFixed) return e; else e.isFixed = true;
						if(!e.target) e.target = e.srcElement;
							e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
							e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
							return e;
						};
						return {
							add: function(elem, event, handler) {
								if(!elem.events) {
									elem.events = {};
									elem.handle = function(e) {
										var ret, handlers = elem.events[e.type];
										e = fixEvent(e);
										for(var i = 0, len = handlers.length; i < len; i++) {
											if(handlers[i]) {
												ret = handlers[i].call(elem, e);
												if(ret === false) {
													e.preventDefault();
													e.stopPropagation();
												}
											}
										}
									};
								}
								if(!elem.events[event]) {
									elem.events[event] = [];
									if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
										else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
										}
										elem.events[event].push(handler);
									},
									remove: function(elem, event, handler) {
										var handlers = elem.events[event];
										for(var i = handlers.length - 1; i >= 0; i--) {
											if(handlers[i] === handler) {
												handlers.splice(i,1);
											}
										}
										if(!handlers.length) {
											delete elem.events[event];
											if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
												else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
												}
											}
										};
									}()),
			queryElementsBySelector: function(selector, scope) {
				scope = scope || document;
				if(!selector) return [];
					if(selector === '>*') return scope.children;
						if(typeof document.querySelectorAll === 'function') {
							return scope.querySelectorAll(selector);
						}
						var selectors = selector.split(',');
						var resultList = [];
						for(var s = 0; s < selectors.length; s++) {
							var currentContext = [scope || document];
							var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
							for (var i = 0; i < tokens.length; i++) {
								token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
								if (token.indexOf('#') > -1) {
									var bits = token.split('#'), tagName = bits[0], id = bits[1];
									var element = document.getElementById(id);
									if (element && tagName && element.nodeName.toLowerCase() != tagName) {
										return [];
									}
									currentContext = element ? [element] : [];
									continue;
								}
								if (token.indexOf('.') > -1) {
									var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
									for (var h = 0; h < currentContext.length; h++) {
										var elements;
										if (tagName == '*') {
											elements = currentContext[h].getElementsByTagName('*');
										} else {
											elements = currentContext[h].getElementsByTagName(tagName);
										}
										for (var j = 0; j < elements.length; j++) {
											found[foundCount++] = elements[j];
										}
									}
									currentContext = [];
									var currentContextIndex = 0;
									for (var k = 0; k < found.length; k++) {
										if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
											currentContext[currentContextIndex++] = found[k];
										}
									}
									continue;
								}
								if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
									var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
									if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
										attrName = 'htmlFor';
									}
									var found = [], foundCount = 0;
									for (var h = 0; h < currentContext.length; h++) {
										var elements;
										if (tagName == '*') {
											elements = currentContext[h].getElementsByTagName('*');
										} else {
											elements = currentContext[h].getElementsByTagName(tagName);
										}
										for (var j = 0; elements[j]; j++) {
											found[foundCount++] = elements[j];
										}
									}
									currentContext = [];
									var currentContextIndex = 0, checkFunction;
									switch (attrOperator) {
										case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
										case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
										case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
										case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
										case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
										case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
										default : checkFunction = function(e) { return e.getAttribute(attrName) };
									}
									currentContext = [];
									var currentContextIndex = 0;
									for (var k = 0; k < found.length; k++) {
										if (checkFunction(found[k])) {
											currentContext[currentContextIndex++] = found[k];
										}
									}
									continue;
								}
								tagName = token;
								var found = [], foundCount = 0;
								for (var h = 0; h < currentContext.length; h++) {
									var elements = currentContext[h].getElementsByTagName(tagName);
									for (var j = 0; j < elements.length; j++) {
										found[foundCount++] = elements[j];
									}
								}
								currentContext = found;
							}
							resultList = [].concat(resultList,currentContext);
						}
						return resultList;
					},
					trim: function (str) {
						return str.replace(/^\s+/, '').replace(/\s+$/, '');
					},
					bind: function(f, scope, forceArgs){
						return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
					}
				};



/*
 * jQuery Tabs plugin
 */

 ;(function($, $win) {
 	'use strict';

 	function Tabset($holder, options) {
 		this.$holder = $holder;
 		this.options = options;

 		this.init();
 	}

 	Tabset.prototype = {
 		init: function() {
 			this.$tabLinks = this.$holder.find(this.options.tabLinks);

 			this.setStartActiveIndex();
 			this.setActiveTab();

 			if (this.options.autoHeight) {
 				this.$tabHolder = $(this.$tabLinks.eq(0).attr(this.options.attrib)).parent();
 			}

 			this.makeCallback('onInit', this);
 		},

 		setStartActiveIndex: function() {
 			var $classTargets = this.getClassTarget(this.$tabLinks);
 			var $activeLink = $classTargets.filter('.' + this.options.activeClass);
 			var $hashLink = this.$tabLinks.filter('[' + this.options.attrib + '="' + location.hash + '"]');
 			var activeIndex;

 			if (this.options.checkHash && $hashLink.length) {
 				$activeLink = $hashLink;
 			}

 			activeIndex = $classTargets.index($activeLink);

 			this.activeTabIndex = this.prevTabIndex = (activeIndex === -1 ? (this.options.defaultTab ? 0 : null) : activeIndex);
 		},

 		setActiveTab: function() {
 			var self = this;

 			this.$tabLinks.each(function(i, link) {
 				var $link = $(link);
 				var $classTarget = self.getClassTarget($link);
 				var $tab = $($link.attr(self.options.attrib));

 				if (i !== self.activeTabIndex) {
 					$classTarget.removeClass(self.options.activeClass);
 					$tab.addClass(self.options.tabHiddenClass).removeClass(self.options.activeClass);
 				} else {
 					$classTarget.addClass(self.options.activeClass);
 					$tab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);
 				}

 				self.attachTabLink($link, i);
 			});
 		},

 		attachTabLink: function($link, i) {
 			var self = this;

 			$link.on(this.options.event + '.tabset', function(e) {
 				e.preventDefault();

 				if (self.activeTabIndex === self.prevTabIndex && self.activeTabIndex !== i) {
 					self.activeTabIndex = i;
 					self.switchTabs();
 				}
 				if (self.options.checkHash) {
 					location.hash = jQuery(this).attr('href').split('#')[1]
 				}
 			});
 		},

 		resizeHolder: function(height) {
 			var self = this;

 			if (height) {
 				this.$tabHolder.height(height);
 				setTimeout(function() {
 					self.$tabHolder.addClass('transition');
 				}, 10);
 			} else {
 				self.$tabHolder.removeClass('transition').height('');
 			}
 		},

 		switchTabs: function() {
 			var self = this;

 			var $prevLink = this.$tabLinks.eq(this.prevTabIndex);
 			var $nextLink = this.$tabLinks.eq(this.activeTabIndex);

 			var $prevTab = this.getTab($prevLink);
 			var $nextTab = this.getTab($nextLink);

 			$prevTab.removeClass(this.options.activeClass);

 			if (self.haveTabHolder()) {
 				this.resizeHolder($prevTab.outerHeight());
 			}

 			setTimeout(function() {
 				self.getClassTarget($prevLink).removeClass(self.options.activeClass);

 				$prevTab.addClass(self.options.tabHiddenClass);
 				$nextTab.removeClass(self.options.tabHiddenClass).addClass(self.options.activeClass);

 				self.getClassTarget($nextLink).addClass(self.options.activeClass);

 				if (self.haveTabHolder()) {
 					self.resizeHolder($nextTab.outerHeight());

 					setTimeout(function() {
 						self.resizeHolder();
 						self.prevTabIndex = self.activeTabIndex;
 						self.makeCallback('onChange', self);
 					}, self.options.animSpeed);
 				} else {
 					self.prevTabIndex = self.activeTabIndex;
 				}
 			}, this.options.autoHeight ? this.options.animSpeed : 1);
 		},

 		getClassTarget: function($link) {
 			return this.options.addToParent ? $link.parent() : $link;
 		},

 		getActiveTab: function() {
 			return this.getTab(this.$tabLinks.eq(this.activeTabIndex));
 		},

 		getTab: function($link) {
 			return $($link.attr(this.options.attrib));
 		},

 		haveTabHolder: function() {
 			return this.$tabHolder && this.$tabHolder.length;
 		},

 		destroy: function() {
 			var self = this;

 			this.$tabLinks.off('.tabset').each(function() {
 				var $link = $(this);

 				self.getClassTarget($link).removeClass(self.options.activeClass);
 				$($link.attr(self.options.attrib)).removeClass(self.options.activeClass + ' ' + self.options.tabHiddenClass);
 			});

 			this.$holder.removeData('Tabset');
 		},

 		makeCallback: function(name) {
 			if (typeof this.options[name] === 'function') {
 				var args = Array.prototype.slice.call(arguments);
 				args.shift();
 				this.options[name].apply(this, args);
 			}
 		}
 	};

 	$.fn.tabset = function(opt) {
 		var args = Array.prototype.slice.call(arguments);
 		var method = args[0];

 		var options = $.extend({
 			activeClass: 'active',
 			addToParent: false,
 			autoHeight: false,
 			checkHash: false,
 			defaultTab: true,
 			animSpeed: 500,
 			tabLinks: 'a',
 			attrib: 'href',
 			event: 'click',
 			tabHiddenClass: 'js-tab-hidden'
 		}, opt);
 		options.autoHeight = options.autoHeight;

 		return this.each(function() {
 			var $holder = jQuery(this);
 			var instance = $holder.data('Tabset');

 			if (typeof opt === 'object' || typeof opt === 'undefined') {
 				$holder.data('Tabset', new Tabset($holder, options));
 			} else if (typeof method === 'string' && instance) {
 				if (typeof instance[method] === 'function') {
 					args.shift();
 					instance[method].apply(instance, args);
 				}
 			}
 		});
 	};
 }(jQuery, jQuery(window)));




/*   Scroolly plugin    https://github.com/chayka/jQuery.Scroolly    */

(function(root, factory) {
	"use strict";

	if (typeof define === 'function' && define.amd) {
      // Set up jQuery.Scroolly appropriately for the environment. Start with AMD.
      define(['jquery'], function($) {
          // Export global even in AMD case in case this script is loaded with
          return factory(root, $, false);
      });

      return;
  }

  // Finally, as a browser global in jquery ns.
  factory(root, (root.jQuery || root.Zepto || root.ender || root.$), true);
}(this, function(root, $, patchJQuery) {
	"use strict";

	var scroolly;

	scroolly = {
		options: {
			timeout: null,
			meter: $('.scroolly'),
			body: document
		},
		theCSSPrefix: '',
		theDashedCSSPrefix: '',
		isMobile: false,
		isInitialized: false,
      //        requestAnimFrame: null,
      //        cancelAnimFrame: null,

      animFrame: null,
      direction: 0,
      scrollTop: 0,
      scrollCenter: 0,
      scrollBottom: 0,
      docHeight: 0,
      docMiddle: 0,
      winHeight: $(window).height()
  };

  scroolly.scrollLayout = {
      //  TSB - top screen border
      //        topbarSearchForm:{
      //            element: searchFormTop,
      //            rules:[
      //                {
      //                    from: 0, // top border of the rule region
      //                    to: 'finish', // bottom border of the rule region
      //                          // if ommited then set to 'from' of the following rule
      //                          // if there is no following rule set to 'bottom'
      //                    minWith: 0, // min viewport width for the rule to apply
      //                    maxWidth: 'infinity', // max viewport width for the rule to apply
      //                    direction: 0, // 0 - ignored, >0 - forward, <0 - backward
      //                    alias: 'top', // region alias
      //                    css: null,//{'display': 'none'}, // css to apply when TSB enters rule region
      //                    cssFrom: {'border': '0px solid #000000'},
      //                    cssTo: {'border': '10px solid #eeeeee'},
      //                    addClass: null,   // $.addClass() param value to add classes when TSB enters rule region
      //                    removeClass: null,    // $.removeClass() param value to remove classes when TSB enters rule region
      //                    onCheckIn: function(element){ // callback on TSB enters rule region
      //                        element
      //                        .hide('fade', 100);
      //                        searchInputMain.val(searchInputTop.val());
      //                    },
      //                    onCheckOut: function(element){} // callback on TSB leaves rule region
      //                    onTopIn: function(element){}  // callback on TSB enters rule region from the top border
      //                    onTopOut: function(element){}  // callback on TSB leaves rule region from the top border
      //                    onBottomIn: function(element){}  // callback on TSB enters rule region from the bottom border
      //                    onBottomOut: function(element){}  // callback on TSB leaves rule region from the bottom border
      //                    onScroll: function(element, offset, length){}  // callback on scroll event while TSB is in the rule region
      //                                      // offset - is the offset (px) of the TSB from the rule region top border
      //                                      // length - is the rule region size (px)
      //                    onDirectionChanged: function(element, direction){}
      //                },
      //                {
      //                    from: searchFormMain.offset().top,
      //                    alias: 'searchform',
      //                    css: null,//{'display': 'block'},
      //                    addClass: null,
      //                    removeClass: null,
      //                    onCheckIn: function(element){
      //                        element.show('fade', 300);
      //                        searchInputTop.val(searchInputMain.val());
      //                    },
      //                    onCheckOut: function(element){}
      //                }
      //            ]
      //        }

  };

  scroolly._isObject = function(val) {
  	return typeof val === 'object';
  };

  scroolly._isArray = function(val) {
  	return val instanceof Array;
  };

  scroolly._isNumber = function(val) {
  	return val instanceof Number || typeof val === 'number';
  };

  scroolly._isString = function(val) {
  	return val instanceof String || typeof val === 'string';
  };

  scroolly._default = function(obj, key, defaultValue) {
  	if (defaultValue === undefined) {
  		defaultValue = null;
  	}
  	var parts = (key + '').split('.');
  	if (obj && (scroolly._isObject(obj) || scroolly._isArray(obj))) {
  		var root = obj,
  		part;
  		for (var i in parts) {
  			part = parts[i];
  			if ((scroolly._isObject(root) || scroolly._isArray(root)) && root[part] !== undefined) {
  				root = root[part];
  			} else {
  				return defaultValue;
  			}
  		}
  		return root;
  	}

  	return defaultValue;
      //        return _.empty(obj[key])?defaultValue:obj[key];
  };

  /**
   * Parse rule boundry
   * @param {string} boundry - '[anchor] [offset] = [vieport anchor] [offset]'
   * @return {object} - parsed boundry
   */
   scroolly.parseCoords = function(boundry) {
   	var strings = boundry.split(/\s*=\s*/),
   	coordRel = strings[0] || 'doc-top',
   	parsedCoordRel = scroolly.parseCoord(coordRel),
   	coordVP = strings[1] || parsedCoordRel.anchor,
   	parsedCoordVP = scroolly.parseCoord(coordVP);

   	return [parsedCoordRel, parsedCoordVP];
   };

  /**
   * Parse rule coord part
   * @param {string} coord - '[anchor] [offset]'
   * @return {object} - parsed boundry
   */
   scroolly.parseCoord = function(coord) {
   	var reAnchor = /((vp|doc|el|con)-)?(top|center|bottom)?/i,
   	reOffsetStr = '(\\+|-)?\\s*(\\d+)(\\%|vp|doc|el|con)?',
   	reOffset = new RegExp(reOffsetStr, 'gi'),
   	mA = coord.match(reAnchor),
   	mO = coord.match(reOffset);

   	if (!mA && !mO) {
   		return false;
   	}

   	var subject = mA[1] ? mA[2] : 'vp',
   	anchor = mA[3] || 'top',
   	offsets = [];

   	if (mO) {
   		reOffset = new RegExp(reOffsetStr, 'i');
   		var offsetStr,
   		mO2,
   		sign,
   		offset,
   		offsetSubject;

   		for (var i = 0; i < mO.length; i++) {
   			offsetStr = mO[i];
   			mO2 = offsetStr.match(reOffset);
   			sign = mO2[1] && mO2[1] === '-' ? -1 : 1;
   			offset = mO2[2] && parseInt(mO2[2]) * sign || 0;
   			offsetSubject = 'px';

   			if (mO2[3]) {
   				offsetSubject = mO2[3] === '%' ? subject : mO2[3];
   			}

   			offsets.push({
   				offset: offset,
   				subject: offsetSubject
   			});
   		}
   	}
   	return {
   		original: coord,
   		subject: subject,
   		anchor: anchor,
   		offsets: offsets
   	};

   };

  /**
   * Calculate coord position towards top of the document
   * @param {string} coord - '[anchor] [offset]'
   * @param {jQuery(element)} $element
   * @param {jQuery(container)} $container
   * @return {object} - parsed boundry
   */
   scroolly.calculateCoord = function(coord, $element, $container) {
   	if (scroolly._isString(coord)) {
   		coord = scroolly.parseCoord(coord);
   	}

   	var subjectCoord = 0;
   	if ('vp' === coord.subject) {
   		switch (coord.anchor) {
   			case 'top':
   				subjectCoord = scroolly.scrollTop;
   				break;
   				case 'center':
   					subjectCoord = scroolly.scrollCenter;
   					break;
   					case 'bottom':
   						subjectCoord = scroolly.scrollBottom;
   						break;
   					}
   				} else if ('doc' === coord.subject) {
   					switch (coord.anchor) {
   						case 'top':
   							subjectCoord = 0;
   							break;
   							case 'center':
   								subjectCoord = scroolly.docMiddle;
   								break;
   								case 'bottom':
   									subjectCoord = scroolly.docHeight;
   								}
   							} else {
   								var $subject = 'con' === coord.subject ? $container : $element,
   								subjectHeight = $subject.outerHeight(),
   								subjectTop = $subject.offset().top,
   								subjectBottom = subjectTop + subjectHeight,
   								subjectCenter = subjectTop + Math.floor(subjectHeight / 2);

   								switch (coord.anchor) {
   									case 'top':
   										subjectCoord = subjectTop;
   										break;
   										case 'center':
   											subjectCoord = subjectCenter;
   											break;
   											case 'bottom':
   												subjectCoord = subjectBottom;
   												break;
   											}
   										}

   										var i, o, subjectOffset, relativeHeight;
   										for (i = 0; i < coord.offsets.length; i++) {
   											o = coord.offsets[i];
   											subjectOffset = o.offset;

   											if ('px' !== o.subject) {
   												relativeHeight = 0;
   												switch (o.subject) {
   													case 'vp':
   														relativeHeight = scroolly.winHeight;
   														break;
   														case 'doc':
   															relativeHeight = scroolly.docHeight;
   															break;
   															case 'el':
   																relativeHeight = $element.outerHeight();
   																break;
   																case 'con':
   																	relativeHeight = $container.outerHeight();
   																	break;
   																}

   																subjectOffset = Math.ceil(o.offset / 100 * relativeHeight);
              //                console.log(subjectOffset);
          }
          subjectCoord += subjectOffset;
      }

//        console.dir({'computed':{ags: arguments, res: subjectCoord}});

return subjectCoord;
};

  /**
   * Calculate how much we should scroll down till boundry
   * @param {Object} coords
   * @param {$(DOMnode)} $element
   * @param {$(DOMnode)} $container
   * @returns {integer} how much we should scroll down till boundry
   */
   scroolly.cmpCoords = function(coords, $element, $container) {
   	return scroolly.calculateCoord(coords[0], $element, $container) - scroolly.calculateCoord(coords[1], $element, $container);
   };

  /**
   * Check if rule is active
   * @param {object} rule
   * @return {boolean}
   */
   scroolly.isRuleInActiveWidthRange = function(rule) {
   	var fromX = scroolly._default(rule, 'minWidth', 0),
   	toX = scroolly._default(rule, 'maxWidth', 'infinity'),
   	meter = scroolly._default(scroolly.options, 'meter'),
   	width = $(window).width(),
   	minWidthScrolly,
   	maxWidthScrolly,
   	checkinWidth;

   	if (meter.length) {
   		minWidthScrolly = meter.length ? parseInt(meter.css('min-width')) : 0;
   		maxWidthScrolly = meter.length ? meter.css('max-width') : 'none';
   		maxWidthScrolly = maxWidthScrolly === 'none' ? 'infinity' : parseInt(maxWidthScrolly);
   		checkinWidth = fromX <= minWidthScrolly && (toX === 'infinity' || toX >= maxWidthScrolly);

   		return checkinWidth;
   	}

   	return fromX < width && (toX === 'infinity' || toX >= width);
   };

  /**
   * Check if rule is active
   *
   * @param {object} rule
   * @param {$(DOMnode)} $element
   * @param {$(DOMnode)|String} $container description
   * @returns {boolean|object} false if rule is not active or scrolling params instead
   * {
   *      offset: how many pixels since top boundry were scrolled
   *      length: total length of the region in pisels
   * }
   */
   scroolly.isRuleActive = function(rule, $element, $container) {
   	var checkinWidth = scroolly.isRuleInActiveWidthRange(rule);
   	if (!checkinWidth) {
   		return false;
   	}

   	var ruleDirection = scroolly._default(rule, 'direction', 0),
   	scrollDirection = scroolly.direction;

   	if (ruleDirection && (ruleDirection > 0 && scrollDirection < 0 || ruleDirection < 0 && scrollDirection >= 0)) {
   		return false;
   	}

   	var fromY = scroolly._default(rule, 'from', '0'),
   	toY = scroolly._default(rule, 'to', 'finish');

   	var toTop = scroolly.cmpCoords(fromY, $element, $container);
   	if (toTop > 0) {
   		return false;
   	}

   	var toBottom = scroolly.cmpCoords(toY, $element, $container);
   	if (toBottom <= 0) {
   		return false;
   	}

   	return {
   		offset: -toTop,
   		length: toBottom - toTop
   	};
   };

  /**
   * Helper and polyfill for non-ECMA5 compliant browsers to get layout length
   * @returns {number} length of scrollLayout
   */
   scroolly.getScrollLayoutLength = function () {
   	return (!Object.keys) ? $.map(scroolly.scrollLayout, function (){ return 1; }).length : Object.keys(scroolly.scrollLayout).length;
   };

  /**
   * Add ellement with its rules to scroll layout
   * See the commented sample above for the rules syntax
   *
   * @param {string} id
   * @param {$(DOMnode)} $element
   * @param {array} rules
   * @param {$(DOMnode)} $container description
   */
   scroolly.addItem = function(id, $element, rules, $container) {
   	if (!$element.length) {
   		return false;
   	}

   	$container = $container || 'self';

   	var rule,
   	isAbsolute,
   	fromY,
   	toY,
   	fromCss,
   	toCss,
   	cssOnScroll;

   	cssOnScroll = function(element, offset, length, rule) {
   		var progress = offset / length,
   		fromCss = scroolly._default(rule, 'cssFrom'),
   		toCss = scroolly._default(rule, 'cssTo'),
   		css = {},
   		fromProp,
   		toProp;

   		for (var property in fromCss) {
   			fromProp = fromCss[property];
   			toProp = scroolly._default(toCss, property, fromProp);
   			css[property] = scroolly.getTransitionValue(fromProp, toProp, progress);
   		}

   		element.css(scroolly.extendCssWithPrefix(css));
   	};

   	for (var i in rules) {
   		rule = rules[i];

          isAbsolute = !$container;//?true:false;

          fromY = scroolly._default(rule, 'from', 'doc-top');

          if (scroolly._isString(fromY) || scroolly._isNumber(fromY)) {
          	fromY = scroolly.parseCoords('' + fromY);
          	rule.from = fromY;
          }

          toY = scroolly._default(rule, 'to', 'doc-bottom');

          if (scroolly._isString(toY) || scroolly._isNumber(toY)) {
          	toY = scroolly.parseCoords('' + toY);

          	rule.to = toY;
          }

          fromCss = scroolly._default(rule, 'cssFrom');
          toCss = scroolly._default(rule, 'cssTo');

          if (fromCss && toCss) {

          	rule.cssOnScroll = cssOnScroll;
          }
      }
      if ($element.length > 1) {
      	$element.each(function(i) {
      		var clonedRules = [],
      		rule,
      		clonedRule,
      		$con = null;

      		for (var j = 0; j < rules.length; j++) {
      			rule = rules[j];
      			clonedRule = {};
      			$.extend(clonedRule, rule);
      			clonedRules.push(clonedRule);
      		}

      		if ($container) {
      			if ($container === 'self') {
      				$con = $container;
      			} else {
      				$con = $container.length > 1 && i < $container.length ? $($container[i]) : $container;
      			}
      		}

      		scroolly.addItem(id + '-' + i, $(this), clonedRules, $con);
      	});

      	return true;
      }
      var item = scroolly._default(scroolly.scrollLayout, id);
      if (item) {
      	item.rules.concat(rules);
      } else {
      	scroolly.scrollLayout[id] = {
      		element: $element,
      		container: $container,
      		rules: rules
      	};
      }
      return true;
  };

  scroolly.factory = function($element, rules, $container, id) {
  	scroolly.init();

  	if (!$element.length) {
  		return false;
  	}

  	if (!rules) {
  		return false;
  	}

  	id = id || $element[0].tagName + '_' + scroolly.getScrollLayoutLength();
  	scroolly.addItem(id, $element, rules, $container, false);
  };

  /**
   * Fix DOM element in NON-Responsive (non viewport width dependent) layout.
   * When applied, DOMnode is fixed when TSB is within
   * (node's top border - offsetTop) and ($bottomContainer's bottom border - offsetBottom)
   * and unfixed when TSB is out of the region
   *
   * @param string id
   * @param $(DOMnode) $element
   * @param object params: {
   *      $bottomContainer - $(DOMnode) which restricts fix from the bottom,
   *          '<body>' by default,
   *          'next' means the next dom sibling $element.next()
   *          'parent' means $element.parent()
   *      mode - sets the mode of adding needed white space to $bottomContainer
   *          when $element is fixed
   *          'margin' means margin-top=$element.height() wil be added to $bottomContainer
   *          'padding' means padding-top=$element.height() wil be added to $bottomContainer
   *      offsetTop - top offset that is left before fixed element when fixed
   *      offsetBottom - bottom offset left before $bottomContainer
   *      minWidth, maxWidth - viewport width (px) boundries
   *          is used within stickItemXY for responsive layouts
   *          0, 'infinity' by default
   *      static -
   * }
   */
   scroolly.stickItem = function(id, $element, params /*$bottomContainer, mode, offsetTop, offsetBottom*/) {
   	scroolly.stickItemXY(id, $element, (params instanceof Array) ? params : [params]);
   };

  /**
   * Fix DOM element in NON-Responsive (non viewport width dependent) layout.
   * When applied, DOMnode is fixed when TSB is within
   * (node's top border - offsetTop) and ($bottomContainer's bottom border - offsetBottom)
   * and unfixed when TSB is out of the region
   *
   * @param string id
   * @param $(DOMnode) $element
   * @param array params - array of objects described in stickItem()
   */
   scroolly.stickItemXY = function(id, $element, params /*$bottomContainer, mode, offsetTop, offsetBottom*/) {
   	params = params || [];
   	var rules = [],
   	xRange,
   	$bottomContainer,
   	mode,
   	offsetTop,
   	offsetBottom,
   	minWidth,
   	maxWidth,
   	isStatic
   	;
   	for (var x in params) {
   		xRange = params[x];
   		$bottomContainer = scroolly._default(xRange, '$bottomContainer', $('body'));
   		mode = scroolly._default(xRange, 'mode');
   		offsetTop = scroolly._default(xRange, 'offsetTop', 0);
   		offsetBottom = scroolly._default(xRange, 'offsetBottom', 0);
   		minWidth = scroolly._default(xRange, 'minWidth', 0);
   		maxWidth = scroolly._default(xRange, 'maxWidth', 'infinity');
   		isStatic = scroolly._default(xRange, 'static', false);

   		if ('next' === $bottomContainer) {
   			mode = mode || 'margin';
   			$bottomContainer = $($element).next();
   		} else if ('parent' === $bottomContainer || !$bottomContainer) {
   			mode = mode || 'padding';
   			$bottomContainer = $($element).parent();
   		}

   		if (!isStatic) {
   			rules.push({
   				source: 'sticky',
   				alias: 'top',
   				minWidth: minWidth,
   				maxWidth: maxWidth,
   				offsetTop: offsetTop,
   				offsetBottom: offsetBottom,
   				bottomContainer: $bottomContainer,
   				mode: mode
   			});
   			rules.push({
   				source: 'sticky',
   				alias: 'fixed',
   				minWidth: minWidth,
   				maxWidth: maxWidth,
   				offsetTop: offsetTop,
   				offsetBottom: offsetBottom,
   				bottomContainer: $bottomContainer,
   				mode: mode
   			});

   			rules.push({
   				source: 'sticky',
   				alias: 'bottom',
   				minWidth: minWidth,
   				maxWidth: maxWidth,
   				offsetTop: offsetTop,
   				offsetBottom: offsetBottom,
   				bottomContainer: $bottomContainer,
   				mode: mode
//                    from: offset_2,
//                    css: {'position': 'absolute', 'top':(offset_2+offsetTop)+'px'}
});
   		} else {
   			rules.push({
   				source: 'sticky',
   				alias: 'static',
   				minWidth: minWidth,
   				maxWidth: maxWidth,
   				bottomContainer: $bottomContainer
   			});
   		}
   	}

   	scroolly.addItem(id, $($element), rules);
   };

  /**
   * This function calculates all rules boundries when browser is resized and
   * enters new width range. We cannot precalculate all sizes as during window
   * resize some element are resized.
   *
   * @param {$(DOMnode)} $element
   * @param {object} rule - single rule
   * @returns {object} - recalculated rule
   */
   scroolly.processStickyItemRange = function($element, rule) {
   	rule = rule || {};

   	var $bottomContainer = scroolly._default(rule, 'bottomContainer', $('body')),
   	mode = scroolly._default(rule, 'mode'),
   	offsetTop = scroolly._default(rule, 'offsetTop', 0),
   	offsetBottom = scroolly._default(rule, 'offsetBottom', 0),
   	itemHeight = parseInt($element.css('margin-top')) + $element.height() + parseInt($element.css('margin-bottom'));

   	if ($element.css('box-sizing') === 'border-box') {
   		itemHeight += parseInt($element.css('padding-top')) + parseInt($element.css('padding-bottom'));
   	}

   	var bottomContainerHeight = parseInt($bottomContainer.css('margin-top')) + $bottomContainer.height() + parseInt($bottomContainer.css('margin-bottom'));
   	if ($bottomContainer.css('box-sizing') === 'border-box') {
   		bottomContainerHeight += parseInt($bottomContainer.css('padding-top')) + parseInt($bottomContainer.css('padding-bottom'));
   	}

   	var offset_1 = Math.round($element.offset().top - parseInt($element.css('margin-top'))),
   	offset_2 = Math.round($bottomContainer.offset().top + (bottomContainerHeight - itemHeight - offsetBottom));

   	switch (rule.alias) {
   		case 'top':
   			rule.from = 0;
   			rule.to = offset_1 - offsetTop;
   			rule.css = {'position': 'absolute', 'top': offset_1 + 'px'};
   			rule.itemHeight = itemHeight;
   			break;

   			case 'fixed':
   				rule.from = offset_1 - offsetTop;
   				rule.to = offset_2;
   				rule.css = {'position': 'fixed', 'top': offsetTop + 'px'};
   				rule.itemHeight = itemHeight;
   				break;

   				case 'bottom':
   					rule.from = offset_2;
   					rule.css = {'position': 'absolute', 'top': (offset_2 + offsetTop) + 'px'};
   					rule.itemHeight = itemHeight;
   					break;

   					case 'static':
   						rule.from = 0;
   						rule.css = {'position': '', 'top': ''};
   						rule.itemHeight = 0;
   						break;
   					}

   					return rule;
   				};

  /**
   * Heads up, this function is called on window resize. However even if window
   * has entered new width range it doesn't mean that new responsive styles were
   * allready applied. So we cannot rely on $( window ).width(). What we can rely
   * on are styles that are applied to some predefined element called 'meter'.
   *
   * Html: (our Meter)
   * <div class="scroolly"></div>
   *
   * CSS:
   *
   * .scroolly{
   *      display: none;
   * }
   *
   * media (min-device-width : 320px) and (max-device-width : 480px){
   *      .scroolly{
   *          min-width: 320px;
   *          max-width: 480px;
   *      }
   * }
   * media (min-device-width : 481px) and (max-device-width : 800px){
   *      .scroolly{
   *          min-width: 481px;
   *          max-width: 800px;
   *      }
   * }
   *
   * JS rules:
   *
   * {
   *      minWidth: 320,
   *      maxWidth: 480
   * },
   * {
   *      minWidth: 480,
   *      maxWidth: 800
   * }
   *
   * @returns {Boolean}
   */
   scroolly.onResize = function() {
   	scroolly.winHeight = $(window).height();
      //        scroolly.docHeight = $(document).height();
      scroolly.docHeight = scroolly.body.height();
      scroolly.docMiddle = Math.floor(scroolly.docHeight / 2);

      var needScroll = false;

      for (var id in scroolly.scrollLayout) {
          // cycling through all visual elements that should react
          // to scrolling and resizing
          var item = scroolly.scrollLayout[id],
          rule,
          checkin,
          source
          ;
          for (var i in item.rules) {
          	rule = item.rules[i];
          	checkin = scroolly.isRuleInActiveWidthRange(rule);
          	needScroll |= checkin;
          	if (checkin && rule.from === undefined) {
          		$(item.element).css('position', '');
          		$(item.element).css('top', '');
          		if (rule.bottomContainer) {
          			rule.bottomContainer.css('margin-top', '');
          		}
                  // item entered new range and should adapt
                  source = scroolly._default(rule, 'source');
                  if ('sticky' === source) {
                  	item.rules[i] = scroolly.processStickyItemRange(item.element, rule);
                  }

              }
          }
      }
      if (needScroll) {
          // dark magick here do not touch this useless string
          scroolly.scrollLayout = scroolly.scrollLayout;
          setTimeout(function() {
          	scroolly.onScroll(true);
          }, 0);
          //            scroolly.onScroll();
      }
      return true;
  };

  /**
   * Helper to get progress values for onScroll handlers
   * @param {integer} offset
   * @param {integer} length
   * @returns {object} progress metrics
   */
   scroolly.getProgress = function(offset, length) {
   	var relative = offset / length;
   	return {
   		offset: offset,
   		length: length,
   		relative: relative,
   		left: length - offset,
   		leftRelative: 1 - relative
   	};
   };

  /**
   * Get transition float value  based on start, stop and progress values
   * @param {number} start
   * @param {number} stop
   * @param {float} progress
   * @returns {Number}
   */
   scroolly.getTransitionFloatValue = function(start, stop, progress) {
   	if (progress <= 0) {
   		return start;
   	}

   	if (progress >= 1) {
   		return stop;
   	}

   	return start + (stop - start) * progress;
   };

  /**
   * Get transition integer value  based on start, stop and progress values
   * @param {number} start
   * @param {number} stop
   * @param {float} progress
   * @returns {Number}
   */
   scroolly.getTransitionIntValue = function(start, stop, progress) {
   	return Math.round(scroolly.getTransitionFloatValue(start, stop, progress));
   };

  /**
   * Get [R, G, B] array of integers for provided '#RRGGBB' or '#RGB' value
   * @param {type} color
   * @returns {Array}
   */
   scroolly.hashColor2rgb = function(color) {
   	var m = color.match(/^#([0-9a-f]{3})$/i);
   	if (m) {
          // in three-character format, each value is multiplied by 0x11 to give an
          // even scale from 0x00 to 0xff
          return [
          parseInt(m[1].charAt(0), 16) * 0x11, parseInt(m[1].charAt(1), 16) * 0x11, parseInt(m[1].charAt(2), 16) * 0x11
          ];
      } else {
      	m = color.match(/^#([0-9a-f]{6})$/i);
      	if (m) {
      		return [
      		parseInt(m[1].substr(0, 2), 16), parseInt(m[1].substr(2, 2), 16), parseInt(m[1].substr(4, 2), 16)
      		];
      	}
      }
      return [0, 0, 0];
  };

  /**
   * Get '#RRGGBB' value for provided R, G, B integer values
   * @param {integer} r
   * @param {integer} g
   * @param {integer} b
   * @returns {string} #RRGGBB
   */
   scroolly.rgb2HashColor = function(r, g, b) {
   	var res = '#', c, hex;
   	for (var i in arguments) {
   		c = arguments[i];
   		hex = c.toString(16);

   		if (c < 16) {
   			hex = '0' + hex;
   		}

   		res += hex;
   	}

   	return res;
   };

  /**
   * Get transition color value  based on start, stop and progress values
   * @param {cssColor} start
   * @param {cssColor} stop
   * @param {float} progress
   * @returns {Number}
   */
   scroolly.getTransitionColorValue = function(start, stop, progress) {
   	if (progress <= 0) {
   		return start;
   	}

   	if (progress >= 1) {
   		return stop;
   	}

   	var startRGB = scroolly.hashColor2rgb(start),
   	stopRGB = scroolly.hashColor2rgb(stop),
   	r = scroolly.getTransitionIntValue(startRGB[0], stopRGB[0], progress),
   	g = scroolly.getTransitionIntValue(startRGB[1], stopRGB[1], progress),
   	b = scroolly.getTransitionIntValue(startRGB[2], stopRGB[2], progress);

   	return scroolly.rgb2HashColor(r, g, b);
   };

  /**
   * Get transition css value  based on start, stop and progress values
   * @param {cssColor} start
   * @param {cssColor} stop
   * @param {float} progress
   * @returns {Number}
   */
   scroolly.getTransitionValue = function(start, stop, progress) {
   	if (progress <= 0) {
   		return start;
   	}

   	if (progress >= 1) {
   		return stop;
   	}

   	var called = 0;
   	if (scroolly._isNumber(start) && scroolly._isNumber(stop)) {
   		return scroolly.getTransitionFloatValue(start, stop, progress);
   	}

   	var re = /(\d*\.\d+)|(\d+)|(#[0-9a-f]{6})|(#[0-9a-f]{3})/gi,
   	stops = ('' + stop).match(re);

   	return ('' + start).replace(re, function(value, float, int, color6, color3) {
          //            console.dir({'replace callback args':arguments, stops: stops, called: called});
          var currentStop = stops[called];

          called++;
          if (int && int.length) {
          	return /\d*\.\d+/.test(currentStop) ? scroolly.getTransitionFloatValue(parseFloat(value), parseFloat(currentStop), progress) : scroolly.getTransitionIntValue(parseInt(value), parseInt(currentStop), progress);
          }

          if (float && float.length) {
          	return scroolly.getTransitionFloatValue(parseFloat(value), parseFloat(currentStop), progress);
          }

          if (color6 && color6.length || color3 && color3.length) {
          	return scroolly.getTransitionColorValue(value, currentStop, progress);
          }

          return value;
      });
   };

  /**
   * Function that is called while sccrolls.
   * @param {boolean} force description
   * @returns {boolean}
   */
   scroolly.onScroll = function(force) {
      //        var scrollPos = $(document).scrollTop(); // Y-coord that is checked against fromY & toY
      var scrollPos = scroolly.body.scrollTop(); // Y-coord that is checked against fromY & toY

      if (!force && scrollPos === scroolly.scrollTop) {
      	return false;
      }

      var prevPos = scroolly.scrollTop,
      prevDirection = scroolly.direction;

      scroolly.scrollTop = scrollPos; // Y-coord that is checked against fromY & toY
      scroolly.scrollBottom = scrollPos + scroolly.winHeight;
      scroolly.scrollCenter = scrollPos + Math.floor(scroolly.winHeight / 2);
      (scrollPos > 0) ? (scroolly.direction = scrollPos - prevPos) : (scroolly.direction = -1);
      // scroolly.direction = scrollPos - prevPos;

      var directionChanged = !(scroolly.direction === prevDirection || scroolly.direction < 0 && prevDirection < 0 || scroolly.direction > 0 && prevDirection > 0),
      item,
      totalRules,
      checkedIn,
      checkedOut,
      active,
      id, i, l, j,
      rule,
      fromX,
      toX,
      container,
      $bottomContainer,
      mode,
      itemHeight;

      for (id in scroolly.scrollLayout) {
          // cycling through all visual elements that should react
          // to scrolling and resizing
          item = scroolly.scrollLayout[id];
          totalRules = item.rules.length;
          checkedIn = [];
          checkedOut = [];
          active = [];

          for (i = 0; i < totalRules; i++) {
          	rule = item.rules[i];
          	fromX = scroolly._default(rule, 'minWidth', 0);
          	toX = scroolly._default(rule, 'maxWidth', 'infinity');

          	container = item.container === 'self' ? item.element : item.container;

          	rule.checkin = scroolly.isRuleActive(rule, item.element, container);
          	rule['class'] = rule['class'] || 'scroll-pos-' + (rule.alias) + ' window-width-' + fromX + '-to-' + toX;
          	if (rule.checkin) {
          		active.push(i);
          		if (!rule.isActive) {
          			rule.isActive = true;
          			checkedIn.push(i);
          		}
          	} else if (rule.isActive) {
          		rule.isActive = false;
          		checkedOut.push(i);
          	}
          	item.rules[i] = rule;
          }

          for (j = 0; j < checkedOut.length; j++) {
          	i = checkedOut[j];
          	rule = item.rules[i];
          	item.element.removeClass(rule['class']);
          	if (rule.cssOnScroll) {
          		l = rule.length || 0;
          		rule.cssOnScroll(item.element, scrollPos > prevPos ? l : 0, l, rule);
          	}
          	if (rule.onScroll) {
          		l = rule.length || 0;
          		rule.onScroll(item.element, scrollPos > prevPos ? l : 0, l, rule);
          	}
          	if (rule.onCheckOut) {
          		rule.onCheckOut(item.element, rule);
          	}
          	if (rule.onTopOut && scrollPos < prevPos) {
          		rule.onTopOut(item.element, rule);
          	} else if (rule.onBottomOut && scrollPos > prevPos) {
          		rule.onBottomOut(item.element, rule);
          	}
          }

          for (j = 0; j < checkedIn.length; j++) {
          	i = checkedIn[j];
          	rule = item.rules[i];

          	if (rule.css) {
          		item.element.css(scroolly.extendCssWithPrefix(rule.css));
          	}

          	if (rule.addClass) {
          		item.element.addClass(rule.addClass);
          	}

          	if (rule.removeClass) {
          		item.element.removeClass(rule.removeClass);
          	}
          	item.element.addClass(rule['class']);

          	$bottomContainer = scroolly._default(rule, 'bottomContainer');
          	mode = scroolly._default(rule, 'mode');
          	itemHeight = scroolly._default(rule, 'itemHeight');

          	if ($bottomContainer && mode && itemHeight) {
          		$bottomContainer.css(mode + '-top', itemHeight + 'px');
          	}

          	if (rule.onCheckIn) {
          		rule.onCheckIn(item.element, rule);
          	}

          	if (rule.onTopIn && scrollPos > prevPos) {
          		rule.onTopIn(item.element, rule);
          	} else if (rule.onBottomIn && scrollPos < prevPos) {
          		rule.onBottomIn(item.element, rule);
          	}

          	rule.length = rule.checkin.length;
          }

          for (j = 0; j < active.length; j++) {
          	i = active[j];
          	rule = item.rules[i];

          	if (rule.cssOnScroll) {
          		rule.cssOnScroll(item.element, rule.checkin.offset, rule.checkin.length, rule);
          	}

          	if (rule.onScroll) {
          		rule.onScroll(item.element, rule.checkin.offset, rule.checkin.length, rule);
          	}

          	if (directionChanged && rule.onDirectionChanged) {
          		rule.onDirectionChanged(item.element, scroolly.direction, rule);
          	}
          }
          scroolly.scrollLayout[id] = item;
      }

  };

  //Will be called once (when scroolly gets initialized).
  scroolly.detectCSSPrefix = function() {
      //Only relevant prefixes. May be extended.
      //Could be dangerous if there will ever be a CSS property which actually starts with "ms". Don't hope so.
      var rxPrefixes = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;

      //Detect prefix for current browser by finding the first property using a prefix.
      if (!window.getComputedStyle) {
      	return;
      }

      var style = window.getComputedStyle(document.body, null);

      for (var k in style) {
          //We check the key and if the key is a number, we check the value as well, because safari's getComputedStyle returns some weird array-like thingy.
          scroolly.theCSSPrefix = (k.match(rxPrefixes) || (+k === k && style[k].match(rxPrefixes)));

          if (scroolly.theCSSPrefix) {
          	break;
          }
      }

      //Did we even detect a prefix?
      if (!scroolly.theCSSPrefix) {
      	scroolly.theCSSPrefix = scroolly.theDashedCSSPrefix = '';

      	return;
      }

      scroolly.theCSSPrefix = scroolly.theCSSPrefix[0];

      //We could have detected either a dashed prefix or this camelCaseish-inconsistent stuff.
      if (scroolly.theCSSPrefix.slice(0, 1) === '-') {
      	scroolly.theDashedCSSPrefix = scroolly.theCSSPrefix;

          //There's no logic behind these. Need a look up.
          scroolly.theCSSPrefix = ({
          	'-webkit-': 'webkit',
          	'-moz-': 'Moz',
          	'-ms-': 'ms',
          	'-o-': 'O'
          })[scroolly.theCSSPrefix];
      } else {
      	scroolly.theDashedCSSPrefix = '-' + scroolly.theCSSPrefix.toLowerCase() + '-';
      }
  };

  scroolly.cssPrefix = function(key) {
  	return scroolly.theDashedCSSPrefix + key;
  };

  scroolly.extendCssWithPrefix = function(cssObj) {
  	var cssExt = {}, prop, re, m, newProp, val;

  	for (prop in cssObj) {
  		re = /^-(moz-|webkit-|o-|ms-)?/i;
  		m = prop.match(re);
  		newProp = prop.slice(1);
          //            console.dir({m: m});
          if (m && !m[1]) {
          	val = cssObj[prop];
          	cssExt[newProp] = val;
          	cssExt[scroolly.cssPrefix(newProp)] = val;
          	delete cssObj[prop];
          }
      }

      $.extend(cssObj, cssExt);

      return cssObj;
  };

  scroolly.now = Date.now || function() {
  	return +new Date();
  };

  scroolly.getRAF = function() {
  	var requestAnimFrame = window.requestAnimationFrame || window[scroolly.theCSSPrefix.toLowerCase() + 'RequestAnimationFrame'],
  	lastTime = scroolly.now();

  	if (false && scroolly.isMobile || !requestAnimFrame) {
  		requestAnimFrame = function(callback) {
              //How long did it take to render?
              var deltaTime = scroolly.now() - lastTime,
              delay = Math.max(0, 1000 / 60 - deltaTime);

              return window.setTimeout(function() {
              	lastTime = scroolly.now();
                  //        scroolly.timesCalled++;
                  //        scroolly.x.text(scroolly.timesCalled);
                  callback();
              }, delay);
          };
      }

      return requestAnimFrame;
  };

  scroolly.getCAF = function() {
  	var cancelAnimFrame = window.cancelAnimationFrame || window[scroolly.theCSSPrefix.toLowerCase() + 'CancelAnimationFrame'];

  	if (scroolly.isMobile || !cancelAnimFrame) {
  		cancelAnimFrame = function(timeout) {
  			return window.clearTimeout(timeout);
  		};
  	}

  	return cancelAnimFrame;

  };

  scroolly.animLoop = function() {
  	scroolly.onScroll();
  	scroolly.animFrame = window.requestAnimFrame(scroolly.animLoop);
  };

  scroolly.init = function(options) {
  	if (scroolly.isInitialized) {
  		return false;
  	}
  	$.extend(scroolly.options, options);
  	scroolly.isMobile = scroolly._default(scroolly.options, 'isMobile', (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera));
  	scroolly.detectCSSPrefix();
  	scroolly.body = $(scroolly.options.body);
  	window.requestAnimFrame = scroolly.getRAF();
  	window.cancelAnimFrame = scroolly.getCAF();

  	scroolly.timesCalled = 0;
  	$(document).ready(function() {
  		$(window).resize(scroolly.onResize).resize();
          //            scroolly.body.scroll(function(){scroolly.onScroll(true);}).scroll();
          scroolly.animLoop();
      });
  	scroolly.isInitialized = true;
  };

  scroolly.destroy = function() {
  	window.cancelAnimFrame(scroolly.animFrame);
  };

  scroolly.factorySticky = function($element, params, id) {
  	id = id || $element[0].tagName + '_' + scroolly.getScrollLayoutLength();
  	return scroolly.stickItemXY(id, $element, (params instanceof Array) ? params : [params]) ? id : false;
  };

  if (patchJQuery) {
  	$.scroolly = scroolly;

  	$.fn.scroolly = function(rules, $container, id) {
  		scroolly.factory(this, rules, $container, id);
  		return this;
  	};

      /**
       * params = [widthRange1, widthRange2, ... , widthRangeN]
       *
       * widthRangeN = {
       *      $bottomContainer: $(DOMnode),   // - container that defines bottom container
       *      mode: 'margin'||'padding', // - defines the way element height will be compensated
       *      minWidth: 0,
       *      maxWidth: 'infinity',
       *      static: false // - whether element should be fixed allways for current width range
       * }
       *
       *
       * @param {type} params
       * @param {type} id
       * @returns {Boolean|String}
       */
       $.fn.scroollySticky = function(params, id) {
       	scroolly.init();

       	if (!this.length) {
       		return false;
       	}

       	return scroolly.factorySticky(this, params, id);
       };
   }

   return scroolly;
}));



/*   Animation on scroll down plugin     */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AOS=t():e.AOS=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="dist/",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(1),a=(o(r),n(6)),u=o(a),c=n(7),s=o(c),f=n(8),d=o(f),l=n(9),p=o(l),m=n(10),b=o(m),v=n(11),y=o(v),g=n(14),h=o(g),w=[],k=!1,x={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&(k=!0),k)return w=(0,y.default)(w,x),(0,b.default)(w,x.once),w},O=function(){w=(0,h.default)(),j()},M=function(){w.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay")})},S=function(e){return e===!0||"mobile"===e&&p.default.mobile()||"phone"===e&&p.default.phone()||"tablet"===e&&p.default.tablet()||"function"==typeof e&&e()===!0},_=function(e){x=i(x,e),w=(0,h.default)();var t=document.all&&!window.atob;return S(x.disable)||t?M():(x.disableMutationObserver||d.default.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),x.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",x.easing),document.querySelector("body").setAttribute("data-aos-duration",x.duration),document.querySelector("body").setAttribute("data-aos-delay",x.delay),"DOMContentLoaded"===x.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1?j(!0):"load"===x.startEvent?window.addEventListener(x.startEvent,function(){j(!0)}):document.addEventListener(x.startEvent,function(){j(!0)}),window.addEventListener("resize",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("orientationchange",(0,s.default)(j,x.debounceDelay,!0)),window.addEventListener("scroll",(0,u.default)(function(){(0,b.default)(w,x.once)},x.throttleDelay)),x.disableMutationObserver||d.default.ready("[data-aos]",O),w)};e.exports={init:_,refresh:j,refreshHard:O}},function(e,t){},,,,,function(e,t){(function(t){"use strict";function n(e,t,n){function o(t){var n=b,o=v;return b=v=void 0,k=t,g=e.apply(o,n)}function r(e){return k=e,h=setTimeout(f,t),M?o(e):g}function a(e){var n=e-w,o=e-k,i=t-n;return S?j(i,y-o):i}function c(e){var n=e-w,o=e-k;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=O();return c(e)?d(e):void(h=setTimeout(f,a(e)))}function d(e){return h=void 0,_&&b?o(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),k=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(O())}function m(){var e=O(),n=c(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),o(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,k=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(s);return t=u(t)||0,i(n)&&(M=!!n.leading,S="maxWait"in n,y=S?x(u(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e,t,o){var r=!0,a=!0;if("function"!=typeof e)throw new TypeError(s);return i(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),n(e,t,{leading:r,maxWait:t,trailing:a})}function i(e){var t="undefined"==typeof e?"undefined":c(e);return!!e&&("object"==t||"function"==t)}function r(e){return!!e&&"object"==("undefined"==typeof e?"undefined":c(e))}function a(e){return"symbol"==("undefined"==typeof e?"undefined":c(e))||r(e)&&k.call(e)==d}function u(e){if("number"==typeof e)return e;if(a(e))return f;if(i(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=i(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(l,"");var n=m.test(e);return n||b.test(e)?v(e.slice(2),n?2:8):p.test(e)?f:+e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s="Expected a function",f=NaN,d="[object Symbol]",l=/^\s+|\s+$/g,p=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,b=/^0o[0-7]+$/i,v=parseInt,y="object"==("undefined"==typeof t?"undefined":c(t))&&t&&t.Object===Object&&t,g="object"==("undefined"==typeof self?"undefined":c(self))&&self&&self.Object===Object&&self,h=y||g||Function("return this")(),w=Object.prototype,k=w.toString,x=Math.max,j=Math.min,O=function(){return h.Date.now()};e.exports=o}).call(t,function(){return this}())},function(e,t){(function(t){"use strict";function n(e,t,n){function i(t){var n=b,o=v;return b=v=void 0,O=t,g=e.apply(o,n)}function r(e){return O=e,h=setTimeout(f,t),M?i(e):g}function u(e){var n=e-w,o=e-O,i=t-n;return S?x(i,y-o):i}function s(e){var n=e-w,o=e-O;return void 0===w||n>=t||n<0||S&&o>=y}function f(){var e=j();return s(e)?d(e):void(h=setTimeout(f,u(e)))}function d(e){return h=void 0,_&&b?i(e):(b=v=void 0,g)}function l(){void 0!==h&&clearTimeout(h),O=0,b=w=v=h=void 0}function p(){return void 0===h?g:d(j())}function m(){var e=j(),n=s(e);if(b=arguments,v=this,w=e,n){if(void 0===h)return r(w);if(S)return h=setTimeout(f,t),i(w)}return void 0===h&&(h=setTimeout(f,t)),g}var b,v,y,g,h,w,O=0,M=!1,S=!1,_=!0;if("function"!=typeof e)throw new TypeError(c);return t=a(t)||0,o(n)&&(M=!!n.leading,S="maxWait"in n,y=S?k(a(n.maxWait)||0,t):y,_="trailing"in n?!!n.trailing:_),m.cancel=l,m.flush=p,m}function o(e){var t="undefined"==typeof e?"undefined":u(e);return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==("undefined"==typeof e?"undefined":u(e))}function r(e){return"symbol"==("undefined"==typeof e?"undefined":u(e))||i(e)&&w.call(e)==f}function a(e){if("number"==typeof e)return e;if(r(e))return s;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(d,"");var n=p.test(e);return n||m.test(e)?b(e.slice(2),n?2:8):l.test(e)?s:+e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c="Expected a function",s=NaN,f="[object Symbol]",d=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,p=/^0b[01]+$/i,m=/^0o[0-7]+$/i,b=parseInt,v="object"==("undefined"==typeof t?"undefined":u(t))&&t&&t.Object===Object&&t,y="object"==("undefined"==typeof self?"undefined":u(self))&&self&&self.Object===Object&&self,g=v||y||Function("return this")(),h=Object.prototype,w=h.toString,k=Math.max,x=Math.min,j=function(){return g.Date.now()};e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";function n(e){var t=void 0,o=void 0,i=void 0;for(t=0;t<e.length;t+=1){if(o=e[t],o.dataset&&o.dataset.aos)return!0;if(i=o.children&&n(o.children))return!0}return!1}function o(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function i(){return!!o()}function r(e,t){var n=window.document,i=o(),r=new i(a);u=t,r.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function a(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),o=Array.prototype.slice.call(e.removedNodes),i=t.concat(o);if(n(i))return u()})}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){};t.default={isSupported:i,ready:r}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,a=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,c=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,s=function(){function e(){n(this,e)}return i(e,[{key:"phone",value:function(){var e=o();return!(!r.test(e)&&!a.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=o();return!(!u.test(e)&&!c.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),e}();t.default=new s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t,n){var o=e.node.getAttribute("data-aos-once");t>e.position?e.node.classList.add("aos-animate"):"undefined"!=typeof o&&("false"===o||!n&&"true"!==o)&&e.node.classList.remove("aos-animate")},o=function(e,t){var o=window.pageYOffset,i=window.innerHeight;e.forEach(function(e,r){n(e,i+o,t)})};t.default=o},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(12),r=o(i),a=function(e,t){return e.forEach(function(e,n){e.node.classList.add("aos-init"),e.position=(0,r.default)(e.node,t.offset)}),e};t.default=a},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),r=o(i),a=function(e,t){var n=0,o=0,i=window.innerHeight,a={offset:e.getAttribute("data-aos-offset"),anchor:e.getAttribute("data-aos-anchor"),anchorPlacement:e.getAttribute("data-aos-anchor-placement")};switch(a.offset&&!isNaN(a.offset)&&(o=parseInt(a.offset)),a.anchor&&document.querySelectorAll(a.anchor)&&(e=document.querySelectorAll(a.anchor)[0]),n=(0,r.default)(e).top,a.anchorPlacement){case"top-bottom":break;case"center-bottom":n+=e.offsetHeight/2;break;case"bottom-bottom":n+=e.offsetHeight;break;case"top-center":n+=i/2;break;case"bottom-center":n+=i/2+e.offsetHeight;break;case"center-center":n+=i/2+e.offsetHeight/2;break;case"top-top":n+=i;break;case"bottom-top":n+=e.offsetHeight+i;break;case"center-top":n+=e.offsetHeight/2+i}return a.anchorPlacement||a.offset||isNaN(t)||(o=t),n+o};t.default=a},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}};t.default=n},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(e){return{node:e}})};t.default=n}])});



/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

  */
  /* global window, document, define, jQuery, setInterval, clearInterval */
  ;(function(factory) {
  	'use strict';
  	if (typeof define === 'function' && define.amd) {
  		define(['jquery'], factory);
  	} else if (typeof exports !== 'undefined') {
  		module.exports = factory(require('jquery'));
  	} else {
  		factory(jQuery);
  	}

  }(function($) {
  	'use strict';
  	var Slick = window.Slick || {};

  	Slick = (function() {

  		var instanceUid = 0;

  		function Slick(element, settings) {

  			var _ = this, dataSettings;

  			_.defaults = {
  				accessibility: true,
  				adaptiveHeight: false,
  				appendArrows: $(element),
  				appendDots: $(element),
  				arrows: true,
  				asNavFor: null,
  				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
  				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
  				autoplay: false,
  				autoplaySpeed: 3000,
  				centerMode: false,
  				centerPadding: '50px',
  				cssEase: 'ease',
  				customPaging: function(slider, i) {
  					return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
  				},
  				dots: false,
  				dotsClass: 'slick-dots',
  				draggable: true,
  				easing: 'linear',
  				edgeFriction: 0.35,
  				fade: false,
  				focusOnSelect: false,
  				infinite: true,
  				initialSlide: 0,
  				lazyLoad: 'ondemand',
  				mobileFirst: false,
  				pauseOnHover: true,
  				pauseOnFocus: true,
  				pauseOnDotsHover: false,
  				respondTo: 'window',
  				responsive: null,
  				rows: 1,
  				rtl: false,
  				slide: '',
  				slidesPerRow: 1,
  				slidesToShow: 1,
  				slidesToScroll: 1,
  				speed: 500,
  				swipe: true,
  				swipeToSlide: false,
  				touchMove: true,
  				touchThreshold: 5,
  				useCSS: true,
  				useTransform: true,
  				variableWidth: false,
  				vertical: false,
  				verticalSwiping: false,
  				waitForAnimate: true,
  				zIndex: 1000
  			};

  			_.initials = {
  				animating: false,
  				dragging: false,
  				autoPlayTimer: null,
  				currentDirection: 0,
  				currentLeft: null,
  				currentSlide: 0,
  				direction: 1,
  				$dots: null,
  				listWidth: null,
  				listHeight: null,
  				loadIndex: 0,
  				$nextArrow: null,
  				$prevArrow: null,
  				scrolling: false,
  				slideCount: null,
  				slideWidth: null,
  				$slideTrack: null,
  				$slides: null,
  				sliding: false,
  				slideOffset: 0,
  				swipeLeft: null,
  				swiping: false,
  				$list: null,
  				touchObject: {},
  				transformsEnabled: false,
  				unslicked: false
  			};

  			$.extend(_, _.initials);

  			_.activeBreakpoint = null;
  			_.animType = null;
  			_.animProp = null;
  			_.breakpoints = [];
  			_.breakpointSettings = [];
  			_.cssTransitions = false;
  			_.focussed = false;
  			_.interrupted = false;
  			_.hidden = 'hidden';
  			_.paused = true;
  			_.positionProp = null;
  			_.respondTo = null;
  			_.rowCount = 1;
  			_.shouldClick = true;
  			_.$slider = $(element);
  			_.$slidesCache = null;
  			_.transformType = null;
  			_.transitionType = null;
  			_.visibilityChange = 'visibilitychange';
  			_.windowWidth = 0;
  			_.windowTimer = null;

  			dataSettings = $(element).data('slick') || {};

  			_.options = $.extend({}, _.defaults, settings, dataSettings);

  			_.currentSlide = _.options.initialSlide;

  			_.originalSettings = _.options;

  			if (typeof document.mozHidden !== 'undefined') {
  				_.hidden = 'mozHidden';
  				_.visibilityChange = 'mozvisibilitychange';
  			} else if (typeof document.webkitHidden !== 'undefined') {
  				_.hidden = 'webkitHidden';
  				_.visibilityChange = 'webkitvisibilitychange';
  			}

  			_.autoPlay = $.proxy(_.autoPlay, _);
  			_.autoPlayClear = $.proxy(_.autoPlayClear, _);
  			_.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
  			_.changeSlide = $.proxy(_.changeSlide, _);
  			_.clickHandler = $.proxy(_.clickHandler, _);
  			_.selectHandler = $.proxy(_.selectHandler, _);
  			_.setPosition = $.proxy(_.setPosition, _);
  			_.swipeHandler = $.proxy(_.swipeHandler, _);
  			_.dragHandler = $.proxy(_.dragHandler, _);
  			_.keyHandler = $.proxy(_.keyHandler, _);

  			_.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

Slick.prototype.activateADA = function() {
	var _ = this;

	_.$slideTrack.find('.slick-active').attr({
		'aria-hidden': 'false'
	}).find('a, input, button, select').attr({
		'tabindex': '0'
	});

};

Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

	var _ = this;

	if (typeof(index) === 'boolean') {
		addBefore = index;
		index = null;
	} else if (index < 0 || (index >= _.slideCount)) {
		return false;
	}

	_.unload();

	if (typeof(index) === 'number') {
		if (index === 0 && _.$slides.length === 0) {
			$(markup).appendTo(_.$slideTrack);
		} else if (addBefore) {
			$(markup).insertBefore(_.$slides.eq(index));
		} else {
			$(markup).insertAfter(_.$slides.eq(index));
		}
	} else {
		if (addBefore === true) {
			$(markup).prependTo(_.$slideTrack);
		} else {
			$(markup).appendTo(_.$slideTrack);
		}
	}

	_.$slides = _.$slideTrack.children(this.options.slide);

	_.$slideTrack.children(this.options.slide).detach();

	_.$slideTrack.append(_.$slides);

	_.$slides.each(function(index, element) {
		$(element).attr('data-slick-index', index);
	});

	_.$slidesCache = _.$slides;

	_.reinit();

};

Slick.prototype.animateHeight = function() {
	var _ = this;
	if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
		var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
		_.$list.animate({
			height: targetHeight
		}, _.options.speed);
	}
};

Slick.prototype.animateSlide = function(targetLeft, callback) {

	var animProps = {},
	_ = this;

	_.animateHeight();

	if (_.options.rtl === true && _.options.vertical === false) {
		targetLeft = -targetLeft;
	}
	if (_.transformsEnabled === false) {
		if (_.options.vertical === false) {
			_.$slideTrack.animate({
				left: targetLeft
			}, _.options.speed, _.options.easing, callback);
		} else {
			_.$slideTrack.animate({
				top: targetLeft
			}, _.options.speed, _.options.easing, callback);
		}

	} else {

		if (_.cssTransitions === false) {
			if (_.options.rtl === true) {
				_.currentLeft = -(_.currentLeft);
			}
			$({
				animStart: _.currentLeft
			}).animate({
				animStart: targetLeft
			}, {
				duration: _.options.speed,
				easing: _.options.easing,
				step: function(now) {
					now = Math.ceil(now);
					if (_.options.vertical === false) {
						animProps[_.animType] = 'translate(' +
						now + 'px, 0px)';
						_.$slideTrack.css(animProps);
					} else {
						animProps[_.animType] = 'translate(0px,' +
						now + 'px)';
						_.$slideTrack.css(animProps);
					}
				},
				complete: function() {
					if (callback) {
						callback.call();
					}
				}
			});

		} else {

			_.applyTransition();
			targetLeft = Math.ceil(targetLeft);

			if (_.options.vertical === false) {
				animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
			} else {
				animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
			}
			_.$slideTrack.css(animProps);

			if (callback) {
				setTimeout(function() {

					_.disableTransition();

					callback.call();
				}, _.options.speed);
			}

		}

	}

};

Slick.prototype.getNavTarget = function() {

	var _ = this,
	asNavFor = _.options.asNavFor;

	if ( asNavFor && asNavFor !== null ) {
		asNavFor = $(asNavFor).not(_.$slider);
	}

	return asNavFor;

};

Slick.prototype.asNavFor = function(index) {

	var _ = this,
	asNavFor = _.getNavTarget();

	if ( asNavFor !== null && typeof asNavFor === 'object' ) {
		asNavFor.each(function() {
			var target = $(this).slick('getSlick');
			if(!target.unslicked) {
				target.slideHandler(index, true);
			}
		});
	}

};

Slick.prototype.applyTransition = function(slide) {

	var _ = this,
	transition = {};

	if (_.options.fade === false) {
		transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
	} else {
		transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
	}

	if (_.options.fade === false) {
		_.$slideTrack.css(transition);
	} else {
		_.$slides.eq(slide).css(transition);
	}

};

Slick.prototype.autoPlay = function() {

	var _ = this;

	_.autoPlayClear();

	if ( _.slideCount > _.options.slidesToShow ) {
		_.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
	}

};

Slick.prototype.autoPlayClear = function() {

	var _ = this;

	if (_.autoPlayTimer) {
		clearInterval(_.autoPlayTimer);
	}

};

Slick.prototype.autoPlayIterator = function() {

	var _ = this,
	slideTo = _.currentSlide + _.options.slidesToScroll;

	if ( !_.paused && !_.interrupted && !_.focussed ) {

		if ( _.options.infinite === false ) {

			if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
				_.direction = 0;
			}

			else if ( _.direction === 0 ) {

				slideTo = _.currentSlide - _.options.slidesToScroll;

				if ( _.currentSlide - 1 === 0 ) {
					_.direction = 1;
				}

			}

		}

		_.slideHandler( slideTo );

	}

};

Slick.prototype.buildArrows = function() {

	var _ = this;

	if (_.options.arrows === true ) {

		_.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
		_.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

		if( _.slideCount > _.options.slidesToShow ) {

			_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
			_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

			if (_.htmlExpr.test(_.options.prevArrow)) {
				_.$prevArrow.prependTo(_.options.appendArrows);
			}

			if (_.htmlExpr.test(_.options.nextArrow)) {
				_.$nextArrow.appendTo(_.options.appendArrows);
			}

			if (_.options.infinite !== true) {
				_.$prevArrow
				.addClass('slick-disabled')
				.attr('aria-disabled', 'true');
			}

		} else {

			_.$prevArrow.add( _.$nextArrow )

			.addClass('slick-hidden')
			.attr({
				'aria-disabled': 'true',
				'tabindex': '-1'
			});

		}

	}

};

Slick.prototype.buildDots = function() {

	var _ = this,
	i, dot;

	if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

		_.$slider.addClass('slick-dotted');

		dot = $('<ul />').addClass(_.options.dotsClass);

		for (i = 0; i <= _.getDotCount(); i += 1) {
			dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
		}

		_.$dots = dot.appendTo(_.options.appendDots);

		_.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

	}

};

Slick.prototype.buildOut = function() {

	var _ = this;

	_.$slides =
	_.$slider
	.children( _.options.slide + ':not(.slick-cloned)')
	.addClass('slick-slide');

	_.slideCount = _.$slides.length;

	_.$slides.each(function(index, element) {
		$(element)
		.attr('data-slick-index', index)
		.data('originalStyling', $(element).attr('style') || '');
	});

	_.$slider.addClass('slick-slider');

	_.$slideTrack = (_.slideCount === 0) ?
	$('<div class="slick-track"/>').appendTo(_.$slider) :
	_.$slides.wrapAll('<div class="slick-track"/>').parent();

	_.$list = _.$slideTrack.wrap(
		'<div aria-live="polite" class="slick-list"/>').parent();
	_.$slideTrack.css('opacity', 0);

	if (_.options.centerMode === true || _.options.swipeToSlide === true) {
		_.options.slidesToScroll = 1;
	}

	$('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

	_.setupInfinite();

	_.buildArrows();

	_.buildDots();

	_.updateDots();


	_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

	if (_.options.draggable === true) {
		_.$list.addClass('draggable');
	}

};

Slick.prototype.buildRows = function() {

	var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

	newSlides = document.createDocumentFragment();
	originalSlides = _.$slider.children();

	if(_.options.rows > 1) {

		slidesPerSection = _.options.slidesPerRow * _.options.rows;
		numOfSlides = Math.ceil(
			originalSlides.length / slidesPerSection
			);

		for(a = 0; a < numOfSlides; a++){
			var slide = document.createElement('div');
			for(b = 0; b < _.options.rows; b++) {
				var row = document.createElement('div');
				for(c = 0; c < _.options.slidesPerRow; c++) {
					var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
					if (originalSlides.get(target)) {
						row.appendChild(originalSlides.get(target));
					}
				}
				slide.appendChild(row);
			}
			newSlides.appendChild(slide);
		}

		_.$slider.empty().append(newSlides);
		_.$slider.children().children().children()
		.css({
			'width':(100 / _.options.slidesPerRow) + '%',
			'display': 'inline-block'
		});

	}

};

Slick.prototype.checkResponsive = function(initial, forceUpdate) {

	var _ = this,
	breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
	var sliderWidth = _.$slider.width();
	var windowWidth = window.innerWidth || $(window).width();

	if (_.respondTo === 'window') {
		respondToWidth = windowWidth;
	} else if (_.respondTo === 'slider') {
		respondToWidth = sliderWidth;
	} else if (_.respondTo === 'min') {
		respondToWidth = Math.min(windowWidth, sliderWidth);
	}

	if ( _.options.responsive &&
		_.options.responsive.length &&
		_.options.responsive !== null) {

		targetBreakpoint = null;

		for (breakpoint in _.breakpoints) {
			if (_.breakpoints.hasOwnProperty(breakpoint)) {
				if (_.originalSettings.mobileFirst === false) {
					if (respondToWidth < _.breakpoints[breakpoint]) {
						targetBreakpoint = _.breakpoints[breakpoint];
					}
				} else {
					if (respondToWidth > _.breakpoints[breakpoint]) {
						targetBreakpoint = _.breakpoints[breakpoint];
					}
				}
			}
		}

		if (targetBreakpoint !== null) {
			if (_.activeBreakpoint !== null) {
				if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
					_.activeBreakpoint =
					targetBreakpoint;
					if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
						_.unslick(targetBreakpoint);
					} else {
						_.options = $.extend({}, _.originalSettings,
							_.breakpointSettings[
							targetBreakpoint]);
						if (initial === true) {
							_.currentSlide = _.options.initialSlide;
						}
						_.refresh(initial);
					}
					triggerBreakpoint = targetBreakpoint;
				}
			} else {
				_.activeBreakpoint = targetBreakpoint;
				if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
					_.unslick(targetBreakpoint);
				} else {
					_.options = $.extend({}, _.originalSettings,
						_.breakpointSettings[
						targetBreakpoint]);
					if (initial === true) {
						_.currentSlide = _.options.initialSlide;
					}
					_.refresh(initial);
				}
				triggerBreakpoint = targetBreakpoint;
			}
		} else {
			if (_.activeBreakpoint !== null) {
				_.activeBreakpoint = null;
				_.options = _.originalSettings;
				if (initial === true) {
					_.currentSlide = _.options.initialSlide;
				}
				_.refresh(initial);
				triggerBreakpoint = targetBreakpoint;
			}
		}

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
            	_.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

    	var _ = this,
    	$target = $(event.currentTarget),
    	indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
        	event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
        	$target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

        	case 'previous':
        		slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
        		if (_.slideCount > _.options.slidesToShow) {
        			_.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        		}
        		break;

        		case 'next':
        			slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
        			if (_.slideCount > _.options.slidesToShow) {
        				_.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        			}
        			break;

        			case 'index':
        				var index = event.data.index === 0 ? 0 :
        				event.data.index || $target.index() * _.options.slidesToScroll;

        				_.slideHandler(_.checkNavigable(index), false, dontAnimate);
        				$target.children().trigger('focus');
        				break;

        				default:
        					return;
        				}

        			};

        			Slick.prototype.checkNavigable = function(index) {

        				var _ = this,
        				navigables, prevNavigable;

        				navigables = _.getNavigableIndexes();
        				prevNavigable = 0;
        				if (index > navigables[navigables.length - 1]) {
        					index = navigables[navigables.length - 1];
        				} else {
        					for (var n in navigables) {
        						if (index < navigables[n]) {
        							index = prevNavigable;
        							break;
        						}
        						prevNavigable = navigables[n];
        					}
        				}

        				return index;
        			};

        			Slick.prototype.cleanUpEvents = function() {

        				var _ = this;

        				if (_.options.dots && _.$dots !== null) {

        					$('li', _.$dots)
        					.off('click.slick', _.changeSlide)
        					.off('mouseenter.slick', $.proxy(_.interrupt, _, true))
        					.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        				}

        				_.$slider.off('focus.slick blur.slick');

        				if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        					_.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
        					_.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        				}

        				_.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        				_.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        				_.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        				_.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        				_.$list.off('click.slick', _.clickHandler);

        				$(document).off(_.visibilityChange, _.visibility);

        				_.cleanUpSlideEvents();

        				if (_.options.accessibility === true) {
        					_.$list.off('keydown.slick', _.keyHandler);
        				}

        				if (_.options.focusOnSelect === true) {
        					$(_.$slideTrack).children().off('click.slick', _.selectHandler);
        				}

        				$(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        				$(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        				$('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        				$(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

        			};

        			Slick.prototype.cleanUpSlideEvents = function() {

        				var _ = this;

        				_.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        				_.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        			};

        			Slick.prototype.cleanUpRows = function() {

        				var _ = this, originalSlides;

        				if(_.options.rows > 1) {
        					originalSlides = _.$slides.children().children();
        					originalSlides.removeAttr('style');
        					_.$slider.empty().append(originalSlides);
        				}

        			};

        			Slick.prototype.clickHandler = function(event) {

        				var _ = this;

        				if (_.shouldClick === false) {
        					event.stopImmediatePropagation();
        					event.stopPropagation();
        					event.preventDefault();
        				}

        			};

        			Slick.prototype.destroy = function(refresh) {

        				var _ = this;

        				_.autoPlayClear();

        				_.touchObject = {};

        				_.cleanUpEvents();

        				$('.slick-cloned', _.$slider).detach();

        				if (_.$dots) {
        					_.$dots.remove();
        				}

        				if ( _.$prevArrow && _.$prevArrow.length ) {

        					_.$prevArrow
        					.removeClass('slick-disabled slick-arrow slick-hidden')
        					.removeAttr('aria-hidden aria-disabled tabindex')
        					.css('display','');

        					if ( _.htmlExpr.test( _.options.prevArrow )) {
        						_.$prevArrow.remove();
        					}
        				}

        				if ( _.$nextArrow && _.$nextArrow.length ) {

        					_.$nextArrow
        					.removeClass('slick-disabled slick-arrow slick-hidden')
        					.removeAttr('aria-hidden aria-disabled tabindex')
        					.css('display','');

        					if ( _.htmlExpr.test( _.options.nextArrow )) {
        						_.$nextArrow.remove();
        					}
        				}


        				if (_.$slides) {

        					_.$slides
        					.removeClass('slick-slide slick-active slick-center slick-visible slick-current')
        					.removeAttr('aria-hidden')
        					.removeAttr('data-slick-index')
        					.each(function(){
        						$(this).attr('style', $(this).data('originalStyling'));
        					});

        					_.$slideTrack.children(this.options.slide).detach();

        					_.$slideTrack.detach();

        					_.$list.detach();

        					_.$slider.append(_.$slides);
        				}

        				_.cleanUpRows();

        				_.$slider.removeClass('slick-slider');
        				_.$slider.removeClass('slick-initialized');
        				_.$slider.removeClass('slick-dotted');

        				_.unslicked = true;

        				if(!refresh) {
        					_.$slider.trigger('destroy', [_]);
        				}

        			};

        			Slick.prototype.disableTransition = function(slide) {

        				var _ = this,
        				transition = {};

        				transition[_.transitionType] = '';

        				if (_.options.fade === false) {
        					_.$slideTrack.css(transition);
        				} else {
        					_.$slides.eq(slide).css(transition);
        				}

        			};

        			Slick.prototype.fadeSlide = function(slideIndex, callback) {

        				var _ = this;

        				if (_.cssTransitions === false) {

        					_.$slides.eq(slideIndex).css({
        						zIndex: _.options.zIndex
        					});

        					_.$slides.eq(slideIndex).animate({
        						opacity: 1
        					}, _.options.speed, _.options.easing, callback);

        				} else {

        					_.applyTransition(slideIndex);

        					_.$slides.eq(slideIndex).css({
        						opacity: 1,
        						zIndex: _.options.zIndex
        					});

        					if (callback) {
        						setTimeout(function() {

        							_.disableTransition(slideIndex);

        							callback.call();
        						}, _.options.speed);
        					}

        				}

        			};

        			Slick.prototype.fadeSlideOut = function(slideIndex) {

        				var _ = this;

        				if (_.cssTransitions === false) {

        					_.$slides.eq(slideIndex).animate({
        						opacity: 0,
        						zIndex: _.options.zIndex - 2
        					}, _.options.speed, _.options.easing);

        				} else {

        					_.applyTransition(slideIndex);

        					_.$slides.eq(slideIndex).css({
        						opacity: 0,
        						zIndex: _.options.zIndex - 2
        					});

        				}

        			};

        			Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        				var _ = this;

        				if (filter !== null) {

        					_.$slidesCache = _.$slides;

        					_.unload();

        					_.$slideTrack.children(this.options.slide).detach();

        					_.$slidesCache.filter(filter).appendTo(_.$slideTrack);

        					_.reinit();

        				}

        			};

        			Slick.prototype.focusHandler = function() {

        				var _ = this;

        				_.$slider
        				.off('focus.slick blur.slick')
        				.on('focus.slick blur.slick',
        					'*:not(.slick-arrow)', function(event) {

        						event.stopImmediatePropagation();
        						var $sf = $(this);

        						setTimeout(function() {

        							if( _.options.pauseOnFocus ) {
        								_.focussed = $sf.is(':focus');
        								_.autoPlay();
        							}

        						}, 0);

        					});
        			};

        			Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        				var _ = this;
        				return _.currentSlide;

        			};

        			Slick.prototype.getDotCount = function() {

        				var _ = this;

        				var breakPoint = 0;
        				var counter = 0;
        				var pagerQty = 0;

        				if (_.options.infinite === true) {
        					while (breakPoint < _.slideCount) {
        						++pagerQty;
        						breakPoint = counter + _.options.slidesToScroll;
        						counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        					}
        				} else if (_.options.centerMode === true) {
        					pagerQty = _.slideCount;
        				} else if(!_.options.asNavFor) {
        					pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        				}else {
        					while (breakPoint < _.slideCount) {
        						++pagerQty;
        						breakPoint = counter + _.options.slidesToScroll;
        						counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        					}
        				}

        				return pagerQty - 1;

        			};

        			Slick.prototype.getLeft = function(slideIndex) {

        				var _ = this,
        				targetLeft,
        				verticalHeight,
        				verticalOffset = 0,
        				targetSlide;

        				_.slideOffset = 0;
        				verticalHeight = _.$slides.first().outerHeight(true);

        				if (_.options.infinite === true) {
        					if (_.slideCount > _.options.slidesToShow) {
        						_.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
        						verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
        					}
        					if (_.slideCount % _.options.slidesToScroll !== 0) {
        						if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
        							if (slideIndex > _.slideCount) {
        								_.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
        								verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
        							} else {
        								_.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
        								verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
        							}
        						}
        					}
        				} else {
        					if (slideIndex + _.options.slidesToShow > _.slideCount) {
        						_.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
        						verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
        					}
        				}

        				if (_.slideCount <= _.options.slidesToShow) {
        					_.slideOffset = 0;
        					verticalOffset = 0;
        				}

        				if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
        					_.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        				} else if (_.options.centerMode === true && _.options.infinite === true) {
        					_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        				} else if (_.options.centerMode === true) {
        					_.slideOffset = 0;
        					_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        				}

        				if (_.options.vertical === false) {
        					targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        				} else {
        					targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        				}

        				if (_.options.variableWidth === true) {

        					if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        						targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        					} else {
        						targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
        					}

        					if (_.options.rtl === true) {
        						if (targetSlide[0]) {
        							targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        						} else {
        							targetLeft =  0;
        						}
        					} else {
        						targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        					}

        					if (_.options.centerMode === true) {
        						if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        							targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        						} else {
        							targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        						}

        						if (_.options.rtl === true) {
        							if (targetSlide[0]) {
        								targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        							} else {
        								targetLeft =  0;
        							}
        						} else {
        							targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        						}

        						targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
        					}
        				}

        				return targetLeft;

        			};

        			Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        				var _ = this;

        				return _.options[option];

        			};

        			Slick.prototype.getNavigableIndexes = function() {

        				var _ = this,
        				breakPoint = 0,
        				counter = 0,
        				indexes = [],
        				max;

        				if (_.options.infinite === false) {
        					max = _.slideCount;
        				} else {
        					breakPoint = _.options.slidesToScroll * -1;
        					counter = _.options.slidesToScroll * -1;
        					max = _.slideCount * 2;
        				}

        				while (breakPoint < max) {
        					indexes.push(breakPoint);
        					breakPoint = counter + _.options.slidesToScroll;
        					counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        				}

        				return indexes;

        			};

        			Slick.prototype.getSlick = function() {

        				return this;

        			};

        			Slick.prototype.getSlideCount = function() {

        				var _ = this,
        				slidesTraversed, swipedSlide, centerOffset;

        				centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        				if (_.options.swipeToSlide === true) {
        					_.$slideTrack.find('.slick-slide').each(function(index, slide) {
        						if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
        							swipedSlide = slide;
        							return false;
        						}
        					});

        					slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

        					return slidesTraversed;

        				} else {
        					return _.options.slidesToScroll;
        				}

        			};

        			Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        				var _ = this;

        				_.changeSlide({
        					data: {
        						message: 'index',
        						index: parseInt(slide)
        					}
        				}, dontAnimate);

        			};

        			Slick.prototype.init = function(creation) {

        				var _ = this;

        				if (!$(_.$slider).hasClass('slick-initialized')) {

        					$(_.$slider).addClass('slick-initialized');

        					_.buildRows();
        					_.buildOut();
        					_.setProps();
        					_.startLoad();
        					_.loadSlider();
        					_.initializeEvents();
        					_.updateArrows();
        					_.updateDots();
        					_.checkResponsive(true);
        					_.focusHandler();

        				}

        				if (creation) {
        					_.$slider.trigger('init', [_]);
        				}

        				if (_.options.accessibility === true) {
        					_.initADA();
        				}

        				if ( _.options.autoplay ) {

        					_.paused = false;
        					_.autoPlay();

        				}

        			};

        			Slick.prototype.initADA = function() {
        				var _ = this;
        				_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
        					'aria-hidden': 'true',
        					'tabindex': '-1'
        				}).find('a, input, button, select').attr({
        					'tabindex': '-1'
        				});

        				_.$slideTrack.attr('role', 'listbox');

        				_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
        					$(this).attr('role', 'option');

            //Evenly distribute aria-describedby tags through available dots.
            var describedBySlideId = _.options.centerMode ? i : Math.floor(i / _.options.slidesToShow);

            if (_.options.dots === true) {
            	$(this).attr('aria-describedby', 'slick-slide' + _.instanceUid + describedBySlideId + '');
            }
        });

        				if (_.$dots !== null) {
        					_.$dots.attr('role', 'tablist').find('li').each(function(i) {
        						$(this).attr({
        							'role': 'presentation',
        							'aria-selected': 'false',
        							'aria-controls': 'navigation' + _.instanceUid + i + '',
        							'id': 'slick-slide' + _.instanceUid + i + ''
        						});
        					})
        					.first().attr('aria-selected', 'true').end()
        					.find('button').attr('role', 'button').end()
        					.closest('div').attr('role', 'toolbar');
        				}
        				_.activateADA();

        			};

        			Slick.prototype.initArrowEvents = function() {

        				var _ = this;

        				if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
        					_.$prevArrow
        					.off('click.slick')
        					.on('click.slick', {
        						message: 'previous'
        					}, _.changeSlide);
        					_.$nextArrow
        					.off('click.slick')
        					.on('click.slick', {
        						message: 'next'
        					}, _.changeSlide);
        				}

        			};

        			Slick.prototype.initDotEvents = function() {

        				var _ = this;

        				if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
        					$('li', _.$dots).on('click.slick', {
        						message: 'index'
        					}, _.changeSlide);
        				}

        				if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

        					$('li', _.$dots)
        					.on('mouseenter.slick', $.proxy(_.interrupt, _, true))
        					.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        				}

        			};

        			Slick.prototype.initSlideEvents = function() {

        				var _ = this;

        				if ( _.options.pauseOnHover ) {

        					_.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
        					_.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        				}

        			};

        			Slick.prototype.initializeEvents = function() {

        				var _ = this;

        				_.initArrowEvents();

        				_.initDotEvents();
        				_.initSlideEvents();

        				_.$list.on('touchstart.slick mousedown.slick', {
        					action: 'start'
        				}, _.swipeHandler);
        				_.$list.on('touchmove.slick mousemove.slick', {
        					action: 'move'
        				}, _.swipeHandler);
        				_.$list.on('touchend.slick mouseup.slick', {
        					action: 'end'
        				}, _.swipeHandler);
        				_.$list.on('touchcancel.slick mouseleave.slick', {
        					action: 'end'
        				}, _.swipeHandler);

        				_.$list.on('click.slick', _.clickHandler);

        				$(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        				if (_.options.accessibility === true) {
        					_.$list.on('keydown.slick', _.keyHandler);
        				}

        				if (_.options.focusOnSelect === true) {
        					$(_.$slideTrack).children().on('click.slick', _.selectHandler);
        				}

        				$(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        				$(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        				$('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        				$(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        				$(_.setPosition);

        			};

        			Slick.prototype.initUI = function() {

        				var _ = this;

        				if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

        					_.$prevArrow.show();
        					_.$nextArrow.show();

        				}

        				if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

        					_.$dots.show();

        				}

        			};

        			Slick.prototype.keyHandler = function(event) {

        				var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
         if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
         	if (event.keyCode === 37 && _.options.accessibility === true) {
         		_.changeSlide({
         			data: {
         				message: _.options.rtl === true ? 'next' :  'previous'
         			}
         		});
         	} else if (event.keyCode === 39 && _.options.accessibility === true) {
         		_.changeSlide({
         			data: {
         				message: _.options.rtl === true ? 'previous' : 'next'
         			}
         		});
         	}
         }

     };

     Slick.prototype.lazyLoad = function() {

     	var _ = this,
     	loadRange, cloneRange, rangeStart, rangeEnd;

     	function loadImages(imagesScope) {

     		$('img[data-lazy]', imagesScope).each(function() {

     			var image = $(this),
     			imageSource = $(this).attr('data-lazy'),
     			imageSrcSet = $(this).attr('data-srcset'),
     			imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
     			imageToLoad = document.createElement('img');

     			imageToLoad.onload = function() {

     				image
     				.animate({ opacity: 0 }, 100, function() {

     					if (imageSrcSet) {
     						image
     						.attr('srcset', imageSrcSet );

     						if (imageSizes) {
     							image
     							.attr('sizes', imageSizes );
     						}
     					}

     					image
     					.attr('src', imageSource)
     					.animate({ opacity: 1 }, 200, function() {
     						image
     						.removeAttr('data-lazy data-srcset data-sizes')
     						.removeClass('slick-loading');
     					});
     					_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
     				});

     			};

     			imageToLoad.onerror = function() {

     				image
     				.removeAttr( 'data-lazy' )
     				.removeClass( 'slick-loading' )
     				.addClass( 'slick-lazyload-error' );

     				_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

     			};

     			imageToLoad.src = imageSource;

     		});

     	}

     	if (_.options.centerMode === true) {
     		if (_.options.infinite === true) {
     			rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
     			rangeEnd = rangeStart + _.options.slidesToShow + 2;
     		} else {
     			rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
     			rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
     		}
     	} else {
     		rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
     		rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
     		if (_.options.fade === true) {
     			if (rangeStart > 0) rangeStart--;
     				if (rangeEnd <= _.slideCount) rangeEnd++;
     				}
     			}

     			loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

     			if (_.options.lazyLoad === 'anticipated') {
     				var prevSlide = rangeStart - 1,
     				nextSlide = rangeEnd,
     				$slides = _.$slider.find('.slick-slide');

     				for (var i = 0; i < _.options.slidesToScroll; i++) {
     					if (prevSlide < 0) prevSlide = _.slideCount - 1;
     						loadRange = loadRange.add($slides.eq(prevSlide));
     						loadRange = loadRange.add($slides.eq(nextSlide));
     						prevSlide--;
     						nextSlide++;
     					}
     				}

     				loadImages(loadRange);

     				if (_.slideCount <= _.options.slidesToShow) {
     					cloneRange = _.$slider.find('.slick-slide');
     					loadImages(cloneRange);
     				} else
     					if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
     						cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
     						loadImages(cloneRange);
     					} else if (_.currentSlide === 0) {
     						cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
     						loadImages(cloneRange);
     					}

     				};

     				Slick.prototype.loadSlider = function() {

     					var _ = this;

     					_.setPosition();

     					_.$slideTrack.css({
     						opacity: 1
     					});

     					_.$slider.removeClass('slick-loading');

     					_.initUI();

     					if (_.options.lazyLoad === 'progressive') {
     						_.progressiveLazyLoad();
     					}

     				};

     				Slick.prototype.next = Slick.prototype.slickNext = function() {

     					var _ = this;

     					_.changeSlide({
     						data: {
     							message: 'next'
     						}
     					});

     				};

     				Slick.prototype.orientationChange = function() {

     					var _ = this;

     					_.checkResponsive();
     					_.setPosition();

     				};

     				Slick.prototype.pause = Slick.prototype.slickPause = function() {

     					var _ = this;

     					_.autoPlayClear();
     					_.paused = true;

     				};

     				Slick.prototype.play = Slick.prototype.slickPlay = function() {

     					var _ = this;

     					_.autoPlay();
     					_.options.autoplay = true;
     					_.paused = false;
     					_.focussed = false;
     					_.interrupted = false;

     				};

     				Slick.prototype.postSlide = function(index) {

     					var _ = this;

     					if( !_.unslicked ) {

     						_.$slider.trigger('afterChange', [_, index]);

     						_.animating = false;

     						_.setPosition();

     						_.swipeLeft = null;

     						if ( _.options.autoplay ) {
     							_.autoPlay();
     						}

     						if (_.options.accessibility === true) {
     							_.initADA();
     						}

     					}

     				};

     				Slick.prototype.prev = Slick.prototype.slickPrev = function() {

     					var _ = this;

     					_.changeSlide({
     						data: {
     							message: 'previous'
     						}
     					});

     				};

     				Slick.prototype.preventDefault = function(event) {

     					event.preventDefault();

     				};

     				Slick.prototype.progressiveLazyLoad = function( tryCount ) {

     					tryCount = tryCount || 1;

     					var _ = this,
     					$imgsToLoad = $( 'img[data-lazy]', _.$slider ),
     					image,
     					imageSource,
     					imageSrcSet,
     					imageSizes,
     					imageToLoad;

     					if ( $imgsToLoad.length ) {

     						image = $imgsToLoad.first();
     						imageSource = image.attr('data-lazy');
     						imageSrcSet = image.attr('data-srcset');
     						imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
     						imageToLoad = document.createElement('img');

     						imageToLoad.onload = function() {

     							if (imageSrcSet) {
     								image
     								.attr('srcset', imageSrcSet );

     								if (imageSizes) {
     									image
     									.attr('sizes', imageSizes );
     								}
     							}

     							image
     							.attr( 'src', imageSource )
     							.removeAttr('data-lazy data-srcset data-sizes')
     							.removeClass('slick-loading');

     							if ( _.options.adaptiveHeight === true ) {
     								_.setPosition();
     							}

     							_.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
     							_.progressiveLazyLoad();

     						};

     						imageToLoad.onerror = function() {

     							if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                     setTimeout( function() {
                     	_.progressiveLazyLoad( tryCount + 1 );
                     }, 500 );

                 } else {

                 	image
                 	.removeAttr( 'data-lazy' )
                 	.removeClass( 'slick-loading' )
                 	.addClass( 'slick-lazyload-error' );

                 	_.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                 	_.progressiveLazyLoad();

                 }

             };

             imageToLoad.src = imageSource;

         } else {

         	_.$slider.trigger('allImagesLoaded', [ _ ]);

         }

     };

     Slick.prototype.refresh = function( initializing ) {

     	var _ = this, currentSlide, lastVisibleIndex;

     	lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
        	_.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
        	_.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

        	_.changeSlide({
        		data: {
        			message: 'index',
        			index: currentSlide
        		}
        	}, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

    	var _ = this, breakpoint, currentBreakpoint, l,
    	responsiveSettings = _.options.responsive || null;

    	if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

    		_.respondTo = _.options.respondTo || 'window';

    		for ( breakpoint in responsiveSettings ) {

    			l = _.breakpoints.length-1;

    			if (responsiveSettings.hasOwnProperty(breakpoint)) {
    				currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                    	if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                    		_.breakpoints.splice(l,1);
                    	}
                    	l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
            	return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

    	var _ = this;

    	_.$slides =
    	_.$slideTrack
    	.children(_.options.slide)
    	.addClass('slick-slide');

    	_.slideCount = _.$slides.length;

    	if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
    		_.currentSlide = _.currentSlide - _.options.slidesToScroll;
    	}

    	if (_.slideCount <= _.options.slidesToShow) {
    		_.currentSlide = 0;
    	}

    	_.registerBreakpoints();

    	_.setProps();
    	_.setupInfinite();
    	_.buildArrows();
    	_.updateArrows();
    	_.initArrowEvents();
    	_.buildDots();
    	_.updateDots();
    	_.initDotEvents();
    	_.cleanUpSlideEvents();
    	_.initSlideEvents();

    	_.checkResponsive(false, true);

    	if (_.options.focusOnSelect === true) {
    		$(_.$slideTrack).children().on('click.slick', _.selectHandler);
    	}

    	_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    	_.setPosition();
    	_.focusHandler();

    	_.paused = !_.options.autoplay;
    	_.autoPlay();

    	_.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

    	var _ = this;

    	if ($(window).width() !== _.windowWidth) {
    		clearTimeout(_.windowDelay);
    		_.windowDelay = window.setTimeout(function() {
    			_.windowWidth = $(window).width();
    			_.checkResponsive();
    			if( !_.unslicked ) { _.setPosition(); }
    			}, 50);
    	}
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

    	var _ = this;

    	if (typeof(index) === 'boolean') {
    		removeBefore = index;
    		index = removeBefore === true ? 0 : _.slideCount - 1;
    	} else {
    		index = removeBefore === true ? --index : index;
    	}

    	if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
    		return false;
    	}

    	_.unload();

    	if (removeAll === true) {
    		_.$slideTrack.children().remove();
    	} else {
    		_.$slideTrack.children(this.options.slide).eq(index).remove();
    	}

    	_.$slides = _.$slideTrack.children(this.options.slide);

    	_.$slideTrack.children(this.options.slide).detach();

    	_.$slideTrack.append(_.$slides);

    	_.$slidesCache = _.$slides;

    	_.reinit();

    };

    Slick.prototype.setCSS = function(position) {

    	var _ = this,
    	positionProps = {},
    	x, y;

    	if (_.options.rtl === true) {
    		position = -position;
    	}
    	x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    	y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

    	positionProps[_.positionProp] = position;

    	if (_.transformsEnabled === false) {
    		_.$slideTrack.css(positionProps);
    	} else {
    		positionProps = {};
    		if (_.cssTransitions === false) {
    			positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
    			_.$slideTrack.css(positionProps);
    		} else {
    			positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
    			_.$slideTrack.css(positionProps);
    		}
    	}

    };

    Slick.prototype.setDimensions = function() {

    	var _ = this;

    	if (_.options.vertical === false) {
    		if (_.options.centerMode === true) {
    			_.$list.css({
    				padding: ('0px ' + _.options.centerPadding)
    			});
    		}
    	} else {
    		_.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
    		if (_.options.centerMode === true) {
    			_.$list.css({
    				padding: (_.options.centerPadding + ' 0px')
    			});
    		}
    	}

    	_.listWidth = _.$list.width();
    	_.listHeight = _.$list.height();


    	if (_.options.vertical === false && _.options.variableWidth === false) {
    		_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
    		_.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

    	} else if (_.options.variableWidth === true) {
    		_.$slideTrack.width(5000 * _.slideCount);
    	} else {
    		_.slideWidth = Math.ceil(_.listWidth);
    		_.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
    	}

    	var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    	if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    	};

    	Slick.prototype.setFade = function() {

    		var _ = this,
    		targetLeft;

    		_.$slides.each(function(index, element) {
    			targetLeft = (_.slideWidth * index) * -1;
    			if (_.options.rtl === true) {
    				$(element).css({
    					position: 'relative',
    					right: targetLeft,
    					top: 0,
    					zIndex: _.options.zIndex - 2,
    					opacity: 0
    				});
    			} else {
    				$(element).css({
    					position: 'relative',
    					left: targetLeft,
    					top: 0,
    					zIndex: _.options.zIndex - 2,
    					opacity: 0
    				});
    			}
    		});

    		_.$slides.eq(_.currentSlide).css({
    			zIndex: _.options.zIndex - 1,
    			opacity: 1
    		});

    	};

    	Slick.prototype.setHeight = function() {

    		var _ = this;

    		if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
    			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
    			_.$list.css('height', targetHeight);
    		}

    	};

    	Slick.prototype.setOption =
    	Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

         var _ = this, l, item, option, value, refresh = false, type;

         if( $.type( arguments[0] ) === 'object' ) {

         	option =  arguments[0];
         	refresh = arguments[1];
         	type = 'multiple';

         } else if ( $.type( arguments[0] ) === 'string' ) {

         	option =  arguments[0];
         	value = arguments[1];
         	refresh = arguments[2];

         	if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

         		type = 'responsive';

         	} else if ( typeof arguments[1] !== 'undefined' ) {

         		type = 'single';

         	}

         }

         if ( type === 'single' ) {

         	_.options[option] = value;


         } else if ( type === 'multiple' ) {

         	$.each( option , function( opt, val ) {

         		_.options[opt] = val;

         	});


         } else if ( type === 'responsive' ) {

         	for ( item in value ) {

         		if( $.type( _.options.responsive ) !== 'array' ) {

         			_.options.responsive = [ value[item] ];

         		} else {

         			l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                    	if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                    		_.options.responsive.splice(l,1);

                    	}

                    	l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

        	_.unload();
        	_.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

    	var _ = this;

    	_.setDimensions();

    	_.setHeight();

    	if (_.options.fade === false) {
    		_.setCSS(_.getLeft(_.currentSlide));
    	} else {
    		_.setFade();
    	}

    	_.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

    	var _ = this,
    	bodyStyle = document.body.style;

    	_.positionProp = _.options.vertical === true ? 'top' : 'left';

    	if (_.positionProp === 'top') {
    		_.$slider.addClass('slick-vertical');
    	} else {
    		_.$slider.removeClass('slick-vertical');
    	}

    	if (bodyStyle.WebkitTransition !== undefined ||
    		bodyStyle.MozTransition !== undefined ||
    		bodyStyle.msTransition !== undefined) {
    		if (_.options.useCSS === true) {
    			_.cssTransitions = true;
    		}
    	}

    	if ( _.options.fade ) {
    		if ( typeof _.options.zIndex === 'number' ) {
    			if( _.options.zIndex < 3 ) {
    				_.options.zIndex = 3;
    			}
    		} else {
    			_.options.zIndex = _.defaults.zIndex;
    		}
    	}

    	if (bodyStyle.OTransform !== undefined) {
    		_.animType = 'OTransform';
    		_.transformType = '-o-transform';
    		_.transitionType = 'OTransition';
    		if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    		}
    		if (bodyStyle.MozTransform !== undefined) {
    			_.animType = 'MozTransform';
    			_.transformType = '-moz-transform';
    			_.transitionType = 'MozTransition';
    			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    			}
    			if (bodyStyle.webkitTransform !== undefined) {
    				_.animType = 'webkitTransform';
    				_.transformType = '-webkit-transform';
    				_.transitionType = 'webkitTransition';
    				if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    				}
    				if (bodyStyle.msTransform !== undefined) {
    					_.animType = 'msTransform';
    					_.transformType = '-ms-transform';
    					_.transitionType = 'msTransition';
    					if (bodyStyle.msTransform === undefined) _.animType = false;
    					}
    					if (bodyStyle.transform !== undefined && _.animType !== false) {
    						_.animType = 'transform';
    						_.transformType = 'transform';
    						_.transitionType = 'transition';
    					}
    					_.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    				};


    				Slick.prototype.setSlideClasses = function(index) {

    					var _ = this,
    					centerOffset, allSlides, indexOffset, remainder;

    					allSlides = _.$slider
    					.find('.slick-slide')
    					.removeClass('slick-active slick-center slick-current')
    					.attr('aria-hidden', 'true');

    					_.$slides
    					.eq(index)
    					.addClass('slick-current');

    					if (_.options.centerMode === true) {

    						centerOffset = Math.floor(_.options.slidesToShow / 2);

    						if (_.options.infinite === true) {

    							if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

    								_.$slides
    								.slice(index - centerOffset, index + centerOffset + 1)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							} else {

    								indexOffset = _.options.slidesToShow + index;
    								allSlides
    								.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							}

    							if (index === 0) {

    								allSlides
    								.eq(allSlides.length - 1 - _.options.slidesToShow)
    								.addClass('slick-center');

    							} else if (index === _.slideCount - 1) {

    								allSlides
    								.eq(_.options.slidesToShow)
    								.addClass('slick-center');

    							}

    						}

    						_.$slides
    						.eq(index)
    						.addClass('slick-center');

    					} else {

    						if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

    							_.$slides
    							.slice(index, index + _.options.slidesToShow)
    							.addClass('slick-active')
    							.attr('aria-hidden', 'false');

    						} else if (allSlides.length <= _.options.slidesToShow) {

    							allSlides
    							.addClass('slick-active')
    							.attr('aria-hidden', 'false');

    						} else {

    							remainder = _.slideCount % _.options.slidesToShow;
    							indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

    							if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

    								allSlides
    								.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							} else {

    								allSlides
    								.slice(indexOffset, indexOffset + _.options.slidesToShow)
    								.addClass('slick-active')
    								.attr('aria-hidden', 'false');

    							}

    						}

    					}

    					if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
    						_.lazyLoad();
    					}
    				};

    				Slick.prototype.setupInfinite = function() {

    					var _ = this,
    					i, slideIndex, infiniteCount;

    					if (_.options.fade === true) {
    						_.options.centerMode = false;
    					}

    					if (_.options.infinite === true && _.options.fade === false) {

    						slideIndex = null;

    						if (_.slideCount > _.options.slidesToShow) {

    							if (_.options.centerMode === true) {
    								infiniteCount = _.options.slidesToShow + 1;
    							} else {
    								infiniteCount = _.options.slidesToShow;
    							}

    							for (i = _.slideCount; i > (_.slideCount -
    								infiniteCount); i -= 1) {
    								slideIndex = i - 1;
    								$(_.$slides[slideIndex]).clone(true).attr('id', '')
    								.attr('data-slick-index', slideIndex - _.slideCount)
    								.prependTo(_.$slideTrack).addClass('slick-cloned');
    							}
    							for (i = 0; i < infiniteCount; i += 1) {
    								slideIndex = i;
    								$(_.$slides[slideIndex]).clone(true).attr('id', '')
    								.attr('data-slick-index', slideIndex + _.slideCount)
    								.appendTo(_.$slideTrack).addClass('slick-cloned');
    							}
    							_.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
    								$(this).attr('id', '');
    							});

    						}

    					}

    				};

    				Slick.prototype.interrupt = function( toggle ) {

    					var _ = this;

    					if( !toggle ) {
    						_.autoPlay();
    					}
    					_.interrupted = toggle;

    				};

    				Slick.prototype.selectHandler = function(event) {

    					var _ = this;

    					var targetElement =
    					$(event.target).is('.slick-slide') ?
    					$(event.target) :
    					$(event.target).parents('.slick-slide');

    					var index = parseInt(targetElement.attr('data-slick-index'));

    					if (!index) index = 0;

    						if (_.slideCount <= _.options.slidesToShow) {

    							_.setSlideClasses(index);
    							_.asNavFor(index);
    							return;

    						}

    						_.slideHandler(index);

    					};

    					Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

    						var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
    						_ = this, navTarget;

    						sync = sync || false;

    						if (_.animating === true && _.options.waitForAnimate === true) {
    							return;
    						}

    						if (_.options.fade === true && _.currentSlide === index) {
    							return;
    						}

    						if (_.slideCount <= _.options.slidesToShow) {
    							return;
    						}

    						if (sync === false) {
    							_.asNavFor(index);
    						}

    						targetSlide = index;
    						targetLeft = _.getLeft(targetSlide);
    						slideLeft = _.getLeft(_.currentSlide);

    						_.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    						if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
    							if (_.options.fade === false) {
    								targetSlide = _.currentSlide;
    								if (dontAnimate !== true) {
    									_.animateSlide(slideLeft, function() {
    										_.postSlide(targetSlide);
    									});
    								} else {
    									_.postSlide(targetSlide);
    								}
    							}
    							return;
    						} else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
    							if (_.options.fade === false) {
    								targetSlide = _.currentSlide;
    								if (dontAnimate !== true) {
    									_.animateSlide(slideLeft, function() {
    										_.postSlide(targetSlide);
    									});
    								} else {
    									_.postSlide(targetSlide);
    								}
    							}
    							return;
    						}

    						if ( _.options.autoplay ) {
    							clearInterval(_.autoPlayTimer);
    						}

    						if (targetSlide < 0) {
    							if (_.slideCount % _.options.slidesToScroll !== 0) {
    								animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
    							} else {
    								animSlide = _.slideCount + targetSlide;
    							}
    						} else if (targetSlide >= _.slideCount) {
    							if (_.slideCount % _.options.slidesToScroll !== 0) {
    								animSlide = 0;
    							} else {
    								animSlide = targetSlide - _.slideCount;
    							}
    						} else {
    							animSlide = targetSlide;
    						}

    						_.animating = true;

    						_.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    						oldSlide = _.currentSlide;
    						_.currentSlide = animSlide;

    						_.setSlideClasses(_.currentSlide);

    						if ( _.options.asNavFor ) {

    							navTarget = _.getNavTarget();
    							navTarget = navTarget.slick('getSlick');

    							if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
    								navTarget.setSlideClasses(_.currentSlide);
    							}

    						}

    						_.updateDots();
    						_.updateArrows();

    						if (_.options.fade === true) {
    							if (dontAnimate !== true) {

    								_.fadeSlideOut(oldSlide);

    								_.fadeSlide(animSlide, function() {
    									_.postSlide(animSlide);
    								});

    							} else {
    								_.postSlide(animSlide);
    							}
    							_.animateHeight();
    							return;
    						}

    						if (dontAnimate !== true) {
    							_.animateSlide(targetLeft, function() {
    								_.postSlide(animSlide);
    							});
    						} else {
    							_.postSlide(animSlide);
    						}

    					};

    					Slick.prototype.startLoad = function() {

    						var _ = this;

    						if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

    							_.$prevArrow.hide();
    							_.$nextArrow.hide();

    						}

    						if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

    							_.$dots.hide();

    						}

    						_.$slider.addClass('slick-loading');

    					};

    					Slick.prototype.swipeDirection = function() {

    						var xDist, yDist, r, swipeAngle, _ = this;

    						xDist = _.touchObject.startX - _.touchObject.curX;
    						yDist = _.touchObject.startY - _.touchObject.curY;
    						r = Math.atan2(yDist, xDist);

    						swipeAngle = Math.round(r * 180 / Math.PI);
    						if (swipeAngle < 0) {
    							swipeAngle = 360 - Math.abs(swipeAngle);
    						}

    						if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
    							return (_.options.rtl === false ? 'left' : 'right');
    						}
    						if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
    							return (_.options.rtl === false ? 'left' : 'right');
    						}
    						if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
    							return (_.options.rtl === false ? 'right' : 'left');
    						}
    						if (_.options.verticalSwiping === true) {
    							if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
    								return 'down';
    							} else {
    								return 'up';
    							}
    						}

    						return 'vertical';

    					};

    					Slick.prototype.swipeEnd = function(event) {

    						var _ = this,
    						slideCount,
    						direction;

    						_.dragging = false;
    						_.swiping = false;

    						if (_.scrolling) {
    							_.scrolling = false;
    							return false;
    						}

    						_.interrupted = false;
    						_.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

    						if ( _.touchObject.curX === undefined ) {
    							return false;
    						}

    						if ( _.touchObject.edgeHit === true ) {
    							_.$slider.trigger('edge', [_, _.swipeDirection() ]);
    						}

    						if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

    							direction = _.swipeDirection();

    							switch ( direction ) {

    								case 'left':
    									case 'down':

    										slideCount =
    										_.options.swipeToSlide ?
    										_.checkNavigable( _.currentSlide + _.getSlideCount() ) :
    										_.currentSlide + _.getSlideCount();

    										_.currentDirection = 0;

    										break;

    										case 'right':
    											case 'up':

    												slideCount =
    												_.options.swipeToSlide ?
    												_.checkNavigable( _.currentSlide - _.getSlideCount() ) :
    												_.currentSlide - _.getSlideCount();

    												_.currentDirection = 1;

    												break;

    												default:


    												}

    												if( direction != 'vertical' ) {

    													_.slideHandler( slideCount );
    													_.touchObject = {};
    													_.$slider.trigger('swipe', [_, direction ]);

    												}

    											} else {

    												if ( _.touchObject.startX !== _.touchObject.curX ) {

    													_.slideHandler( _.currentSlide );
    													_.touchObject = {};

    												}

    											}

    										};

    										Slick.prototype.swipeHandler = function(event) {

    											var _ = this;

    											if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
    												return;
    											} else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
    												return;
    											}

    											_.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
    											event.originalEvent.touches.length : 1;

    											_.touchObject.minSwipe = _.listWidth / _.options
    											.touchThreshold;

    											if (_.options.verticalSwiping === true) {
    												_.touchObject.minSwipe = _.listHeight / _.options
    												.touchThreshold;
    											}

    											switch (event.data.action) {

    												case 'start':
    													_.swipeStart(event);
    													break;

    													case 'move':
    														_.swipeMove(event);
    														break;

    														case 'end':
    															_.swipeEnd(event);
    															break;

    														}

    													};

    													Slick.prototype.swipeMove = function(event) {

    														var _ = this,
    														edgeWasHit = false,
    														curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

    														touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    														if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
    															return false;
    														}

    														curLeft = _.getLeft(_.currentSlide);

    														_.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    														_.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

    														_.touchObject.swipeLength = Math.round(Math.sqrt(
    															Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

    														verticalSwipeLength = Math.round(Math.sqrt(
    															Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    														if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
    															_.scrolling = true;
    															return false;
    														}

    														if (_.options.verticalSwiping === true) {
    															_.touchObject.swipeLength = verticalSwipeLength;
    														}

    														swipeDirection = _.swipeDirection();

    														if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
    															_.swiping = true;
    															event.preventDefault();
    														}

    														positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    														if (_.options.verticalSwiping === true) {
    															positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    														}


    														swipeLength = _.touchObject.swipeLength;

    														_.touchObject.edgeHit = false;

    														if (_.options.infinite === false) {
    															if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
    																swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
    																_.touchObject.edgeHit = true;
    															}
    														}

    														if (_.options.vertical === false) {
    															_.swipeLeft = curLeft + swipeLength * positionOffset;
    														} else {
    															_.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
    														}
    														if (_.options.verticalSwiping === true) {
    															_.swipeLeft = curLeft + swipeLength * positionOffset;
    														}

    														if (_.options.fade === true || _.options.touchMove === false) {
    															return false;
    														}

    														if (_.animating === true) {
    															_.swipeLeft = null;
    															return false;
    														}

    														_.setCSS(_.swipeLeft);

    													};

    													Slick.prototype.swipeStart = function(event) {

    														var _ = this,
    														touches;

    														_.interrupted = true;

    														if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
    															_.touchObject = {};
    															return false;
    														}

    														if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
    															touches = event.originalEvent.touches[0];
    														}

    														_.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    														_.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

    														_.dragging = true;

    													};

    													Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

    														var _ = this;

    														if (_.$slidesCache !== null) {

    															_.unload();

    															_.$slideTrack.children(this.options.slide).detach();

    															_.$slidesCache.appendTo(_.$slideTrack);

    															_.reinit();

    														}

    													};

    													Slick.prototype.unload = function() {

    														var _ = this;

    														$('.slick-cloned', _.$slider).remove();

    														if (_.$dots) {
    															_.$dots.remove();
    														}

    														if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
    															_.$prevArrow.remove();
    														}

    														if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
    															_.$nextArrow.remove();
    														}

    														_.$slides
    														.removeClass('slick-slide slick-active slick-visible slick-current')
    														.attr('aria-hidden', 'true')
    														.css('width', '');

    													};

    													Slick.prototype.unslick = function(fromBreakpoint) {

    														var _ = this;
    														_.$slider.trigger('unslick', [_, fromBreakpoint]);
    														_.destroy();

    													};

    													Slick.prototype.updateArrows = function() {

    														var _ = this,
    														centerOffset;

    														centerOffset = Math.floor(_.options.slidesToShow / 2);

    														if ( _.options.arrows === true &&
    															_.slideCount > _.options.slidesToShow &&
    															!_.options.infinite ) {

    															_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
    															_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															if (_.currentSlide === 0) {

    																_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
    																_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															} else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

    																_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
    																_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															} else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

    																_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
    																_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

    															}

    														}

    													};

    													Slick.prototype.updateDots = function() {

    														var _ = this;

    														if (_.$dots !== null) {

    															_.$dots
    															.find('li')
    															.removeClass('slick-active')
    															.attr('aria-hidden', 'true');

    															_.$dots
    															.find('li')
    															.eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
    															.addClass('slick-active')
    															.attr('aria-hidden', 'false');

    														}

    													};

    													Slick.prototype.visibility = function() {

    														var _ = this;

    														if ( _.options.autoplay ) {

    															if ( document[_.hidden] ) {

    																_.interrupted = true;

    															} else {

    																_.interrupted = false;

    															}

    														}

    													};

    													$.fn.slick = function() {
    														var _ = this,
    														opt = arguments[0],
    														args = Array.prototype.slice.call(arguments, 1),
    														l = _.length,
    														i,
    														ret;
    														for (i = 0; i < l; i++) {
    															if (typeof opt == 'object' || typeof opt == 'undefined')
    																_[i].slick = new Slick(_[i], opt);
    																else
    																	ret = _[i].slick[opt].apply(_[i].slick, args);
    																	if (typeof ret != 'undefined') return ret;
    																	}
    																	return _;
    																};

    															}));



/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 jquery.mb.components

 file: jquery.mb.YTPlayer.src.js
 last modified: 11/2/18 7:23 PM
 Version:  3.3.1
 Build:  7469

 Open Lab s.r.l., Florence - Italy
 email:  matteo@open-lab.com
 blog: 	http://pupunzi.open-lab.com
 site: 	http://pupunzi.com
 	http://open-lab.com

 Licences: MIT, GPL
 https://www.opensource.org/licenses/mit-license.php
 https://www.gnu.org/licenses/gpl.html

 Copyright (c) 2001-2018. Matteo Bicocchi (Pupunzi)
 :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/



 var ytp = ytp || {}

 function onYouTubeIframeAPIReady() {
 	if (ytp.YTAPIReady)
 		return
 		ytp.YTAPIReady = true
 		jQuery(document).trigger('YTAPIReady')
 	}

 	let getYTPVideoID = function (url) {
 		let videoID, playlistID
 		if (url.indexOf('youtu.be') > 0 || url.indexOf('youtube.com/embed') > 0) {
 			videoID = url.substr(url.lastIndexOf('/') + 1, url.length)
 			playlistID = videoID.indexOf('?list=') > 0 ? videoID.substr(videoID.lastIndexOf('='), videoID.length) : null
 			videoID = playlistID ? videoID.substr(0, videoID.lastIndexOf('?')) : videoID
 		} else if (url.indexOf('http') > -1) {
		//videoID = url.match( /([\/&]v\/([^&#]*))|([\\?&]v=([^&#]*))/ )[ 1 ];
		videoID = url.match(/[\\?&]v=([^&#]*)/)[1]
		playlistID = url.indexOf('list=') > 0 ? url.match(/[\\?&]list=([^&#]*)/)[1] : null
	} else {
		videoID = url.length > 15 ? null : url
		playlistID = videoID ? null : url
	}
	return {
		videoID   : videoID,
		playlistID: playlistID
	}
};

function iOSversion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		let v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
	}
}

(function (jQuery, ytp) {

	jQuery.mbYTPlayer = {
		name   : 'jquery.mb.YTPlayer',
		version: '3.3.1',
		build  : '7469',
		author : 'Matteo Bicocchi (pupunzi)',
		apiKey : '',

		/*
		 * Default options for the player
		 */
		 defaults        : {
			/**
			 videoURL (string)
			 the complete Youtube video URL or the short url or the videoID
			 */
			 videoURL: null,

			/**
			 containment (string)
			 default containment for the player
			 */
			 containment: 'body',

			/**
			 ratio (string or number)
			 "auto", "16/9", "4/3" or number: 4/3, 16/9
			 */
			 ratio: 'auto',

			/**
			 fadeOnStartTime (int)
			 fade in timing at video start
			 */
			 fadeOnStartTime: 1000,

			/**
			 startAt (int)
			 start second
			 */
			 startAt: 0,

			/**
			 stopAt (int)
			 stop second
			 */
			 stopAt: 0,

			/**
			 autoPlay (bool)
			 on page load video should start or pause
			 */
			 autoPlay: true,

			/**
			 coverImage (string)
			 The path to the image to be used as cover if the autoPlay option is set to false
			 */
			 coverImage: false,

			/**
			 loop (bool or int)
			 video should loop or not; if number it will loop for the specified times
			 */
			 loop: true,

			/**
			 addRaster (bool)
			 shows a raster image over the video (added via CSS)
			 You can change the raster image via CSS:
			 .YTPOverlay.raster { background: url(images/raster.png)}
			 */
			 addRaster: false,

			/**
			 mask (bool or object) the key is the second and the value is the path to the image
			 Ex: mask:{ 0:'assets/mask-1.png', 5:'assets/mask-2.png', 30: false, 50:'assets/mask-3.png'}
			 */
			 mask: false,

			/**
			 opacity (int)
			 0 to 1
			 */
			 opacity: 1,

			/**
			 quality (string)
			 “small”, “medium”, “large”, “hd720”, “hd1080”, “highres”, "default"
			 */
			 quality: 'default',

			/**
			 vol (int)
			 0 to 100
			 */
			 vol: 50,

			/**
			 mute (bool)
			 mute the video at start
			 */
			 mute: false,

			/**
			 showControls (bool)
			 shows the control bar at the bottom of the containment
			 */
			 showControls: true,

			/**
			 anchor (string)
			 center,top,bottom,left,right combined in pair
			 */
			 anchor: 'center,center',

			/**
			 showAnnotations (bool)
			 display the annotations on video
			 */
			 showAnnotations: false,

			/**
			 cc_load_policy (bool)
			 display the subtitles
			 */
			 cc_load_policy: false,

			/**
			 showYTLogo (bool)
			 display the Youtube logotype inside the button bar
			 */
			 showYTLogo: true,

			/**
			 useOnMobile (bool)
			 activate the player also on mobile
			 */
			 useOnMobile: true,

			/**
			 playOnlyIfVisible (bool)
			 play the video only if the containment is on screen
			 */
			 playOnlyIfVisible: false,

			/**
			 onScreenPercentage (bool)
			 percentage of the player height the video should stop or start when visible
			 */
			 onScreenPercentage: 30,

			/**
			 stopMovieOnBlur (bool)
			 stop the video if the window loose the focus
			 */
			 stopMovieOnBlur: true,

			/**
			 realfullscreen (bool)
			 the video when in full screen covers all the display
			 */
			 realFullscreen: true,

			/**
			 optimizeDisplay (bool)
			 The video always fit the containment without displaying the black strips
			 */
			 optimizeDisplay: true,

			/**
			 abundance (bool)
			 the abudance of the video size
			 */
			 abundance: 0.3,

			/**
			 gaTrack (bool)
			 track the video plays on GA
			 */
			 gaTrack: true,

			/**
			 remember_last_time (bool)
			 when the page is reloaded the video will start from the last position
			 */
			 remember_last_time: false,

			/**
			 addFilters (bool or string)
			 add one or more CSS filters as object to the video
			 Ex: {sepia: 50, hue_rotate : 220}
			 */
			 addFilters: false,

			/**
			 onReady (function)
			 a callback function fired once the player is ready
			 */
			 onReady: function (player) {
			 },

			/**
			 onReady (function)
			 a callback function fired if there's an error
			 */
			 onError: function (player, err) {
			 }
			},
		/**
		 *  @fontface icons
		 *  */
		 controls        : {
		 	play    : 'P',
		 	pause   : 'p',
		 	mute    : 'M',
		 	unmute  : 'A',
		 	onlyYT  : 'O',
		 	showSite: 'R',
		 	ytLogo  : 'Y'
		 },
		 controlBar      : null,
		 locationProtocol: 'https:',

		/**
		 * Applicable filters
		 */
		 defaultFilters: {
		 	grayscale : {value: 0, unit: '%'},
		 	hue_rotate: {value: 0, unit: 'deg'},
		 	invert    : {value: 0, unit: '%'},
		 	opacity   : {value: 0, unit: '%'},
		 	saturate  : {value: 0, unit: '%'},
		 	sepia     : {value: 0, unit: '%'},
		 	brightness: {value: 0, unit: '%'},
		 	contrast  : {value: 0, unit: '%'},
		 	blur      : {value: 0, unit: 'px'}
		 },

		/**
		 * build the player
		 * @param options
		 * @returns [players]
		 */
		 buildPlayer: function (options) {

		 	if (!ytp.YTAPIReady && typeof window.YT === 'undefined') {
		 		jQuery('#YTAPI').remove()
		 		let tag = jQuery('<script>').attr({
		 			'src': 'https://www.youtube.com/iframe_api?v=' + jQuery.mbYTPlayer.version,
		 			'id' : 'YTAPI'
		 		})
		 		jQuery('head').prepend(tag)
		 	} else {
		 		setTimeout(function () {
		 			jQuery(document).trigger('YTAPIReady')
		 			ytp.YTAPIReady = true
		 		}, 100)
		 	}

		 	function isIframe() {
		 		let isIfr = false
		 		try {
		 			if (self.location.href != top.location.href) isIfr = true
		 			} catch (e) {
		 				isIfr = true
		 			}
		 			return isIfr
		 		}

		 		console.time('YTPlayerInit')
		 		console.time('YTPlayerStartPlay')

		 		return this.each(function () {
		 			let YTPlayer = this
		 			let $YTPlayer = jQuery(YTPlayer)
		 			$YTPlayer.hide()
		 			YTPlayer.loop = 0
		 			YTPlayer.state = 0
		 			YTPlayer.filters = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaultFilters)
		 			YTPlayer.filtersEnabled = true
		 			YTPlayer.id = YTPlayer.id || 'YTP_' + new Date().getTime()
		 			$YTPlayer.addClass('mb_YTPlayer')

				/**
				 Set properties
				 */
				 let property = $YTPlayer.data('property') && typeof $YTPlayer.data('property') == 'string' ?
				 eval('(' + $YTPlayer.data('property') + ')') :
				 $YTPlayer.data('property')

				 if (typeof property !== 'object')
				 	property = {}

				 	YTPlayer.opt = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaults, YTPlayer.opt, options, property)

				 	YTPlayer.opt.elementId = YTPlayer.id

				 	if (YTPlayer.opt.vol === 0) {
				 		YTPlayer.opt.vol = 1
				 		YTPlayer.opt.mute = true
				 	}

				/**
				 * If autoPlay is set to true and  mute is set to false
				 * Webkit browser will not auto-play
				 * Start playing after the first click
				 */
				 if (YTPlayer.opt.autoPlay && YTPlayer.opt.mute == false && jQuery.mbBrowser.chrome) {
					//YTPlayer.opt.mute = true;
					jQuery(document).one('mousedown.YTPstart', function () {
						$YTPlayer.YTPPlay()
					})
					console.info('YTPlayer info: On Webkit browsers you can not autoplay the video if the audio is on.')
				}

				if (YTPlayer.opt.loop && typeof YTPlayer.opt.loop === 'boolean') {
					YTPlayer.opt.loop = 9999
				}

				/**
				 Disable fullScreen if is in an iframe or full-screen API is not available
				 */
				 let fullScreenAvailable = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
				 YTPlayer.opt.realFullscreen = isIframe() || !fullScreenAvailable ? false : YTPlayer.opt.realFullscreen

				/**
				 Manage annotations
				 */
				 YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? '1' : '3'

				/**
				 Manage show subtitle and caption
				 */
				 YTPlayer.opt.cc_load_policy = YTPlayer.opt.cc_load_policy ? '1' : '0'

				/**
				 Manage cover image
				 */
				 YTPlayer.opt.coverImage = YTPlayer.opt.coverImage || YTPlayer.opt.backgroundImage

				/**
				 * todo: remove
				 Manage Opacity for IE < 10
				 */
				 if (jQuery.mbBrowser.msie && jQuery.mbBrowser.version < 9)
				 	YTPlayer.opt.opacity = 1

				 	YTPlayer.opt.containment = YTPlayer.opt.containment === 'self' ? $YTPlayer : jQuery(YTPlayer.opt.containment)
				 	YTPlayer.isRetina = (window.retina || window.devicePixelRatio > 1)

				 	YTPlayer.opt.ratio = YTPlayer.opt.ratio === 'auto' ? 16 / 9 : YTPlayer.opt.ratio
				 	YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio)

				 	let origContainmentBackground = YTPlayer.opt.containment.css('background-image')
				 	origContainmentBackground = (origContainmentBackground == 'none') ? null : origContainmentBackground
				 	YTPlayer.orig_containment_background = origContainmentBackground

				 	if (!$YTPlayer.attr('id'))
				 		$YTPlayer.attr('id', 'ytp_' + new Date().getTime())

				 		YTPlayer.playerID = 'iframe_' + YTPlayer.id

				 		YTPlayer.isAlone = false
				 		YTPlayer.hasFocus = true
				 		YTPlayer.videoID = YTPlayer.opt.videoURL ?
				 		getYTPVideoID(YTPlayer.opt.videoURL).videoID : $YTPlayer.attr('href') ?
				 		getYTPVideoID($YTPlayer.attr('href')).videoID :
				 		false

				/**
				 Check if it is a video list
				 */
				 YTPlayer.playlistID = YTPlayer.opt.videoURL ?
				 getYTPVideoID(YTPlayer.opt.videoURL).playlistID : $YTPlayer.attr('href') ?
				 getYTPVideoID($YTPlayer.attr('href')).playlistID :
				 false

				 let start_from_last = 0
				 if (jQuery.mbCookie.get('YTPlayer_start_from' + YTPlayer.videoID))
				 	start_from_last = parseFloat(jQuery.mbCookie.get('YTPlayer_start_from' + YTPlayer.videoID))
				 	if (YTPlayer.opt.remember_last_time && start_from_last) {
				 		YTPlayer.start_from_last = start_from_last
				 		jQuery.mbCookie.remove('YTPlayer_start_from' + YTPlayer.videoID)
				 	}

				 	YTPlayer.isPlayer = $YTPlayer.is(YTPlayer.opt.containment)
				 	YTPlayer.isBackground = YTPlayer.opt.containment.is('body')

				 	if (YTPlayer.isBackground && ytp.backgroundIsInited)
				 		return

				/**
				 Hide the placeholder if it's not the target of the player
				 */
				 if (YTPlayer.isPlayer)
				 	$YTPlayer.show()

				/**
				 create the overlay
				 */
				 YTPlayer.overlay = jQuery('<div/>').css({
				 	position: 'absolute',
				 	top     : 0,
				 	left    : 0,
				 	width   : '100%',
				 	height  : '100%'
				 }).addClass('YTPOverlay')

				 if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
				 	let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
				 	if (bgndURL)
				 		YTPlayer.opt.containment.css({
				 			background      : bgndURL,
				 			backgroundSize  : 'cover',
				 			backgroundRepeat: 'no-repeat'
				 		})
				 	}

				/**
				 create the wrapper
				 */
				 YTPlayer.wrapper = jQuery('<div/>').attr('id', 'wrapper_' + YTPlayer.id).css({
				 	position : 'absolute',
				 	zIndex   : 0,
				 	minWidth : '100%',
				 	minHeight: '100%',
				 	left     : 0,
				 	top      : 0,
				 	overflow : 'hidden',
				 	opacity  : 0
				 }).addClass('mbYTP_wrapper')

				/**
				 If is an inline player toggle play if the overlay is clicked
				 */
				 if (YTPlayer.isPlayer) {
				 	YTPlayer.inlinePlayButton = jQuery('<div/>').addClass('inlinePlayButton').html(jQuery.mbYTPlayer.controls.play)
				 	$YTPlayer.append(YTPlayer.inlinePlayButton)
				 	YTPlayer.inlinePlayButton.on('click', function (e) {
				 		$YTPlayer.YTPPlay()
				 		e.stopPropagation()
				 	})

				 	if (YTPlayer.opt.autoPlay)
				 		YTPlayer.inlinePlayButton.hide()

				 		YTPlayer.overlay.on('click', function () {
				 			$YTPlayer.YTPTogglePlay()
				 		}).css({cursor: 'pointer'})
				 	}

				/**
				 create the playerBox where the YT iframe will be placed
				 */
				 let playerBox = jQuery('<div/>').attr('id', YTPlayer.playerID).addClass('playerBox')
				 playerBox.css({
				 	position: 'absolute',
				 	zIndex  : 0,
				 	width   : '100%',
				 	height  : '100%',
				 	top     : 0,
				 	left    : 0,
				 	overflow: 'hidden',
				 	opacity : 1
				 })

				 YTPlayer.wrapper.append(playerBox)
				 playerBox.after(YTPlayer.overlay)

				 if (YTPlayer.isPlayer) {
				 	YTPlayer.inlineWrapper = jQuery('<div/>').addClass('inline-YTPlayer')

				 	YTPlayer.inlineWrapper.css({
				 		position: 'relative',
				 		maxWidth: YTPlayer.opt.containment.css('width')
				 	})

				 	YTPlayer.opt.containment.css({
				 		position     : 'relative',
				 		paddingBottom: '56.25%',
				 		overflow     : 'hidden',
				 		height       : 0
				 	})
				 	YTPlayer.opt.containment.wrap(YTPlayer.inlineWrapper)
				 }

				/**
				 Loop all the elements inside the container and check if their position is not "static"
				 */
				 YTPlayer.opt.containment.children().not('script, style').each(function () {
				 	if (jQuery(this).css('position') == 'static')
				 		jQuery(this).css('position', 'relative')
				 	})

				 if (YTPlayer.isBackground) {
				 	jQuery('body').css({
				 		boxSizing: 'border-box'
				 	})

				 	YTPlayer.wrapper.css({
				 		position: 'fixed',
				 		top     : 0,
				 		left    : 0,
				 		zIndex  : 0
				 	})

				 } else if (YTPlayer.opt.containment.css('position') == 'static') {

				 	YTPlayer.opt.containment.css({
				 		position: 'relative'
				 	})
				 	$YTPlayer.show()
				 }
				 YTPlayer.opt.containment.prepend(YTPlayer.wrapper)

				 if (!YTPlayer.isBackground) {
				 	YTPlayer.overlay.on('mouseenter', function () {
				 		if (YTPlayer.controlBar && YTPlayer.controlBar.length)
				 			YTPlayer.controlBar.addClass('visible')
				 		}).on('mouseleave', function () {
				 			if (YTPlayer.controlBar && YTPlayer.controlBar.length)
				 				YTPlayer.controlBar.removeClass('visible')
				 			})
				 	}

				 	if (jQuery.mbBrowser.mobile && !YTPlayer.opt.useOnMobile) {
				 		if (YTPlayer.opt.coverImage) {
				 			YTPlayer.wrapper.css({
				 				backgroundImage   : 'url(' + YTPlayer.opt.coverImage + ')',
				 				backgroundPosition: 'center center',
				 				backgroundSize    : 'cover',
				 				backgroundRepeat  : 'no-repeat',
				 				opacity           : 1
				 			})
				 			YTPlayer.wrapper.css({opacity: 1})
				 		}
				 		return $YTPlayer
				 	}

				/**
				 If is on device start playing on first touch
				 */
				 if (jQuery.mbBrowser.mobile && YTPlayer.opt.autoPlay && YTPlayer.opt.useOnMobile)
				 	jQuery('body').one('touchstart', function () {
				 		YTPlayer.player.playVideo()
				 	})

				 	jQuery(document).one('YTAPIReady', function () {
				 		$YTPlayer.trigger('YTAPIReady_' + YTPlayer.id)
				 		ytp.YTAPIReady = true
				 	})

				 	YTPlayer.isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage)

				 	$YTPlayer.one('YTAPIReady_' + YTPlayer.id, function () {

				 		let YTPlayer = this
				 		let $YTPlayer = jQuery(YTPlayer)

				 		if ((YTPlayer.isBackground && ytp.backgroundIsInited) || YTPlayer.isInit)
				 			return

				 			if (YTPlayer.isBackground)
				 				ytp.backgroundIsInited = true

				 				YTPlayer.opt.autoPlay = typeof YTPlayer.opt.autoPlay == 'undefined' ? (YTPlayer.isBackground ? true : false) : YTPlayer.opt.autoPlay
				 				YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100

				 				jQuery.mbYTPlayer.getDataFromAPI(YTPlayer)

				 				jQuery(YTPlayer).on('YTPChanged', function (e) {

				 					if (YTPlayer.isInit)
				 						return

				 						YTPlayer.isInit = true

						/** Initialize the YT player ------------------------------------
						 * Youtube player variables
						 * @type {{modestbranding: number, autoplay: number, controls: number, showinfo: number, rel: number, enablejsapi: number, version: number, playerapiid: string, origin: string, allowfullscreen: boolean, iv_load_policy: (string|*|jQuery.mbYTPlayer.opt.showAnnotations), playsinline: number}}
						 */
						 let playerVars = {
						 	'modestbranding' : 1,
						 	'autoplay'       : 0,
						 	'controls'       : 0,
						 	'showinfo'       : 0,
						 	'rel'            : 0,
						 	'enablejsapi'    : 1,
						 	'version'        : 3,
						 	'playerapiid'    : YTPlayer.playerID,
						 	'origin'         : '*',
						 	'allowfullscreen': true,
						 	'wmode'          : 'transparent',
						 	'iv_load_policy' : YTPlayer.opt.showAnnotations,
						 	'cc_load_policy' : YTPlayer.opt.cc_load_policy,
						 	'playsinline'    : jQuery.mbBrowser.mobile ? 1 : 0,

							/**
							 Check if the browser can play HTML5 videos
							 */
							 'html5': document.createElement('video').canPlayType ? 1 : 0
							}

							new YT.Player(YTPlayer.playerID, {
							//videoId: YTPlayer.videoID.toString(),
							playerVars: playerVars,
							events    : {
								'onReady'                : function (event) {

									YTPlayer.player = event.target

									//todo: make playlist works
									/* if (YTPlayer.playlistID && YTPlayer.apiKey) {
										YTPlayer.isList = true;
										YTPlayer.videos = [];
										YTPlayer.player.cuePlaylist({
										  listType: 'playlist',
										  list: YTPlayer.playlistID.toString(),
										  startSeconds: YTPlayer.opt.startAt,
										  endSeconds: YTPlayer.opt.stopAt,
										  suggestedQuality: YTPlayer.opt.quality
										});
									  }
									  else { */

									  	YTPlayer.player.loadVideoById({
									  		videoId         : YTPlayer.videoID.toString(),
										// startSeconds: YTPlayer.start_from_last || YTPlayer.opt.startAt,
										// endSeconds: YTPlayer.opt.stopAt,
										suggestedQuality: YTPlayer.opt.quality
									})

									  	/*}*/

									  	$YTPlayer.trigger('YTPlayerIsReady_' + YTPlayer.id)
									  },
								/**
								 * on State Change
								 * @param event
								 *
								 * -1 (unstarted)
								 * 0 (ended)
								 * 1 (playing)
								 * 2 (paused)
								 * 3 (buffering)
								 * 5 (video cued)
								 */
								 'onStateChange'          : function (event) {

								 	if (typeof event.target.getPlayerState != 'function')
								 		return

								 		let state = event.target.getPlayerState()

								 		if (YTPlayer.preventTrigger || YTPlayer.isStarting) {
								 			YTPlayer.preventTrigger = false
								 			return
								 		}

								 		YTPlayer.state = state
									// console.debug(YTPlayer.state);

									if (event.data == YT.PlayerState.PLAYING) {
										// console.debug('YTPlayer.opt.quality', YTPlayer.opt.quality)
										event.target.setPlaybackQuality(YTPlayer.opt.quality)
									}

									// console.debug('YTPGetVideoQuality', jQuery(YTPlayer).YTPGetVideoQuality());

									let eventType
									switch (state) {

										/** unstarted */
										case -1:
											eventType = 'YTPUnstarted'
											break

											/** unstarted */
											case 0:
												eventType = 'YTPRealEnd'
												break

												/** play */
												case 1:
													eventType = 'YTPPlay'
													if (YTPlayer.controlBar.length)
														YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.pause)

														if (YTPlayer.isPlayer)
															YTPlayer.inlinePlayButton.hide()

															jQuery(document).off('mousedown.YTPstart')
															break

															/** pause */
															case 2:
																eventType = 'YTPPause'
																if (YTPlayer.controlBar.length)
																	YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)

																	if (YTPlayer.isPlayer)
																		YTPlayer.inlinePlayButton.show()
																		break

																		/** buffer */
																		case 3:
																			YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality)
																			eventType = 'YTPBuffering'
																			if (YTPlayer.controlBar.length)
																				YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)
																				break

																				/** cued */
																				case 5:
																					eventType = 'YTPCued'
																					break

																					default:
																						break
																					}

									/**
									 Trigger state events
									 */
									 let YTPEvent = jQuery.Event(eventType)
									 YTPEvent.time = YTPlayer.currentTime
									 jQuery(YTPlayer).trigger(YTPEvent)
									},
								/**
								 * onPlaybackQualityChange
								 * @param e
								 */
								 'onPlaybackQualityChange': function (e) {
								 	let quality = e.target.getPlaybackQuality()
								 	let YTPQualityChange = jQuery.Event('YTPQualityChange')
								 	YTPQualityChange.quality = quality
								 	jQuery(YTPlayer).trigger(YTPQualityChange)
								 },
								/**
								 * onError
								 * @param err
								 *
								 2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
								 5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
								 100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
								 101 – The owner of the requested video does not allow it to be played in embedded players.
								 150 – This error is the same as 101. It's just a 101 error in disguise!
								 */
								 'onError'                : function (err) {

								 	if (typeof YTPlayer.opt.onError == 'function')
								 		YTPlayer.opt.onError($YTPlayer, err)

								 		console.debug("error:", err)

								 		switch (err.data) {
								 			case 2:
								 				console.error('video ID:: ' + YTPlayer.videoID + ': The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.')
								 				break
								 				case 5:
								 					console.error('video ID:: ' + YTPlayer.videoID + ': The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.')
								 					break
								 					case 100:
								 						console.error('video ID:: ' + YTPlayer.videoID + ': The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.')
								 						break
								 						case 101:
								 							case 150:
								 								console.error('video ID:: ' + YTPlayer.videoID + ': The video doesn\'t exist or The owner does not allow it to be played in embedded players.')
								 								break
								 							}

								 							if (YTPlayer.isList)
								 								jQuery(YTPlayer).YTPPlayNext()

								 							}
								 						}
								 					})

$YTPlayer.on('YTPlayerIsReady_' + YTPlayer.id, function () {

	if (YTPlayer.isReady)
		return this

		YTPlayer.playerEl = YTPlayer.player.getIframe()
		jQuery(YTPlayer.playerEl).unselectable()
		$YTPlayer.optimizeDisplay()

							/**
							 * Optimize display on resize
							 */
							 jQuery(window).off('resize.YTP_' + YTPlayer.id).on('resize.YTP_' + YTPlayer.id, function () {
							 	$YTPlayer.optimizeDisplay()
							 })

							/**
							 * Set the time of the last visit progress
							 */
							 if (YTPlayer.opt.remember_last_time) {
							 	jQuery(window).on('unload.YTP_' + YTPlayer.id, function () {
							 		let current_time = YTPlayer.player.getCurrentTime()
							 		jQuery.mbCookie.set('YTPlayer_start_from' + YTPlayer.videoID, current_time, 0)
							 	})
							 }

							 $YTPlayer.YTPCheckForState()

							})
})
})

$YTPlayer.off('YTPTime.mask')
jQuery.mbYTPlayer.applyMask(YTPlayer)

console.timeEnd('YTPlayerInit')
})
},

		/**
		 * isOnScreen
		 * Check if the YTPlayer is on screen
		 * @param YTPlayer
		 * @returns {boolean}
		 */
		 isOnScreen: function (YTPlayer, perc) {
		 	perc = perc || 10
		 	let playerBox = YTPlayer.wrapper
		 	let winTop = jQuery(window).scrollTop()
		 	let winBottom = winTop + jQuery(window).height()

		 	let margin = (playerBox.height() * perc) / 100
		 	let elTop = playerBox.offset().top + margin
		 	let elBottom = playerBox.offset().top + (playerBox.height() - margin)

		 	return ((elBottom <= winBottom) && (elTop >= winTop))
		 },

		/**
		 * getDataFromAPI
		 * @param YTPlayer
		 */
		 getDataFromAPI: function (YTPlayer) {

		 	YTPlayer.videoData = jQuery.mbStorage.get('YTPlayer_data_' + YTPlayer.videoID)
		 	if (YTPlayer.videoData) {
		 		setTimeout(function () {
		 			YTPlayer.dataReceived = true

		 			let YTPChanged = jQuery.Event('YTPChanged')
		 			YTPChanged.time = YTPlayer.currentTime
		 			YTPChanged.videoId = YTPlayer.videoID
		 			YTPChanged.opt = YTPlayer.opt

					//console.debug("videoData:",YTPlayer.videoData)

					jQuery(YTPlayer).trigger(YTPChanged)

					let YTPData = jQuery.Event('YTPData')
					YTPData.prop = {}
					for (let x in YTPlayer.videoData)
						YTPData.prop[x] = YTPlayer.videoData[x]
						jQuery(YTPlayer).trigger(YTPData)

					}, YTPlayer.opt.fadeOnStartTime)

		 		YTPlayer.hasData = true

		 	} else if (jQuery.mbYTPlayer.apiKey) {

				/**
				 * Get video info from API3 (needs api key)
				 * snippet,player,contentDetails,statistics,status
				 */
				 jQuery.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + YTPlayer.videoID + '&key=' + jQuery.mbYTPlayer.apiKey + '&part=snippet', function (data) {
				 	YTPlayer.dataReceived = true

				 	let YTPChanged = jQuery.Event('YTPChanged')
				 	YTPChanged.time = YTPlayer.currentTime
				 	YTPChanged.videoId = YTPlayer.videoID
				 	jQuery(YTPlayer).trigger(YTPChanged)

				 	function parseYTPlayer_data(data) {
				 		YTPlayer.videoData = {}
				 		YTPlayer.videoData.id = YTPlayer.videoID
				 		YTPlayer.videoData.channelTitle = data.channelTitle
				 		YTPlayer.videoData.title = data.title
				 		YTPlayer.videoData.description = data.description.length < 400 ? data.description : data.description.substring(0, 400) + ' ...'
				 		YTPlayer.videoData.thumb_max = data.thumbnails.maxres ? data.thumbnails.maxres.url : null
				 		YTPlayer.videoData.thumb_high = data.thumbnails.high ? data.thumbnails.high.url : null
				 		YTPlayer.videoData.thumb_medium = data.thumbnails.medium ? data.thumbnails.medium.url : null
				 		jQuery.mbStorage.set('YTPlayer_data_' + YTPlayer.videoID, YTPlayer.videoData)
				 	}

				 	if (!data.items[0]) {
				 		YTPlayer.videoData = {}
				 		YTPlayer.hasData = false
				 	} else {
				 		parseYTPlayer_data(data.items[0].snippet)
				 		YTPlayer.hasData = true
				 	}

				 	let YTPData = jQuery.Event('YTPData')
				 	YTPData.prop = {}
				 	for (let x in YTPlayer.videoData) YTPData.prop[x] = YTPlayer.videoData[x]
				 		jQuery(YTPlayer).trigger(YTPData)
				 	})

				} else {

					setTimeout(function () {
						let YTPChanged = jQuery.Event('YTPChanged')
						YTPChanged.time = YTPlayer.currentTime
						YTPChanged.videoId = YTPlayer.videoID
						jQuery(YTPlayer).trigger(YTPChanged)
					}, 10)
					YTPlayer.videoData = null

				}

				YTPlayer.opt.ratio = YTPlayer.opt.ratio == 'auto' ? 16 / 9 : YTPlayer.opt.ratio

			if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay) { //&& ( !jQuery.mbBrowser.mobile && !jQuery.isTablet )
				YTPlayer.loading = jQuery('<div/>').addClass('loading').html('Loading').hide()
				jQuery(YTPlayer).append(YTPlayer.loading)
				YTPlayer.loading.fadeIn()
			}
		},

		/**
		 * removeStoredData
		 */
		 removeStoredData: function () {
		 	jQuery.mbStorage.remove()
		 },

		/**
		 * getVideoData
		 * @returns {*|YTPlayer.videoData}
		 */
		 getVideoData: function () {
		 	let YTPlayer = this.get(0)
		 	return YTPlayer.videoData
		 },

		/**
		 * getVideoID
		 * @returns {*|YTPlayer.videoID|boolean}
		 */
		 getVideoID: function () {
		 	let YTPlayer = this.get(0)
		 	return YTPlayer.videoID || false
		 },

		/**
		 * getPlaylistID
		 * @returns {*|YTPlayer.videoID|boolean}
		 */
		 getPlaylistID  : function () {
		 	let YTPlayer = this.get(0)
		 	return YTPlayer.playlistID || false
		 },
		/**
		 * setVideoQuality
		 * @param quality
		 * @returns {jQuery.mbYTPlayer}
		 */
		 setVideoQuality: function (quality) {
		 	let YTPlayer = this.get(0)
		 	jQuery(YTPlayer).YTPPause()
		 	YTPlayer.opt.quality = quality
		 	YTPlayer.player.setPlaybackQuality(quality)
		 	jQuery(YTPlayer).YTPPlay()
		 	return this
		 },

		/**
		 * getVideoQuality
		 * @returns {jQuery.mbYTPlayer}
		 */
		 getVideoQuality: function () {
		 	let YTPlayer = this.get(0)
		 	let quality = YTPlayer.player.getPlaybackQuality()
		 	return quality
		 },

		/**
		 * playlist
		 * @param videos -> Array or String (videoList ID)
		 * @param shuffle
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 *
		 * To retrieve a Youtube playlist the Youtube API key is required:
		 * https://console.developers.google.com/
		 * jQuery.mbYTPlayer.apiKey
		 */
		 playlist: function (videos, shuffle, callback) {

		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

			/*
			if (typeof videos == "String" && jQuery.mbYTPlayer.apiKey != "") {
			  function getVideoListFromYoutube(playListID, page) {
				page = page || '';
				let youtubeAPI = "https://www.googleapis.com/youtube/v3/playlistItems";
				jQuery.getJSON(youtubeAPI, {
				  part      : "snippet,contentDetails",
				  playlistId: playListID, //You have to enter the PlaylistID
				  maxResults: 50,
				  pageToken : page,
				  key       : jQuery.mbYTPlayer.apiKey //You have to enter your own YoutubeAPIKey
				}).done(function (response) {
				  CreateVideosArray(response);
				  if (response.nextPageToken) {
					page = response.nextPageToken;
					getVideoListFromYoutube(plID, page, videos);
				  } else {
					$YTPlayer.YTPlaylist(YTPlayer.videos, shuffle, callback)
				  }
				  ;
				});
			  };

			  function CreateVideosArray(response) {
				let k = response.items.length;
				for (let i = 0; i < k; i++) {
				  YTPlayer.videos.push({
					"videoURL": response.items[i].contentDetails.videoId
				  });
				}
				;
			  };

			  getVideoListFromYoutube(videos);
			  return this;
			}
			*/

			YTPlayer.isList = true

			if (shuffle)
				videos = jQuery.shuffle(videos)

				if (!YTPlayer.videoID) {
					YTPlayer.videos = videos
					YTPlayer.videoCounter = 1
					YTPlayer.videoLength = videos.length
					jQuery(YTPlayer).data('property', videos[0])
					jQuery(YTPlayer).YTPlayer()
				}

				if (typeof callback == 'function')
					jQuery(YTPlayer).on('YTPChanged', function () {
						callback(YTPlayer)
					})

					jQuery(YTPlayer).on('YTPEnd', function () {
						jQuery(YTPlayer).YTPPlayNext()
					})
					return this
				},

		/**
		 * playNext
		 * @returns {jQuery.mbYTPlayer}
		 */
		 playNext: function () {
		 	let YTPlayer = this.get(0)
		 	YTPlayer.videoCounter++
		 	if (YTPlayer.videoCounter > YTPlayer.videoLength)
		 		YTPlayer.videoCounter = 1
		 		jQuery(YTPlayer).YTPPlayIndex(YTPlayer.videoCounter)
		 		return this
		 	},

		/**
		 * playPrev
		 * @returns {jQuery.mbYTPlayer}
		 */
		 playPrev: function () {
		 	let YTPlayer = this.get(0)
		 	YTPlayer.videoCounter--
		 	if (YTPlayer.videoCounter <= 0)
		 		YTPlayer.videoCounter = YTPlayer.videoLength
		 		jQuery(YTPlayer).YTPPlayIndex(YTPlayer.videoCounter)
		 		return this
		 	},

		/**
		 * playIndex
		 * @param idx
		 * @returns {jQuery.mbYTPlayer}
		 */
		 playIndex: function (idx) {
		 	let YTPlayer = this.get(0)
		 	if (YTPlayer.checkForStartAt) {
		 		clearInterval(YTPlayer.checkForStartAt)
		 		clearInterval(YTPlayer.getState)
		 	}
		 	YTPlayer.videoCounter = idx

		 	if (YTPlayer.videoCounter >= YTPlayer.videoLength)
		 		YTPlayer.videoCounter = YTPlayer.videoLength

		 		let video = YTPlayer.videos[YTPlayer.videoCounter - 1]

		 		jQuery(YTPlayer).YTPChangeVideo(video)
		 		return this
		 	},

		/**
		 * changeVideo
		 * @param opt
		 * @returns {jQuery.mbYTPlayer}
		 */
		 changeVideo: function (opt) {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	YTPlayer.opt.startAt = 0
		 	YTPlayer.opt.stopAt = 0
		 	YTPlayer.opt.mask = false
		 	YTPlayer.opt.mute = true
		 	YTPlayer.opt.autoPlay = true
		 	YTPlayer.opt.addFilters = false
		 	YTPlayer.opt.coverImage = false

		 	YTPlayer.hasData = false
		 	YTPlayer.hasChanged = true

		 	YTPlayer.player.loopTime = undefined

		 	if (opt)
		 		jQuery.extend(YTPlayer.opt, opt)

		 		YTPlayer.videoID = getYTPVideoID(YTPlayer.opt.videoURL).videoID

		 		if (YTPlayer.opt.loop && typeof YTPlayer.opt.loop == 'boolean')
		 			YTPlayer.opt.loop = 9999

		 			YTPlayer.wrapper.css({
		 				background: 'none'
		 			})

		 			jQuery(YTPlayer.playerEl).CSSAnimate({
		 				opacity: 0
		 			}, YTPlayer.opt.fadeOnStartTime, function () {

		 				jQuery.mbYTPlayer.getDataFromAPI(YTPlayer)

		 				$YTPlayer.YTPGetPlayer().loadVideoById({
		 					videoId         : YTPlayer.videoID,
					// startSeconds: YTPlayer.opt.startAt,
					// endSeconds: YTPlayer.opt.stopAt,
					suggestedQuality: YTPlayer.opt.quality
				})

		 				$YTPlayer.YTPPause()
		 				$YTPlayer.optimizeDisplay()

		 				if (YTPlayer.checkForStartAt) {
		 					clearInterval(YTPlayer.checkForStartAt)
		 					clearInterval(YTPlayer.getState)
		 				}
		 				$YTPlayer.YTPCheckForState()
		 			})

		 			let YTPChangeVideo = jQuery.Event('YTPChangeVideo')
		 			YTPChangeVideo.time = YTPlayer.currentTime
		 			jQuery(YTPlayer).trigger(YTPChangeVideo)

		 			jQuery.mbYTPlayer.applyMask(YTPlayer)

		 			return this
		 		},

		/**
		 * getPlayer
		 * @returns {player}
		 */
		 getPlayer: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return null

		 		return YTPlayer.player || null
		 	},

		/**
		 * playerDestroy
		 * @returns {jQuery.mbYTPlayer}
		 */
		 playerDestroy: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		ytp.YTAPIReady = true
		 		ytp.backgroundIsInited = false
		 		YTPlayer.isInit = false
		 		YTPlayer.videoID = null
		 		YTPlayer.isReady = false
		 		YTPlayer.wrapper.remove()
		 		jQuery('#controlBar_' + YTPlayer.id).remove()
		 		clearInterval(YTPlayer.checkForStartAt)
		 		clearInterval(YTPlayer.getState)
		 		return this
		 	},

		/**
		 * fullscreen
		 * @param real
		 * @returns {jQuery.mbYTPlayer}
		 */
		 fullscreen: function (real) {
		 	let YTPlayer = this.get(0)

		 	if (typeof real == 'undefined')
		 		real = eval(YTPlayer.opt.realFullscreen)

		 		let controls = jQuery('#controlBar_' + YTPlayer.id)
		 		let fullScreenBtn = controls.find('.mb_OnlyYT')
		 		let videoWrapper = YTPlayer.isPlayer ? YTPlayer.opt.containment : YTPlayer.wrapper

		 		if (real) {
		 			let fullscreenchange = jQuery.mbBrowser.mozilla ? 'mozfullscreenchange' : jQuery.mbBrowser.webkit ? 'webkitfullscreenchange' : 'fullscreenchange'
		 			jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
		 				let isFullScreen = RunPrefixMethod(document, 'IsFullScreen') || RunPrefixMethod(document, 'FullScreen')
		 				if (!isFullScreen) {
		 					YTPlayer.isAlone = false
		 					fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT)
		 					jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality)
		 					videoWrapper.removeClass('YTPFullscreen')
		 					videoWrapper.CSSAnimate({
		 						opacity: YTPlayer.opt.opacity
		 					}, YTPlayer.opt.fadeOnStartTime)

		 					videoWrapper.css({
		 						zIndex: 0
		 					})

		 					if (YTPlayer.isBackground) {
		 						jQuery('body').after(controls)
		 					} else {
		 						YTPlayer.wrapper.before(controls)
		 					}
		 					jQuery(window).resize()
		 					jQuery(YTPlayer).trigger('YTPFullScreenEnd')

		 				} else {

		 					jQuery(YTPlayer).YTPSetVideoQuality('default')
		 					jQuery(YTPlayer).trigger('YTPFullScreenStart')

		 				}
		 			})
		 		}
		 		if (!YTPlayer.isAlone) {
		 			function hideMouse() {
		 				YTPlayer.overlay.css({
		 					cursor: 'none'
		 				})
		 			}

		 			jQuery(document).on('mousemove.YTPlayer', function (e) {
		 				YTPlayer.overlay.css({
		 					cursor: 'auto'
		 				})
		 				clearTimeout(YTPlayer.hideCursor)
		 				if (!jQuery(e.target).parents().is('.mb_YTPBar'))
		 					YTPlayer.hideCursor = setTimeout(hideMouse, 3000)
		 				})

		 			hideMouse()

		 			if (real) {
		 				videoWrapper.css({
		 					opacity: 0
		 				})
		 				videoWrapper.addClass('YTPFullscreen')
		 				launchFullscreen(videoWrapper.get(0))

		 				setTimeout(function () {
		 					videoWrapper.CSSAnimate({
		 						opacity: 1
		 					}, YTPlayer.opt.fadeOnStartTime * 2)

		 					videoWrapper.append(controls)
		 					jQuery(YTPlayer).optimizeDisplay()
		 					YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, true)

		 				}, YTPlayer.opt.fadeOnStartTime)
		 			} else
		 				videoWrapper.css({
		 					zIndex: 10000
		 				}).CSSAnimate({
		 					opacity: 1
		 				}, YTPlayer.opt.fadeOnStartTime * 2)
		 				fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite)
		 				YTPlayer.isAlone = true
		 			} else {
		 				jQuery(document).off('mousemove.YTPlayer')
		 				clearTimeout(YTPlayer.hideCursor)
		 				YTPlayer.overlay.css({
		 					cursor: 'auto'
		 				})
		 				if (real) {
		 					cancelFullscreen()
		 				} else {
		 					videoWrapper.CSSAnimate({
		 						opacity: YTPlayer.opt.opacity
		 					}, YTPlayer.opt.fadeOnStartTime)
		 					videoWrapper.css({
		 						zIndex: 0
		 					})
		 				}
		 				fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT)
		 				YTPlayer.isAlone = false
		 			}

		 			function RunPrefixMethod(obj, method) {
		 				let pfx = ['webkit', 'moz', 'ms', 'o', '']
		 				let p = 0,
		 				m, t
		 				while (p < pfx.length && !obj[m]) {
		 					m = method
		 					if (pfx[p] == '') {
		 						m = m.substr(0, 1).toLowerCase() + m.substr(1)
		 					}
		 					m = pfx[p] + m
		 					t = typeof obj[m]
		 					if (t != 'undefined') {
		 						pfx = [pfx[p]]
		 						return (t == 'function' ? obj[m]() : obj[m])
		 					}
		 					p++
		 				}
		 			}

		 			function launchFullscreen(element) {
		 				RunPrefixMethod(element, 'RequestFullScreen')
		 			}

		 			function cancelFullscreen() {
		 				if (RunPrefixMethod(document, 'FullScreen') || RunPrefixMethod(document, 'IsFullScreen')) {
		 					RunPrefixMethod(document, 'CancelFullScreen')
		 				}
		 			}

		 			return this
		 		},

		/**
		 * toggleLoops
		 * @returns {jQuery.mbYTPlayer}
		 */
		 toggleLoops: function () {
		 	let YTPlayer = this.get(0)
		 	let data = YTPlayer.opt
		 	if (data.loop == 1) {
		 		data.loop = 0
		 	} else {
		 		if (data.startAt) {
		 			YTPlayer.player.seekTo(data.startAt)
		 		} else {
		 			YTPlayer.player.playVideo()
		 		}
		 		data.loop = 1
		 	}
		 	return this
		 },

		/**
		 * play
		 * @returns {jQuery.mbYTPlayer}
		 */
		 play: function () {
		 	let YTPlayer = this.get(0)
		 	let $YTPlayer = jQuery(YTPlayer)

		 	if (!YTPlayer.isReady)
		 		return this

		 		setTimeout(function () {
		 			$YTPlayer.YTPSetAbundance(YTPlayer.opt.abundance)
		 		}, 300)

		 		YTPlayer.player.playVideo()

		 		jQuery(YTPlayer.playerEl).css({
		 			opacity: 1
		 		})

		 		YTPlayer.wrapper.css({
		 			backgroundImage: 'none'
		 		})

		 		YTPlayer.wrapper.CSSAnimate({
		 			opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
		 		}, YTPlayer.opt.fadeOnStartTime)

		 		let controls = jQuery('#controlBar_' + YTPlayer.id)
		 		let playBtn = controls.find('.mb_YTPPlayPause')
		 		playBtn.html(jQuery.mbYTPlayer.controls.pause)
		 		YTPlayer.state = 1

		 		return this
		 	},

		/**
		 * togglePlay
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		 togglePlay: function (callback) {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		if (YTPlayer.state == 1)
		 			this.YTPPause()
		 			else
		 				this.YTPPlay()

		 				if (typeof callback == 'function')
		 					callback(YTPlayer.state)

		 					return this
		 				},

		/**
		 * stop
		 * @returns {jQuery.mbYTPlayer}
		 */
		 stop: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		let controls = jQuery('#controlBar_' + YTPlayer.id)
		 		let playBtn = controls.find('.mb_YTPPlayPause')
		 		playBtn.html(jQuery.mbYTPlayer.controls.play)
		 		YTPlayer.player.stopVideo()
		 		return this
		 	},

		/**
		 * pause
		 * @returns {jQuery.mbYTPlayer}
		 */
		 pause: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		if (YTPlayer.opt.abundance < .2)
		 			this.YTPSetAbundance(.2)

		 			YTPlayer.player.pauseVideo()
		 			YTPlayer.state = 2
		 			return this
		 		},

		/**
		 * seekTo
		 * @param sec
		 * @returns {jQuery.mbYTPlayer}
		 */
		 seekTo: function (sec) {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		YTPlayer.player.seekTo(sec, true)
		 		return this
		 	},

		/**
		 * getPlaybackRate
		 * @returns {PlaybackRate(}
		 */
		 getPlaybackRate: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		return YTPlayer.player.getPlaybackRate()
		 	},

		/**
		 * setPlaybackRate
		 * @param suggestedRate:Number
		 * 0.25, 0.5, 1, 1.5, 2
		 * @returns {jQuery.mbYTPlayer}
		 */
		 setPlaybackRate: function (val) {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		YTPlayer.player.setPlaybackRate(val)
		 		return this
		 	},

		/**
		 * setVolume
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		 setVolume: function (val) {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		YTPlayer.opt.vol = val
		 		this.YTPUnmute()
		 		YTPlayer.player.setVolume(YTPlayer.opt.vol)

		 		if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
		 			YTPlayer.volumeBar.updateSliderVal(val)

		 			return this
		 		},
		/**
		 * getVolume
		 * @returns {*}
		 */
		 getVolume: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		return YTPlayer.player.getVolume()
		 	},

		/**
		 * toggleVolume
		 * @returns {jQuery.mbYTPlayer}
		 */
		 toggleVolume: function () {

		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		if (YTPlayer.isMute) {
		 			if (!jQuery.mbBrowser.mobile)
		 				this.YTPSetVolume(YTPlayer.opt.vol)
		 				this.YTPUnmute()
		 			} else {
		 				this.YTPMute()
		 			}
		 			return this
		 		},

		/**
		 * mute
		 * @returns {jQuery.mbYTPlayer}
		 */
		 mute: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		if (YTPlayer.isMute)
		 			return this
		 			YTPlayer.player.mute()
		 			YTPlayer.isMute = true
		 			YTPlayer.player.setVolume(0)
		 			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length && YTPlayer.volumeBar.width() > 10) {
		 				YTPlayer.volumeBar.updateSliderVal(0)
		 			}
		 			let controls = jQuery('#controlBar_' + YTPlayer.id)
		 			let muteBtn = controls.find('.mb_YTPMuteUnmute')
		 			muteBtn.html(jQuery.mbYTPlayer.controls.unmute)
		 			jQuery(YTPlayer).addClass('isMuted')
		 			if (YTPlayer.volumeBar && YTPlayer.volumeBar.length) YTPlayer.volumeBar.addClass('muted')
		 				let YTPEvent = jQuery.Event('YTPMuted')
		 				YTPEvent.time = YTPlayer.currentTime

		 				if (!YTPlayer.preventTrigger)
		 					jQuery(YTPlayer).trigger(YTPEvent)

		 					return this
		 				},

		/**
		 * unmute
		 * @returns {jQuery.mbYTPlayer}
		 */
		 unmute: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

			// console.debug("unmute::", YTPlayer.isMute,"Vol::", YTPlayer.opt.vol)

			if (!YTPlayer.isMute)
				return this

				YTPlayer.player.unMute()
				YTPlayer.isMute = false
				jQuery(YTPlayer).YTPSetVolume(YTPlayer.opt.vol)
				if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
					YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol > 10 ? YTPlayer.opt.vol : 10)
					let controls = jQuery('#controlBar_' + YTPlayer.id)
					let muteBtn = controls.find('.mb_YTPMuteUnmute')
					muteBtn.html(jQuery.mbYTPlayer.controls.mute)
					jQuery(YTPlayer).removeClass('isMuted')
					if (YTPlayer.volumeBar && YTPlayer.volumeBar.length)
						YTPlayer.volumeBar.removeClass('muted')
						let YTPEvent = jQuery.Event('YTPUnmuted')
						YTPEvent.time = YTPlayer.currentTime

						if (!YTPlayer.preventTrigger)
							jQuery(YTPlayer).trigger(YTPEvent)

							return this
						},

						/* FILTERS ---------------------------------------------------------------------------------------------------------*/

		/**
		 * applyFilter
		 * @param filter
		 * @param value
		 * @returns {jQuery.mbYTPlayer}
		 */
		 applyFilter: function (filter, value) {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		YTPlayer.filters[filter].value = value
		 		if (YTPlayer.filtersEnabled)
		 			$YTPlayer.YTPEnableFilters()
		 		},

		/**
		 * applyFilters
		 * @param filters
		 * @returns {jQuery.mbYTPlayer}
		 */
		 applyFilters: function (filters) {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	if (!YTPlayer.isReady) {
		 		jQuery(YTPlayer).on('YTPReady', function () {
		 			$YTPlayer.YTPApplyFilters(filters)
		 		})
		 		return this
		 	}

		 	for (let key in filters) {
		 		$YTPlayer.YTPApplyFilter(key, filters[key])
		 	}

		 	$YTPlayer.trigger('YTPFiltersApplied')
		 },

		/**
		 * toggleFilter
		 * @param filter
		 * @param value
		 * @returns {jQuery.mbYTPlayer}
		 */
		 toggleFilter: function (filter, value) {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		if (!YTPlayer.filters[filter].value)
		 			YTPlayer.filters[filter].value = value
		 			else
		 				YTPlayer.filters[filter].value = 0

		 				if (YTPlayer.filtersEnabled)
		 					jQuery(YTPlayer).YTPEnableFilters()

		 					return this
		 				},

		/**
		 * toggleFilters
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		 toggleFilters: function (callback) {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		if (YTPlayer.filtersEnabled) {
		 			jQuery(YTPlayer).trigger('YTPDisableFilters')
		 			jQuery(YTPlayer).YTPDisableFilters()
		 		} else {
		 			jQuery(YTPlayer).YTPEnableFilters()
		 			jQuery(YTPlayer).trigger('YTPEnableFilters')
		 		}
		 		if (typeof callback == 'function')
		 			callback(YTPlayer.filtersEnabled)

		 			return this
		 		},

		/**
		 * disableFilters
		 * @returns {jQuery.mbYTPlayer}
		 */
		 disableFilters: function () {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		let iframe = jQuery(YTPlayer.playerEl)
		 		iframe.css('-webkit-filter', '')
		 		iframe.css('filter', '')
		 		YTPlayer.filtersEnabled = false

		 		return this
		 	},

		/**
		 * enableFilters
		 * @returns {jQuery.mbYTPlayer}
		 */
		 enableFilters: function () {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		let iframe = jQuery(YTPlayer.playerEl)
		 		let filterStyle = ''
		 		for (let key in YTPlayer.filters) {
		 			if (YTPlayer.filters[key].value)
		 				filterStyle += key.replace('_', '-') + '(' + YTPlayer.filters[key].value + YTPlayer.filters[key].unit + ') '
		 			}
		 			iframe.css('-webkit-filter', filterStyle)
		 			iframe.css('filter', filterStyle)
		 			YTPlayer.filtersEnabled = true

		 			return this
		 		},

		/**
		 * removeFilter
		 * @param filter
		 * @param callback
		 * @returns {jQuery.mbYTPlayer}
		 */
		 removeFilter: function (filter, callback) {
		 	let $YTPlayer = this
		 	let YTPlayer = $YTPlayer.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		if (typeof filter == 'function') {
		 			callback = filter
		 			filter = null
		 		}

		 		if (!filter) {
		 			for (let key in YTPlayer.filters) {
		 				$YTPlayer.YTPApplyFilter(key, 0)
		 			}

		 			if (typeof callback == 'function')
		 				callback(key)

		 				YTPlayer.filters = jQuery.extend(true, {}, jQuery.mbYTPlayer.defaultFilters)

		 			} else {
		 				$YTPlayer.YTPApplyFilter(filter, 0)
		 				if (typeof callback == 'function') callback(filter)
		 				}

		 				let YTPEvent = jQuery.Event('YTPFiltersApplied')
		 				$YTPlayer.trigger(YTPEvent)

		 				return this
		 			},

		/**
		 * getFilters
		 * @returns {filters}
		 */
		 getFilters: function () {
		 	let YTPlayer = this.get(0)

		 	if (!YTPlayer.isReady)
		 		return this

		 		return YTPlayer.filters
		 	},

		 	/* MASK ---------------------------------------------------------------------------------------------------------*/

		/**
		 * addMask
		 * @param mask
		 * @returns {jQuery.mbYTPlayer}
		 */
		 addMask: function (mask) {
		 	let YTPlayer = this.get(0)

			/*
				  if (!YTPlayer.isReady)
					return this;
					*/

					if (!mask)
						mask = YTPlayer.actualMask

						let tempImg = jQuery('<img/>').attr('src', mask).on('load', function () {
							YTPlayer.overlay.CSSAnimate({
								opacity: 0
							}, YTPlayer.opt.fadeOnStartTime, function () {
								YTPlayer.hasMask = true
								tempImg.remove()
								YTPlayer.overlay.css({
									backgroundImage   : 'url(' + mask + ')',
									backgroundRepeat  : 'no-repeat',
									backgroundPosition: 'center center',
									backgroundSize    : 'cover'
								})
								YTPlayer.overlay.CSSAnimate({
									opacity: 1
								}, YTPlayer.opt.fadeOnStartTime)
							})
						})

						return this
					},

		/**
		 * removeMask
		 * @returns {jQuery.mbYTPlayer}
		 */
		 removeMask: function () {
		 	let YTPlayer = this.get(0)

			/*
				  if (!YTPlayer.isReady)
					return this;
					*/

					YTPlayer.overlay.CSSAnimate({
						opacity: 0
					}, YTPlayer.opt.fadeOnStartTime, function () {
						YTPlayer.hasMask = false
						YTPlayer.overlay.css({
							backgroundImage   : '',
							backgroundRepeat  : '',
							backgroundPosition: '',
							backgroundSize    : ''
						})
						YTPlayer.overlay.CSSAnimate({
							opacity: 1
						}, YTPlayer.opt.fadeOnStartTime)
					})

					return this
				},

		/**
		 * Apply mask
		 * @param YTPlayer
		 */
		 applyMask: function (YTPlayer) {
		 	let $YTPlayer = jQuery(YTPlayer)

			/*
				  if (!YTPlayer.isReady)
					return this;
					*/

					$YTPlayer.off('YTPTime.mask')

					if (YTPlayer.opt.mask) {
						if (typeof YTPlayer.opt.mask == 'string') {

							$YTPlayer.YTPAddMask(YTPlayer.opt.mask)
							YTPlayer.actualMask = YTPlayer.opt.mask

						} else if (typeof YTPlayer.opt.mask == 'object') {

					//console.debug(YTPlayer.opt.mask)

					for (let time in YTPlayer.opt.mask) {

						if (YTPlayer.opt.mask[time])
							img = jQuery('<img/>').attr('src', YTPlayer.opt.mask[time])

						}

						if (YTPlayer.opt.mask[0])
							$YTPlayer.YTPAddMask(YTPlayer.opt.mask[0])

							$YTPlayer.on('YTPTime.mask', function (e) {

								for (let time in YTPlayer.opt.mask) {
									if (e.time == time)
										if (!YTPlayer.opt.mask[time]) {
											$YTPlayer.YTPRemoveMask()
										} else {
											$YTPlayer.YTPAddMask(YTPlayer.opt.mask[time])
											YTPlayer.actualMask = YTPlayer.opt.mask[time]
										}
									}
								})
						}
					}
				},

		/**
		 * toggleMask
		 * @returns {jQuery.mbYTPlayer}
		 */
		 toggleMask: function () {
		 	let YTPlayer = this.get(0)

			/*
				  if (!YTPlayer.isReady)
					return this;
					*/

					let $YTPlayer = jQuery(YTPlayer)
					if (YTPlayer.hasMask)
						$YTPlayer.YTPRemoveMask()
						else
							$YTPlayer.YTPAddMask()
							return this
						},

						/* CONTROLS --------------------------------------------------------------------------------------------------------*/

		/**
		 * manageProgress
		 * @returns {{totalTime: number, currentTime: number}}
		 */
		 manageProgress: function () {
		 	let YTPlayer = this.get(0)
		 	let controls = jQuery('#controlBar_' + YTPlayer.id)
		 	let progressBar = controls.find('.mb_YTPProgress')
		 	let loadedBar = controls.find('.mb_YTPLoaded')
		 	let timeBar = controls.find('.mb_YTPseekbar')
		 	let totW = progressBar.outerWidth()
		 	let currentTime = Math.floor(YTPlayer.player.getCurrentTime())
		 	let totalTime = Math.floor(YTPlayer.player.getDuration())
		 	let timeW = (currentTime * totW) / totalTime
		 	let startLeft = 0
		 	let loadedW = YTPlayer.player.getVideoLoadedFraction() * 100
		 	loadedBar.css({
		 		left : startLeft,
		 		width: loadedW + '%'
		 	})
		 	timeBar.css({
		 		left : 0,
		 		width: timeW
		 	})
		 	return {
		 		totalTime  : totalTime,
		 		currentTime: currentTime
		 	}
		 },

		/**
		 * buildControls
		 * @param YTPlayer
		 */
		 buildControls: function (YTPlayer) {

		 	jQuery('#controlBar_' + YTPlayer.id).remove()
		 	if (!YTPlayer.opt.showControls) {
		 		YTPlayer.controlBar = false
		 		return
		 	}

			// @YTPlayer.opt.printUrl: is deprecated; use YTPlayer.opt.showYTLogo
			YTPlayer.opt.showYTLogo = YTPlayer.opt.showYTLogo || YTPlayer.opt.printUrl
			if (jQuery('#controlBar_' + YTPlayer.id).length)
				return
				YTPlayer.controlBar = jQuery('<div/>').attr('id', 'controlBar_' + YTPlayer.id).addClass('mb_YTPBar').css({
					whiteSpace: 'noWrap',
					position  : YTPlayer.isBackground ? 'fixed' : 'absolute',
					zIndex    : YTPlayer.isBackground ? 10000 : 1000
				}).hide().on('click', function (e) {
					e.stopPropagation()
				})
				let buttonBar = jQuery('<div/>').addClass('buttonBar')
			/**
			 *  play/pause button
			 * */
			 let playpause = jQuery('<span>' + jQuery.mbYTPlayer.controls.play + '</span>').addClass('mb_YTPPlayPause ytpicon').on('click', function (e) {
			 	e.stopPropagation()
			 	jQuery(YTPlayer).YTPTogglePlay()
			 })
			/**
			 *  mute/unmute button
			 * */
			 let MuteUnmute = jQuery('<span>' + jQuery.mbYTPlayer.controls.mute + '</span>').addClass('mb_YTPMuteUnmute ytpicon').on('click', function (e) {
			 	e.stopPropagation()
			 	jQuery(YTPlayer).YTPToggleVolume()
			 })
			/**
			 *  volume bar
			 * */
			 let volumeBar = jQuery('<div/>').addClass('mb_YTPVolumeBar').css({
			 	display: 'inline-block'
			 })
			 YTPlayer.volumeBar = volumeBar

			/**
			 * time elapsed
			 * */
			 let idx = jQuery('<span/>').addClass('mb_YTPTime')
			 let vURL = YTPlayer.opt.videoURL ? YTPlayer.opt.videoURL : ''
			 if (vURL.indexOf('http') < 0) vURL = 'https://www.youtube.com/watch?v=' + YTPlayer.opt.videoURL
			 	let movieUrl = jQuery('<span/>').html(jQuery.mbYTPlayer.controls.ytLogo).addClass('mb_YTPUrl ytpicon').attr('title', 'view on YouTube').on('click', function () {
			 		window.open(vURL, 'viewOnYT')
			 	})
			 	let onlyVideo = jQuery('<span/>').html(jQuery.mbYTPlayer.controls.onlyYT).addClass('mb_OnlyYT ytpicon').on('click', function (e) {
			 		e.stopPropagation()
			 		jQuery(YTPlayer).YTPFullscreen(YTPlayer.opt.realFullscreen)
			 	})
			 	let progressBar = jQuery('<div/>').addClass('mb_YTPProgress').css('position', 'absolute').on('click', function (e) {
			 		e.stopPropagation()
			 		timeBar.css({
			 			width: (e.clientX - timeBar.offset().left)
			 		})
			 		YTPlayer.timeW = e.clientX - timeBar.offset().left
			 		YTPlayer.controlBar.find('.mb_YTPLoaded').css({
			 			width: 0
			 		})
			 		let totalTime = Math.floor(YTPlayer.player.getDuration())
			 		YTPlayer.goto = (timeBar.outerWidth() * totalTime) / progressBar.outerWidth()
			 		YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), true)
			 		YTPlayer.controlBar.find('.mb_YTPLoaded').css({
			 			width: 0
			 		})
			 	})
			 	let loadedBar = jQuery('<div/>').addClass('mb_YTPLoaded').css('position', 'absolute')
			 	let timeBar = jQuery('<div/>').addClass('mb_YTPseekbar').css('position', 'absolute')
			 	progressBar.append(loadedBar).append(timeBar)
			 	buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx)

			 	if (YTPlayer.opt.showYTLogo) {
			 		buttonBar.append(movieUrl)
			 	}

			/**
			 * Full screen button
			 */
			 if (YTPlayer.isBackground || (eval(YTPlayer.opt.realFullscreen) && !YTPlayer.isBackground))
			 	buttonBar.append(onlyVideo)

			 	YTPlayer.controlBar.append(buttonBar).append(progressBar)

			 	if (!YTPlayer.isBackground) {
			 		YTPlayer.controlBar.addClass('inlinePlayer')
			 		YTPlayer.wrapper.before(YTPlayer.controlBar)
			 	} else {
			 		jQuery('body').after(YTPlayer.controlBar)
			 	}

			/**
			 * Volume slider
			 */
			 volumeBar.simpleSlider({
			 	initialval : YTPlayer.opt.vol,
			 	scale      : 100,
			 	orientation: 'h',
			 	callback   : function (el) {

			 		if (el.value == 0) {
			 			jQuery(YTPlayer).YTPMute()
			 		} else {
			 			jQuery(YTPlayer).YTPUnmute()
			 		}
			 		YTPlayer.player.setVolume(el.value)
			 		if (!YTPlayer.isMute)
			 			YTPlayer.opt.vol = el.value

					// console.debug(jQuery(YTPlayer).YTPGetVolume())
				}

			})
			},

			/* MANAGE PLAYER STATE ------------------------------------------------------------------------------------------*/

		/**
		 * checkForState
		 */
		 checkForState: function () {
		 	let YTPlayer = this.get(0)
		 	let $YTPlayer = jQuery(YTPlayer)

		 	clearInterval(YTPlayer.getState)
		 	let interval = 100
			//Checking if player has been removed from the scene
			if (!jQuery.contains(document, YTPlayer)) {
				$YTPlayer.YTPPlayerDestroy()
				clearInterval(YTPlayer.getState)
				clearInterval(YTPlayer.checkForStartAt)
				return
			}

			jQuery.mbYTPlayer.checkForStart(YTPlayer)

			YTPlayer.getState = setInterval(function () {
				let $YTPlayer = jQuery(YTPlayer)

				if (!YTPlayer.isReady)
					return

					let prog = jQuery(YTPlayer).YTPManageProgress()

					let stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0
					stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0

					if (YTPlayer.currentTime != prog.currentTime) {
						let YTPEvent = jQuery.Event('YTPTime')
						YTPEvent.time = YTPlayer.currentTime
						jQuery(YTPlayer).trigger(YTPEvent)
					}

					YTPlayer.currentTime = prog.currentTime
					YTPlayer.totalTime = YTPlayer.player.getDuration()
					if (YTPlayer.player.getVolume() == 0) $YTPlayer.addClass('isMuted')
						else $YTPlayer.removeClass('isMuted')

							if (YTPlayer.opt.showControls)
								if (prog.totalTime) {
									YTPlayer.controlBar.find('.mb_YTPTime').html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + ' / ' + jQuery.mbYTPlayer.formatTime(prog.totalTime))
								} else {
									YTPlayer.controlBar.find('.mb_YTPTime').html('-- : -- / -- : --')
								}

				/**
				 * Manage video pause on window blur
				 */
				 if (eval(YTPlayer.opt.stopMovieOnBlur)) {
				 	if (!document.hasFocus()) {
				 		if (YTPlayer.state == 1) {
				 			YTPlayer.hasFocus = false
				 			YTPlayer.preventTrigger = true
				 			$YTPlayer.YTPPause()
				 		}
				 	} else if (document.hasFocus() && !YTPlayer.hasFocus && !(YTPlayer.state == -1 || YTPlayer.state == 0)) {
				 		YTPlayer.hasFocus = true
				 		YTPlayer.preventTrigger = true
				 		$YTPlayer.YTPPlay()
				 	}
				 }

				/**
				 * Manage video pause if not on screen
				 */
				 if (YTPlayer.opt.playOnlyIfVisible) {
				 	let isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage)
				 	if (!isOnScreen && YTPlayer.state == 1) {
				 		YTPlayer.isOnScreen = false
				 		$YTPlayer.YTPPause()
				 	} else if (isOnScreen && !YTPlayer.isOnScreen) {
				 		YTPlayer.isOnScreen = true
				 		YTPlayer.player.playVideo()
				 	}
				 }

				 if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact) {
				 	YTPlayer.controlBar.addClass('compact')
				 	YTPlayer.isCompact = true
				 	if (!YTPlayer.isMute && YTPlayer.volumeBar) YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)
				 	} else if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact) {
				 		YTPlayer.controlBar.removeClass('compact')
				 		YTPlayer.isCompact = false

				 		if (!YTPlayer.isMute && YTPlayer.volumeBar)
				 			YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)
				 		}
				// the video is ended
				if (YTPlayer.player.getPlayerState() > 0 && ((parseFloat(YTPlayer.player.getDuration() - (YTPlayer.opt.fadeOnStartTime / 1000)) < YTPlayer.player.getCurrentTime()) || (stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) >= stopAt))) {

					if (YTPlayer.isEnded)
						return

						YTPlayer.isEnded = true

						setTimeout(function () {
							YTPlayer.isEnded = false
						}, 1000)

						if (YTPlayer.isList) {
							if (!YTPlayer.opt.loop || (YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1)) {
								YTPlayer.player.loopTime = undefined
								clearInterval(YTPlayer.getState)
								let YTPEnd = jQuery.Event('YTPEnd')
								YTPEnd.time = YTPlayer.currentTime
								jQuery(YTPlayer).trigger(YTPEnd)
								return
							}
						} else if (!YTPlayer.opt.loop || (YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1)) {
							YTPlayer.player.loopTime = undefined

							YTPlayer.state = 2

							if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
								let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
								if (bgndURL)
									YTPlayer.opt.containment.css({
										background      : bgndURL,
										backgroundSize  : 'cover',
										backgroundRepeat: 'no-repeat'
									})
								}

								jQuery(YTPlayer).YTPPause()
								YTPlayer.wrapper.CSSAnimate({
									opacity: 0
								}, YTPlayer.opt.fadeOnStartTime, function () {

									if (YTPlayer.controlBar.length)
										YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)

										let YTPEnd = jQuery.Event('YTPEnd')
										YTPEnd.time = YTPlayer.currentTime
										jQuery(YTPlayer).trigger(YTPEnd)
										YTPlayer.player.seekTo(YTPlayer.opt.startAt, true)

										if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
											let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
											if (bgndURL)
												YTPlayer.opt.containment.css({
													background      : bgndURL,
													backgroundSize  : 'cover',
													backgroundRepeat: 'no-repeat'
												})
											}

										})
								return
							}

							YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1
							YTPlayer.opt.startAt = YTPlayer.opt.startAt || 1
							YTPlayer.preventTrigger = true
							YTPlayer.state = 2
					//YTPlayer.player.pauseVideo();
					YTPlayer.player.seekTo(YTPlayer.opt.startAt, true)
					//YTPlayer.player.playVideo();
				}
			}, interval)
},

		/**
		 * checkForStart
		 * @param YTPlayer
		 */
		 checkForStart: function (YTPlayer) {
		 	let $YTPlayer = jQuery(YTPlayer)

		 	/* If the player has been removed from scene destroy it */
		 	if (!jQuery.contains(document, YTPlayer)) {
		 		$YTPlayer.YTPPlayerDestroy()
		 		return
		 	}

		 	/* CREATE CONTROL BAR */
		 	jQuery.mbYTPlayer.buildControls(YTPlayer)

		 	if (YTPlayer.overlay)
		 		if (YTPlayer.opt.addRaster) {
		 			let classN = YTPlayer.opt.addRaster == 'dot' ? 'raster-dot' : 'raster'
		 			YTPlayer.overlay.addClass(YTPlayer.isRetina ? classN + ' retina' : classN)
		 		} else {
		 			YTPlayer.overlay.removeClass(function (index, classNames) {
						// change the list into an array
						let current_classes = classNames.split(' '),
								// array of classes which are to be removed
								classes_to_remove = []
								jQuery.each(current_classes, function (index, class_name) {
							// if the classname begins with bg add it to the classes_to_remove array
							if (/raster.*/.test(class_name)) {
								classes_to_remove.push(class_name)
							}
						})
								classes_to_remove.push('retina')
						// turn the array back into a string
						return classes_to_remove.join(' ')
					})
		 		}

		 		YTPlayer.preventTrigger = true
		 		YTPlayer.state = 2
		 		YTPlayer.preventTrigger = true

		 		YTPlayer.player.mute()
		 		YTPlayer.player.playVideo()
		 		YTPlayer.isStarting = true

		 		let startAt = YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1

		 		YTPlayer.preventTrigger = true
		 		YTPlayer.checkForStartAt = setInterval(function () {

		 			YTPlayer.player.mute()
		 			YTPlayer.player.seekTo(startAt, true)

		 			let canPlayVideo = YTPlayer.player.getVideoLoadedFraction() >= startAt / YTPlayer.player.getDuration()
		 			if (YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo) {
		 				YTPlayer.start_from_last = null

		 				YTPlayer.preventTrigger = true
		 				$YTPlayer.YTPPause()

		 				clearInterval(YTPlayer.checkForStartAt)

		 				if (typeof YTPlayer.opt.onReady == 'function')
		 					YTPlayer.opt.onReady(YTPlayer)

		 					YTPlayer.isReady = true

		 					$YTPlayer.YTPRemoveFilter()

		 					if (YTPlayer.opt.addFilters) {
		 						$YTPlayer.YTPApplyFilters(YTPlayer.opt.addFilters)
		 					} else {
		 						$YTPlayer.YTPApplyFilters()
		 					}
		 					$YTPlayer.YTPEnableFilters()
		 					let YTPready = jQuery.Event('YTPReady')
		 					YTPready.time = YTPlayer.currentTime
		 					$YTPlayer.trigger(YTPready)

		 					YTPlayer.state = 2

		 					if (!YTPlayer.opt.mute) {

		 						if (YTPlayer.opt.autoPlay) {
		 							console.debug('To make the video \'auto-play\' you must mute the audio according with the latest vendor policy')
		 							YTPlayer.player.mute()
		 						}

		 						YTPlayer.player.unMute()

		 					} else {
		 						$YTPlayer.YTPMute()
		 					}

		 					if (typeof _gaq != 'undefined' && eval(YTPlayer.opt.gaTrack))
		 						_gaq.push(['_trackEvent', 'YTPlayer', 'Play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString())])
		 						else if (typeof ga != 'undefined' && eval(YTPlayer.opt.gaTrack))
		 							ga('send', 'event', 'YTPlayer', 'play', (YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()))

		 							if (YTPlayer.opt.autoPlay) {

		 								let YTPStart = jQuery.Event('YTPStart')
		 								YTPStart.time = YTPlayer.currentTime
		 								jQuery(YTPlayer).trigger(YTPStart)

		 								YTPlayer.isStarting = false

		 								/* Fix for Safari freeze */
		 								if (jQuery.mbBrowser.os.name == 'mac' && jQuery.mbBrowser.safari) {
		 									jQuery('body').one('mousedown.YTPstart', function () {
		 										$YTPlayer.YTPPlay()
		 									})
		 								}
		 								$YTPlayer.YTPPlay()
		 								console.timeEnd('YTPlayerStartPlay')

		 							} else {

		 								YTPlayer.preventTrigger = true
		 								$YTPlayer.YTPPause()

		 								if (YTPlayer.start_from_last)
		 									YTPlayer.player.seekTo(startAt, true)

		 									setTimeout(function () {
		 										YTPlayer.preventTrigger = true
		 										$YTPlayer.YTPPause()

		 										if (!YTPlayer.isPlayer) {
		 											if (!YTPlayer.opt.coverImage) {
		 												jQuery(YTPlayer.playerEl).CSSAnimate({
		 													opacity: 1
		 												}, YTPlayer.opt.fadeOnStartTime)
		 												YTPlayer.wrapper.CSSAnimate({
		 													opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
		 												}, YTPlayer.opt.fadeOnStartTime)
		 											} else {
		 												YTPlayer.wrapper.css({opacity: 0})
		 												setTimeout(function () {
		 													if (YTPlayer.opt.coverImage || YTPlayer.orig_containment_background) {
		 														let bgndURL = YTPlayer.opt.coverImage ? 'url(' + YTPlayer.opt.coverImage + ') center center' : YTPlayer.orig_containment_background
		 														if (bgndURL)
		 															YTPlayer.wrapper.css({
		 																background      : bgndURL,
		 																backgroundSize  : 'cover',
		 																backgroundRepeat: 'no-repeat'
		 															})
		 														}
		 													}, YTPlayer.opt.fadeOnStartTime)
		 											}
		 										}
		 										YTPlayer.isStarting = false
		 									}, 500)

		 									if (YTPlayer.controlBar.length)
		 										YTPlayer.controlBar.find('.mb_YTPPlayPause').html(jQuery.mbYTPlayer.controls.play)
		 									}

		 									if (YTPlayer.isPlayer && !YTPlayer.opt.autoPlay && (YTPlayer.loading && YTPlayer.loading.length)) {
		 										YTPlayer.loading.html('Ready')
		 										setTimeout(function () {
		 											YTPlayer.loading.fadeOut()
		 										}, 100)
		 									}

		 									if (YTPlayer.controlBar && YTPlayer.controlBar.length)
		 										YTPlayer.controlBar.slideDown(1000)
		 									}

		 									if (jQuery.mbBrowser.os.name == 'mac' && jQuery.mbBrowser.safari) {
		 										YTPlayer.player.playVideo()
		 										if (startAt >= 0)
		 											YTPlayer.player.seekTo(startAt, true)
		 										}

		 									}, 100)

return $YTPlayer
},

/* TIME METHODS -------------------------------------------------------------------------------------------*/

		/**
		 * getTime
		 * @returns {string} time
		 */
		 getTime: function () {
		 	let YTPlayer = this.get(0)
		 	return jQuery.mbYTPlayer.formatTime(YTPlayer.currentTime)
		 },

		/**
		 * getTotalTime
		 * @returns {string} total time
		 */
		 getTotalTime: function (format) {
		 	let YTPlayer = this.get(0)
		 	return jQuery.mbYTPlayer.formatTime(YTPlayer.totalTime)
		 },

		/**
		 * formatTime
		 * @param s
		 * @returns {string}
		 */
		 formatTime: function (s) {
		 	let min = Math.floor(s / 60)
		 	let sec = Math.floor(s - (60 * min))
		 	return (min <= 9 ? '0' + min : min) + ' : ' + (sec <= 9 ? '0' + sec : sec)
		 },

		 /* PLAYER POSITION AND SIZE OPTIMIZATION-------------------------------------------------------------------------------------------*/

		/**
		 * setAnchor
		 * @param anchor
		 */
		 setAnchor: function (anchor) {
		 	let $YTplayer = this
		 	$YTplayer.optimizeDisplay(anchor)
		 },

		/**
		 * getAnchor
		 * @param anchor
		 */
		 getAnchor: function () {
		 	let YTPlayer = this.get(0)
		 	return YTPlayer.opt.anchor
		 },

		/**
		 * setAbundance
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		 setAbundance: function (val, updateOptions) {
		 	let YTPlayer = this.get(0)
		 	let $YTPlayer = this
		 	if (updateOptions)
		 		YTPlayer.opt.abundance = val
		 		$YTPlayer.optimizeDisplay(YTPlayer.opt.anchor, val)
		 		return $YTPlayer
		 	},

		/**
		 * getAbundance
		 * @returns {*}
		 */
		 getAbundance: function () {
		 	let YTPlayer = this.get(0)
		 	return YTPlayer.opt.abundance
		 },

		/**
		 *
		 * @param opt
		 * @param val
		 * @returns {jQuery.mbYTPlayer}
		 */
		 setOption: function (opt, val) {
		 	let YTPlayer = this.get(0)
		 	let $YTPlayer = this
		 	YTPlayer.opt[opt] = val
		 	return $YTPlayer
		 }
		}


	/**
	 * optimizeDisplay
	 * @param anchor
	 * can be center, top, bottom, right, left; (default is center,center)
	 */
	 jQuery.fn.optimizeDisplay = function (anchor, abundanceX) {
	 	let YTPlayer = this.get(0)
	 	let vid = {}
	 	let el = YTPlayer.wrapper
	 	let iframe = jQuery(YTPlayer.playerEl)

	 	YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor

		// console.debug(YTPlayer.opt.anchor);

		YTPlayer.opt.anchor = typeof YTPlayer.opt.anchor != 'undefined ' ? YTPlayer.opt.anchor : 'center,center'
		let YTPAlign = YTPlayer.opt.anchor.split(',')
		let ab = abundanceX ? abundanceX : YTPlayer.opt.abundance

		if (YTPlayer.opt.optimizeDisplay) {
			let abundance = el.height() * ab
			let win = {}
			win.width = el.outerWidth()
			win.height = el.outerHeight() + abundance

			YTPlayer.opt.ratio = YTPlayer.opt.ratio === 'auto' ? 16 / 9 : YTPlayer.opt.ratio
			YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio)

			vid.width = win.width + abundance
			vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio)
			vid.marginTop = Math.ceil(-((vid.height - win.height + abundance) / 2))
			vid.marginLeft = -(abundance / 2)
			let lowest = vid.height < win.height

			if (lowest) {
				vid.height = win.height + abundance
				vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio)
				vid.marginTop = -(abundance / 2)
				vid.marginLeft = Math.ceil(-((vid.width - win.width) / 2))
			}

			for (let a in YTPAlign) {
				if (YTPAlign.hasOwnProperty(a)) {
					let al = YTPAlign[a].replace(/ /g, '')

					switch (al) {
						case 'top':
							vid.marginTop = -abundance
							break
							case 'bottom':
								vid.marginTop = Math.ceil(-(vid.height - win.height) - (abundance / 2))
								break
								case 'left':
									vid.marginLeft = -(abundance)
									break
									case 'right':
										vid.marginLeft = Math.ceil(-(vid.width - win.width) + (abundance / 2))
										break
									}

								}
							}

						} else {
							vid.width = '100%'
							vid.height = '100%'
							vid.marginTop = 0
							vid.marginLeft = 0
						}

						iframe.css({
							width     : vid.width,
							height    : vid.height,
							marginTop : vid.marginTop,
							marginLeft: vid.marginLeft,
							maxWidth  : 'initial'
						})


					}


					/* UTILITIES -----------------------------------------------------------------------------------------------------------------------*/

	/**
	 * shuffle
	 * @param arr
	 * @returns {Array|string|Blob|*}
	 *
	 */
	 jQuery.shuffle = function (arr) {
	 	let newArray = arr.slice()
	 	let len = newArray.length
	 	let i = len
	 	while (i--) {
	 		let p = parseInt(Math.random() * len)
	 		let t = newArray[i]
	 		newArray[i] = newArray[p]
	 		newArray[p] = t
	 	}
	 	return newArray
	 }

	/**
	 * Unselectable
	 * @returns {*}
	 */
	 jQuery.fn.unselectable = function () {
	 	return this.each(function () {
	 		jQuery(this).css({
	 			'-moz-user-select'   : 'none',
	 			'-webkit-user-select': 'none',
	 			'user-select'        : 'none'
	 		}).attr('unselectable', 'on')
	 	})
	 }

	 /* EXTERNAL METHODS -----------------------------------------------------------------------------------------------------------------------*/

	 jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer
	 jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer

	 jQuery.fn.YTPCheckForState = jQuery.mbYTPlayer.checkForState

	 jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer
	 jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID
	 jQuery.fn.YTPGetPlaylistID = jQuery.mbYTPlayer.getPlaylistID
	 jQuery.fn.YTPChangeVideo = jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeVideo
	 jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy

	 jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play
	 jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay
	 jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop
	 jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause
	 jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo

	 jQuery.fn.YTPGetPlaybackRate = jQuery.mbYTPlayer.getPlaybackRate
	 jQuery.fn.YTPSetPlaybackRate = jQuery.mbYTPlayer.setPlaybackRate

	 jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist
	 jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext
	 jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev
	 jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex

	 jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute
	 jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute
	 jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume
	 jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume
	 jQuery.fn.YTPGetVolume = jQuery.mbYTPlayer.getVolume

	 jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData
	 jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen
	 jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops
	 jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress

	 jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality
	 jQuery.fn.YTPGetVideoQuality = jQuery.mbYTPlayer.getVideoQuality

	 jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter
	 jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters
	 jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter
	 jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters
	 jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter
	 jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters
	 jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters
	 jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters

	 jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime
	 jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime

	 jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask
	 jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask
	 jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask

	 jQuery.fn.YTPGetAbundance = jQuery.mbYTPlayer.getAbundance
	 jQuery.fn.YTPSetAbundance = jQuery.mbYTPlayer.setAbundance

	 jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor
	 jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor

	 jQuery.fn.YTPSetOption = jQuery.mbYTPlayer.setOption

	})(jQuery, ytp)
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.browser.min.js                                                                                                                   _
 _ last modified: 24/05/17 19.56                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matbicoc@gmail.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2017. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

 var nAgt=navigator.userAgent;jQuery.browser=jQuery.browser||{};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.safari=!1;jQuery.browser.chrome=!1;jQuery.browser.androidStock=!1;jQuery.browser.msie=!1;jQuery.browser.edge=!1;jQuery.browser.ua=nAgt;function isTouchSupported(){var a=nAgt.msMaxTouchPoints,e="ontouchstart"in document.createElement("div");return a||e?!0:!1}
 var getOS=function(){var a={version:"Unknown version",name:"Unknown OS"};-1!=navigator.appVersion.indexOf("Win")&&(a.name="Windows");-1!=navigator.appVersion.indexOf("Mac")&&0>navigator.appVersion.indexOf("Mobile")&&(a.name="Mac");-1!=navigator.appVersion.indexOf("Linux")&&(a.name="Linux");/Mac OS X/.test(nAgt)&&!/Mobile/.test(nAgt)&&(a.version=/Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1],a.version=a.version.replace(/_/g,".").substring(0,5));/Windows/.test(nAgt)&&(a.version="Unknown.Unknown");/Windows NT 5.1/.test(nAgt)&&
 (a.version="5.1");/Windows NT 6.0/.test(nAgt)&&(a.version="6.0");/Windows NT 6.1/.test(nAgt)&&(a.version="6.1");/Windows NT 6.2/.test(nAgt)&&(a.version="6.2");/Windows NT 10.0/.test(nAgt)&&(a.version="10.0");/Linux/.test(nAgt)&&/Linux/.test(nAgt)&&(a.version="Unknown.Unknown");a.name=a.name.toLowerCase();a.major_version="Unknown";a.minor_version="Unknown";"Unknown.Unknown"!=a.version&&(a.major_version=parseFloat(a.version.split(".")[0]),a.minor_version=parseFloat(a.version.split(".")[1]));return a};
 jQuery.browser.os=getOS();jQuery.browser.hasTouch=isTouchSupported();jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;
 if(-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",
 	jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){jQuery.browser.msie=!0;jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Edge"))?(jQuery.browser.edge=!0,jQuery.browser.name="Microsoft Edge",jQuery.browser.fullVersion=nAgt.substring(verOffset+5)):-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=
 		!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1<nAgt.indexOf("mozilla/5.0")&&-1<nAgt.indexOf("android ")&&-1<nAgt.indexOf("applewebkit")&&!(-1<nAgt.indexOf("chrome"))?(verOffset=nAgt.indexOf("Chrome"),jQuery.browser.webkit=!0,jQuery.browser.androidStock=!0,jQuery.browser.name="androidStock",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name=
 		"Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=
 		!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));
 		-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));
 		jQuery.browser.version=jQuery.browser.majorVersion;jQuery.browser.android=/Android/i.test(nAgt);jQuery.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt);jQuery.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt);jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt);jQuery.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt);jQuery.browser.kindle=/Kindle|Silk/i.test(nAgt);
 		jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile||jQuery.browser.kindle;jQuery.isMobile=jQuery.browser.mobile;jQuery.isTablet=jQuery.browser.mobile&&765<jQuery(window).width();jQuery.isAndroidDefault=jQuery.browser.android&&!/chrome/i.test(nAgt);jQuery.mbBrowser=jQuery.browser;
 		jQuery.browser.versionCompare=function(a,e){if("stringstring"!=typeof a+typeof e)return!1;for(var c=a.split("."),d=e.split("."),b=0,f=Math.max(c.length,d.length);b<f;b++){if(c[b]&&!d[b]&&0<parseInt(c[b])||parseInt(c[b])>parseInt(d[b]))return 1;if(d[b]&&!c[b]&&0<parseInt(d[b])||parseInt(c[b])<parseInt(d[b]))return-1}return 0};
 		;
/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.CSSAnimate.min.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matbicoc@gmail.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 26/03/14 21.40
 *  *****************************************************************************
 */

 jQuery.support.CSStransition=function(){var d=(document.body||document.documentElement).style;return void 0!==d.transition||void 0!==d.WebkitTransition||void 0!==d.MozTransition||void 0!==d.MsTransition||void 0!==d.OTransition}();function uncamel(d){return d.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function setUnit(d,a){return"string"!==typeof d||d.match(/^[\-0-9\.]+jQuery/)?""+d+a:d}
 function setFilter(d,a,b){var c=uncamel(a),g=jQuery.browser.mozilla?"":jQuery.CSS.sfx;d[g+"filter"]=d[g+"filter"]||"";b=setUnit(b>jQuery.CSS.filters[a].max?jQuery.CSS.filters[a].max:b,jQuery.CSS.filters[a].unit);d[g+"filter"]+=c+"("+b+") ";delete d[a]}
 jQuery.CSS={name:"mb.CSSAnimate",author:"Matteo Bicocchi",version:"2.0.0",transitionEnd:"transitionEnd",sfx:"",filters:{blur:{min:0,max:100,unit:"px"},brightness:{min:0,max:400,unit:"%"},contrast:{min:0,max:400,unit:"%"},grayscale:{min:0,max:100,unit:"%"},hueRotate:{min:0,max:360,unit:"deg"},invert:{min:0,max:100,unit:"%"},saturate:{min:0,max:400,unit:"%"},sepia:{min:0,max:100,unit:"%"}},normalizeCss:function(d){var a=jQuery.extend(!0,{},d);jQuery.browser.webkit||jQuery.browser.opera?jQuery.CSS.sfx=
 "-webkit-":jQuery.browser.mozilla?jQuery.CSS.sfx="-moz-":jQuery.browser.msie&&(jQuery.CSS.sfx="-ms-");jQuery.CSS.sfx="";for(var b in a){"transform"===b&&(a[jQuery.CSS.sfx+"transform"]=a[b],delete a[b]);"transform-origin"===b&&(a[jQuery.CSS.sfx+"transform-origin"]=d[b],delete a[b]);"filter"!==b||jQuery.browser.mozilla||(a[jQuery.CSS.sfx+"filter"]=d[b],delete a[b]);"blur"===b&&setFilter(a,"blur",d[b]);"brightness"===b&&setFilter(a,"brightness",d[b]);"contrast"===b&&setFilter(a,"contrast",d[b]);"grayscale"===
 b&&setFilter(a,"grayscale",d[b]);"hueRotate"===b&&setFilter(a,"hueRotate",d[b]);"invert"===b&&setFilter(a,"invert",d[b]);"saturate"===b&&setFilter(a,"saturate",d[b]);"sepia"===b&&setFilter(a,"sepia",d[b]);if("x"===b){var c=jQuery.CSS.sfx+"transform";a[c]=a[c]||"";a[c]+=" translateX("+setUnit(d[b],"px")+")";delete a[b]}"y"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" translateY("+setUnit(d[b],"px")+")",delete a[b]);"z"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" translateZ("+
 	setUnit(d[b],"px")+")",delete a[b]);"rotate"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotate("+setUnit(d[b],"deg")+")",delete a[b]);"rotateX"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotateX("+setUnit(d[b],"deg")+")",delete a[b]);"rotateY"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotateY("+setUnit(d[b],"deg")+")",delete a[b]);"rotateZ"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" rotateZ("+setUnit(d[b],"deg")+")",delete a[b]);"scale"===b&&
 (c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scale("+setUnit(d[b],"")+")",delete a[b]);"scaleX"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scaleX("+setUnit(d[b],"")+")",delete a[b]);"scaleY"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scaleY("+setUnit(d[b],"")+")",delete a[b]);"scaleZ"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" scaleZ("+setUnit(d[b],"")+")",delete a[b]);"skew"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" skew("+setUnit(d[b],
 	"deg")+")",delete a[b]);"skewX"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" skewX("+setUnit(d[b],"deg")+")",delete a[b]);"skewY"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" skewY("+setUnit(d[b],"deg")+")",delete a[b]);"perspective"===b&&(c=jQuery.CSS.sfx+"transform",a[c]=a[c]||"",a[c]+=" perspective("+setUnit(d[b],"px")+")",delete a[b])}return a},getProp:function(d){var a=[],b;for(b in d)0>a.indexOf(b)&&a.push(uncamel(b));return a.join(",")},animate:function(d,a,b,c,g){return this.each(function(){function n(){e.called=
 	!0;e.CSSAIsRunning=!1;h.off(jQuery.CSS.transitionEnd+"."+e.id);clearTimeout(e.timeout);h.css(jQuery.CSS.sfx+"transition","");"function"==typeof g&&g.apply(e);"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null)}var e=this,h=jQuery(this);e.id=e.id||"CSSA_"+(new Date).getTime();var k=k||{type:"noEvent"};if(e.CSSAIsRunning&&e.eventType==k.type&&!jQuery.browser.msie&&9>=jQuery.browser.version)e.CSSqueue=function(){h.CSSAnimate(d,a,b,c,g)};else if(e.CSSqueue=null,e.eventType=k.type,0!==h.length&&
 		d){d=jQuery.normalizeCss(d);e.CSSAIsRunning=!0;"function"==typeof a&&(g=a,a=jQuery.fx.speeds._default);"function"==typeof b&&(c=b,b=0);"string"==typeof b&&(g=b,b=0);"function"==typeof c&&(g=c,c="cubic-bezier(0.65,0.03,0.36,0.72)");if("string"==typeof a)for(var l in jQuery.fx.speeds)if(a==l){a=jQuery.fx.speeds[l];break}else a=jQuery.fx.speeds._default;a||(a=jQuery.fx.speeds._default);"string"===typeof g&&(c=g,g=null);if(jQuery.support.CSStransition){var f={"default":"ease","in":"ease-in",out:"ease-out",
 	"in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",
 	easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};
 	f[c]&&(c=f[c]);h.off(jQuery.CSS.transitionEnd+"."+e.id);f=jQuery.CSS.getProp(d);var m={};jQuery.extend(m,d);m[jQuery.CSS.sfx+"transition-property"]=f;m[jQuery.CSS.sfx+"transition-duration"]=a+"ms";m[jQuery.CSS.sfx+"transition-delay"]=b+"ms";m[jQuery.CSS.sfx+"transition-timing-function"]=c;setTimeout(function(){h.one(jQuery.CSS.transitionEnd+"."+e.id,n);h.css(m)},1);e.timeout=setTimeout(function(){e.called||!g?(e.called=!1,e.CSSAIsRunning=!1):(h.css(jQuery.CSS.sfx+"transition",""),g.apply(e),e.CSSAIsRunning=
 		!1,"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null))},a+b+10)}else{for(f in d)"transform"===f&&delete d[f],"filter"===f&&delete d[f],"transform-origin"===f&&delete d[f],"auto"===d[f]&&delete d[f],"x"===f&&(k=d[f],l="left",d[l]=k,delete d[f]),"y"===f&&(k=d[f],l="top",d[l]=k,delete d[f]),"-ms-transform"!==f&&"-ms-filter"!==f||delete d[f];h.delay(b).animate(d,a,g)}}})}};jQuery.fn.CSSAnimate=jQuery.CSS.animate;jQuery.normalizeCss=jQuery.CSS.normalizeCss;
 	jQuery.fn.css3=function(d){return this.each(function(){var a=jQuery(this),b=jQuery.normalizeCss(d);a.css(b)})};
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.simpleSlider.min.js                                                                                                              _
 _ last modified: 09/05/17 19.31                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2017. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/


 var nAgt=navigator.userAgent;jQuery.browser=jQuery.browser||{};jQuery.browser.mozilla=!1;jQuery.browser.webkit=!1;jQuery.browser.opera=!1;jQuery.browser.safari=!1;jQuery.browser.chrome=!1;jQuery.browser.androidStock=!1;jQuery.browser.msie=!1;jQuery.browser.edge=!1;jQuery.browser.ua=nAgt;function isTouchSupported(){var a=nAgt.msMaxTouchPoints,e="ontouchstart"in document.createElement("div");return a||e?!0:!1}
 var getOS=function(){var a={version:"Unknown version",name:"Unknown OS"};-1!=navigator.appVersion.indexOf("Win")&&(a.name="Windows");-1!=navigator.appVersion.indexOf("Mac")&&0>navigator.appVersion.indexOf("Mobile")&&(a.name="Mac");-1!=navigator.appVersion.indexOf("Linux")&&(a.name="Linux");/Mac OS X/.test(nAgt)&&!/Mobile/.test(nAgt)&&(a.version=/Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1],a.version=a.version.replace(/_/g,".").substring(0,5));/Windows/.test(nAgt)&&(a.version="Unknown.Unknown");/Windows NT 5.1/.test(nAgt)&&
 (a.version="5.1");/Windows NT 6.0/.test(nAgt)&&(a.version="6.0");/Windows NT 6.1/.test(nAgt)&&(a.version="6.1");/Windows NT 6.2/.test(nAgt)&&(a.version="6.2");/Windows NT 10.0/.test(nAgt)&&(a.version="10.0");/Linux/.test(nAgt)&&/Linux/.test(nAgt)&&(a.version="Unknown.Unknown");a.name=a.name.toLowerCase();a.major_version="Unknown";a.minor_version="Unknown";"Unknown.Unknown"!=a.version&&(a.major_version=parseFloat(a.version.split(".")[0]),a.minor_version=parseFloat(a.version.split(".")[1]));return a};
 jQuery.browser.os=getOS();jQuery.browser.hasTouch=isTouchSupported();jQuery.browser.name=navigator.appName;jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion);jQuery.browser.majorVersion=parseInt(navigator.appVersion,10);var nameOffset,verOffset,ix;
 if(-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",
 	jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){jQuery.browser.msie=!0;jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Edge"))?(jQuery.browser.edge=!0,jQuery.browser.name="Microsoft Edge",jQuery.browser.fullVersion=nAgt.substring(verOffset+5)):-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=
 		!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1<nAgt.indexOf("mozilla/5.0")&&-1<nAgt.indexOf("android ")&&-1<nAgt.indexOf("applewebkit")&&!(-1<nAgt.indexOf("chrome"))?(verOffset=nAgt.indexOf("Chrome"),jQuery.browser.webkit=!0,jQuery.browser.androidStock=!0,jQuery.browser.name="androidStock",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name=
 		"Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=
 		!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));
 		-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix));jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10);isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10));
 		jQuery.browser.version=jQuery.browser.majorVersion;jQuery.browser.android=/Android/i.test(nAgt);jQuery.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt);jQuery.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt);jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt);jQuery.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt);jQuery.browser.kindle=/Kindle|Silk/i.test(nAgt);
 		jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile||jQuery.browser.kindle;jQuery.isMobile=jQuery.browser.mobile;jQuery.isTablet=jQuery.browser.mobile&&765<jQuery(window).width();jQuery.isAndroidDefault=jQuery.browser.android&&!/chrome/i.test(nAgt);jQuery.mbBrowser=jQuery.browser;
 		jQuery.browser.versionCompare=function(a,e){if("stringstring"!=typeof a+typeof e)return!1;for(var c=a.split("."),d=e.split("."),b=0,f=Math.max(c.length,d.length);b<f;b++){if(c[b]&&!d[b]&&0<parseInt(c[b])||parseInt(c[b])>parseInt(d[b]))return 1;if(d[b]&&!c[b]&&0<parseInt(d[b])||parseInt(c[b])<parseInt(d[b]))return-1}return 0};

 		(function(b){b.simpleSlider={defaults:{initialval:0,scale:100,orientation:"h",readonly:!1,callback:!1},events:{start:b.browser.mobile?"touchstart":"mousedown",end:b.browser.mobile?"touchend":"mouseup",move:b.browser.mobile?"touchmove":"mousemove"},init:function(c){return this.each(function(){var a=this,d=b(a);d.addClass("simpleSlider");a.opt={};b.extend(a.opt,b.simpleSlider.defaults,c);b.extend(a.opt,d.data());var e="h"==a.opt.orientation?"horizontal":"vertical";e=b("<div/>").addClass("level").addClass(e);
 			d.prepend(e);a.level=e;d.css({cursor:"default"});"auto"==a.opt.scale&&(a.opt.scale=b(a).outerWidth());d.updateSliderVal();a.opt.readonly||(d.on(b.simpleSlider.events.start,function(c){b.browser.mobile&&(c=c.changedTouches[0]);a.canSlide=!0;d.updateSliderVal(c);"h"==a.opt.orientation?d.css({cursor:"col-resize"}):d.css({cursor:"row-resize"});b.browser.mobile||(c.preventDefault(),c.stopPropagation())}),b(document).on(b.simpleSlider.events.move,function(c){b.browser.mobile&&(c=c.changedTouches[0]);a.canSlide&&
 				(b(document).css({cursor:"default"}),d.updateSliderVal(c),b.browser.mobile||(c.preventDefault(),c.stopPropagation()))}).on(b.simpleSlider.events.end,function(){b(document).css({cursor:"auto"});a.canSlide=!1;d.css({cursor:"auto"})}))})},updateSliderVal:function(c){var a=this.get(0);if(a.opt){a.opt.initialval="number"==typeof a.opt.initialval?a.opt.initialval:a.opt.initialval(a);var d=b(a).outerWidth(),e=b(a).outerHeight();a.x="object"==typeof c?c.clientX+document.body.scrollLeft-this.offset().left:
 		"number"==typeof c?c*d/a.opt.scale:a.opt.initialval*d/a.opt.scale;a.y="object"==typeof c?c.clientY+document.body.scrollTop-this.offset().top:"number"==typeof c?(a.opt.scale-a.opt.initialval-c)*e/a.opt.scale:a.opt.initialval*e/a.opt.scale;a.y=this.outerHeight()-a.y;a.scaleX=a.x*a.opt.scale/d;a.scaleY=a.y*a.opt.scale/e;a.outOfRangeX=a.scaleX>a.opt.scale?a.scaleX-a.opt.scale:0>a.scaleX?a.scaleX:0;a.outOfRangeY=a.scaleY>a.opt.scale?a.scaleY-a.opt.scale:0>a.scaleY?a.scaleY:0;a.outOfRange="h"==a.opt.orientation?
 		a.outOfRangeX:a.outOfRangeY;a.value="undefined"!=typeof c?"h"==a.opt.orientation?a.x>=this.outerWidth()?a.opt.scale:0>=a.x?0:a.scaleX:a.y>=this.outerHeight()?a.opt.scale:0>=a.y?0:a.scaleY:"h"==a.opt.orientation?a.scaleX:a.scaleY;"h"==a.opt.orientation?a.level.width(Math.floor(100*a.x/d)+"%"):a.level.height(Math.floor(100*a.y/e));"function"==typeof a.opt.callback&&a.opt.callback(a)}}};b.fn.simpleSlider=b.simpleSlider.init;b.fn.updateSliderVal=b.simpleSlider.updateSliderVal})(jQuery);
;/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.storage.min.js                                                                                                                   _
 _ last modified: 24/05/15 16.08                                                                                                                    _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2015. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

 (function(d){d.mbCookie={set:function(a,c,f,b){"object"==typeof c&&(c=JSON.stringify(c));b=b?"; domain="+b:"";var e=new Date,d="";0<f&&(e.setTime(e.getTime()+864E5*f),d="; expires="+e.toGMTString());document.cookie=a+"="+c+d+"; path=/"+b},get:function(a){a+="=";for(var c=document.cookie.split(";"),d=0;d<c.length;d++){for(var b=c[d];" "==b.charAt(0);)b=b.substring(1,b.length);if(0==b.indexOf(a))try{return JSON.parse(b.substring(a.length,b.length))}catch(e){return b.substring(a.length,b.length)}}return null},
 	remove:function(a){d.mbCookie.set(a,"",-1)}};d.mbStorage={set:function(a,c){"object"==typeof c&&(c=JSON.stringify(c));localStorage.setItem(a,c)},get:function(a){if(localStorage[a])try{return JSON.parse(localStorage[a])}catch(c){return localStorage[a]}else return null},remove:function(a){a?localStorage.removeItem(a):localStorage.clear()}}})(jQuery);


/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function(root, factory) {

 	'use strict';
 	if (typeof define === 'function' && define.amd) {
 		define(['jquery'], factory);
 	} else if (typeof exports === 'object') {
 		module.exports = factory(require('jquery'));
 	} else {
 		root.jcf = factory(jQuery);
 	}
 }(this, function($) {

 	'use strict';

	// define version
	var version = '1.1.3';

	// private variables
	var customInstances = [];

	// default global options
	var commonOptions = {
		optionsKey: 'jcf',
		dataKey: 'jcf-instance',
		rtlClass: 'jcf-rtl',
		focusClass: 'jcf-focus',
		pressedClass: 'jcf-pressed',
		disabledClass: 'jcf-disabled',
		hiddenClass: 'jcf-hidden',
		resetAppearanceClass: 'jcf-reset-appearance',
		unselectableClass: 'jcf-unselectable'
	};

	// detect device type
	var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
	isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
	commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

	var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
	if(isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
		commonOptions.ios = isIOS;

	// create global stylesheet if custom forms are used
	var createStyleSheet = function() {
		var styleTag = $('<style>').appendTo('head'),
		styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

		// crossbrowser style handling
		var addCSSRule = function(selector, rules, index) {
			if (styleSheet.insertRule) {
				styleSheet.insertRule(selector + '{' + rules + '}', index);
			} else {
				styleSheet.addRule(selector, rules, index);
			}
		};

		// add special rules
		addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
		addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
		addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
		addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

		// detect rtl pages
		var html = $('html'), body = $('body');
		if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
			html.addClass(commonOptions.rtlClass);
		}

		// handle form reset event
		html.on('reset', function() {
			setTimeout(function() {
				api.refreshAll();
			}, 0);
		});

		// mark stylesheet as created
		commonOptions.styleSheetCreated = true;
	};

	// simplified pointer events handler
	(function() {
		var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
		touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
		eventList, eventMap = {}, eventPrefix = 'jcf-';

		// detect events to attach
		if (pointerEventsSupported) {
			eventList = {
				pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
				pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
				pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
				pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
			};
		} else {
			eventList = {
				pointerover: 'mouseover',
				pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
				pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
				pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
			};
		}

		// create event map
		$.each(eventList, function(targetEventName, fakeEventList) {
			$.each(fakeEventList.split(' '), function(index, fakeEventName) {
				eventMap[fakeEventName] = targetEventName;
			});
		});

		// jQuery event hooks
		$.each(eventList, function(eventName, eventHandlers) {
			eventHandlers = eventHandlers.split(' ');
			$.event.special[eventPrefix + eventName] = {
				setup: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
							else self['on' + fallbackEvent] = fixEvent;
						});
				},
				teardown: function() {
					var self = this;
					$.each(eventHandlers, function(index, fallbackEvent) {
						if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
							else self['on' + fallbackEvent] = null;
						});
				}
			};
		});

		// check that mouse event are not simulated by mobile browsers
		var lastTouch = null;
		var mouseEventSimulated = function(e) {
			var dx = Math.abs(e.pageX - lastTouch.x),
			dy = Math.abs(e.pageY - lastTouch.y),
			rangeDistance = 25;

			if (dx <= rangeDistance && dy <= rangeDistance) {
				return true;
			}
		};

		// normalize event
		var fixEvent = function(e) {
			var origEvent = e || window.event,
			touchEventData = null,
			targetEventName = eventMap[origEvent.type];

			e = $.event.fix(origEvent);
			e.type = eventPrefix + targetEventName;

			if (origEvent.pointerType) {
				switch (origEvent.pointerType) {
					case 2: e.pointerType = 'touch'; break;
					case 3: e.pointerType = 'pen'; break;
					case 4: e.pointerType = 'mouse'; break;
					default: e.pointerType = origEvent.pointerType;
				}
			} else {
				e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
			}

			if (!e.pageX && !e.pageY) {
				touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
				e.pageX = touchEventData.pageX;
				e.pageY = touchEventData.pageY;
			}

			if (origEvent.type === 'touchend') {
				lastTouch = { x: e.pageX, y: e.pageY };
			}
			if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
				return;
			} else {
				return ($.event.dispatch || $.event.handle).call(this, e);
			}
		};
	}());

	// custom mousewheel/trackpad handler
	(function() {
		var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
		shimEventName = 'jcf-mousewheel';

		$.event.special[shimEventName] = {
			setup: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = fixEvent;
					});
			},
			teardown: function() {
				var self = this;
				$.each(wheelEvents, function(index, fallbackEvent) {
					if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
						else self['on' + fallbackEvent] = null;
					});
			}
		};

		var fixEvent = function(e) {
			var origEvent = e || window.event;
			e = $.event.fix(origEvent);
			e.type = shimEventName;

			// old wheel events handler
			if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
				if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
					if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
						if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

			// modern wheel event handler
			if ('deltaY' in origEvent) {
				e.deltaY = origEvent.deltaY;
			}
			if ('deltaX' in origEvent) {
				e.deltaX = origEvent.deltaX;
			}

			// handle deltaMode for mouse wheel
			e.delta = e.deltaY || e.deltaX;
			if (origEvent.deltaMode === 1) {
				var lineHeight = 16;
				e.delta *= lineHeight;
				e.deltaY *= lineHeight;
				e.deltaX *= lineHeight;
			}

			return ($.event.dispatch || $.event.handle).call(this, e);
		};
	}());

	// extra module methods
	var moduleMixin = {
		// provide function for firing native events
		fireNativeEvent: function(elements, eventName) {
			$(elements).each(function() {
				var element = this, eventObject;
				if (element.dispatchEvent) {
					eventObject = document.createEvent('HTMLEvents');
					eventObject.initEvent(eventName, true, true);
					element.dispatchEvent(eventObject);
				} else if (document.createEventObject) {
					eventObject = document.createEventObject();
					eventObject.target = element;
					element.fireEvent('on' + eventName, eventObject);
				}
			});
		},
		// bind event handlers for module instance (functions beggining with "on")
		bindHandlers: function() {
			var self = this;
			$.each(self, function(propName, propValue) {
				if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
					// dont use $.proxy here because it doesn't create unique handler
					self[propName] = function() {
						return propValue.apply(self, arguments);
					};
				}
			});
		}
	};

	// public API
	var api = {
		version: version,
		modules: {},
		getOptions: function() {
			return $.extend({}, commonOptions);
		},
		setOptions: function(moduleName, moduleOptions) {
			if (arguments.length > 1) {
				// set module options
				if (this.modules[moduleName]) {
					$.extend(this.modules[moduleName].prototype.options, moduleOptions);
				}
			} else {
				// set common options
				$.extend(commonOptions, moduleName);
			}
		},
		addModule: function(proto) {
			// add module to list
			var Module = function(options) {
				// save instance to collection
				if (!options.element.data(commonOptions.dataKey)) {
					options.element.data(commonOptions.dataKey, this);
				}
				customInstances.push(this);

				// save options
				this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

				// bind event handlers to instance
				this.bindHandlers();

				// call constructor
				this.init.apply(this, arguments);
			};

			// parse options from HTML attribute
			var getInlineOptions = function(element) {
				var dataOptions = element.data(commonOptions.optionsKey),
				attrOptions = element.attr(commonOptions.optionsKey);

				if (dataOptions) {
					return dataOptions;
				} else if (attrOptions) {
					try {
						return $.parseJSON(attrOptions);
					} catch (e) {
						// ignore invalid attributes
					}
				}
			};

			// set proto as prototype for new module
			Module.prototype = proto;

			// add mixin methods to module proto
			$.extend(proto, moduleMixin);
			if (proto.plugins) {
				$.each(proto.plugins, function(pluginName, plugin) {
					$.extend(plugin.prototype, moduleMixin);
				});
			}

			// override destroy method
			var originalDestroy = Module.prototype.destroy;
			Module.prototype.destroy = function() {
				this.options.element.removeData(this.options.dataKey);

				for (var i = customInstances.length - 1; i >= 0; i--) {
					if (customInstances[i] === this) {
						customInstances.splice(i, 1);
						break;
					}
				}

				if (originalDestroy) {
					originalDestroy.apply(this, arguments);
				}
			};

			// save module to list
			this.modules[proto.name] = Module;
		},
		getInstance: function(element) {
			return $(element).data(commonOptions.dataKey);
		},
		replace: function(elements, moduleName, customOptions) {
			var self = this,
			instance;

			if (!commonOptions.styleSheetCreated) {
				createStyleSheet();
			}

			$(elements).each(function() {
				var moduleOptions,
				element = $(this);

				instance = element.data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				} else {
					if (!moduleName) {
						$.each(self.modules, function(currentModuleName, module) {
							if (module.prototype.matchElement.call(module.prototype, element)) {
								moduleName = currentModuleName;
								return false;
							}
						});
					}
					if (moduleName) {
						moduleOptions = $.extend({ element: element }, customOptions);
						instance = new self.modules[moduleName](moduleOptions);
					}
				}
			});
			return instance;
		},
		refresh: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.refresh();
				}
			});
		},
		destroy: function(elements) {
			$(elements).each(function() {
				var instance = $(this).data(commonOptions.dataKey);
				if (instance) {
					instance.destroy();
				}
			});
		},
		replaceAll: function(context) {
			var self = this;
			$.each(this.modules, function(moduleName, module) {
				$(module.prototype.selector, context).each(function() {
					if (this.className.indexOf('jcf-ignore') < 0) {
						self.replace(this, moduleName);
					}
				});
			});
		},
		refreshAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function() {
						var instance = $(this).data(commonOptions.dataKey);
						if (instance) {
							instance.refresh();
						}
					});
				});
			} else {
				for (var i = customInstances.length - 1; i >= 0; i--) {
					customInstances[i].refresh();
				}
			}
		},
		destroyAll: function(context) {
			if (context) {
				$.each(this.modules, function(moduleName, module) {
					$(module.prototype.selector, context).each(function(index, element) {
						var instance = $(element).data(commonOptions.dataKey);
						if (instance) {
							instance.destroy();
						}
					});
				});
			} else {
				while (customInstances.length) {
					customInstances[0].destroy();
				}
			}
		}
	};

	// always export API to the global window object
	window.jcf = api;

	return api;
}));

 /*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function($) {

 	'use strict';

 	jcf.addModule({
 		name: 'Radio',
 		selector: 'input[type="radio"]',
 		options: {
 			wrapNative: true,
 			checkedClass: 'jcf-checked',
 			uncheckedClass: 'jcf-unchecked',
 			labelActiveClass: 'jcf-label-active',
 			fakeStructure: '<span class="jcf-radio"><span></span></span>'
 		},
 		matchElement: function(element) {
 			return element.is(':radio');
 		},
 		init: function() {
 			this.initStructure();
 			this.attachEvents();
 			this.refresh();
 		},
 		initStructure: function() {
			// prepare structure
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.labelElement = this.getLabelFor();

			if (this.options.wrapNative) {
				// wrap native radio inside fake block
				this.realElement.prependTo(this.fakeElement).css({
					position: 'absolute',
					opacity: 0
				});
			} else {
				// just hide native radio
				this.realElement.addClass(this.options.hiddenClass);
			}
		},
		attachEvents: function() {
			// add event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.onRealClick
			});
			this.fakeElement.on('click', this.onFakeClick);
			this.fakeElement.on('jcf-pointerdown', this.onPress);
		},
		onRealClick: function(e) {
			// redraw current radio and its group (setTimeout handles click that might be prevented)
			var self = this;
			this.savedEventObject = e;
			setTimeout(function() {
				self.refreshRadioGroup();
			}, 0);
		},
		onFakeClick: function(e) {
			// skip event if clicked on real element inside wrapper
			if (this.options.wrapNative && this.realElement.is(e.target)) {
				return;
			}

			// toggle checked class
			if (!this.realElement.is(':disabled')) {
				delete this.savedEventObject;
				this.currentActiveRadio = this.getCurrentActiveRadio();
				this.stateChecked = this.realElement.prop('checked');
				this.realElement.prop('checked', true);
				this.fireNativeEvent(this.realElement, 'click');
				if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
					this.realElement.prop('checked', this.stateChecked);
					this.currentActiveRadio.prop('checked', true);
				} else {
					this.fireNativeEvent(this.realElement, 'change');
				}
				delete this.savedEventObject;
			}
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.focusedFlag = true;
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.focusedFlag = false;
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
			}
		},
		onPress: function(e) {
			if (!this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function(e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getCurrentActiveRadio: function() {
			return this.getRadioGroup(this.realElement).filter(':checked');
		},
		getRadioGroup: function(radio) {
			// find radio group for specified radio button
			var name = radio.attr('name'),
			parentForm = radio.parents('form');

			if (name) {
				if (parentForm.length) {
					return parentForm.find('input[name="' + name + '"]');
				} else {
					return $('input[name="' + name + '"]:not(form input)');
				}
			} else {
				return radio;
			}
		},
		getLabelFor: function() {
			var parentLabel = this.realElement.closest('label'),
			elementId = this.realElement.prop('id');

			if (!parentLabel.length && elementId) {
				parentLabel = $('label[for="' + elementId + '"]');
			}
			return parentLabel.length ? parentLabel : null;
		},
		refreshRadioGroup: function() {
			// redraw current radio and its group
			this.getRadioGroup(this.realElement).each(function() {
				jcf.refresh(this);
			});
		},
		refresh: function() {
			// redraw current radio button
			var isChecked = this.realElement.is(':checked'),
			isDisabled = this.realElement.is(':disabled');

			this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
			.toggleClass(this.options.uncheckedClass, !isChecked)
			.toggleClass(this.options.disabledClass, isDisabled);

			if (this.labelElement) {
				this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
			}
		},
		destroy: function() {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					width: '',
					height: '',
					opacity: '',
					margin: ''
				});
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
			}

			// removing element will also remove its event handlers
			this.fakeElement.off('jcf-pointerdown', this.onPress);
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onRelease);
			this.realElement.off({
				blur: this.onBlur,
				focus: this.onFocus,
				click: this.onRealClick
			});
		}
	});

}(jQuery));


 /*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
 ;(function($) {

 	'use strict';

 	jcf.addModule({
 		name: 'Checkbox',
 		selector: 'input[type="checkbox"]',
 		options: {
 			wrapNative: true,
 			checkedClass: 'jcf-checked',
 			uncheckedClass: 'jcf-unchecked',
 			labelActiveClass: 'jcf-label-active',
 			fakeStructure: '<span class="jcf-checkbox"><span></span></span>'
 		},
 		matchElement: function(element) {
 			return element.is(':checkbox');
 		},
 		init: function() {
 			this.initStructure();
 			this.attachEvents();
 			this.refresh();
 		},
 		initStructure: function() {
			// prepare structure
			this.doc = $(document);
			this.realElement = $(this.options.element);
			this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
			this.labelElement = this.getLabelFor();

			if (this.options.wrapNative) {
				// wrap native checkbox inside fake block
				this.realElement.appendTo(this.fakeElement).css({
					position: 'absolute',
					height: '100%',
					width: '100%',
					opacity: 0,
					margin: 0
				});
			} else {
				// just hide native checkbox
				this.realElement.addClass(this.options.hiddenClass);
			}
		},
		attachEvents: function() {
			// add event handlers
			this.realElement.on({
				focus: this.onFocus,
				click: this.onRealClick
			});
			this.fakeElement.on('click', this.onFakeClick);
			this.fakeElement.on('jcf-pointerdown', this.onPress);
		},
		onRealClick: function(e) {
			// just redraw fake element (setTimeout handles click that might be prevented)
			var self = this;
			this.savedEventObject = e;
			setTimeout(function() {
				self.refresh();
			}, 0);
		},
		onFakeClick: function(e) {
			// skip event if clicked on real element inside wrapper
			if (this.options.wrapNative && this.realElement.is(e.target)) {
				return;
			}

			// toggle checked class
			if (!this.realElement.is(':disabled')) {
				delete this.savedEventObject;
				this.stateChecked = this.realElement.prop('checked');
				this.realElement.prop('checked', !this.stateChecked);
				this.fireNativeEvent(this.realElement, 'click');
				if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
					this.realElement.prop('checked', this.stateChecked);
				} else {
					this.fireNativeEvent(this.realElement, 'change');
				}
				delete this.savedEventObject;
			}
		},
		onFocus: function() {
			if (!this.pressedFlag || !this.focusedFlag) {
				this.focusedFlag = true;
				this.fakeElement.addClass(this.options.focusClass);
				this.realElement.on('blur', this.onBlur);
			}
		},
		onBlur: function() {
			if (!this.pressedFlag) {
				this.focusedFlag = false;
				this.fakeElement.removeClass(this.options.focusClass);
				this.realElement.off('blur', this.onBlur);
			}
		},
		onPress: function(e) {
			if (!this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = true;
			this.fakeElement.addClass(this.options.pressedClass);
			this.doc.on('jcf-pointerup', this.onRelease);
		},
		onRelease: function(e) {
			if (this.focusedFlag && e.pointerType === 'mouse') {
				this.realElement.focus();
			}
			this.pressedFlag = false;
			this.fakeElement.removeClass(this.options.pressedClass);
			this.doc.off('jcf-pointerup', this.onRelease);
		},
		getLabelFor: function() {
			var parentLabel = this.realElement.closest('label'),
			elementId = this.realElement.prop('id');

			if (!parentLabel.length && elementId) {
				parentLabel = $('label[for="' + elementId + '"]');
			}
			return parentLabel.length ? parentLabel : null;
		},
		refresh: function() {
			// redraw custom checkbox
			var isChecked = this.realElement.is(':checked'),
			isDisabled = this.realElement.is(':disabled');

			this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
			.toggleClass(this.options.uncheckedClass, !isChecked)
			.toggleClass(this.options.disabledClass, isDisabled);

			if (this.labelElement) {
				this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
			}
		},
		destroy: function() {
			// restore structure
			if (this.options.wrapNative) {
				this.realElement.insertBefore(this.fakeElement).css({
					position: '',
					width: '',
					height: '',
					opacity: '',
					margin: ''
				});
			} else {
				this.realElement.removeClass(this.options.hiddenClass);
			}

			// removing element will also remove its event handlers
			this.fakeElement.off('jcf-pointerdown', this.onPress);
			this.fakeElement.remove();

			// remove other event handlers
			this.doc.off('jcf-pointerup', this.onRelease);
			this.realElement.off({
				focus: this.onFocus,
				click: this.onRealClick
			});
		}
	});

}(jQuery));


/*! Picturefill - v3.0.1 - 2015-09-30
* http://scottjehl.github.io/picturefill
* Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
*/
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<41&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){z[b]=!1,aa()},d.onload=function(){z[b]=1===d.width,aa()},d.src=c,"pending"}function f(){L=!1,O=a.devicePixelRatio,M={},N={},s.DPR=O||1,P.width=Math.max(a.innerWidth||0,y.clientWidth),P.height=Math.max(a.innerHeight||0,y.clientHeight),P.vw=P.width/100,P.vh=P.height/100,r=[P.height,P.width,O].join("-"),P.em=s.getEmValue(),P.rem=P.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===A.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||_(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),W.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):X.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):W.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(S),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(T),m>=l)return n;g=c(U),h=[],","===g.slice(-1)?(g=g.replace(V,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=function(){},u=b.createElement("img"),v=u.getAttribute,w=u.setAttribute,x=u.removeAttribute,y=b.documentElement,z={},A={algorithm:""},B="data-pfsrc",C=B+"set",D=navigator.userAgent,E=/rident/.test(D)||/ecko/.test(D)&&D.match(/rv\:(\d+)/)&&RegExp.$1>35,F="currentSrc",G=/\s+\+?\d+(e\d+)?w/,H=/(\([^)]+\))?\s*(.+)/,I=a.picturefillCFG,J="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",K="font-size:100%!important;",L=!0,M={},N={},O=a.devicePixelRatio,P={px:1,"in":96},Q=b.createElement("a"),R=!1,S=/^[ \t\n\r\u000c]+/,T=/^[, \t\n\r\u000c]+/,U=/^[^ \t\n\r\u000c]+/,V=/[,]+$/,W=/^\d+$/,X=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Y=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},Z=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},$=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=Z(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in M))if(M[b]=!1,d&&(e=b.match(a)))M[b]=e[1]*P[e[2]];else try{M[b]=new Function("e",c(b))(P)}catch(f){}return M[b]}}(),_=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},aa=function(a){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),R=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}};o=a.console&&console.warn?function(a){console.warn(a)}:t,F in u||(F="src"),z["image/jpeg"]=!0,z["image/gif"]=!0,z["image/png"]=!0,z["image/svg+xml"]=b.implementation.hasFeature("http://wwwindow.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in u,s.supSizes="sizes"in u,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){u.srcset="data:,a",a.src="data:,a",s.supSrcset=u.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=A,s.supSrcset&&(s.sel+=",img["+C+"]"),s.DPR=O||1,s.u=P,s.types=z,q=s.supSrcset&&!s.supSizes,s.setSize=t,s.makeUrl=Z(function(a){return Q.href=a,Q.href}),s.qsa=function(a,b){return a.querySelectorAll(b)},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?$(a):!0},s.calcLength=function(a){var b=$(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?z[a]:!0},s.parseSize=Z(function(a){var b=(a||"").match(H);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=y.style.cssText,e=a.style.cssText;c.style.cssText=J,y.style.cssText=K,a.style.cssText=K,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),y.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in N)||A.uT){var b=s.calcLength(n(a));N[a]=b?b:P.width}return N[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)_(b[c],a.sizes)}return b},s.setRes.res=_,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[F],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=E&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=v.call(a,"src"),j.src?w.call(a,B,j.src):x.call(a,B)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=v.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:v.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&G.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g),h&&s.supSrcset&&!j.supported&&(e?(w.call(a,C,e),a.srcset=""):x.call(a,C)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!R||L||O!==a.devicePixelRatio)&&f()},s.supPicture?(aa=t,s.fillImg=t):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=y.clientHeight,i=function(){L=Math.max(a.innerWidth||0,y.clientWidth)!==P.width||y.clientHeight!==h,h=y.clientHeight,L&&s.fillImgs()};Y(a,"resize",g(i,99)),Y(b,"readystatechange",e)}(),s.picturefill=aa,s.fillImgs=aa,s.teardownRun=t,aa._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(A[b]=a[0],R&&s.fillImgs({reselect:!0}))}};for(;I&&I.length;)a.picturefillCFG.push(I.shift());a.picturefill=aa,"object"==typeof module&&"object"==typeof module.exports?module.exports=aa:"function"==typeof define&&define.amd&&define("picturefill",function(){return aa}),s.supPicture||(z["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);