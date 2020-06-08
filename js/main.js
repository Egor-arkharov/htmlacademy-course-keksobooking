'use strict';

var TITLES = ['2-комнтаные апартаменты в центре', 'Элитное жилье в районе Аракава', 'Новостройка в районе Кацусика (рядом с ж/д)', 'Двушка с видом на парк Инокасира', 'Квартира рядом с Императорским дворцом', 'Вторичное жилье рядом со станцией Тораномон', 'Квартира в Маруноути с паркингом', 'Двухэтажное жилье у реки Канда'];
var PRICES = ['200', '500', '1000', '2500', '5200', '7550', '10900', '15000'];
var ROOMS = ['1', '1', '2', '2', '2', '3', '4', '5'];
var GUESTS = ['1', '1', '1', '2', '2', '3', '4', '6'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content;
var mapPin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var offsetX = (mapPin.getBoundingClientRect().width) / 2;
var offsetY = mapPin.getBoundingClientRect().height;

var getRandomNum = function (min, max) {
  var num = min + Math.random() * (max - min);
  return Math.floor(num);
};

var getOfferValue = function (offerKey) {
  var offerValue = offerKey[getRandomNum(0, offerKey.length)];

  return offerValue;
};

var getOfferArr = function (offerKey) {
  var offerArr = [];
  var offerValue1 = getRandomNum(0, offerKey.length);
  for (var i = 0; i <= offerValue1; i++) {
    var offer1 = offerKey[i];
    offerArr.push(offer1);
  }

  return offerArr;
};

var getApartment = function () {
  var imgAddress = '0' + getRandomNum(1, 8);
  var locationX = getRandomNum(50, 500);
  var locationY = getRandomNum(130, 630);

  var ApartmentOverview = {
    author: {
      avatar: 'img/avatars/user' + imgAddress + '.png'
    },
    offer: {
      title: String(getOfferValue(TITLES)),
      address: String(locationX + ', ' + locationY),
      price: getOfferValue(PRICES),
      type: getOfferValue(TYPES),
      rooms: getOfferValue(ROOMS),
      guests: getOfferValue(GUESTS),
      checkin: String(getOfferValue(CHECKINS)),
      checkout: String(getOfferValue(CHECKOUTS)),
      features: getOfferArr(OFFER_FEATURES),
      description: 'Сдается в аренду апартаменты с панорамными видами! Высокий этаж и потолки. Функциональная планировка: большая кухня-гостиная, спальня с гардеробной комнатой санузлом, прачечная, холл и гостевой санузел. Апартамент меблирован Итальянской мебелью и укомплектован необходимой техникой, готовы к проживанию.',
      photos: getOfferArr(OFFER_PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

  return ApartmentOverview;
};

var getApartments = function () {
  var apartmentsArr = [];
  for (var i = 0; i < 8; i++) {
    apartmentsArr[i] = getApartment(i);
  }

  return apartmentsArr;
};

map.classList.remove('map--faded');

var renderPin = function (newApartment) {
  var newPin = pinTemplate.cloneNode(true);
  var x = newApartment.location.x - offsetX;
  var y = newApartment.location.y - offsetY;
  newPin.querySelector('.map__pin').style.left = x + 'px';
  newPin.querySelector('.map__pin').style.top = y + 'px';

  var newAppartImg = newPin.querySelector('img');
  newAppartImg.src = newApartment.author.avatar;
  newAppartImg.alt = newApartment.offer.title;

  return newPin;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  var apartments = getApartments();

  for (var i = 0; i < 8; i++) {
    var adPin = renderPin(apartments[i]);
    fragment.appendChild(adPin);
  }

  mapPins.appendChild(fragment);
};

renderPins();
