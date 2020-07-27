'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin');
  var pinSizeX = mapPin.getBoundingClientRect().width;
  var pinSizeY = mapPin.getBoundingClientRect().height;
  var pinHalfSize = Math.round(pinSizeX / 2);
  var pinPointSizeY = Number(window.getComputedStyle(mapPin, ':after').height.replace(/\D/g, ''));

  var mapPinMain = document.querySelector('.map__pin--main');
  var pinMainPointSizeY = Number(window.getComputedStyle(mapPinMain, ':after').height.replace(/\D/g, ''));

  window.utile = {
    pinSizeX: pinSizeX,
    pinSizeY: pinSizeY,
    pinMainPointSizeY: pinMainPointSizeY,
    pinPointSizeY: pinPointSizeY,
    pinHalfSize: pinHalfSize
  };
})();
