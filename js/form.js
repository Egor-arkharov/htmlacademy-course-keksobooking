'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var userType = form.querySelector('#type');
  var userPrice = form.querySelector('#price');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');

  var mapPin = document.querySelector('.map__pin');
  var address = document.querySelector('#address');

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

  var putCenterAddress = function () {
    address.value = (mapPin.offsetLeft + window.utile.pinHalfSize) + ', ' + (mapPin.offsetTop + window.utile.pinHalfSize);
  };

  var validateCapacity = function () {
    var roomNum = +rooms.value;
    var guestNum = +capacity.value;
    var isValidChoice = roomNum === 100 ? (guestNum === 0) : (roomNum > guestNum && guestNum !== 0 || roomNum === guestNum);

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

  putCenterAddress();
  rooms.addEventListener('change', validateCapacity);
  capacity.addEventListener('change', validateCapacity);
  userType.addEventListener('change', validatePrice);
  timein.addEventListener('change', validateTimeOut);
  timeout.addEventListener('change', validateTimeIn);

  window.form = {
    putCenterAddress: putCenterAddress,
    apartments: apartments
  };

})();
