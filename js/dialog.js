'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin');
  var PIN_SIZE_X = mapPin.getBoundingClientRect().width;
  var PIN_SIZE_Y = mapPin.getBoundingClientRect().height;

  var mapPinMain = document.querySelector('.map__pin--main');
  var PIN_POINT_SIZE_Y = Number(window.getComputedStyle(mapPinMain, ':after').height.replace(/\D/g, ''));

  var WINDOW_SIZE_X_LEFT = 0;
  var WINDOW_SIZE_X_RIGHT = 1200;
  var WINDOW_SIZE_Y_TOP = 130;
  var WINDOW_SIZE_Y_BOTTOM = 630;

  var address = document.querySelector('#address');

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.removeEventListener('mouseup', onMouseUp);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPin.offsetTop - shift.y) >= (WINDOW_SIZE_Y_TOP - PIN_POINT_SIZE_Y - PIN_SIZE_Y) && (mapPin.offsetTop - shift.y) <= (WINDOW_SIZE_Y_BOTTOM - PIN_POINT_SIZE_Y - PIN_SIZE_Y)) {
        mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      }

      if ((mapPin.offsetLeft - shift.x) >= WINDOW_SIZE_X_LEFT - Math.round((PIN_SIZE_X / 2)) && (mapPin.offsetLeft - shift.x) <= WINDOW_SIZE_X_RIGHT - Math.ceil((PIN_SIZE_X / 2))) {
        mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
      }

      address.value = Math.round((mapPin.offsetLeft - shift.x + (PIN_SIZE_X / 2))) + ', ' + (mapPin.offsetTop - shift.y + (PIN_SIZE_Y + PIN_POINT_SIZE_Y));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
