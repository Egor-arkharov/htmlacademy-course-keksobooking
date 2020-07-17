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

  var onPopupHide = function (evt) {
    var errorPopup = document.querySelector('.error');
    var successPopup = document.querySelector('.success');

    if (evt.key === EvtKeys.ESCAPE || evt.button === MAIN_BUTTON) {
      evt.preventDefault();

      if (errorPopup) {
        errorPopup.classList.add('hidden');
      }

      if (successPopup) {
        successPopup.classList.add('hidden');
      }
    }
  };

  var showErrorPopup = function () {
    var popupTemplate = document.querySelector('#error').content;
    var errorPopup = document.querySelector('.error');

    if (errorPopup) {
      errorPopup.classList.remove('hidden');
    } else {
      document.body.appendChild(popupTemplate);
    }
  };

  var showSuccessPopup = function () {
    var popupTemplate = document.querySelector('#success').content;
    var successPopup = document.querySelector('.success');

    if (successPopup) {
      successPopup.classList.remove('hidden');
    } else {
      document.body.appendChild(popupTemplate);
    }
  };

  var hideSuccessPopup = function () {
    document.addEventListener('keydown', onPopupHide);
    document.addEventListener('mousedown', onPopupHide);
  };

  var hideErrorPopup = function () {
    document.addEventListener('keydown', onPopupHide);
    document.addEventListener('mousedown', onPopupHide);

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', onPopupHide);
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

  window.formSubmit = {
    onPopupHide: onPopupHide
  };
})();
