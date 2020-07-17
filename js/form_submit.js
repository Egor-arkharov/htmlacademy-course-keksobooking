'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin');

  var EvtKeys = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var MAIN_BUTTON = 0;

  var hidePins = function () {
    var buttonsContainer = map.querySelector('.map__pins');
    var buttons = buttonsContainer.querySelectorAll('.map__pin');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.add('hidden');
    }

    mapPin.classList.remove('hidden');
  };

  var disablePage = function () {
    var popup = map.querySelector('.popup');

    window.main.disableForm();
    hidePins();

    map.classList.add('map--faded');
    mapPin.setAttribute('style', 'left: 570px; top: 375px;');

    if (popup) {
      popup.remove();
    }

    form.classList.add('ad-form--disabled');
    form.reset();
  };

  var onPopupEscPress = function (evt) {
    var errorPopup = document.querySelector('.error');
    var successPopup = document.querySelector('.success');

    if (evt.key === EvtKeys.ESCAPE || evt.button === MAIN_BUTTON) {
      evt.preventDefault();

      if (errorPopup) {
        errorPopup.remove();
      }

      if (successPopup) {
        successPopup.remove();
      }
    }
  };

  var showErrorPopup = function () {
    var popupTemplate = document.querySelector('#error').content;

    document.body.appendChild(popupTemplate);
  };

  var showSuccessPopup = function () {
    var popupTemplate = document.querySelector('#success').content;

    document.body.appendChild(popupTemplate);
  };

  var hideSuccessPopup = function () {
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', onPopupEscPress);
  };

  var hideErrorPopup = function () {
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', onPopupEscPress);

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', onPopupEscPress);
  };

  var successHandler = function () {
    disablePage();
    showSuccessPopup();
    hideSuccessPopup();
  };

  var errorHandler = function () {
    disablePage();
    showErrorPopup();
    hideErrorPopup();
  };

  var submitHandler = function (evt) {
    window.backendSave(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

  window.form_submit = {
    onPopupEscPress: onPopupEscPress
  };
})();
