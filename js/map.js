'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');

  var MAIN_BUTTON = 0;

  var buttonClose = window.card.apartmentCard.querySelector('.popup__close');

  var EvtKeys = {
    ENTER: 'Enter',
    ESCAPE: 'Escape'
  };

  var activatePage = function () {
    if (map.classList.contains('map--faded')) {
      window.pin.renderPins();
    }

    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === MAIN_BUTTON) {
      activatePage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.map.EvtKeys.ENTER) {
      activatePage();
    }
  });

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
    if (evt.key === EvtKeys.ENTER) {
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
    EvtKeys: EvtKeys
  };

})();