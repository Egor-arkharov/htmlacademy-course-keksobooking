'use strict';

var TITLES = ['2-комнтаные апартаменты в центре', 'Элитное жилье в районе Аракава', 'Новостройка в районе Кацусика (рядом с ж/д)', 'Двушка с видом на парк Инокасира', 'Квартира рядом с Императорским дворцом', 'Вторичное жилье рядом со станцией Тораномон', 'Квартира в Маруноути с паркингом', 'Двухэтажное жилье у реки Канда'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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
var MAIN_BUTTON = 0;

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content;
var mapPin = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');

var popupTemplate = document.querySelector('#card').content;
var card = popupTemplate.querySelector('.popup');
var apartmentCard = card.cloneNode(true);
var buttonClose = apartmentCard.querySelector('.popup__close');

var offsetX = (mapPin.getBoundingClientRect().width) / 2;
var offsetY = mapPin.getBoundingClientRect().height;

var address = document.querySelector('#address');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var rooms = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var userType = form.querySelector('#type');
var userPrice = form.querySelector('#price');
var timein = form.querySelector('#timein');
var timeout = form.querySelector('#timeout');

address.value = offsetX + ', ' + offsetY;

var ApartmentTypesTranslate = {
  BUNGALO: 'Бунгало',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  PALACE: 'Дворец'
};

var apartmentPrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var EvtKeys = {
  ENTER: 'Enter',
  ESCAPE: 'Escape'
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

  var apartmentOverview = {
    author: {
      avatar: 'img/avatars/user' + imgAddress + '.png'
    },
    offer: {
      title: getOfferValue(TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomNum(MIN_OFFER_VALUE, MAX_PRICE_VALUE),
      type: getOfferValue(TYPES),
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

var apartment = getApartment();
var apartmentOffer = apartment.offer;

var getApartments = function () {
  var apartmentsArr = [];
  for (var i = 0; i < MAX_OFFER_QUANTITY; i++) {
    apartmentsArr[i] = getApartment(i);
  }

  return apartmentsArr;
};

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

  for (var i = 0; i < MAX_OFFER_QUANTITY; i++) {
    var adPin = renderPin(apartments[i]);
    fragment.appendChild(adPin);
  }

  mapPins.appendChild(fragment);
};

renderPins();

var disablePage = function () {
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = true;
  });
};

disablePage();

var activatePage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = false;
  });
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === MAIN_BUTTON) {
    activatePage();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === EvtKeys.ENTER) {
    activatePage();
  }
});

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

var validatePrice = function () {
  for (var i = 0; i < TYPES.length; i++) {
    if (userType.value === TYPES[i]) {
      userPrice.setAttribute('min', apartmentPrices[TYPES[i]]);
      userPrice.setAttribute('placeholder', apartmentPrices[TYPES[i]]);
    }
  }
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

var renderCardValue = function (popupValue, cardValue) {
  apartmentCard.querySelector(popupValue).textContent = cardValue;
};

var markCardFeatures = function () {
  var offerFeatures = getApartment().offer.features;
  var popupFeaturesList = popupTemplate.querySelector('.popup__features');
  var popupFeaturesItems = popupFeaturesList.querySelectorAll('.popup__feature');
  var popupDescription = apartmentCard.querySelector('.popup__description');

  apartmentCard.querySelector('.popup__features').remove();

  for (var i = popupFeaturesItems.length - 1; i >= offerFeatures.length; i--) {
    popupFeaturesList.removeChild(popupFeaturesItems[i]);
  }

  apartmentCard.insertBefore(popupFeaturesList, popupDescription);
};

var markCardPhotos = function () {
  var photosContainer = apartmentCard.querySelector('.popup__photos');
  var photos = photosContainer.querySelector('.popup__photo');
  var userPhotos = apartmentOffer.photos;

  for (var i = 0; i < userPhotos.length; i++) {
    photos.src = userPhotos[i];
    var cloneImage = photos.cloneNode(true);
    photosContainer.appendChild(cloneImage);
  }
};

var markCardText = function () {
  renderCardValue('.popup__title', apartmentOffer.title);
  renderCardValue('.popup__text--price', apartmentOffer.price + '₽/ночь');
  renderCardValue('.popup__type', ApartmentTypesTranslate[apartmentOffer.type.toUpperCase()]);
  renderCardValue('.popup__text--capacity', apartmentOffer.rooms + ' комнаты для ' + apartmentOffer.guests);
  renderCardValue('.popup__text--time', 'Заезд после ' + apartmentOffer.checkin + ', выезд до ' + apartmentOffer.checkout);
  renderCardValue('.popup__description', apartmentOffer.description);
  apartmentCard.querySelector('.popup__avatar').src = apartment.author.avatar;
};

var renderCard = function () {
  markCardFeatures();
  markCardPhotos();
  markCardText();

  return apartmentCard;
};

var mapIcons = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

var onPopupEscPress = function (evt) {
  if (evt.key === EvtKeys.ESCAPE) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  var newCard = renderCard();
  for (var i = 0; i < mapIcons.length; i++) {
    mapIcons[i].addEventListener('click', function () {
      map.insertBefore(newCard, filtersContainer);
      document.addEventListener('keydown', onPopupEscPress);
    });
  }
};

var closePopup = function () {
  apartmentCard.remove();
  mapPin.removeEventListener('click', openPopup);
};

mapPin.addEventListener('click', openPopup);

mapPin.addEventListener('keydown', function (evt) {
  if (evt.key === EvtKeys.ENTER) {
    openPopup();
  }
});

buttonClose.addEventListener('click', function () {
  closePopup();
});

buttonClose.addEventListener('keydown', function (evt) {
  if (evt.key === EvtKeys.ENTER) {
    closePopup();
  }
});
