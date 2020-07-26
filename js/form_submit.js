'use strict';

(function () {
  var MAIN_BUTTON = 0;

  var form = document.querySelector('.ad-form');
  var formPrice = form.querySelector('#price');
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
    window.main.disableFormFilter();
    window.pin.formFilter.reset();

    formPrice.setAttribute('placeholder', 0);

    mapPinMain.addEventListener('mousedown', window.map.onMouseCheckPage);
    mapPinMain.addEventListener('keydown', window.map.onKeyCheckPage);
  };

  var onPopupHide = function (evt) {
    var successPopup = document.querySelector('.success');
    var errorPopup = document.querySelector('.error');

    if (evt.key === EvtKeys.ESCAPE || evt.button === MAIN_BUTTON) {
      evt.preventDefault();

      if (successPopup) {
        successPopup.remove();
      }

      if (errorPopup) {
        errorPopup.remove();
      }

      document.removeEventListener('keydown', onPopupHide);
      document.removeEventListener('mousedown', onPopupHide);
    }
  };

  var showPopup = function (template) {
    var popupTemplate = document.querySelector(template).content.cloneNode(true);

    main.appendChild(popupTemplate);
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
    window.backendSave(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  };

  form.addEventListener('submit', onSubmitSaveData);
  resetButton.addEventListener('click', disablePage);

  window.formSubmit = {
    onPopupHide: onPopupHide
  };
})();
