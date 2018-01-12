//
//Template custom settings
//

var

  subFolder = ""; //Leave it empty "" or add the name of your subfolder, e.g. "/redmine"
	issues = "Issues"; //Top menu - translation for Issues
	spentTime = 'Spent time'; //Top menu - translation for Spent time
	showSubProjectsAsDefault = false; //Project list - leave "false" to hide the sub-project tree and display it on click or chaneg it to "true" to always show all sub-projects
	
//
//Template custom settings
//

//Template system settings
var templateFolderName = "abacus_office_blues",
	removeSystemJQueryAddTemplateJQuery = "no",
	customMenuPlugin = "yes",
	hostingDemoRedmine = "yes",
	removeRedmineResponsiveScripts = "yes",
	removeDuplicateIds = "no";


$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">');

function Abacus()
{
	//public
	function run(contentRules, classRules, attrRules, clickRules, plusMinusEl, hideEl)
	{
		addContentToDom(contentRules);
		handleClasses(classRules);
		handleAttributes(attrRules);
		registClickEvents(clickRules);
		togglePlusMinus(plusMinusEl);
		hide(hideEl);
		fixedSidebar();
		hideSplitContent();

		return false;
	}

	//public
	function exists(selector)
	{
		return $(selector).length !== 0;
	}

	//private
	function addContentToDom(contentRules)
	{
		contentRules.filter(function(rule){
			return rule.if === true;
		}).forEach(function(rule){
			rule.insert === 'inner' ? $(rule.element).append(rule.content) : false
			rule.insert === 'before' ? $(rule.element).before(rule.content) : false
			rule.insert === 'after' ? $(rule.element).after(rule.content) : false
			rule.insert === 'wrap' ? $(rule.element).wrap(rule.content) : false
			rule.insert === 'wrapAll' ? $(rule.element).wrapAll(rule.content) : false
		});
		return false;
	} 

	//private
	function handleClasses(classRules)
	{
		classRules.filter(function(rule){
			return rule.if === true;
		}).forEach(function(rule){
			rule.type === 'add' ? $(rule.element).addClass(rule.class) : false
		});
		return false;
	} 

	//private
	function handleAttributes(attrRules)
	{
		attrRules.forEach(function(rule){
			$(rule.element).attr(rule.attrName, rule.attrValue) 
		});
		return false;
	} 

	//private
	function registClickEvents(clickRules)
	{
		clickRules.forEach(function(rule){
			rule.if ? $(rule.element).click(rule.action) : false;
			//Timeout because I need to have it in other thread
			rule.if && rule.onInit ? setTimeout(function(){$(rule.element).trigger('click')},0) : false;
		});
		return false;
	} 

	//private
	function togglePlusMinus(element)
	{
		$(element).click(function () {
			$(this).toggleClass('fa-plus-square').toggleClass('fa-minus-square')
		});
		return false;
	};

	//private
	function hide(element)
	{
		$(element).hide();
		return false;
	};

	//private 
	function fixedSidebar()
	{
		var sidebarTopPosition = $("#sidebar").position().top;
		var topMenuHeight = $("#top-menu").outerHeight();
		var startFix = sidebarTopPosition - topMenuHeight;

		$(window).scroll(function () {
			var scroll = $(window).scrollTop();

			if (scroll >= startFix) {
				$("#sidebar").addClass("fixed");
				$("#sidebar").css('top', topMenuHeight);
			} else {
				$("#sidebar").removeClass("fixed");
				$("#sidebar").css('top', 0);
			}
		});
	}

	//private
	//e.g. home or //e.g. http://site.com/issues/1
	function hideSplitContent()
	{
		$('.splitcontentleft, .splitcontentright, #content > .contextual').each(function () {
			$(this).html().trim().length === 0 ? $(this).addClass("hidden") : $(this).removeClass("hidden");
		});

		$('.splitcontentleft, .splitcontentright, #content > .contextual').bind('DOMNodeInserted DOMNodeRemoved', function (event) {
			hideSplitContent();
		});
	};

	return {
		run: run,
		exists: exists,
	}
}

$(document).ready(function () {

	var A = Abacus();

	var contentRules = [
		{
			//e.g. http://site.com/issues/1 - eye icon
			element: '#content',
			content: '<div id="hide-sidebar"><a class="switch" href="#"><i class="fa fa-eye"></i></a></div>',
			insert: 'inner',
			if: !A.exists('#sidebarHandler'), //if sidebar plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu',
			content: '<a href="' + subFolder + '/my/page" class="home-link"></a>',
			insert: 'inner',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu > ul li:eq(2)',
			content: '<li><a href="' + subFolder + '/issues" class="issues"><spap>'+issues+'</span></a></li>',
			insert: 'after',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu > ul li:eq(3)',
			content: '<li><a href="' + subFolder + '/time_entries" class="spent_time"><spap>'+spentTime+'</span></a></li>',
			insert: 'after',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu > ul > li:nth-of-type(6) ~ li',
			content: '<div class="more fa"><div class="ul"></div></div>',
			insert: 'wrapAll',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. Top menu on all sites
			element: '#top-menu>ul .more',
			insert: 'inner',
			if: !A.exists('#top-menu ul.cm-menu-header'), //if custom menu plugin does NOT exists
		},
		{
			//e.g. http://site.com/issues/
			element: '.controller-timelog.action-index .total-hours,.controller-calendars.action-show #query_form,#tab-content-versions table,#tab-content-categories table,#tab-content-activities table,.controller-settings #tab-content-issues fieldset,.controller-settings #tab-content-repositories table,.controller-tt_overview table.tt_list, table.list, table.people, table.invoice-lines, .controller-orders #product_lines, table#browser',
			content: '<p><span class="slide">>>>>>> Slide to see table >>>>>></span></p>',
			insert: 'after',
			if: true, 
		},
		{
			//e.g. http://site.com/redmine/issues/calendar
			element: '.controller-calendars.action-show table.cal, .controller-invoices fieldset.attributes, table.list, table.people, .controller-orders #product_lines, .controller-gantts.action-show #content table:first-of-type',
			content: '<div class="autoscroll"></div>',
			insert: 'wrap',
			if: true, 
		},
		{
			//e.g. http://site.com/redmine/projects
			element: '.controller-projects.action-index #content > .contextual a:first-child',
			content: '<a class="toggle-wrap fa fa-plus-square" id="show-project-desc">Toggle descriptions</a>',
			insert: 'before',
			if: !A.exists('.controller-projects.action-index #projects_list'), 
		},
		{
			//e.g. http://site.com/redmine/issues/calendar
			element: '.controller-calendars.action-show #year, .controller-gantts.action-show #year',
			content: '<div class="divider"></div>',
			insert: 'after',
			if: true, 
		},
		{
			//e.g. TODO nevim, potreba otestovat
			element: '#issue-changesets',
			content: '<div class="toggle-wrap"><a class="fa fa-plus-square" id="show-issue-changesets">Toggle Associated revisions</a></div>',
			insert: 'before',
			if: true, 
		},	
		{
			//e.g. TODO nevim, potreba otestovat
			element: '.controller-invoices #comments, .controller-invoices #invoice_payments',
			content: '<div class="invoice-wrapper clearfix" />',
			insert: 'wrapAll',
			if: true, 
		},
		{
			//e.g. TODO nevim, potreba otestovat
			element: '#footer .bgr',
			content: '<span>| Theme by <a  href="http://www.abacusthemes.com" target="_blank" property="Michal Stanek">Abacus Themes</a>',
			insert: 'inner',
			if: true, 
		},
		{
			//e.g. http://site.com/projects/projectName/documents
			element: '.controller-documents #content > .contextual a:first-child',
			content: '<a class="toggle-wrap fa fa-plus-square" id="show-docs">Toggle descriptions</a>',
			insert: 'before',
			if: true, 
		},
		{
			//e.g. http://site.com/projects/projectName/news
			element: '.controller-news #content > .contextual a:first-child',
			content: '<a class="toggle-wrap fa fa-plus-square" id="show-news">Toggle descriptions</a>',
			insert: 'before',
			if: true, 
		},
	];	

	var classRules = [
		{
			//e.g. Top menu on all sites
			element: 'body',
			class: 'redmine_news_notification',
			type: 'add',
			if:  !A.exists('#top-menu ul.cm-menu-header') && A.exists('#nn_list'), //if custom menu plugin does NOT exists AND redmine_news_notification plugin exists
		},
		{
			//e.g. Login page
			element: '#login-form',
			class: 'tableless',
			type: 'add',
			if:  !A.exists('#top-menu ul.cm-menu-header') && !A.exists('#login-form form table'), //if custom menu plugin does NOT exists AND NOT exists #login-form table
		},
		{
			//e.g. Top menu on all sites
			element: 'body',
			class: 'redmine_mobile_menu',
			type: 'add',
			if:  !A.exists('#top-menu ul.cm-menu-header') && A.exists('.flyout-menu'), //if custom menu plugin does NOT exists AND NOT exists #login-form table
		},
		{
			//e.g.  http://site.com/admin/projects
			element: 'body',
			class: 'view-admin',
			type: 'add',
			if:  A.exists('#sidebar #admin-menu'), //if sidebar admin menu
		},
		{
			//TODO nevim, potreba otestovat
			element: 'body',
			class: 'sidebar_handler',
			type: 'add',
			if:  A.exists('#sidebarHandler'), //if sidebar plugin exists
		},
		{
			//TODO nevim, potreba otestovat
			element: '#history',
			class: 'issue-changesets-exist',
			type: 'add',
			if:  A.exists('#issue-changesets'), 
		},
		{
			//TODO nevim, potreba otestovat
			element: 'body',
			class: 'projects_list',
			type: 'add',
			if:  A.exists('.controller-projects.action-index #projects_list'), 
		},
		{
			//e.g. http://site.com/projects and project has to have a child project
			//CSS - if li has a.parent so add css class to li
			element: 'ul.projects li:has("a.parent")',
			class: 'fa fa-chevron-circle-down',
			type: 'add',
			if:  true, 
		},

	];


	var attrRules = [
		{
			//e.g. Top menu on all sites
			element: '#account, #loggedas a, #top-menu .more',
			attrName: 'onclick',
			attrValue: 'return true',
		},
			//TODO nevim, potreba otestovat
		{
			element: 'a.external, .address.adr a, .icon.icon-invoice-public-link',
			attrName: 'target',
			attrValue: '_blank',
		},
	];

	var clickRules = [
		{
			//e.g. http://site.com/issues/1 - main a and left column
			element: '.switch',
			action: function () {
				$('#sidebar').toggleClass('hidden');
				$('#content').toggleClass('full');
			},
			if: !A.exists('#sidebarHandler'), //if sidebar plugin does notexists
		},
		{
			//TODO nevim, potreba otestovat
			element: '#show-issue-changesets',
			action: function () {
				$('#issue-changesets').slideToggle("fast");
			},
			if: true,
		},
		{
			//e.g. http://site.com/projects
			element: '#show-project-desc',
			action: function () {
				$('#projects-index .wiki.description').slideToggle("fast");
			},
			if: !A.exists('.controller-projects.action-index #projects_list'),
		},
		{
			//e.g. http://site.com/projects and project has to have a child project
			//CSS - if > div has a.parent so add click listener
			element: 'ul.projects li > div:has("a.parent")',
			action: function () {
				$(this).parent().toggleClass("fa fa-chevron-circle-down").toggleClass("fa fa-chevron-circle-up");
				$(this).next("ul").toggle();
			},
			onInit: showSubProjectsAsDefault,
			if: true,
		},
		{
			//e.g. http://site.com/projects/projectName/news|documents
			element: '#show-news, #show-docs',
			action: function () {
				$('.controller-news .wiki p, .controller-documents .wiki p').slideToggle("fast");
			},
			if: true,
		},
	];

	var plusMinusEl = 'fieldset.collapsible > legend, #show-issue-changesets, a.collapsible, #show-docs, #show-project-desc, #show-news, .controller-workflows form p a, tr span.expander';

	var hideEl = '#projects-index .wiki.description, .controller-projects ul.projects.root > .root  ul, .controller-news .wiki p, .controller-documents .wiki p';

	A.run(contentRules, classRules, attrRules, clickRules, plusMinusEl, hideEl);

	// NON-SYSTEM

		/* PLUGIN - Extra Queries plugin - http://rmplus.pro/ */
		//Fix duplication of ID in issue list
		// find in list issues issue all td.id and remove second if tr contains Two id
		if (removeDuplicateIds === "yes") {
			var removeDuplicateID = function () {
				var $issuesDuplicatedID = $(".action-page .list.issues tr");
				$issuesDuplicatedID.each(function () {
					$(this).find('th:eq(1),td:eq(1)').remove();
				});
			};
			removeDuplicateID();
		}

		/* PLUGIN - Custom Menu plugin - http://rmplus.pro/ */
		var removeAllCustomMenuComponents = function () {
			// Remove script from custom menu plugin if disable but instaled in system
			$("script[src^='/plugin_assets/custom_menu/']").each(function () {
				$(this).remove();
			});
			$("link[href^='/plugin_assets/custom_menu/']").each(function () {
				$(this).remove();
			});
			// Remove menu link from admin menu
			$('#admin-menu li').has("a.cm-menu").remove();
		};

		// ********************************** START SETTINGS - Some Functions depending on JS settings **********************************
		if (removeSystemJQueryAddTemplateJQuery === "yes") {
			//Fix Jquery package for all redmines
			$("link[href^='/stylesheets/jquery/jquery-ui-1']").each(function () {
				$(this).remove();
			});
			$('head').append('<script src="/themes/' + templateFolderName + '/javascripts/jquery/jquery-1.11.1-ui-1.11.0-ujs-3.1.1.js"></script>');
			$('head').append('<link rel="stylesheet" media="all" href="/themes/' + templateFolderName + '/stylesheets/jquery/jquery-ui-1.11.0.css" />');

			$("script[src^='/javascripts/jquery-1.']").each(function () {
				$(this).remove();
			});
		}

		if (removeRedmineResponsiveScripts === "yes") {
			$("link[href^='/stylesheets/responsive.css']").each(function () {
				$(this).remove();
			});
		}


		//top menu --> add Issues and Spent time
		if ($('#top-menu ul').hasClass('cm-menu-header')) {

			// ********************************** Custom menu plugin JS **********************************
			if ($('.menu_expander .icon-expand').length >= 0) {
				$('body').addClass('redmine_custom_menu');
			}
			// Add class menu_fixed if custom menu plugin exists
			if ($('#dropdown_top_menu').length >= 0) {
				$('body').addClass('menu_fixed');
			}
			// Remove "more" menu item if custom menu plugin exists
			if ($('body').hasClass('redmine_custom_menu')) {
				$('#top-menu > ul div').removeClass('fa more');
			}
		} else {
			removeAllCustomMenuComponents();
		}

		//TODO - realne nic nedela, nebo jsem neprisel k cemu je to dobre.
		// Main menu - toggle class active
		//e.g. http://localhost/redmine/issues/1
		$('#main-menu').click(function () {
			$('#main-menu ul').toggleClass('active');
		});

		// Hide #main-menu if empty
		if ($('#main-menu ul').length === 0) {
			$('#main-menu').css({'visibility': 'hidden'});

			//tohle nedava smysl. Proc bych klikal na neco co ma visibility:hiden a odebiral tridu necemu co neexistuje
			$('#main-menu').click(function () {
				$('#main-menu ul').removeClass("active");
			});
		}

		//TODO k cemu ta trida cal a list realne je? V CSS na to nic navazaneho nevidim, apson ne ten .list
		$('.controller-my.action-page table.cal').closest("div").addClass("cal");

		$('.controller-my.action-page table.list').closest("div").addClass("list");


		// TODO - tohle kde je .contextual by melo jit u CSSskovat. Minimalne pres prebjeni
		$(".controller-messages .message.reply > .contextual a:nth-child(2)").addClass("fa fa-pencil-square-o");

		$(".controller-messages .message.reply > .contextual a:nth-child(3)").addClass("fa fa-times");


		// TODO nevim kde je -> link?
		// Add class view-admin if admin menu exists
		if ($('.controller-messages .message.reply > .contextual .vote').length !== 0) {

			$('.controller-messages .message.reply > .contextual a:nth-child(2)').removeClass('fa-pencil-square-o');
			$('.controller-messages .message.reply > .contextual a:nth-child(2)').addClass('fa-comment');

			$('.controller-messages .message.reply > .contextual a:nth-child(3)').removeClass('fa-times');
			$('.controller-messages .message.reply > .contextual a:nth-child(3)').addClass('fa-pencil-square-o');

			$('.controller-messages .message.reply > .contextual a:nth-child(4)').addClass('fa fa-times');
		}

		//K cemu je tohle dobry. Chapu co to dela, ale na co je to tatrida dobra, kdy demo je na klasicke sablone
		if (hostingDemoRedmine === "yes") {
			// Check domain add class to demo login bg
			var locUrl = window.location.href; // returns the full URL
			var originUrl = "http://demo.abacusthemes.com/login";
			if (locUrl == originUrl) {
				$('body.action-login #main').addClass('loginbg');
			}
		}



	/*Project*/
	$(".icon-lock").addClass("fa fa-lock");

	$(".icon-unlock").addClass("fa fa-unlock-alt");

	$(".icon-time, .icon-time-add").addClass("fa fa-clock-o");

	$("div.members h3, table.members td.group").addClass("fa fa-users");

	$("div.issues h3, dt.issue").addClass("fa fa-file-text-o");

	$("dt.icon-product").addClass("fa fa-shopping-cart");

	$("dt.icon-add-payment, dt.icon-invoice").addClass("fa fa-file-text-o");

	$("dt.icon-expense").addClass("fa fa-usd");

	$(".contextual > a[href='/issues']").addClass("fa fa-tasks");

	$(".contextual > a[href='/time_entries']").addClass("fa fa-clock-o");

	$(".contextual > a[href='/activity']").addClass("fa fa-line-chart");

	$(".icon-dd-menu").addClass("fa fa-arrow-down");


	/*Icon check - Apply*/
	$(".icon-checked, table.list th.checkbox a, div.flash.notice").addClass("fa fa-check");

	$("div.flash.error, #errorExplanation ul li, em.info.error").addClass("fa fa-exclamation-circle");

	$("div.flash.warning, .conflict, .icon-warning").addClass("fa fa-exclamation-triangle");

	$("div.flash.tip").addClass("fa fa-lightbulb-o");

	$("div.flash.info").addClass("fa fa-info-circle");


	/*Icon delete*/
	$(".delete, .icon-del, #query_form .icon-reload, a.remove-upload, .close-icon").addClass("fa fa-times");

	$("#sidebar #watchers .delete").removeClass("fa fa-times");

	/*Removes class icon reload from issue list Clear - Redmine puts wrong class*/
	$("#query_form .icon-reload").removeClass("icon-reload");

	/*Icon save*/
	$(".icon-save, .controller-my.action-page_layout .contextual .icon-cancel").addClass("fa fa-floppy-o");

	/*Calendar*/
	$("table.cal .ending a, p.cal.legend .ending").addClass("fa fa-arrow-circle-left");

	$("table.cal .starting a, p.cal.legend .starting").addClass("fa fa-arrow-circle-right");

	$("table.cal .starting.ending a, p.cal.legend .starting.ending").addClass("fa fa-bullseye");


	/*Project summary + Gantt*/
	$(".controller-reports h3 a, .icon-zoom-in").addClass("fa fa-search-plus");

	/*Gantt*/
	$(".icon-zoom-out").addClass("fa fa-search-minus");

	$(".icon-projects").addClass("fa fa-list");

	$(".icon-package").addClass("fa fa-suitcase");



	/*Attachment*/
	$(".icon-attachment").addClass("fa fa-paperclip");


	/*Issues*/
	$(".icon-copy").addClass("fa fa-files-o");

	//Alternate
	$("fieldset.collapsible > legend").addClass("fa fa-minus-square");
	$("fieldset.collapsible.collapsed  > legend").removeClass('fa fa-minus-square').addClass("fa fa-plus-square");



	$("#history div.journal .wiki.editable .contextual a:first-child").addClass("fa fa-comment");

	$("#history div.journal .wiki.editable .contextual a:nth-child(2)").addClass("fa fa-pencil-square-o");

	$("#relations tr.issue .buttons a").addClass("fa fa-times");

	$("#relations .contextual > a, #issue_tree .contextual > a").addClass("fa fa-plus-circle");


	$("div.issue .description .contextual .icon-comment").addClass("fa fa-comment");
	$(".issue .attachments .contextual > a, .message .attachments .contextual > a").addClass("fa fa-pencil-square-o");
	
	//TODO moze byt v CSS
	$(".fa-comment, .fa-pencil-square-o").find("img").remove();
	/*Documents*/


	$("#content div.attachments .contextual > a").addClass("fa fa-pencil-square-o");

	$("#content #comments .contextual > a").addClass("fa fa-times");

	/*Edit Issue + Project Settings*/
	$(".edit_issue #all_attributes > p:nth-child(5) a, .icon-edit").addClass("fa fa-pencil-square-o");

	$("button.tab-left").addClass("fa fa-caret-left");

	$("button.tab-right").addClass("fa fa-caret-right");




	/*News*/

	$("h3.comments, table.boards a.board").addClass("fa fa-comments-o");


	/*Documents*/
	$(".controller-documents .attachments p a:nth-child(2), .controller-wiki .attachments p a:nth-child(2), input#contact_company").addClass("fa fa-search");


	/*Wiki*/
	$(".icon-move").addClass("fa fa-arrow-right");

	$("#main .icon-history").addClass("fa fa-history");

	// $(".controller-wiki .contextual a:first-child").addClass("fa fa-pencil-square-o");


	/*Forum*/
	$(".icon-comment, .controller-messages .message.reply > .contextual a:nth-child(1)").addClass("fa fa-comment");

	$(".icon-vote, .icon-unvote").removeClass("fa fa-comment");

	$(".vote, .icon-vote, .icon-unvote").addClass("fa fa-thumbs-o-up");

	$(".icon-view").addClass("fa fa-bullseye");

	$(".icon-tag").addClass("fa fa-tag");



	$("table.list.files td.buttons a").addClass("fa fa-times");

	/*Admin*/
	$('.view-admin #content > h2').after($('<a class="menu-wrap fa fa fa-list" href="#admin-menu">Menu</a>'));


	/*Redmine CRM*/
	$(".subject_header li.icon-email, .icon-contact, .icon-vcard").addClass("fa fa-envelope");

	$(".subject_header li.icon-phone").addClass("fa fa-phone");

	$(".controller-contacts #comments .contextual a:first-child").addClass("fa fa-pencil-square-o");

	$(".controller-contacts #comments .contextual a:last-child").addClass("fa fa-times");

	$(".controller-contacts .sidebar td.address a, .controller-people #sidebar td.address a").addClass("fa fa-map-marker");

	$("a.external").addClass("fa fa-external-link");


	/*Redmine CRM Pro (Contacts, Deals, Invoices)*/
	$(".icon-import").addClass("fa fa-cloud-upload");

	$(".icon-email").addClass("fa fa-envelope");

	$(".controller-contacts .contextual .icon-user").addClass("fa fa-user-plus");

	$("#edit_tags_link").addClass("fa fa-pencil-square-o");

	$(".price.icon-money-dollar").addClass("fa fa-money");

	$(".price.icon-date").addClass("fa fa-calendar");

	$(".price.icon-rosette").addClass("fa fa-pie-chart");

	$(".icon-duplicate").addClass("fa fa-files-o");

	$("#show_note_form_extras").addClass("fa fa-plus-square");

	$(".icon-call").addClass("fa fa-phone");

	$(".icon-email").addClass("fa fa-envelope");

	$(".icon-meeting").addClass("fa fa-calendar");

	$(".controller-deals #comments .contextual a:first-child").addClass("fa fa-pencil-square-o");

	$("#admin-menu a.helpdesk").addClass("fa fa-life-ring");

	$("#admin-menu a.invoices").addClass("fa fa-file-text-o");

	$("#admin-menu a.finance").addClass("fa fa-usd");

	$("#admin-menu a.redmine-git-hosting").addClass("fa fa-git-square");

	$("#admin-menu a.login-audit").addClass("fa fa-sign-in");

	$("#admin-menu a.people").addClass("fa fa-users");

	$("#admin-menu a.products").addClass("fa fa-shopping-cart");

	$(".icon.icon-pdf").addClass("fa fa-file-pdf-o");

	$(".icon.icon-add-payment").addClass("fa fa-usd");

	$("#deals .contextual a").addClass("fa fa-plus-circle");

	$("#invoice_payments .contextual > a").addClass("fa fa-times");

	$(".controller-invoices #comments .contextual > a").addClass("fa fa-times");

	$("#invoice_payments h3").addClass("fa fa-money");


	/*Redmine Helpdesk*/
	$(".icon-email-spam").addClass("fa fa-envelope-square");

	$(".icon-email-to").addClass("fa fa-envelope");

	$("#ticket_data .attachment a:last-child").addClass("fa fa-search");

	$(".phone, .icon-phone").addClass("fa fa-phone");

	$(".icon-helpdesk").addClass("fa fa-ticket");

	$(".icon-company-contact").addClass("fa fa-user");


	/*Redmine People*/
	$(".person.details").addClass("autoscroll");


	/*Custom menu icons*/
	$(".cm-all-projects").addClass("fa fa-list");

	$("#admin-menu a.cm-menu").addClass("fa fa-list-alt");


	/*Search*/
	$("dt.wiki-page").addClass("fa fa-font");

	$("dt.document").addClass("fa fa-file-text-o");

	$("dt.project").addClass("fa fa-list");


	/*Spent time*/
	$(".time-entries td.buttons a:first-child").addClass("fa fa-pencil-square-o");

	$(".time-entries td.buttons a:last-child").addClass("fa fa-times");

	/*Administration*/
	$("#admin-menu a.projects").addClass("fa fa-list");

	$("#admin-menu a.users").addClass("fa fa-user");

	$("#admin-menu a.groups").addClass("fa fa-users");

	$("#admin-menu a.roles").addClass("fa fa-database");

	$("#admin-menu a.trackers").addClass("fa fa-square");

	$("#admin-menu a.issue_statuses").addClass("fa fa-file-text-o");

	$("#admin-menu a.workflows").addClass("fa fa-hand-o-right");

	$("#admin-menu a.custom_fields").addClass("fa fa-caret-square-o-right");

	$("#admin-menu a.enumerations").addClass("fa fa-list-ol");

	$("#admin-menu a.settings").addClass("fa fa-cog");

	$("#admin-menu a.server_authentication").addClass("fa fa-key");

	$("#admin-menu a.contacts").addClass("fa fa-envelope");

	$("#admin-menu a.approvalworkflows").addClass("fa fa-file-text-o");

	$("#admin-menu a.plugins").addClass("fa fa-puzzle-piece");

	$("#admin-menu a.info").addClass("fa fa-info-circle");

	$("#admin-menu a.cms").addClass("fa fa-desktop");

	$(".icon-reload").addClass("fa fa-refresh");

	$(".icon-next").addClass("fa fa-arrow-right");

	$(".icon-previous").addClass("fa fa-arrow-left");


	/*Reorder icons*/
	$("table.list td.reorder a:nth-child(1)").addClass("fa fa-arrow-circle-up");

	$("table.list td.reorder a:nth-child(2)").addClass("fa fa-chevron-up");

	$("table.list td.reorder a:nth-child(3)").addClass("fa fa-chevron-down");

	$("table.list td.reorder a:nth-child(4)").addClass("fa fa-arrow-circle-down");

	$(".icon-summary").addClass("fa fa-pie-chart");

	$(".controller-workflows form p a, tr span.expander").addClass("fa fa-plus-square");


	$("#commit-keywords td.buttons a.delete-commit-keywords").addClass("fa fa-times");


	$("#commit-keywords td.buttons a.add-commit-keywords").addClass("fa fa-plus-circle");

	$(".icon-test").addClass("fa fa-arrow-right");

	/*File icons*/
	$(".icon-file, .icon-file.text-plain, .icon-file.text-x-csharp, .icon-file.text-x-c, .icon-file.text-x-java, .icon-file.text-x-javascript, .icon-file.text-x-php, .icon-file.text-x-ruby, .icon-file.text-xml").addClass("fa fa-file");

	$(".icon-file.text-css").addClass("fa fa-css3");

	$(".icon-file.text-html").addClass("fa fa-html5");

	$(".icon-file.image-gif, .icon-file.image-jpeg, .icon-file.image-png, .icon-file.image-tiff").addClass("fa fa-file-image-o");

	$(".icon-file.application-pdf").addClass("fa fa-file-pdf-o");

	$(".icon-file.application-zip, .icon-file.application-x-gzip").addClass("fa fa-file-archive-o");

	$(".icon-folder").addClass("fa fa-folder-o");

	/*Users*/
	$("dt.issue-note, dt.issue-edit, dt.issue-closed, dt.issue-note, #search-results dt.issue.closed").addClass("fa fa-file-text-o");

	$("dt.icon-add-deal").addClass("fa fa-money");

	$("dt.time-entry").addClass("fa fa-clock-o");

	$("dt.changeset").addClass("fa fa-cog");

	$("dt.news").addClass("fa fa-newspaper-o");

	$("dt.message, dt.reply").addClass("fa fa-comment");

	$("dt.attachment").addClass("fa fa-paperclip");

	$(".icon-passwd").addClass("fa fa-key");

	$(".icon-email-add").addClass("fa fa-envelope-o");

	/*Footer*/
	$("a.atom").addClass("fa fa-rss-square");

	$("a.csv").addClass("fa fa-database");

	$("a.pdf").addClass("fa fa-file-pdf-o");

	$("a.vcf").addClass("fa fa-user");

	$("a.xls").addClass("fa fa-file-excel-o ");

	/*Agile*/
	$("#admin-menu a.agile").addClass("fa fa-th-large");

	$(".icon-fullscreen").addClass("fa fa-arrows-alt");

	$('.agile-board > .autoscroll').append('<span class="esc"><strong>Esc </strong> = Exit Fullscreen');

	/*Extra queries*/
	$("a.eq-pin").addClass("fa fa-star-o");

	/*DMSF plugin*/
	// Wrap DMSF table with .autoscroll
	$(".dmfs_entries table").wrap("<div class='autoscroll'></div>");

	$(".icon-dmsf-lock").addClass("fa fa-lock");

	$(".icon-notification-off").addClass("fa fa-envelope");

	$(".icon-notification-on").addClass("fa fa-envelope-o");

	$(".ui-icon-circle-plus").addClass("fa fa-plus-circle");

	$(".ui-icon-circle-arrow-e").addClass("fa fa-upload");

	$(".ui-icon-circle-close").addClass("fa fa-times-circle");

	$(".controller-dmsf #content > .contextual .icon-link").addClass("fa fa-external-link");


	/*Easy Gantt plugin*/
	$(".icon-calendar").addClass("fa fa-calendar");

	$(".gantt-menu-button.save").addClass("fa fa-floppy-o");

	$(".gantt-menu-button.icon-back").addClass("fa fa-arrow-left");

	$(".gantt-menu-button.icon-stats").addClass("fa fa-user");

	$(".gantt-menu-button.icon-print").addClass("fa fa-print");

	$(".gantt-menu-button.icon-summary").removeClass("fa-pie-chart");

	$(".gantt-menu-button.icon-summary").addClass("fa-exclamation-circle");

});