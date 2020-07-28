'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var userType = form.querySelector('#type');
  var userPrice = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  var mapPin = document.querySelector('.map__pin');
  var address = document.querySelector('#address');

  var Apartments = {
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

  var putSelectedTypePrice = function () {
    var selectedType = userType.options[userType.selectedIndex].value;

    userPrice.setAttribute('placeholder', Apartments[selectedType.toUpperCase()].price);
    userPrice.setAttribute('min', Apartments[[selectedType.toUpperCase()]].price);
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
    userPrice.setAttribute('min', Apartments[value].price);
    userPrice.setAttribute('placeholder', Apartments[value].price);
  };

  var onTimeOutValidate = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeInValidate = function () {
    timeIn.value = timeOut.value;
  };

  putCenterAddress();
  rooms.addEventListener('change', validateCapacity);
  capacity.addEventListener('change', validateCapacity);
  userType.addEventListener('change', validatePrice);
  timeIn.addEventListener('change', onTimeOutValidate);
  timeOut.addEventListener('change', onTimeInValidate);

  window.form = {
    putCenterAddress: putCenterAddress,
    Apartments: Apartments,
    putSelectedTypePrice: putSelectedTypePrice,
    validatePrice: validatePrice
  };

})();
