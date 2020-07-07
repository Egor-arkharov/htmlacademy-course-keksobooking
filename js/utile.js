'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin');
  var pinSizeX = mapPin.getBoundingClientRect().width;
  var pinSizeY = mapPin.getBoundingClientRect().height;
  var pinHalfSize = Math.round(pinSizeX / 2);

  var mapPinMain = document.querySelector('.map__pin--main');
  var pinPointSizeY = Number(window.getComputedStyle(mapPinMain, ':after').height.replace(/\D/g, ''));

  window.utile = {
    pinSizeX: pinSizeX,
    pinSizeY: pinSizeY,
    pinPointSizeY: pinPointSizeY,
    pinHalfSize: pinHalfSize
  };
})();
