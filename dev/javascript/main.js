
/*!
 * JS principal
 */

/**
 * Google Analytics
 */
var emmanuelb;

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments);
  };
  i[r].l = 1 * new Date;
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-37604272-1', 'auto');

ga('send', 'pageview');


/**
 * Fonction principale du site
 */

emmanuelb = (function($) {
  'use strict';

  /**
  	 * Préparer et créer le menu principal
   */
  var ajaxCall, dialogClose, dialogCreate, init, menuCreator, sendMail, shareLinks, skillsAnimation;
  menuCreator = function() {
    var $menu, $menuItemAccueil, $menuItemBlog, $menuItemContact, $menuItemPortfolio, sClassName, sURL, sURLanchor, sURLpage;
    sURL = window.location.pathname.split('/');
    sURLpage = sURL[1];
    sURLanchor = window.location.hash;
    sClassName = 'navigation-main__item--current';
    $menu = $('.navigation-main');
    $menuItemAccueil = $menu.find('a[href="/#accueil"]').parent();
    $menuItemPortfolio = $menu.find('a[href="/#portfolio"]').parent();
    $menuItemBlog = $menu.find('a[href="/blog/"]').parent();
    $menuItemContact = $menu.find('a[href="/#contact"]').parent();
    $menuItemAccueil.find('a').attr('data-toggle', 'tab').attr('href', '#accueil');
    $menuItemPortfolio.find('a').attr('data-toggle', 'tab').attr('href', '#portfolio');
    $menuItemContact.find('a').attr('data-toggle', 'tab').attr('href', '#contact');
    if (sURLpage === 'blog') {
      $menuItemBlog.addClass(sClassName);
    } else {
      if ($.fn.tabs) {
        $menu.tabs({
          'anchors': true,
          'class': sClassName
        });
      }
      switch (sURLanchor) {
        case '#accueil':
          $menuItemAccueil.addClass(sClassName);
          break;
        case '#portfolio':
          $menuItemPortfolio.addClass(sClassName);
          break;
        case '#contact':
          $menuItemContact.addClass(sClassName);
          break;
        default:
          $menuItemAccueil.addClass(sClassName);
          break;
      }
    }
  };

  /**
  	 * Créer une boite de dialogue complète
  	 * @param  {json} content    [description]
  	 * @param  {jQuery} $container [description]
   */
  dialogCreate = function(content, $container) {
    var classOpen, classType;
    classType = 'dialog--' + content.type;
    classOpen = 'dialog--open';
    $container.find('.dialog__header').html(content.title);
    $container.find('.dialog__body').html(content.content);
    $container.delay(400).addClass(classType + ' ' + classOpen);
    $('.site').addClass('de-emphasized');
  };

  /**
  	 * Fermeture des fenêtres de dialogue
  	 * @param  {event} event [description]
   */
  dialogClose = function(event) {
    $(this).parents('.dialog').removeClass('dialog--open dialog--alert dialog--success');
    $('.site').removeClass('de-emphasized');
    event.preventDefault();
  };

  /**
  	 * Requête ajax pour l'envoi de mail
  	 * @param  {string} method          [description]
  	 * @param  {string} action          [description]
  	 * @param  {array} serializedDatas [description]
  	 * @return {ajax}                 [description]
   */
  ajaxCall = function(method, action, serializedDatas) {
    return $.ajax({
      type: method,
      url: action,
      data: serializedDatas,
      datatype: 'json'
    });
  };

  /**
  	 * Fonction d'envoi de mail du formulaire de contact
  	 * @param  {event} event [description]
   */
  sendMail = function(event) {
    var $alert, $champEmail, $champMessage, $champName, action, method, sChampMessage, sChampName, schampEmail, serializedDatas;
    $alert = $('.contact-alerts .dialog');
    method = $(this).attr('method');
    action = $(this).attr('action');
    serializedDatas = $(this).serialize();
    $champName = $('#name');
    $champEmail = $('#email');
    $champMessage = $('#message');
    sChampName = $champName.val();
    schampEmail = $champEmail.val();
    sChampMessage = $champMessage.val();
    ajaxCall(method, action, serializedDatas).done(function(content) {
      var json;
      json = JSON.parse(content);
      if (json.type === 'success') {
        $('.form-group').removeClass('form-group--focus form-group--label');
        $champName.val('');
        $champEmail.val('');
        $champMessage.val('');
      }
      dialogCreate(json, $alert);
    }).fail(function(content) {
      var json;
      json = JSON.parse(content);
      $champName.val(sChampName);
      $champEmail.val(schampEmail);
      $champMessage.val(sChampMessage);
      dialogCreate(json, $alert);
    });
    event.preventDefault();
  };
  skillsAnimation = function(delay) {
    var $skill, iSkillValue;
    $skill = $('.skill__item');
    iSkillValue = $skill.attr('data-skill');
    setTimeout((function() {
      $skill.addClass('skill__item--animation');
    }), delay);
  };

  /**
  	 * Popup des liens de partage (réseaux sociaux)
  	 * @param  {event} event [description]
   */
  shareLinks = function(event) {
    var left, popupHeight, popupPosX, popupPosY, popupWidth, top, url;
    url = $(this).attr('data-url');
    left = window.screenLeft || window.screenX;
    top = window.screenTop || window.screenY;
    popupWidth = 640;
    popupHeight = 480;
    popupPosX = left + window.innerWidth / 2 - popupWidth / 2;
    popupPosY = top + window.innerHeight / 2 - popupHeight / 3;
    window.open(url, 'Partager', 'width=' + popupWidth + ', height=' + popupHeight + ', menubar=0, location=0, scrollbars=yes, left=' + popupPosX + ', top=' + popupPosY + ', status=0');
    event.preventDefault();
  };

  /**
  	 * Initialiser les fonctions et appeler les plugins
   */
  init = function() {
    menuCreator();
    skillsAnimation(600);
    $('.modern-form').modernForm();
    $('#contact-form').on('submit', sendMail);
    $('[data-link="share"]').on('click', shareLinks);
    $('.contact-alerts').on('click', '.dialog__close', dialogClose);
    $('.back-top').scrollOffset();
  };

  /**
  	 * Renvoi de la fonction init à l'appel
   */
  return {
    init: init
  };
})(jQuery);


/**
 * Appeler la fonction init quand jQuery est prêt
 */

$(function() {
  emmanuelb.init();
});
