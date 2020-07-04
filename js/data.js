'use strict';

(function () {
  var TITLES = ['2-комнтаные апартаменты в центре', 'Элитное жилье в районе Аракава', 'Новостройка в районе Кацусика (рядом с ж/д)', 'Двушка с видом на парк Инокасира', 'Квартира рядом с Императорским дворцом', 'Вторичное жилье рядом со станцией Тораномон', 'Квартира в Маруноути с паркингом', 'Двухэтажное жилье у реки Канда'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_OFFER_VALUE = 1;
  var MAX_OFFER_QUANTITY = 8;
  var MAX_PRICE_VALUE = 15000;
  var MAX_ROOMS_VALUE = 5;
  var MAX_GUESTS_VALUE = 6;
  var MIN_LOCATION_X = 50;
  var MAX_LOCATION_X = 500;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;

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
    var randomArrLength = getRandomNum(0, offerKey.length);
    for (var i = 0; i <= randomArrLength; i++) {
      offerArr.push(offerKey[i]);
    }

    return offerArr;
  };

  var getApartment = function () {
    var imgAddress = '0' + getRandomNum(MIN_OFFER_VALUE, MAX_OFFER_QUANTITY);
    var locationX = getRandomNum(MIN_LOCATION_X, MAX_LOCATION_X);
    var locationY = getRandomNum(MIN_LOCATION_Y, MAX_LOCATION_Y);

    var offerTypes = Object.values(apartments).map(function (value) {
      return value.type;
    });

    var apartmentOverview = {
      author: {
        avatar: 'img/avatars/user' + imgAddress + '.png'
      },
      offer: {
        title: getOfferValue(TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomNum(MIN_OFFER_VALUE, MAX_PRICE_VALUE),
        type: getOfferValue(offerTypes),
        rooms: getRandomNum(MIN_OFFER_VALUE, MAX_ROOMS_VALUE),
        guests: getRandomNum(MIN_OFFER_VALUE, MAX_GUESTS_VALUE),
        checkin: getOfferValue(CHECKINS),
        checkout: getOfferValue(CHECKOUTS),
        features: getOfferArr(OFFER_FEATURES),
        description: 'Сдается в аренду апартаменты с панорамными видами! Высокий этаж и потолки. Функциональная планировка: большая кухня-гостиная, спальня с гардеробной комнатой санузлом, прачечная, холл и гостевой санузел. Апартамент меблирован Итальянской мебелью и укомплектован необходимой техникой, готовы к проживанию.',
        photos: getOfferArr(OFFER_PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };

    return apartmentOverview;
  };

  window.data = {
    MAX_OFFER_QUANTITY: MAX_OFFER_QUANTITY,
    apartments: apartments,
    getApartment: getApartment
  };
})();
