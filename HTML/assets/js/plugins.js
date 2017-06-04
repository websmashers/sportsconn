// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*jQuery UI Touch Punch 0.2.3*/
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

/*svg for every body*/
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b){if(b){var c=!a.getAttribute("viewBox")&&b.getAttribute("viewBox"),d=document.createDocumentFragment(),e=b.cloneNode(!0);for(c&&a.setAttribute("viewBox",c);e.childNodes.length;)d.appendChild(e.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=document.createElement("x");c.innerHTML=b.responseText,b.s.splice(0).map(function(b){a(b[0],c.querySelector("#"+b[1].replace(/(\W)/g,"\\$1")))})}},b.onreadystatechange()}function c(c){function d(){for(var c;c=e[0];){var j=c.parentNode;if(j&&/svg/i.test(j.nodeName)){var k=c.getAttribute("xlink:href");if(f&&(!g||g(k,j,c))){var l=k.split("#"),m=l[0],n=l[1];if(j.removeChild(c),m.length){var o=i[m]=i[m]||new XMLHttpRequest;o.s||(o.s=[],o.open("GET",m),o.send()),o.s.push([j,n]),b(o)}else a(j,document.getElementById(n))}}}h(d,17)}c=c||{};var e=document.getElementsByTagName("use"),f="polyfill"in c?c.polyfill:/\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent)||(navigator.userAgent.match(/AppleWebKit\/(\d+)/)||[])[1]<537,g=c.validate,h=window.requestAnimationFrame||setTimeout,i={};f&&d()}return c});

function loadSvg(){jQuery("img.svg").each(function(){var t=jQuery(this),r=t.attr("id"),e=t.attr("class"),a=t.attr("src");jQuery.get(a,function(a){var i=jQuery(a).find("svg");"undefined"!=typeof r&&(i=i.attr("id",r)),"undefined"!=typeof e&&(i=i.attr("class",e)),i=i.removeAttr("xmlns:a"),!i.attr("viewBox")&&i.attr("height")&&i.attr("width")&&i.attr("viewBox","0 0 "+i.attr("height")+" "+i.attr("width")),t.replaceWith(i)},"xml")})};

/* Chosen v1.5.1 | (c) 2011-2016 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
(function(){var a,AbstractChosen,Chosen,SelectParser,b,c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};SelectParser=function(){function SelectParser(){this.options_index=0,this.parsed=[]}return SelectParser.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},SelectParser.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:this.escapeExpression(a.label),title:a.title?a.title:void 0,children:0,disabled:a.disabled,classes:a.className}),f=a.childNodes,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},SelectParser.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,title:a.title?a.title:void 0,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,group_label:null!=b?this.parsed[b].label:null,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},SelectParser.prototype.escapeExpression=function(a){var b,c;return null==a||a===!1?"":/[\&\<\>\"\'\`]/.test(a)?(b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[\<\>\"\'\`]/g,a.replace(c,function(a){return b[a]||"&amp;"})):a},SelectParser}(),SelectParser.select_to_array=function(a){var b,c,d,e,f;for(c=new SelectParser,f=a.childNodes,d=0,e=f.length;e>d;d++)b=f[d],c.add_node(b);return c.parsed},AbstractChosen=function(){function AbstractChosen(a,b){this.form_field=a,this.options=null!=b?b:{},AbstractChosen.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers(),this.on_ready())}return AbstractChosen.prototype.set_default_values=function(){var a=this;return this.click_test_action=function(b){return a.test_active_click(b)},this.activate_action=function(b){return a.activate_field(b)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0,this.include_group_label_in_selected=this.options.include_group_label_in_selected||!1,this.max_shown_results=this.options.max_shown_results||Number.POSITIVE_INFINITY},AbstractChosen.prototype.set_default_text=function(){return this.form_field.getAttribute("data-placeholder")?this.default_text=this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text:this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text},AbstractChosen.prototype.choice_label=function(a){return this.include_group_label_in_selected&&null!=a.group_label?"<b class='group-name'>"+a.group_label+"</b>"+a.html:a.html},AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=!0},AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=!1},AbstractChosen.prototype.input_focus=function(a){var b=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return b.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},AbstractChosen.prototype.input_blur=function(a){var b=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return b.blur_test()},100))},AbstractChosen.prototype.results_option_build=function(a){var b,c,d,e,f,g,h;for(b="",e=0,h=this.results_data,f=0,g=h.length;g>f&&(c=h[f],d="",d=c.group?this.result_add_group(c):this.result_add_option(c),""!==d&&(e++,b+=d),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(this.choice_label(c))),!(e>=this.max_shown_results));f++);return b},AbstractChosen.prototype.result_add_option=function(a){var b,c;return a.search_match&&this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.style.cssText=a.style,c.setAttribute("data-option-array-index",a.array_index),c.innerHTML=a.search_text,a.title&&(c.title=a.title),this.outerHTML(c)):""},AbstractChosen.prototype.result_add_group=function(a){var b,c;return(a.search_match||a.group_match)&&a.active_options>0?(b=[],b.push("group-result"),a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.innerHTML=a.search_text,a.title&&(c.title=a.title),this.outerHTML(c)):""},AbstractChosen.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing?this.winnow_results():void 0},AbstractChosen.prototype.reset_single_select_options=function(){var a,b,c,d,e;for(d=this.results_data,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.selected?e.push(a.selected=!1):e.push(void 0);return e},AbstractChosen.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},AbstractChosen.prototype.results_search=function(a){return this.results_showing?this.winnow_results():this.results_show()},AbstractChosen.prototype.winnow_results=function(){var a,b,c,d,e,f,g,h,i,j,k,l;for(this.no_results_clear(),d=0,f=this.get_search_text(),a=f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),i=new RegExp(a,"i"),c=this.get_search_regex(a),l=this.results_data,j=0,k=l.length;k>j;j++)b=l[j],b.search_match=!1,e=null,this.include_option_in_results(b)&&(b.group&&(b.group_match=!1,b.active_options=0),null!=b.group_array_index&&this.results_data[b.group_array_index]&&(e=this.results_data[b.group_array_index],0===e.active_options&&e.search_match&&(d+=1),e.active_options+=1),b.search_text=b.group?b.label:b.html,(!b.group||this.group_search)&&(b.search_match=this.search_string_match(b.search_text,c),b.search_match&&!b.group&&(d+=1),b.search_match?(f.length&&(g=b.search_text.search(i),h=b.search_text.substr(0,g+f.length)+"</em>"+b.search_text.substr(g+f.length),b.search_text=h.substr(0,g)+"<em>"+h.substr(g)),null!=e&&(e.group_match=!0)):null!=b.group_array_index&&this.results_data[b.group_array_index].search_match&&(b.search_match=!0)));return this.result_clear_highlight(),1>d&&f.length?(this.update_results_content(""),this.no_results(f)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},AbstractChosen.prototype.get_search_regex=function(a){var b;return b=this.search_contains?"":"^",new RegExp(b+a,"i")},AbstractChosen.prototype.search_string_match=function(a,b){var c,d,e,f;if(b.test(a))return!0;if(this.enable_split_word_search&&(a.indexOf(" ")>=0||0===a.indexOf("["))&&(d=a.replace(/\[|\]/g,"").split(" "),d.length))for(e=0,f=d.length;f>e;e++)if(c=d[e],b.test(c))return!0},AbstractChosen.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,b=0,c=d.length;c>b;b++)a=d[b],a.selected&&(this.selected_option_count+=1);return this.selected_option_count},AbstractChosen.prototype.choices_click=function(a){return a.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},AbstractChosen.prototype.keyup_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(a.preventDefault(),this.results_showing)return this.result_select(a);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:case 18:break;default:return this.results_search()}},AbstractChosen.prototype.clipboard_event_checker=function(a){var b=this;return setTimeout(function(){return b.results_search()},50)},AbstractChosen.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},AbstractChosen.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},AbstractChosen.prototype.search_results_touchstart=function(a){return this.touch_started=!0,this.search_results_mouseover(a)},AbstractChosen.prototype.search_results_touchmove=function(a){return this.touch_started=!1,this.search_results_mouseout(a)},AbstractChosen.prototype.search_results_touchend=function(a){return this.touch_started?this.search_results_mouseup(a):void 0},AbstractChosen.prototype.outerHTML=function(a){var b;return a.outerHTML?a.outerHTML:(b=document.createElement("div"),b.appendChild(a),b.innerHTML)},AbstractChosen.browser_is_supported=function(){return/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:/IEMobile/i.test(window.navigator.userAgent)?!1:/Windows Phone/i.test(window.navigator.userAgent)?!1:/BlackBerry/i.test(window.navigator.userAgent)?!1:/BB10/i.test(window.navigator.userAgent)?!1:"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:!0},AbstractChosen.default_multiple_text="Select Some Options",AbstractChosen.default_single_text="Select an Option",AbstractChosen.default_no_result_text="No results match",AbstractChosen}(),a=jQuery,a.fn.extend({chosen:function(b){return AbstractChosen.browser_is_supported()?this.each(function(c){var d,e;return d=a(this),e=d.data("chosen"),"destroy"===b?void(e instanceof Chosen&&e.destroy()):void(e instanceof Chosen||d.data("chosen",new Chosen(this,b)))}):this}}),Chosen=function(c){function Chosen(){return b=Chosen.__super__.constructor.apply(this,arguments)}return d(Chosen,c),Chosen.prototype.setup=function(){return this.form_field_jq=a(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},Chosen.prototype.set_up_html=function(){var b,c;return b=["chosen-container"],b.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&b.push(this.form_field.className),this.is_rtl&&b.push("chosen-rtl"),c={"class":b.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(c.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=a("<div />",c),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior()},Chosen.prototype.on_ready=function(){return this.form_field_jq.trigger("chosen:ready",{chosen:this})},Chosen.prototype.register_observers=function(){var a=this;return this.container.bind("touchstart.chosen",function(b){return a.container_mousedown(b),b.preventDefault()}),this.container.bind("touchend.chosen",function(b){return a.container_mouseup(b),b.preventDefault()}),this.container.bind("mousedown.chosen",function(b){a.container_mousedown(b)}),this.container.bind("mouseup.chosen",function(b){a.container_mouseup(b)}),this.container.bind("mouseenter.chosen",function(b){a.mouse_enter(b)}),this.container.bind("mouseleave.chosen",function(b){a.mouse_leave(b)}),this.search_results.bind("mouseup.chosen",function(b){a.search_results_mouseup(b)}),this.search_results.bind("mouseover.chosen",function(b){a.search_results_mouseover(b)}),this.search_results.bind("mouseout.chosen",function(b){a.search_results_mouseout(b)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(b){a.search_results_mousewheel(b)}),this.search_results.bind("touchstart.chosen",function(b){a.search_results_touchstart(b)}),this.search_results.bind("touchmove.chosen",function(b){a.search_results_touchmove(b)}),this.search_results.bind("touchend.chosen",function(b){a.search_results_touchend(b)}),this.form_field_jq.bind("chosen:updated.chosen",function(b){a.results_update_field(b)}),this.form_field_jq.bind("chosen:activate.chosen",function(b){a.activate_field(b)}),this.form_field_jq.bind("chosen:open.chosen",function(b){a.container_mousedown(b)}),this.form_field_jq.bind("chosen:close.chosen",function(b){a.input_blur(b)}),this.search_field.bind("blur.chosen",function(b){a.input_blur(b)}),this.search_field.bind("keyup.chosen",function(b){a.keyup_checker(b)}),this.search_field.bind("keydown.chosen",function(b){a.keydown_checker(b)}),this.search_field.bind("focus.chosen",function(b){a.input_focus(b)}),this.search_field.bind("cut.chosen",function(b){a.clipboard_event_checker(b)}),this.search_field.bind("paste.chosen",function(b){a.clipboard_event_checker(b)}),this.is_multiple?this.search_choices.bind("click.chosen",function(b){a.choices_click(b)}):this.container.bind("click.chosen",function(a){a.preventDefault()})},Chosen.prototype.destroy=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},Chosen.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},Chosen.prototype.container_mousedown=function(b){return this.is_disabled||(b&&"mousedown"===b.type&&!this.results_showing&&b.preventDefault(),null!=b&&a(b.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!b||a(b.target)[0]!==this.selected_item[0]&&!a(b.target).parents("a.chosen-single").length||(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},Chosen.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},Chosen.prototype.search_results_mousewheel=function(a){var b;return a.originalEvent&&(b=a.originalEvent.deltaY||-a.originalEvent.wheelDelta||a.originalEvent.detail),null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop(b+this.search_results.scrollTop())):void 0},Chosen.prototype.blur_test=function(a){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},Chosen.prototype.close_field=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},Chosen.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},Chosen.prototype.test_active_click=function(b){var c;return c=a(b.target).closest(".chosen-container"),c.length&&this.container[0]===c[0]?this.active_field=!0:this.close_field()},Chosen.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},Chosen.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){if(this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight(),b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(f>c)return this.search_results.scrollTop(c)}},Chosen.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},Chosen.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results(),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}))},Chosen.prototype.update_results_content=function(a){return this.search_results.html(a)},Chosen.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},Chosen.prototype.set_tab_index=function(a){var b;return this.form_field.tabIndex?(b=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=b):void 0},Chosen.prototype.set_label_behavior=function(){var b=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=a("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(a){return b.is_multiple?b.container_mousedown(a):b.activate_field()}):void 0},Chosen.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},Chosen.prototype.search_results_mouseup=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c.length?(this.result_highlight=c,this.result_select(b),this.search_field.focus()):void 0},Chosen.prototype.search_results_mouseover=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c?this.result_do_highlight(c):void 0},Chosen.prototype.search_results_mouseout=function(b){return a(b.target).hasClass("active-result")?this.result_clear_highlight():void 0},Chosen.prototype.choice_build=function(b){var c,d,e=this;return c=a("<li />",{"class":"search-choice"}).html("<span>"+this.choice_label(b)+"</span>"),b.disabled?c.addClass("search-choice-disabled"):(d=a("<a />",{"class":"search-choice-close","data-option-array-index":b.array_index}),d.bind("click.chosen",function(a){return e.choice_destroy_link_click(a)}),c.append(d)),this.search_container.before(c)},Chosen.prototype.choice_destroy_link_click=function(b){return b.preventDefault(),b.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a(b.target))},Chosen.prototype.choice_destroy=function(a){return this.result_deselect(a[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),a.parents("li").first().remove(),this.search_field_scale()):void 0},Chosen.prototype.results_reset=function(){return this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},Chosen.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},Chosen.prototype.result_select=function(a){var b,c;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClass("active-result"):this.reset_single_select_options(),b.addClass("result-selected"),c=this.results_data[b[0].getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(this.choice_label(c)),(a.metaKey||a.ctrlKey)&&this.is_multiple||this.results_hide(),this.show_search_field_default(),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[c.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,a.preventDefault(),this.search_field_scale())):void 0},Chosen.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").html(a)},Chosen.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[b.options_index].value}),this.search_field_scale(),!0)},Chosen.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")):void 0},Chosen.prototype.get_search_text=function(){return a("<div/>").text(a.trim(this.search_field.val())).html()},Chosen.prototype.winnow_results_set_highlight=function(){var a,b;return b=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),a=b.length?b.first():this.search_results.find(".active-result").first(),null!=a?this.result_do_highlight(a):void 0},Chosen.prototype.no_results=function(b){var c;return c=a('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),c.find("span").first().html(b),this.search_results.append(c),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},Chosen.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(a):void 0:this.results_show()},Chosen.prototype.keyup_arrow=function(){var a;return this.results_showing||this.is_multiple?this.result_highlight?(a=this.result_highlight.prevAll("li.active-result"),a.length?this.result_do_highlight(a.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},Chosen.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(a=this.search_container.siblings("li.search-choice").last(),a.length&&!a.hasClass("search-choice-disabled")?(this.pending_backstroke=a,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},Chosen.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},Chosen.prototype.keydown_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),8!==b&&this.pending_backstroke&&this.clear_backstroke(),b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:this.results_showing&&a.preventDefault();break;case 32:this.disable_search&&a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},Chosen.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){for(d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],i=0,j=g.length;j>i;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";return b=a("<div />",{style:f}),b.text(this.search_field.val()),a("body").append(b),h=b.width()+25,b.remove(),c=this.container.outerWidth(),h>c-10&&(h=c-10),this.search_field.css({width:h+"px"})}},Chosen}(AbstractChosen)}).call(this);

// Generated by CoffeeScript 1.8.0
(function(){var e=[].indexOf||function(e){for(var n=0,t=this.length;t>n;n++)if(n in this&&this[n]===e)return n;return-1};angular.module("localytics.directives",[]),angular.module("localytics.directives").directive("chosen",["$timeout",function(n){var t,r,i,a;return r=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/,t=["noResultsText","allowSingleDeselect","disableSearchThreshold","disableSearch","enableSplitWordSearch","inheritSelectClasses","maxSelectedOptions","placeholderTextMultiple","placeholderTextSingle","searchContains","singleBackstrokeDelete","displayDisabledOptions","displaySelectedOptions","width"],a=function(e){return e.replace(/[A-Z]/g,function(e){return"_"+e.toLowerCase()})},i=function(e){var n;if(angular.isArray(e))return 0===e.length;if(angular.isObject(e))for(n in e)if(e.hasOwnProperty(n))return!1;return!0},{restrict:"A",require:"?ngModel",terminal:!0,link:function(l,s,o,u){var c,d,f,h,g,p,$,v,w,b,m,y,S;return s.addClass("localytics-chosen"),$=l.$eval(o.chosen)||{},angular.forEach(o,function(n,r){return e.call(t,r)>=0?$[a(r)]=l.$eval(n):void 0}),b=function(){return s.addClass("loading").attr("disabled",!0).trigger("chosen:updated")},m=function(){return s.removeClass("loading").attr("disabled",!1).trigger("chosen:updated")},c=null,d=null,h=!1,g=function(){return c?s.trigger("chosen:updated"):(c=s.chosen($).data("chosen"),d=c.default_text)},w=function(){return h=!1,s.attr("data-placeholder",d)},f=function(){return h=!0,s.attr("data-placeholder",c.results_none_found).attr("disabled",!0).trigger("chosen:updated")},u?(v=u.$render,u.$render=function(){return v(),g()},o.multiple&&(S=function(){return u.$viewValue},l.$watch(S,u.$render,!0))):g(),o.$observe("disabled",function(){return s.trigger("chosen:updated")}),o.ngOptions&&u?(p=o.ngOptions.match(r),y=p[7],l.$watchCollection(y,function(e,t){var r;return r=n(function(){return angular.isUndefined(e)?b():(h&&w(),m(),i(e)?f():void 0)})}),l.$on("$destroy",function(e){return"undefined"!=typeof timer&&null!==timer?n.cancel(timer):void 0})):void 0}}}])}).call(this);

// Knob
(function(e){if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var t={},n=Math.max,r=Math.min;t.c={};t.c.d=e(document);t.c.t=function(e){return e.originalEvent.touches.length-1};t.o=function(){var n=this;this.o=null;this.$=null;this.i=null;this.g=null;this.v=null;this.cv=null;this.x=0;this.y=0;this.w=0;this.h=0;this.$c=null;this.c=null;this.t=0;this.isInit=false;this.fgColor=null;this.pColor=null;this.dH=null;this.cH=null;this.eH=null;this.rH=null;this.scale=1;this.relative=false;this.relativeWidth=false;this.relativeHeight=false;this.$div=null;this.run=function(){var t=function(e,t){var r;for(r in t){n.o[r]=t[r]}n._carve().init();n._configure()._draw()};if(this.$.data("kontroled"))return;this.$.data("kontroled",true);this.extend();this.o=e.extend({min:this.$.data("min")!==undefined?this.$.data("min"):0,max:this.$.data("max")!==undefined?this.$.data("max"):100,stopper:true,readOnly:this.$.data("readonly")||this.$.attr("readonly")==="readonly",cursor:this.$.data("cursor")===true&&30||this.$.data("cursor")||0,thickness:this.$.data("thickness")&&Math.max(Math.min(this.$.data("thickness"),1),.01)||.35,lineCap:this.$.data("linecap")||"butt",width:this.$.data("width")||200,height:this.$.data("height")||200,displayInput:this.$.data("displayinput")==null||this.$.data("displayinput"),displayPrevious:this.$.data("displayprevious"),fgColor:this.$.data("fgcolor")||"#87CEEB",inputColor:this.$.data("inputcolor"),inline:false,step:this.$.data("step")||1,rotation:this.$.data("rotation"),draw:null,change:null,cancel:null,release:null,format:function(e){return e},parse:function(e){return parseFloat(e)}},this.o);this.o.flip=this.o.rotation==="anticlockwise"||this.o.rotation==="acw";if(!this.o.inputColor){this.o.inputColor=this.o.fgColor}if(this.$.is("fieldset")){this.v={};this.i=this.$.find("input");this.i.each(function(t){var r=e(this);n.i[t]=r;n.v[t]=n.o.parse(r.val());r.bind("change blur",function(){var e={};e[t]=r.val();n.val(n._validate(e))})});this.$.find("legend").remove()}else{this.i=this.$;this.v=this.o.parse(this.$.val());this.v===""&&(this.v=this.o.min);this.$.bind("change blur",function(){n.val(n._validate(n.o.parse(n.$.val())))})}!this.o.displayInput&&this.$.hide();this.$c=e(document.createElement("canvas")).attr({width:this.o.width,height:this.o.height});this.$div=e('<div style="'+(this.o.inline?"display:inline-block;":"")+"width:"+this.o.width+"px;height:"+this.o.height+"px;"+'"></div>');this.$.wrap(this.$div).before(this.$c);this.$div=this.$.parent();if(typeof G_vmlCanvasManager!=="undefined"){G_vmlCanvasManager.initElement(this.$c[0])}this.c=this.$c[0].getContext?this.$c[0].getContext("2d"):null;if(!this.c){throw{name:"CanvasNotSupportedException",message:"Canvas not supported. Please use excanvas on IE8.0.",toString:function(){return this.name+": "+this.message}}}this.scale=(window.devicePixelRatio||1)/(this.c.webkitBackingStorePixelRatio||this.c.mozBackingStorePixelRatio||this.c.msBackingStorePixelRatio||this.c.oBackingStorePixelRatio||this.c.backingStorePixelRatio||1);this.relativeWidth=this.o.width%1!==0&&this.o.width.indexOf("%");this.relativeHeight=this.o.height%1!==0&&this.o.height.indexOf("%");this.relative=this.relativeWidth||this.relativeHeight;this._carve();if(this.v instanceof Object){this.cv={};this.copy(this.v,this.cv)}else{this.cv=this.v}this.$.bind("configure",t).parent().bind("configure",t);this._listen()._configure()._xy().init();this.isInit=true;this.$.val(this.o.format(this.v));this._draw();return this};this._carve=function(){if(this.relative){var e=this.relativeWidth?this.$div.parent().width()*parseInt(this.o.width)/100:this.$div.parent().width(),t=this.relativeHeight?this.$div.parent().height()*parseInt(this.o.height)/100:this.$div.parent().height();this.w=this.h=Math.min(e,t)}else{this.w=this.o.width;this.h=this.o.height}this.$div.css({width:this.w+"px",height:this.h+"px"});this.$c.attr({width:this.w,height:this.h});if(this.scale!==1){this.$c[0].width=this.$c[0].width*this.scale;this.$c[0].height=this.$c[0].height*this.scale;this.$c.width(this.w);this.$c.height(this.h)}return this};this._draw=function(){var e=true;n.g=n.c;n.clear();n.dH&&(e=n.dH());e!==false&&n.draw()};this._touch=function(e){var r=function(e){var t=n.xy2val(e.originalEvent.touches[n.t].pageX,e.originalEvent.touches[n.t].pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};this.t=t.c.t(e);r(e);t.c.d.bind("touchmove.k",r).bind("touchend.k",function(){t.c.d.unbind("touchmove.k touchend.k");n.val(n.cv)});return this};this._mouse=function(e){var r=function(e){var t=n.xy2val(e.pageX,e.pageY);if(t==n.cv)return;if(n.cH&&n.cH(t)===false)return;n.change(n._validate(t));n._draw()};r(e);t.c.d.bind("mousemove.k",r).bind("keyup.k",function(e){if(e.keyCode===27){t.c.d.unbind("mouseup.k mousemove.k keyup.k");if(n.eH&&n.eH()===false)return;n.cancel()}}).bind("mouseup.k",function(e){t.c.d.unbind("mousemove.k mouseup.k keyup.k");n.val(n.cv)});return this};this._xy=function(){var e=this.$c.offset();this.x=e.left;this.y=e.top;return this};this._listen=function(){if(!this.o.readOnly){this.$c.bind("mousedown",function(e){e.preventDefault();n._xy()._mouse(e)}).bind("touchstart",function(e){e.preventDefault();n._xy()._touch(e)});this.listen()}else{this.$.attr("readonly","readonly")}if(this.relative){e(window).resize(function(){n._carve().init();n._draw()})}return this};this._configure=function(){if(this.o.draw)this.dH=this.o.draw;if(this.o.change)this.cH=this.o.change;if(this.o.cancel)this.eH=this.o.cancel;if(this.o.release)this.rH=this.o.release;if(this.o.displayPrevious){this.pColor=this.h2rgba(this.o.fgColor,"0.4");this.fgColor=this.h2rgba(this.o.fgColor,"0.6")}else{this.fgColor=this.o.fgColor}return this};this._clear=function(){this.$c[0].width=this.$c[0].width};this._validate=function(e){var t=~~((e<0?-.5:.5)+e/this.o.step)*this.o.step;return Math.round(t*100)/100};this.listen=function(){};this.extend=function(){};this.init=function(){};this.change=function(e){};this.val=function(e){};this.xy2val=function(e,t){};this.draw=function(){};this.clear=function(){this._clear()};this.h2rgba=function(e,t){var n;e=e.substring(1,7);n=[parseInt(e.substring(0,2),16),parseInt(e.substring(2,4),16),parseInt(e.substring(4,6),16)];return"rgba("+n[0]+","+n[1]+","+n[2]+","+t+")"};this.copy=function(e,t){for(var n in e){t[n]=e[n]}}};t.Dial=function(){t.o.call(this);this.startAngle=null;this.xy=null;this.radius=null;this.lineWidth=null;this.cursorExt=null;this.w2=null;this.PI2=2*Math.PI;this.extend=function(){this.o=e.extend({bgColor:this.$.data("bgcolor")||"#EEEEEE",angleOffset:this.$.data("angleoffset")||0,angleArc:this.$.data("anglearc")||360,inline:true},this.o)};this.val=function(e,t){if(null!=e){e=this.o.parse(e);if(t!==false&&e!=this.v&&this.rH&&this.rH(e)===false){return}this.cv=this.o.stopper?n(r(e,this.o.max),this.o.min):e;this.v=this.cv;this.$.val(this.o.format(this.v));this._draw()}else{return this.v}};this.xy2val=function(e,t){var i,s;i=Math.atan2(e-(this.x+this.w2),-(t-this.y-this.w2))-this.angleOffset;if(this.o.flip){i=this.angleArc-i-this.PI2}if(this.angleArc!=this.PI2&&i<0&&i>-.5){i=0}else if(i<0){i+=this.PI2}s=i*(this.o.max-this.o.min)/this.angleArc+this.o.min;this.o.stopper&&(s=n(r(s,this.o.max),this.o.min));return s};this.listen=function(){var t=this,i,s,o=function(e){e.preventDefault();var o=e.originalEvent,u=o.detail||o.wheelDeltaX,a=o.detail||o.wheelDeltaY,f=t._validate(t.o.parse(t.$.val()))+(u>0||a>0?t.o.step:u<0||a<0?-t.o.step:0);f=n(r(f,t.o.max),t.o.min);t.val(f,false);if(t.rH){clearTimeout(i);i=setTimeout(function(){t.rH(f);i=null},100);if(!s){s=setTimeout(function(){if(i)t.rH(f);s=null},200)}}},u,a,f=1,l={37:-t.o.step,38:t.o.step,39:t.o.step,40:-t.o.step};this.$.bind("keydown",function(i){var s=i.keyCode;if(s>=96&&s<=105){s=i.keyCode=s-48}u=parseInt(String.fromCharCode(s));if(isNaN(u)){s!==13&&s!==8&&s!==9&&s!==189&&(s!==190||t.$.val().match(/\./))&&i.preventDefault();if(e.inArray(s,[37,38,39,40])>-1){i.preventDefault();var o=t.o.parse(t.$.val())+l[s]*f;t.o.stopper&&(o=n(r(o,t.o.max),t.o.min));t.change(t._validate(o));t._draw();a=window.setTimeout(function(){f*=2},30)}}}).bind("keyup",function(e){if(isNaN(u)){if(a){window.clearTimeout(a);a=null;f=1;t.val(t.$.val())}}else{t.$.val()>t.o.max&&t.$.val(t.o.max)||t.$.val()<t.o.min&&t.$.val(t.o.min)}});this.$c.bind("mousewheel DOMMouseScroll",o);this.$.bind("mousewheel DOMMouseScroll",o)};this.init=function(){if(this.v<this.o.min||this.v>this.o.max){this.v=this.o.min}this.$.val(this.v);this.w2=this.w/2;this.cursorExt=this.o.cursor/100;this.xy=this.w2*this.scale;this.lineWidth=this.xy*this.o.thickness;this.lineCap=this.o.lineCap;this.radius=this.xy-this.lineWidth/2;this.o.angleOffset&&(this.o.angleOffset=isNaN(this.o.angleOffset)?0:this.o.angleOffset);this.o.angleArc&&(this.o.angleArc=isNaN(this.o.angleArc)?this.PI2:this.o.angleArc);this.angleOffset=this.o.angleOffset*Math.PI/180;this.angleArc=this.o.angleArc*Math.PI/180;this.startAngle=1.5*Math.PI+this.angleOffset;this.endAngle=1.5*Math.PI+this.angleOffset+this.angleArc;var e=n(String(Math.abs(this.o.max)).length,String(Math.abs(this.o.min)).length,2)+2;this.o.displayInput&&this.i.css({width:(this.w/2+4>>0)+"px",height:(this.w/3>>0)+"px",position:"absolute","vertical-align":"middle","margin-top":(this.w/3>>0)+"px","margin-left":"-"+(this.w*3/4+2>>0)+"px",border:0,background:"none",font:this.o.fontWeight+" "+(this.w/e>>0)+"px "+this.o.font,"text-align":"center",color:this.o.inputColor||this.o.fgColor,padding:"0px","-webkit-appearance":"none"})||this.i.css({width:"0px",visibility:"hidden"})};this.change=function(e){this.cv=e;this.$.val(this.o.format(e))};this.angle=function(e){return(e-this.o.min)*this.angleArc/(this.o.max-this.o.min)};this.arc=function(e){var t,n;e=this.angle(e);if(this.o.flip){t=this.endAngle+1e-5;n=t-e-1e-5}else{t=this.startAngle-1e-5;n=t+e+1e-5}this.o.cursor&&(t=n-this.cursorExt)&&(n=n+this.cursorExt);return{s:t,e:n,d:this.o.flip&&!this.o.cursor}};this.draw=function(){var e=this.g,t=this.arc(this.cv),n,r=1;e.lineWidth=this.lineWidth;e.lineCap=this.lineCap;if(this.o.bgColor!=="none"){e.beginPath();e.strokeStyle=this.o.bgColor;e.arc(this.xy,this.xy,this.radius,this.endAngle-1e-5,this.startAngle+1e-5,true);e.stroke()}if(this.o.displayPrevious){n=this.arc(this.v);e.beginPath();e.strokeStyle=this.pColor;e.arc(this.xy,this.xy,this.radius,n.s,n.e,n.d);e.stroke();r=this.cv==this.v}e.beginPath();e.strokeStyle=r?this.o.fgColor:this.fgColor;e.arc(this.xy,this.xy,this.radius,t.s,t.e,t.d);e.stroke()};this.cancel=function(){this.val(this.v)}};e.fn.dial=e.fn.knob=function(n){return this.each(function(){var r=new t.Dial;r.o=n;r.$=e(this);r.run()}).parent()}})

/*! enscroll - v0.6.1 - 2014-09-01 */
;(function( $, win, doc, undefined ) {

	var defaultSettings = {
		verticalScrolling: true,
		horizontalScrolling: false,
        verticalScrollerSide: 'right',
		showOnHover: false,
		scrollIncrement: 20,
		minScrollbarLength: 40,
		pollChanges: true,
		drawCorner: true,
		drawScrollButtons: false,
		clickTrackToScroll: true,
		easingDuration: 500,
		propagateWheelEvent: true,
		verticalTrackClass: 'vertical-track',
		horizontalTrackClass: 'horizontal-track',
		horizontalHandleClass: 'horizontal-handle',
		verticalHandleClass: 'vertical-handle',
		scrollUpButtonClass: 'scroll-up-btn',
		scrollDownButtonClass: 'scroll-down-btn',
		scrollLeftButtonClass: 'scroll-left-btn',
		scrollRightButtonClass: 'scroll-right-btn',
		cornerClass: 'scrollbar-corner',
		zIndex: 1,
		addPaddingToPane: true,
		horizontalHandleHTML: '<div class="left"></div><div class="right"></div>',
		verticalHandleHTML: '<div class="top"></div><div class="bottom"></div>'
	},

	preventDefault = function( event ) {
		if ( event.preventDefault ) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		if ( event.stopPropagation ) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},

	// normalize requestAnimationFrame function and polyfill if needed
	reqAnimFrame = win.requestAnimationFrame ||
			win.mozRequestAnimationFrame ||
			win.webkitRequestAnimationFrame ||
			win.oRequestAnimationFrame ||
			win.msRequestAnimationFrame ||
			function( f ) { setTimeout( f, 17 ); },

	getComputedValue = function( elem, property ) {
		var w = $( elem ).css( property ),
			matches = /^-?\d+/.exec( w );
		return matches ? +matches[0] : 0;
	},

	testScrollHeight = function( nodeName ) {
		var styles = {
				width: '5px',
				height: '1px',
				overflow: 'hidden',
				padding: '8px 0',
				visibility: 'hidden',
				whiteSpace: 'pre-line',
				font: '10px/1 serif'
			},
			pane = document.createElement( nodeName ),
			textNode = document.createTextNode( 'a\na' ),
			result, attr;

		for ( attr in styles ) {
			pane.style[ attr ] = styles[ attr ];
		}

		pane.appendChild( textNode );
		document.body.appendChild( pane );

		result = ( pane.scrollHeight < 28 );

		document.body.removeChild( pane );

		return result;
	},

	PI_OVER_2 = 0.5 * Math.PI,

	TEN_LOG2 = 10 * Math.log( 2 ),

	easeOutSin = function( c, d, t ) {
		var b = PI_OVER_2 / d,
			a = c * b;

		return Math.round( a * Math.cos( b * t ));
	},

	easeOutExpo = function( c, d, t ) {
		return Math.round( c * TEN_LOG2 * Math.pow( 2, -10 * t / d + 1 ) / d );
	},

	timeFromPosition = function( b, c, d, x ) {
		return 2 * d / Math.PI * Math.asin(( x - b ) / c );
	},

	showScrollbars = function( scheduleHide ) {
		var data = $( this ).data( 'enscroll' ),
			that = this,
			settings = data.settings,
			hideScrollbars = function() {
				var data = $( this ).data( 'enscroll' ),
					settings = data.settings;

				if ( data && settings.showOnHover ) {
					if ( settings.verticalScrolling &&
						$( data.verticalTrackWrapper ).is( ':visible' )) {
						$( data.verticalTrackWrapper ).stop().fadeTo( 275, 0 );
					}

					if ( settings.horizontalScrolling &&
						$( data.horizontalTrackWrapper ).is( ':visible' )) {
						$( data.horizontalTrackWrapper ).stop().fadeTo( 275, 0 );
					}
					data._fadeTimer = null;
				}
			};

		if ( data && settings.showOnHover ) {
			if ( data._fadeTimer ) {
				clearTimeout( data._fadeTimer );
			} else {
				if ( settings.verticalScrolling &&
					$( data.verticalTrackWrapper ).is( ':visible' )) {
					$( data.verticalTrackWrapper ).stop().fadeTo( 275, 1 );
				}

				if ( settings.horizontalScrolling &&
					$( data.horizontalTrackWrapper ).is( ':visible' )) {
					$( data.horizontalTrackWrapper ).stop().fadeTo( 275, 1 );
				}
			}

			if ( scheduleHide !== false ) {
				data._fadeTimer = setTimeout(function() {
					hideScrollbars.call( that );
				}, 1750);
			}
		}
	},

	scrollVertical = function( pane, dy ) {
		var $pane = $( pane ),
			data = $pane.data( 'enscroll' ),
			y0 = $pane.scrollTop();

		if ( data && data.settings.verticalScrolling ) {
			$pane.scrollTop( y0 + dy );
			if ( data.settings.showOnHover ) {
				showScrollbars.call( pane );
			}
		}
	},

	scrollHorizontal = function( pane, dx ) {
		var $pane = $( pane ),
			data = $pane.data( 'enscroll' ),
			x0 = $pane.scrollLeft();
		if ( data && data.settings.horizontalScrolling ) {
			$pane.scrollLeft( x0 + dx );
			if ( data.settings.showOnHover ) {
				showScrollbars.call( pane );
			}
		}
	},

	startVerticalDrag = function( event ) {
		// only handle events for left mouse button dragging
		if ( event.which !== 1 ) {
			return;
		}

		var pane = event.data.pane,
			$pane = $( pane ),
			data = $pane.data( 'enscroll' ),
			dragging = true,
			$track, handle, handleY, oldHandleY, mouseYOffset,
			trackYOffset, bodyCursor, trackDiff, paneDiff,

			moveHandle = function() {
				if ( !dragging ) {
					return;
				}

				if ( handleY !== oldHandleY ) {
					if ( !data._scrollingY ) {
						data._scrollingY = true;
						data._startY = $pane.scrollTop();
						reqAnimFrame( function() {
							scrollAnimate( $pane );
						});
					}

					handle.style.top = handleY + 'px';

					data._endY = handleY * paneDiff / trackDiff;
					oldHandleY = handleY;
				}

				reqAnimFrame( moveHandle );

				if ( data.settings.showOnHover ) {
					showScrollbars.call( pane );
				}
			},

			moveDrag = function( event ) {
				if ( dragging ) {
					handleY = event.clientY - trackYOffset - mouseYOffset;
					handleY = Math.min( handleY < 0 ? 0 : handleY, trackDiff );
				}
				return false;
			},

			endDrag = function() {
				dragging = false;

				doc.body.style.cursor = bodyCursor;
				this.style.cursor = '';
				$track.removeClass( 'dragging' );

				$( doc.body )
					.off( 'mousemove.enscroll.vertical' )
					.off( 'mouseup.enscroll.vertical' );

				$( doc ).off( 'mouseout.enscroll.vertical' );

				$pane.on( 'scroll.enscroll.pane', function( event ) {
					paneScrolled.call( this, event );
				});

				return false;
			};

		$track = $( data.verticalTrackWrapper ).find( '.enscroll-track' );
		handle = $track.children().first()[0];
		handleY = parseInt( handle.style.top, 10 );
		paneDiff = pane.scrollHeight -
			(data._scrollHeightNoPadding ? $(pane).height() : $(pane).innerHeight());

		mouseYOffset = event.clientY - $( handle ).offset().top;
		trackDiff = $track.height() - $( handle ).outerHeight();
		trackYOffset = $track.offset().top;

		$pane.off( 'scroll.enscroll.pane' );

		$( doc.body ).on({
			'mousemove.enscroll.vertical': moveDrag,
			'mouseup.enscroll.vertical': function( event ) {
				endDrag.call( handle, event );
			}
		});

		$( doc ).on( 'mouseout.enscroll.vertical', function( event ) {
			if ( event.target.nodeName && event.target.nodeName.toUpperCase() === 'HTML' ) {
				endDrag.call( handle, event );
			}
		});

		if ( !$track.hasClass( 'dragging' ) ) {
			$track.addClass( 'dragging' );
			bodyCursor = $( doc.body ).css( 'cursor' );
			this.style.cursor = doc.body.style.cursor = 'ns-resize';
		}

		reqAnimFrame( moveHandle );

		return false;
	},

	startHorizontalDrag = function( event ) {
		// dragging the scrollbar handle only works with left mouse button
		if ( event.which !== 1 ) {
			return;
		}

		var pane = event.data.pane,
			$pane = $( pane ),
			data = $( pane ).data( 'enscroll' ),
			dragging = true,
			$track, handle, handleX, oldHandleX, paneDiff,
			mouseXOffset, trackXOffset, bodyCursor, trackDiff,

			moveHandle = function() {
				if ( !dragging ) {
					return;
				}

				if ( handleX !== oldHandleX ) {
					if ( !data._scrollingX ) {
						data._scrollingX = true;
						data._startX = $pane.scrollLeft();
						reqAnimFrame( function() {
							scrollAnimate( $pane );
						});
					}

					handle.style.left = handleX + 'px';

					data._endX = handleX * paneDiff / trackDiff;
					oldHandleX = handleX;
				}

				reqAnimFrame( moveHandle );

				if ( data.settings.showOnHover ) {
					showScrollbars.call( pane );
				}
			},

			moveDrag = function( event ) {
				if ( dragging ) {
					handleX = event.clientX - trackXOffset - mouseXOffset;
					handleX = Math.min( handleX < 0 ? 0 : handleX, trackDiff );
				}
				return false;
			},

			endDrag = function() {
				dragging = false;

				$track.removeClass('dragging');

				doc.body.style.cursor = bodyCursor;
				this.style.cursor = '';
				$track.removeClass( 'dragging' );

				$( doc.body )
					.off( 'mousemove.enscroll.horizontal' )
					.off( 'mouseup.enscroll.horizontal' );

				$( doc ).off ( 'mouseout.enscroll.horizontal' );

				$pane.on( 'scroll.enscroll.pane', function( event ) {
					paneScrolled.call( this, event );
				});

				return false;
			};

		$track = $( data.horizontalTrackWrapper ).find( '.enscroll-track' );
		handle = $track.children().first()[0];
		handleX = parseInt( handle.style.left, 10 );
		paneDiff = pane.scrollWidth - $( pane ).innerWidth();
		mouseXOffset = event.clientX - $( handle ).offset().left;
		trackDiff = $track.width() - $( handle ).outerWidth();
		trackXOffset = $track.offset().left;

		$pane.off( 'scroll.enscroll.pane' );

		$( doc.body ).on({
			'mousemove.enscroll.horizontal': moveDrag,
			'mouseup.enscroll.horizontal': function( event ) {
				endDrag.call( handle, event );
			}
		});

		$( doc ).on( 'mouseout.enscroll.horizontal', function( event ) {
			if ( event.target.nodeName && event.target.nodeName.toUpperCase() === 'HTML' ) {
				endDrag.call( handle, event );
			}
		});

		if ( !$track.hasClass( 'dragging' ) ) {
			$track.addClass( 'dragging' );
			bodyCursor = $( 'body' ).css( 'cursor' );
			this.style.cursor = doc.body.style.cursor = 'ew-resize';
		}

		reqAnimFrame( moveHandle );

		return false;

	},

	scrollAnimate = function( $pane ) {
		var data = $pane.data( 'enscroll' ),
			d = data._duration,
			c, curPos, t;

		if ( data._scrollingX === true ) {
			c = data._endX - data._startX;
			if ( c === 0 ) {
				data._scrollingX = false;
			} else {
				curPos = $pane.scrollLeft();
				t = timeFromPosition( data._startX, c, d, curPos );
				if ( c > 0 ) {
					if ( curPos >= data._endX || curPos < data._startX ) {
						data._scrollingX = false;
					} else {
						scrollHorizontal( $pane,
							Math.max( 1, easeOutSin( c, d, t )));
						reqAnimFrame( function() {
							scrollAnimate( $pane );
						});
					}
				} else {
					if ( curPos <= data._endX || curPos > data._startX ) {
						data._scrollingX = false;
					} else {
						scrollHorizontal( $pane,
							Math.min( -1, easeOutSin( c, d, t )));
						reqAnimFrame( function() {
							scrollAnimate( $pane );
						});
					}
				}
			}
		}

		if ( data._scrollingY === true ) {
			c = data._endY - data._startY;
			if ( c === 0 ) {
				data._scrollingY = false;
			} else {
				curPos = $pane.scrollTop();
				t = timeFromPosition( data._startY, c, d, curPos );
				if ( c > 0 ) {
					if ( curPos >= data._endY || curPos < data._startY ) {
						data._scrollingY = false;
					} else {
						scrollVertical( $pane,
							Math.max( 1, easeOutSin( c, d, t )));
						reqAnimFrame( function() {
							scrollAnimate( $pane );
						});
					}
				} else {
					if ( curPos <= data._endY || curPos > data._startY ) {
						data._scrollingY = false;
					} else {
						scrollVertical( $pane,
							Math.min( -1, easeOutSin( c, d, t )));
						reqAnimFrame( function() {
							scrollAnimate( $pane );
						});
					}
				}
			}
		}

	},

	scrollAnimateHorizontal = function( $pane, delta ) {
		var data = $pane.data( 'enscroll' ),
			curPos = $pane.scrollLeft(),
			scrollMax = $pane[0].scrollWidth - $pane.innerWidth();

		if ( !data.settings.horizontalScrolling || data._scrollingY ) {
			return false;
		}

		if ( !data._scrollingX ) {
			data._scrollingX = true;
			data._startX = curPos;

			data._endX = data._startX;
			reqAnimFrame( function() {
				scrollAnimate( $pane );
			});
		}

		data._endX = delta > 0 ? Math.min( curPos + delta, scrollMax ) :
			Math.max( 0, curPos + delta );

		return delta < 0 && curPos > 0 || delta > 0 && curPos < scrollMax;
	},

	scrollAnimateVertical = function( $pane, delta ) {
		var data = $pane.data( 'enscroll' ),
			curPos = $pane.scrollTop(),
			scrollMax = $pane[0].scrollHeight - (data._scrollHeightNoPadding ? $pane.height() : $pane.innerHeight());

		if ( !data.settings.verticalScrolling || data._scrollingX ) {
			return false;
		}

		if ( !data._scrollingY ) {
			data._scrollingY = true;
			data._startY = curPos;
			data._endY = data._startY;
			reqAnimFrame( function() {
				scrollAnimate( $pane );
			});
		}

		data._endY = delta > 0 ? Math.min( curPos + delta, scrollMax ) :
			Math.max( 0, curPos + delta );

		return delta < 0 && curPos > 0 || delta > 0 && curPos < scrollMax;
	},

	mouseScroll = function( event ) {
		var $pane = $( this ),
			data = $pane.data( 'enscroll' ),
			scrollIncrement = data.settings.scrollIncrement,
			deltaX = 'deltaX' in event ? -event.deltaX :
				'wheelDeltaX' in event ? event.wheelDeltaX :
				0,
			deltaY = 'deltaY' in event ? -event.deltaY :
				'wheelDeltaY' in event ? event.wheelDeltaY :
				'wheelDelta' in event ? event.wheelDelta :
				0,
			delta;

		if ( Math.abs( deltaX ) > Math.abs( deltaY ) && deltaX !== 0 ) {
			delta = ( deltaX > 0 ? -scrollIncrement : scrollIncrement ) << 2;
			if ( scrollAnimateHorizontal( $pane, delta ) || !data.settings.propagateWheelEvent ) {
				preventDefault( event );
			}
		} else if ( deltaY !== 0 ) {
			delta = ( deltaY > 0 ? -scrollIncrement : scrollIncrement ) << 2;
			if ( scrollAnimateVertical( $pane, delta ) || !data.settings.propagateWheelEvent ) {
				preventDefault( event );
			}
		}
	},

	paneScrolled = function() {
		var $this = $( this ),
			data = $this.data( 'enscroll' ),
			handle, track, pct;

		if ( data ) {
			if ( data.settings.verticalScrolling ) {
				track = $( data.verticalTrackWrapper ).find( '.enscroll-track' )[0];
				handle = track.firstChild;
				pct = $this.scrollTop() / ( this.scrollHeight - (data._scrollHeightNoPadding ? $this.height() : $this.innerHeight()));
				pct = isNaN( pct ) ? 0 : pct;

				handle.style.top = ( pct * ( $( track ).height() - $( handle ).outerHeight() )) + 'px';
			}

			if ( data.settings.horizontalScrolling ) {
				track = $( data.horizontalTrackWrapper ).find( '.enscroll-track' )[0];
				handle = track.firstChild;
				pct = $this.scrollLeft() / ( this.scrollWidth - $this.innerWidth() );
				pct = isNaN( pct ) ? 0 : pct;

				handle.style.left = ( pct * ( $( track ).width() - $( handle ).innerWidth() )) + 'px';
			}
		}
	},

	keyHandler = function( event ) {
		var $this = $( this ),
			data = $this.data( 'enscroll' ),
			scrollIncrement;

		// dont' have key events if this element is a user-input element
		if (/(input)|(select)|(textarea)/i.test( this.nodeName )) {
			return;
		}

		// don't handle events that have just bubbled up
		if ( event.target === this && data ) {
			scrollIncrement = data.settings.scrollIncrement;

			switch( event.keyCode ) {
				case 32: // space
				case 34: // page down
					scrollAnimateVertical( $this, $this.height() );
					return false;
				case 33: // page up
					scrollAnimateVertical( $this, -$this.height() );
					return false;
				case 35: // end
					scrollAnimateVertical( $this, this.scrollHeight );
					return false;
				case 36: // home
					scrollAnimateVertical( $this, -this.scrollHeight );
					return false;
				case 37: // left
					scrollAnimateHorizontal( $this, -scrollIncrement );
					return false;
				case 38: // up
					scrollAnimateVertical( $this, -scrollIncrement );
					return false;
				case 39: // right
					scrollAnimateHorizontal( $this, scrollIncrement );
					return false;
				case 40: // down
					scrollAnimateVertical( $this, scrollIncrement );
					return false;
			}

			return true;
		}
	},

	dragHandler = function() {
		var pane = this,
			settings = $( pane ).data( 'enscroll' ).settings,
			dragging = true,
			deltaX = 0,
			deltaY = 0,
			paneTop = $( pane ).offset().top,
			paneBottom = paneTop + $( pane ).outerHeight(),
			paneLeft = $( pane ).offset().left,
			paneRight = paneLeft + $( pane ).outerWidth(),
			dragMove = function( event ) {
				var x = event.pageX,
					y = event.pageY;

				deltaX = x < paneLeft ? x - paneLeft :
					x > paneRight ? x - paneRight :
					0;

				deltaY = y < paneTop ? y - paneTop :
					y > paneBottom ? y - paneBottom :
					0;
			},

			dragPoll = function() {
				if ( settings.horizontalScrolling && deltaX ) {
					scrollHorizontal(pane, parseInt( deltaX / 4, 10 ));
				}
				if ( settings.verticalScrolling && deltaY ) {
					scrollVertical( pane, parseInt( deltaY / 4, 10 ));
				}
				if ( dragging ) {
					reqAnimFrame( dragPoll );
				}
			},

			dragEnd = function() {
				dragging = false;
				$( doc )
					.off( 'mousemove.enscroll.pane' )
					.off( 'mouseup.enscroll.pane' );
			};

		reqAnimFrame( dragPoll );

		$( doc ).on({
			'mousemove.enscroll.pane': dragMove,
			'mouseup.enscroll.pane': dragEnd
		});
	},

	touchStart = function( event ) {
		var touchX, touchY, touchAxis, touchX0, touchY0, touchStarted, touchDelta,
			pane = this,
			touchMove = function( event ) {
				touchX = event.touches[0].clientX;
				touchY = event.touches[0].clientY;

				if ( !touchAxis ) {
					touchAxis = touchY === touchY0 && touchX === touchX0 ? undefined :
						Math.abs( touchY0 - touchY ) > Math.abs( touchX0 - touchX ) ? 'y' :
						'x';
				}

				preventDefault( event );
			},

			touchPoll = function() {
				if ( !touchStarted ) {
					return;
				}

				if ( touchAxis === 'y' ) {
					scrollVertical( pane, touchY0 - touchY );
					touchDelta = touchY0 - touchY;
					touchY0 = touchY;
				} else if ( touchAxis === 'x' ) {
					scrollHorizontal( pane, touchX0 - touchX );
					touchDelta = touchX0 - touchX;
					touchX0 = touchX;
				}

				reqAnimFrame( touchPoll );
			},

			touchEnd = function() {
				var t = 0,
					d = Math.abs( touchDelta * 1.5 );

				this.removeEventListener( 'touchmove', touchMove, false );
				this.removeEventListener( 'touchend', touchEnd, false );
				touchStarted = false;

				reqAnimFrame( function touchFinish() {
					var dx;

					if ( t === d || touchStarted ) {
						return;
					}

					dx = easeOutExpo( touchDelta, d, t );

					if ( !isNaN( dx ) && dx !== 0 ) {
						t += 1;
						if ( touchAxis === 'y' ) {
							scrollVertical( pane, dx );
						} else {
							scrollHorizontal( pane, dx );
						}

						reqAnimFrame( touchFinish );
					}
				});
			};

		if ( event.touches.length === 1 ) {
			touchX0 = event.touches[0].clientX;
			touchY0 = event.touches[0].clientY;
			touchStarted = true;
			this.addEventListener( 'touchmove', touchMove, false );
			this.addEventListener( 'touchend', touchEnd, false );
			reqAnimFrame( touchPoll );
		}
	},

	api = {
		reposition: function() {
			return this.each(function() {
				var $this = $( this ),
					data = $this.data( 'enscroll' ),
					positionElem = function( elem, x, y ) {
						elem.style.left = x + 'px';
						elem.style.top = y + 'px';
					},
					corner, trackWrapper, offset;

				if ( data ) {
					offset = $this.position();
					corner = data.corner;
					if ( data.settings.verticalScrolling ) {
						trackWrapper = data.verticalTrackWrapper;
						positionElem( trackWrapper,
                            ( data.settings.verticalScrollerSide === 'right' ? offset.left + $this.outerWidth() - $( trackWrapper ).width() - getComputedValue( this, 'border-right-width' ) : offset.left + getComputedValue( this, 'border-left-width' )),
							offset.top + getComputedValue( this, 'border-top-width' ));
					}

					if ( data.settings.horizontalScrolling ) {
						trackWrapper = data.horizontalTrackWrapper;
						positionElem( trackWrapper,
							offset.left + getComputedValue( this, 'border-left-width' ),
							offset.top + $this.outerHeight() - $( trackWrapper ).height() - getComputedValue( this, 'border-bottom-width' ));
					}

					if ( corner ) {
						positionElem( corner,
							offset.left + $this.outerWidth() - $( corner ).outerWidth() - getComputedValue( this, 'border-right-width' ),
							offset.top + $this.outerHeight() - $( corner ).outerHeight() - getComputedValue( this, 'border-bottom-width' ));
					}
				}
			});
		},

		resize: function() {
			return this.each(function() {
				var $this = $( this ),
					data = $this.data( 'enscroll' ),
					settings, paneHeight, paneWidth,
					trackWrapper, pct, track, trackWidth, trackHeight,
					$scrollUpBtn, $scrollDownBtn, $scrollLeftBtn, $scrollRightBtn,
					handle, handleWidth, handleHeight, prybar;

				if ( !data ) {
					return true;
				}

				settings = data.settings;

				if ( $this.is( ':visible' )) {
					if ( settings.verticalScrolling ) {
						trackWrapper = data.verticalTrackWrapper;
						paneHeight = $this.innerHeight();
						pct = paneHeight / this.scrollHeight;
						track = $( trackWrapper ).find( '.enscroll-track' )[0];
						$scrollUpBtn = $( trackWrapper ).find( '.' + settings.scrollUpButtonClass );
						$scrollDownBtn = $(trackWrapper).find( '.' + settings.scrollDownButtonClass );

						trackHeight = settings.horizontalScrolling ?
							paneHeight - $( data.horizontalTrackWrapper ).find( '.enscroll-track' ).outerHeight() :
							paneHeight;
						trackHeight -= $( track ).outerHeight() - $( track ).height() + $scrollUpBtn.outerHeight() + $scrollDownBtn.outerHeight();

						handle = track.firstChild;
						handleHeight = Math.max( pct * trackHeight,
							settings.minScrollbarLength );
						handleHeight -= $( handle ).outerHeight() - $( handle ).height();

						// hide the track first -- this causes less reflows and
						// fixes an IE8 bug that prevents background images
						// from being redrawn
						trackWrapper.style.display = 'none';
						track.style.height = trackHeight + 'px';
						handle.style.height = handleHeight + 'px';
						if ( pct < 1 ) {
							pct = $this.scrollTop() / ( this.scrollHeight - $this.height() );
							handle.style.top = ( pct * ( trackHeight - handleHeight ) ) + 'px';
							trackWrapper.style.display = 'block';
						}
					}

					if ( settings.horizontalScrolling ) {
						trackWrapper = data.horizontalTrackWrapper;
						paneWidth = $this.innerWidth();
						pct = paneWidth / this.scrollWidth;
						track = $( trackWrapper ).find( '.enscroll-track' )[0];
						$scrollLeftBtn = $( trackWrapper ).find( '.' + settings.scrollLeftButtonClass );
						$scrollRightBtn = $( trackWrapper ).find( '.' + settings.scrollRightButtonClass );

						trackWidth = settings.verticalScrolling ?
							paneWidth - $( data.verticalTrackWrapper ).find( '.enscroll-track' ).outerWidth() :
							paneWidth;
						trackWidth -= $( track ).outerWidth() - $( track ).width() + $scrollLeftBtn.outerWidth() + $scrollRightBtn.outerWidth();

						handle = track.firstChild;
						handleWidth = Math.max( pct * trackWidth,
							settings.minScrollbarLength);
						handleWidth -= $( handle ).outerWidth() - $( handle ).width();

						// see comment above
						trackWrapper.style.display = 'none';
						track.style.width = trackWidth + 'px';
						handle.style.width = handleWidth + 'px';
						if ( pct < 1 ) {
							pct = $this.scrollLeft() / ( this.scrollWidth - $this.width() );
							handle.style.left = ( pct * ( trackWidth - handleWidth ) ) + 'px';
							trackWrapper.style.display = 'block';
						}

						if ( data._prybar ) {
							prybar = data._prybar;
							this.removeChild( prybar );
							if ( settings.verticalScrolling ) {
								prybar.style.width = ( this.scrollWidth + $( data.verticalTrackWrapper ).find( '.enscroll-track' ).outerWidth()) + 'px';
								this.appendChild( prybar );
							}
						}
					}
					if ( data.corner ) {
						data.corner.style.display = data.verticalTrackWrapper && data.horizontalTrackWrapper && $( data.verticalTrackWrapper ).is( ':visible' ) && $( data.horizontalTrackWrapper ).is( ':visible' ) ? '' : 'none';
					}
				} else {
					if ( settings.verticalScrolling ) {
						data.verticalTrackWrapper.style.display = 'none';
					}
					if ( settings.horizontalScrolling ) {
						data.horizontalTrackWrapper.style.display = 'none';
					}
					if ( data.corner ) {
						data.corner.style.display = 'none';
					}
				}

			});
		},

		startPolling: function() {
			return this.each(function() {
				var data = $( this ).data( 'enscroll' ),
					pane = this,
					$pane = $( pane ),
					paneWidth = -1,
					paneHeight = -1,
					paneScrollWidth = -1,
					paneScrollHeight = -1,
					paneOffset,

					paneChangeListener = function() {
						if ( data.settings.pollChanges ) {
							var sw = pane.scrollWidth,
								sh = pane.scrollHeight,
								pw = $pane.width(),
								ph = $pane.height(),
								offset = $pane.offset();

							if ( data.settings.verticalScrolling &&
									( ph !== paneHeight || sh !== paneScrollHeight ) ||
								data.settings.horizontalScrolling &&
									( pw !== paneWidth || sw !== paneScrollWidth ) ) {
								paneScrollWidth = sw;
								paneScrollHeight = sh;

								api.resize.call( $pane );
							}

							if ( paneOffset.left !== offset.left ||
									paneOffset.top !== offset.top ||
									pw !== paneWidth ||
									ph !== paneHeight ) {

								paneOffset = offset;
								paneWidth = pw;
								paneHeight = ph;

								api.reposition.call( $pane );
							}

							setTimeout( paneChangeListener, 350 );
						}
					};

				if ( data ) {
					data.settings.pollChanges = true;
					paneScrollHeight = pane.scrollHeight;
					paneScrollWidth = pane.scrollWidth;
					paneOffset = $pane.offset();
					paneChangeListener();
				}
			});
		},

		stopPolling: function() {
			return this.each(function() {
				var data = $( this ).data( 'enscroll' );
				if ( data ) {
					data.settings.pollChanges = false;
				}
			});
		},

		destroy: function() {
			return this.each(function() {
				var $this = $( this ),
					data = $this.data( 'enscroll' ),
					trackWrapper, mouseScrollHandler;
				if ( data ) {

					api.stopPolling.call( $this );

					mouseScrollHandler = data._mouseScrollHandler;

					if ( data.settings.verticalScrolling ) {
						trackWrapper = data.verticalTrackWrapper;

						$( trackWrapper ).remove();
						trackWrapper = null;
					}

					if ( data.settings.horizontalScrolling ) {
						trackWrapper = data.horizontalTrackWrapper;

						$( trackWrapper ).remove();
						trackWrapper = null;
					}

					// clear the fade timer to prevent an error being thrown
					// when the plugin object is destroyed while the fading
					// scrollbar is visible - shoutout to gpurves
					if ( data._fadeTimer ) {
						clearTimeout( data._fadeTimer );
					}

					if ( data.corner ) {
						$( data.corner ).remove();
					}

					if ( data._prybar && data._prybar.parentNode && data._prybar.parentNode === this ) {
						$( data._prybar ).remove();
					}

					this.setAttribute( 'style', data._style || '' );

					if ( !data._hadTabIndex ) {
						$this.removeAttr( 'tabindex' );
					}

					$this
						.off( 'scroll.enscroll.pane' )
						.off( 'keydown.enscroll.pane' )
						.off( 'mouseenter.enscroll.pane' )
						.off( 'mousedown.enscroll.pane' )
						.data( 'enscroll', null );

					if ( this.removeEventListener ) {
						this.removeEventListener( 'wheel', mouseScrollHandler, false );
						this.removeEventListener( 'mousewheel', mouseScrollHandler, false );
						this.removeEventListener( 'touchstart', touchStart, false );
					} else if ( this.detachEvent ) {
						this.detachEvent( 'onmousewheel', mouseScrollHandler );
					}

					$( win ).off( 'resize.enscroll.window' );
				}
			});
		}
	};



	$.fn.enscroll = function( opts ) {

		var settings;
		// handle API method calls
		if ( api[opts] ) {
			return api[opts].call( this );
		}
		// otherwise, initialize the enscroll element

		// use default settings, and overwrite defaults with options passed in
		settings = $.extend( {}, defaultSettings, opts );

		return this.each( function() {

			// don't apply this plugin when both scrolling settings are false
			if ( !settings.verticalScrolling && !settings.horizontalScrolling ) {
				return;
			}

			var $this = $( this ),
				pane = this,
				oldStyle = $this.attr( 'style' ),
				hadTabIndex = true,
				horizontalTrackWrapper, verticalTrackWrapper,
				horizontalTrack, verticalTrack,
				horizontalHandle, verticalHandle,
				verticalUpButton, verticalDownButton,
				horizontalLeftButton, horizontalRightButton,
				trackHeight, trackWidth,
				corner, outline, tabindex,
				outlineWidth, prybar, paddingSide,
				trackWrapperCSS = {
					'position': 'absolute',
					'z-index': settings.zIndex,
					'margin': 0,
					'padding': 0
				},

				// closures to bind events to handlers
				mouseScrollHandler = function( event ) {
					mouseScroll.call( pane, event );
				},
				addHandleHTML = function( handle, html ) {
					if ( typeof html === 'string' ) {
						$( handle ).html( html );
					} else {
						handle.appendChild( html );
					}
				};

			// if we want vertical scrolling, create and initialize
			// the horizontal scrollbar and its components
			if ( settings.verticalScrolling ) {
				verticalTrackWrapper = doc.createElement( 'div' );
				verticalTrackWrapper.className = "track-panel";
				verticalTrack = doc.createElement( 'div' );
				verticalHandle = doc.createElement( 'a' );

				$( verticalTrack )
					.css( 'position', 'relative' )
					.addClass( 'enscroll-track' )
					.addClass( settings.verticalTrackClass )
					.appendTo( verticalTrackWrapper );

				if ( settings.drawScrollButtons ) {
					verticalUpButton = doc.createElement( 'a' );
					verticalDownButton = doc.createElement( 'a' );

					$( verticalUpButton )
						.css({
							'display': 'block',
							'text-decoration': 'none'
						})
						.attr( 'href', '' )
						.html( '&nbsp;' )
						.addClass( settings.scrollUpButtonClass )
						.on( 'click', function() {
							scrollVertical( pane, -settings.scrollIncrement );
							return false;
						})
						.insertBefore( verticalTrack );

					$( verticalDownButton )
						.css({
							'display': 'block',
							'text-decoration': 'none'
						})
						.attr( 'href', '' )
						.html( '&nbsp;' )
						.on( 'click', function() {
							scrollVertical( pane, settings.scrollIncrement );
							return false;
						})
						.addClass( settings.scrollDownButtonClass )
						.appendTo( verticalTrackWrapper );
				}

				if ( settings.clickTrackToScroll ) {
					$( verticalTrack ).on( 'click', function( event ) {
						if ( event.target === this ) {
							scrollAnimateVertical( $this,
								event.pageY > $( verticalHandle ).offset().top ? $this.height() :
								-$this.height() );
						}
					});
				}

				$( verticalHandle )
					.css({
						'position': 'absolute',
						'z-index': 1
					})
					.attr( 'href', '' )
					.addClass( settings.verticalHandleClass )
					.mousedown( { pane: this }, startVerticalDrag )
					.click( function() { return false; })
					.appendTo( verticalTrack );

				addHandleHTML( verticalHandle, settings.verticalHandleHTML );

				$( verticalTrackWrapper )
					.css( trackWrapperCSS )
					.insertAfter( this );

				if ( settings.showOnHover ) {
					$( verticalTrackWrapper )
						.css( 'opacity', 0 )
						.on( 'mouseover.enscroll.vertical', function() {
							showScrollbars.call( pane, false );
						})
						.on( 'mouseout.enscroll.vertical', function() {
							showScrollbars.call( pane );
						});
				}

				trackWidth = $( verticalTrack ).outerWidth();

				// move the content in the pane over to make room for
				// the vertical scrollbar
				if ( settings.addPaddingToPane ) {
					if ( settings.verticalScrollerSide === 'right' ) {
						paddingSide = {
							'padding-right': ( getComputedValue( this, 'padding-right' ) + trackWidth ) + 'px'
						};
					} else {
						paddingSide = {
							'padding-left': ( getComputedValue( this, 'padding-left' ) + trackWidth ) + 'px'
						};
					}

					$this.css($.extend({
						'width': ( $this.width() - trackWidth ) + 'px'
					}, paddingSide));
				}

				try {

					outlineWidth = parseInt( $this.css( 'outline-width' ), 10 );

					if (( outlineWidth === 0 || isNaN( outlineWidth )) &&
						$this.css( 'outline-style') === 'none' ) {
						$this.css( 'outline', 'none' );
					}
				} catch( ex ) {
					$this.css( 'outline', 'none' );
				}
			}

			// if we want horizontal scrolling, create the elements for and
			// initialize the horizontal track and handle
			if ( settings.horizontalScrolling ) {
				horizontalTrackWrapper = doc.createElement( 'div' );
				horizontalTrackWrapper.className = "track-panel";
				horizontalTrack = doc.createElement( 'div' );
				horizontalHandle = doc.createElement( 'a' );

				$( horizontalTrack )
					.css({
						'position': 'relative',
						'z-index': 1
					})
					.addClass( 'enscroll-track' )
					.addClass( settings.horizontalTrackClass )
					.appendTo( horizontalTrackWrapper );

				if ( settings.drawScrollButtons ) {
					horizontalLeftButton = doc.createElement( 'a' );
					horizontalRightButton = doc.createElement( 'a' );

					$( horizontalLeftButton )
						.css( 'display', 'block' )
						.attr( 'href', '' )
						.on( 'click', function() {
							scrollHorizontal( pane, -settings.scrollIncrement );
							return false;
						})
						.addClass( settings.scrollLeftButtonClass )
						.insertBefore( horizontalTrack );

					$( horizontalRightButton )
						.css( 'display', 'block' )
						.attr( 'href', '' )
						.on( 'click', function() {
							scrollHorizontal( pane, settings.scrollIncrement );
							return false;
						})
						.addClass( settings.scrollRightButtonClass )
						.appendTo( horizontalTrackWrapper );
				}

				if ( settings.clickTrackToScroll ) {
					$( horizontalTrack).on( 'click', function( event ) {
						if ( event.target === this ) {
							scrollAnimateHorizontal( $this,
								event.pageX > $(horizontalHandle).offset().left ? $this.width() :
								-$this.width() );
						}
					});
				}

				$( horizontalHandle )
					.css({
						'position': 'absolute',
						'z-index': 1
					})
					.attr( 'href', '' )
					.addClass( settings.horizontalHandleClass )
					.click( function() { return false; })
					.mousedown( { pane: this }, startHorizontalDrag )
					.appendTo( horizontalTrack );

				addHandleHTML( horizontalHandle, settings.horizontalHandleHTML );

				$( horizontalTrackWrapper )
					.css( trackWrapperCSS )
					.insertAfter( this );

				if ( settings.showOnHover ) {
					$( horizontalTrackWrapper )
						.css( 'opacity', 0 )
						.on( 'mouseover.enscroll.horizontal', function() {
							showScrollbars.call( pane, false );
						})
						.on( 'mouseout.enscroll.horizontal', function() {
							showScrollbars.call( pane );
						});
				}

				trackHeight = $( horizontalTrack ).outerHeight();

				if ( settings.addPaddingToPane ) {
					$this.css({
						'height': ( $this.height() - trackHeight ) + 'px',
						'padding-bottom': ( parseInt( $this.css( 'padding-bottom' ), 10 ) + trackHeight ) + 'px'
					});
				}

				// we need to add an element to the pane in order to
				// stretch to the scrollWidth of the pane so the content
				// scrolls horizontally beyond the vertical scrollbar
				if ( settings.verticalScrolling ) {
					prybar = document.createElement( 'div' );
					$( prybar )
						.css({
							'width': '1px',
							'height': '1px',
							'visibility': 'hidden',
							'padding': 0,
							'margin': '-1px'
						})
						.appendTo( this );
				}
			}

			if ( settings.verticalScrolling && settings.horizontalScrolling && settings.drawCorner ) {
				corner = doc.createElement( 'div' );
				$( corner )
					.addClass( settings.cornerClass )
					.css( trackWrapperCSS )
					.insertAfter( this );
			}

			// add a tabindex attribute to the pane if it doesn't already have one
			// if the element does not have a tabindex in IE6, undefined is returned,
			// all other browsers return an empty string
			tabindex = $this.attr( 'tabindex' );
			if ( !tabindex ) {
				$this.attr( 'tabindex', 0 );
				hadTabIndex = false;
			}

			// if the outline style is not specified in IE6/7/8, null is returned
			// all other browsers return an empty string
			try {
				outline = $this.css( 'outline' );
				if ( !outline || outline.length < 1 ) {
					$this.css( 'outline', 'none' );
				}
			} catch(ex) {
				$this.css( 'outline', 'none' );
			}

			// register an handler that listens for the pane to scroll, and
			// sync the scrollbars' positions
			$this
				.on({
					'scroll.enscroll.pane': function( event ) {
						paneScrolled.call( this, event );
					},
					'keydown.enscroll.pane': keyHandler,
					'mousedown.enscroll.pane': dragHandler
				})
				.css( 'overflow', 'hidden' )
				// store the data we need for handling events and destruction
				.data( 'enscroll', {
					settings: settings,
					horizontalTrackWrapper: horizontalTrackWrapper,
					verticalTrackWrapper: verticalTrackWrapper,
					corner: corner,
					_prybar: prybar,
					_mouseScrollHandler: mouseScrollHandler,
					_hadTabIndex: hadTabIndex,
					_style: oldStyle,
					_scrollingX: false,
					_scrollingY: false,
					_startX: 0,
					_startY: 0,
					_endX: 0,
					_endY: 0,
					_duration: parseInt( settings.easingDuration / 16.66666, 10 ),
					_scrollHeightNoPadding: testScrollHeight( this.nodeName )
				});

			// reposition the scrollbars if the window is resized
			$( win ).on( 'resize.enscroll.window', function() {
				api.reposition.call( $this );
			});

			// if showOnHover is set, attach the hover listeners
			if ( settings.showOnHover ) {
				$this.on( 'mouseenter.enscroll.pane', function() {
					showScrollbars.call( this );
				});
			}

			// listen for mouse wheel and touch events and scroll appropriately
			if ( this.addEventListener ) {
				if ( 'onwheel' in this || 'WheelEvent' in win &&
					navigator.userAgent.toLowerCase().indexOf( 'msie' ) >= 0 ) {
					this.addEventListener( 'wheel', mouseScrollHandler, false );
				} else if ( 'onmousewheel' in this ) {
					this.addEventListener( 'mousewheel', mouseScrollHandler, false );
				}

				this.addEventListener( 'touchstart', touchStart, false );
			} else if ( this.attachEvent ) {
				// oldie love
				this.attachEvent( 'onmousewheel', mouseScrollHandler );
			}

			// start polling for changes in dimension and position
			if ( settings.pollChanges ) {
				api.startPolling.call( $this );
			}

			api.resize.call( $this );
			api.reposition.call( $this );
			$this.parent().find('.track-panel').slice(1).remove();
		});
	};

}( jQuery, window, document ));

//Theia Sticky Sidebar v1.4.0
!function(i){i.fn.theiaStickySidebar=function(t){function o(t,o){var a=e(t,o);a||(console.log("TST: Body width smaller than options.minWidth. Init is delayed."),i(document).scroll(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)),i(window).resize(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)))}function e(t,o){return t.initialized===!0?!0:i("body").width()<t.minWidth?!1:(a(t,o),!0)}function a(t,o){t.initialized=!0,i("head").append(i('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),o.each(function(){function o(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:""})}function e(t){var o=t.height();return t.children().each(function(){o=Math.max(o,i(this).height())}),o}var a={};a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.length&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:"relative",overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length&&(a.sidebar.find("script").remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)),a.marginTop=parseInt(a.sidebar.css("margin-top")),a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var n=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),n-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-n,0==n?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,o(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void o();if(a.options.disableOnResponsiveLayouts){var n=a.sidebar.outerWidth("none"==a.sidebar.css("float"));if(n+50>a.container.width())return void o()}var d=i(document).scrollTop(),r="static";if(d>=a.container.offset().top+(a.paddingTop+a.marginTop-a.options.additionalMarginTop)){var s,c=a.paddingTop+a.marginTop+t.additionalMarginTop,p=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,b=a.container.offset().top,l=a.container.offset().top+e(a.container),g=0+t.additionalMarginTop,h=a.stickySidebar.outerHeight()+c+p<i(window).height();s=h?g+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var f=b-d+a.paddingTop+a.marginTop,S=l-d-a.paddingBottom-a.marginBottom,u=a.stickySidebar.offset().top-d,m=a.previousScrollTop-d;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(u+=m),"stick-to-top"==a.options.sidebarBehavior&&(u=t.additionalMarginTop),"stick-to-bottom"==a.options.sidebarBehavior&&(u=s-a.stickySidebar.outerHeight()),u=m>0?Math.min(u,g):Math.max(u,s-a.stickySidebar.outerHeight()),u=Math.max(u,f),u=Math.min(u,S-a.stickySidebar.outerHeight());var y=a.container.height()==a.stickySidebar.outerHeight();r=(y||u!=g)&&(y||u!=s-a.stickySidebar.outerHeight())?d+u-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==r)a.stickySidebar.css({position:"fixed",width:a.sidebar.width(),top:u,left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))});else if("absolute"==r){var k={};"absolute"!=a.stickySidebar.css("position")&&(k.position="absolute",k.top=d+u-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom),k.width=a.sidebar.width(),k.left="",a.stickySidebar.css(k)}else"static"==r&&o();"static"!=r&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=d}},a.onScroll(a),i(document).scroll(function(i){return function(){i.onScroll(i)}}(a)),i(window).resize(function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a))})}var n={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern"};t=i.extend(n,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,o(t,this)}}(jQuery);