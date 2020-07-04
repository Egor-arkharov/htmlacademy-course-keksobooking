'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var userType = form.querySelector('#type');
  var userPrice = form.querySelector('#price');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var address = form.querySelector('#address');

  var mapPin = document.querySelector('.map__pin');
  var offsetX = (mapPin.getBoundingClientRect().width) / 2;
  var offsetY = (mapPin.getBoundingClientRect().height) / 2;

  var apartments = {
    BUNGALO: {
      type: 'BUNGALO',
      name: 'Бунгало',
      price: 0
    },
    FLAT: {
      type: 'FLAT',
      name: 'Квартира',
      price: 1000
    },
    HOUSE: {
      type: 'HOUSE',
      name: 'Дом',
      price: 5000
    },
    PALACE: {
      type: 'PALACE',
      name: 'Дворец',
      price: 10000
    }
  };

  address.value = (mapPin.offsetLeft + offsetX) + ', ' + (mapPin.offsetTop + offsetY);

  var validateCapacity = function () {
    var ROOM_NUM = +rooms.value;
    var GUEST_NUM = +capacity.value;
    var isValidChoice = ROOM_NUM === 100 ? (GUEST_NUM === 0) : (ROOM_NUM > GUEST_NUM && GUEST_NUM !== 0 || ROOM_NUM === GUEST_NUM);

    if (isValidChoice) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('Количество гостей не соответствует количеству комнат');
    }
  };

  var validatePrice = function (e) {
    var value = e.target.value.toUpperCase();
    userPrice.setAttribute('min', apartments[value].price);
    userPrice.setAttribute('placeholder', apartments[value].price);
  };

  var validateTimeOut = function () {
    timeout.value = timein.value;
  };

  var validateTimeIn = function () {
    timein.value = timeout.value;
  };

  rooms.addEventListener('change', validateCapacity);
  capacity.addEventListener('change', validateCapacity);
  userType.addEventListener('change', validatePrice);
  timein.addEventListener('change', validateTimeOut);
  timeout.addEventListener('change', validateTimeIn);

})();
