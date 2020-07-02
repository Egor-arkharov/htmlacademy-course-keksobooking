'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin');
  var pinTemplate = document.querySelector('#pin').content;
  var offsetX = (mapPin.getBoundingClientRect().width) / 2;
  var offsetY = mapPin.getBoundingClientRect().height;
  var mapPins = document.querySelector('.map__pins');

  var getApartments = function () {
    var apartmentsArr = [];
    for (var i = 0; i < window.data.MAX_OFFER_QUANTITY; i++) {
      apartmentsArr[i] = window.data.getApartment(i);
    }

    return apartmentsArr;
  };

  var renderPin = function (pin) {
    var newPin = pinTemplate.querySelector('.map__pin').cloneNode(true);

    var x = pin.location.x - offsetX;
    var y = pin.location.y - offsetY;
    newPin.style.left = x + 'px';
    newPin.style.top = y + 'px';

    var newAppartImg = newPin.querySelector('img');
    newAppartImg.src = pin.author.avatar;
    newAppartImg.alt = pin.offer.title;

    newPin.addEventListener('click', function () {
      window.map.openPopup(pin);
    });

    return newPin;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    var newPins = getApartments();

    for (var i = 0; i < window.data.MAX_OFFER_QUANTITY; i++) {
      var adPin = renderPin(newPins[i]);
      fragment.appendChild(adPin);
    }

    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins
  };

})();
