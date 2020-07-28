'use strict';

(function () {
  var MAIN_BUTTON = 0;

  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin');
  var mapPinMain = document.querySelector('.map__pin--main');
  var resetButton = form.querySelector('.ad-form__reset');

  var main = document.querySelector('main');

  var EvtKeys = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var disablePage = function () {
    map.classList.add('map--faded');
    mapPin.setAttribute('style', 'left: 570px; top: 375px;');

    window.main.disableForm();
    window.pin.removeLastPins();
    window.pin.removePopup();

    form.classList.add('ad-form--disabled');
    form.reset();
    window.form.putCenterAddress();
    window.form.putSelectedTypePrice();

    window.main.disableFormFilter();
    window.pin.formFilter.reset();

    mapPinMain.addEventListener('mousedown', window.map.onMouseCheckPage);
    mapPinMain.addEventListener('keydown', window.map.onKeyCheckPage);
  };

  var removePopup = function () {
    var successPopup = document.querySelector('.success');
    var errorPopup = document.querySelector('.error');

    if (successPopup) {
      successPopup.remove();
    }

    if (errorPopup) {
      errorPopup.remove();
    }

    document.removeEventListener('keydown', onKeyHidePopup);
    document.removeEventListener('mousedown', onMouseHidePopup);
  };

  var onKeyHidePopup = function (evt) {
    if (evt.key === EvtKeys.ESCAPE) {
      evt.preventDefault();
      removePopup();
    }
  };

  var onMouseHidePopup = function (evt) {
    if (evt.button === MAIN_BUTTON && evt.target.className !== 'success__message' && evt.target.className !== 'error__message') {
      evt.preventDefault();
      removePopup();
    }
  };

  var showPopup = function (template) {
    var popupTemplate = document.querySelector(template).content.cloneNode(true);
    main.appendChild(popupTemplate);
  };

  var hideSuccessPopup = function () {
    document.addEventListener('keydown', onKeyHidePopup);
    document.addEventListener('mousedown', onMouseHidePopup);
  };

  var hideErrorPopup = function () {
    document.addEventListener('keydown', onKeyHidePopup);
    document.addEventListener('mousedown', onMouseHidePopup);

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', onMouseHidePopup);
  };

  var onSuccess = function () {
    disablePage();
    showPopup('#success', '.success');
    hideSuccessPopup();
  };

  var onError = function () {
    showPopup('#error', '.error');
    hideErrorPopup();
  };

  var onSubmitSaveData = function (evt) {
    window.backend(onSuccess, onError, new FormData(form));
    evt.preventDefault();
  };

  form.addEventListener('submit', onSubmitSaveData);
  resetButton.addEventListener('click', disablePage);
})();
