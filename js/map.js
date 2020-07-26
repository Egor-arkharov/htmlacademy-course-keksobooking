'use strict';

(function () {
  var MAIN_BUTTON = 0;

  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var errorMessage = document.querySelector('.error__message');

  var address = document.querySelector('#address');
  var buttonClose = window.card.apartmentCard.querySelector('.popup__close');

  var EvtKeys = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var activatePage = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });

    address.value = (mapPin.offsetLeft + window.utile.pinSizeY + window.utile.pinPointSizeY) + ', ' + (mapPin.offsetTop + window.utile.pinHalfSize);

    window.backendLoad(window.pin.successHandler, window.pin.errorHandler);
  };

  var onMouseCheckPage = function (evt) {
    if (evt.button === MAIN_BUTTON && mapPins.children.length <= 2) {
      activatePage();
    }

    if (mapPins.children.length > 2 && !errorMessage) {
      mapPinMain.removeEventListener('mousedown', onMouseCheckPage);
    }
  };

  var onKeyCheckPage = function (evt) {
    if (evt.key === window.map.EvtKeys.ENTER && mapPins.children.length <= 2) {
      activatePage();
    }

    if (mapPins.children.length > 2 && !errorMessage) {
      mapPinMain.removeEventListener('keydown', onKeyCheckPage);
    }
  };

  mapPinMain.addEventListener('mousedown', onMouseCheckPage);
  mapPinMain.addEventListener('keydown', onKeyCheckPage);

  var onPopupEscPress = function (evt) {
    if (evt.key === EvtKeys.ESCAPE) {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function (data) {
    map.insertBefore(window.card.renderCard(data), filtersContainer);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.card.apartmentCard.remove();
    mapPin.removeEventListener('click', openPopup);
  };

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.key === EvtKeys.ENTER && !mapPin.classList.contains('map__pin--main')) {
      mapPin.classList.add('map__pin--active');
      openPopup();
    }
  });

  buttonClose.addEventListener('click', function () {
    closePopup();
  });

  buttonClose.addEventListener('keydown', function (evt) {
    if (evt.key === EvtKeys.ENTER) {
      closePopup();
    }
  });

  window.map = {
    openPopup: openPopup,
    EvtKeys: EvtKeys,
    onMouseCheckPage: onMouseCheckPage,
    onKeyCheckPage: onKeyCheckPage
  };

})();
