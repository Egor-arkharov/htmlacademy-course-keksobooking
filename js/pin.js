'use strict';

(function () {
  var MAX_OFFER_QUANTITY = 8;

  var mapPin = document.querySelector('.map__pin');
  var pinTemplate = document.querySelector('#pin').content;
  var offsetX = (mapPin.getBoundingClientRect().width) / 2;
  var offsetY = mapPin.getBoundingClientRect().height;
  var mapPins = document.querySelector('.map__pins');

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

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_OFFER_QUANTITY; i++) {
      var adPin = renderPin(pins[i]);
      fragment.appendChild(adPin);
    }

    mapPins.appendChild(fragment);
  };

  var successHandler = function (pins) {
    renderPins(pins);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pin = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };

})();
