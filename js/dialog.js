'use strict';

(function () {

  var PIN_SIZE_X = 65;
  var PIN_POINT_SIZE_Y = 22;
  var WINDOW_SIZE_X_LEFT = 0;
  var WINDOW_SIZE_X_RIGHT = 1200;
  var WINDOW_SIZE_Y_TOP = 130;
  var WINDOW_SIZE_Y_BOTTOM = 630;

  var mapPin = document.querySelector('.map__pin');
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

      if ((mapPin.offsetTop - shift.y) >= WINDOW_SIZE_Y_TOP && (mapPin.offsetTop - shift.y) <= WINDOW_SIZE_Y_BOTTOM) {
        mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      }

      if ((mapPin.offsetLeft - shift.x) >= WINDOW_SIZE_X_LEFT && (mapPin.offsetLeft - shift.x) <= WINDOW_SIZE_X_RIGHT) {
        mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
      }

      address.value = (mapPin.offsetLeft - shift.x + (PIN_SIZE_X / 2)) + ', ' + (mapPin.offsetTop - shift.y + (PIN_SIZE_X + PIN_POINT_SIZE_Y));
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
