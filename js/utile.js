'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin');
  var address = document.querySelector('#address');
  var offsetX = (mapPin.getBoundingClientRect().width) / 2;
  var offsetY = (mapPin.getBoundingClientRect().height) / 2;

  address.value = Math.round((mapPin.offsetLeft + offsetX)) + ', ' + Math.round((mapPin.offsetTop + offsetY));

})();
