'use strict';

(function () {
  var popupTemplate = document.querySelector('#card').content;
  var card = popupTemplate.querySelector('.popup');
  var apartmentCard = card.cloneNode(true);

  var photosContainer = apartmentCard.querySelector('.popup__photos');
  var photo = photosContainer.querySelector('.popup__photo');
  var featureContainer = apartmentCard.querySelector('.popup__features');

  var renderCardValue = function (popupValue, cardValue) {
    apartmentCard.querySelector(popupValue).textContent = cardValue;
  };

  var clearOldElements = function (elementClass) {
    var oldElements = apartmentCard.querySelectorAll(elementClass);

    for (var i = 0; i < oldElements.length; i++) {
      oldElements[i].remove();
    }
  };

  var createFeaturesContainer = function () {
    var popupText = apartmentCard.querySelector('.popup__text--time');

    var newFeatureContainer = document.createElement('ul');
    newFeatureContainer.className = 'popup__features';

    if (!featureContainer) {
      popupText.insertAdjacentElement('afterend', newFeatureContainer);
    }
  };

  var createNewFeatures = function (offerFeatures) {
    var featureFragment = document.createDocumentFragment();

    offerFeatures.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });

    return featureFragment;
  };

  var markCardFeatures = function (offerFeatures) {
    if (offerFeatures.length === 0 && featureContainer) {
      featureContainer.remove();
    } else {
      createFeaturesContainer();
      clearOldElements('.popup__feature');
      featureContainer.innerHTML = '';
      featureContainer.appendChild(createNewFeatures(offerFeatures));
    }

  };

  var createPhotosContainer = function () {
    var photoContainer = apartmentCard.querySelector('.popup__photos');
    var popupDescription = apartmentCard.querySelector('.popup__description');

    var newPhotosContainer = document.createElement('div');
    newPhotosContainer.className = 'popup__photos';

    if (!photoContainer) {
      popupDescription.insertAdjacentElement('afterend', newPhotosContainer);
    }
  };

  var createNewPhotos = function (userPhotos) {
    var newPhotosContainer = apartmentCard.querySelector('.popup__photos');

    for (var i = 0; i < userPhotos.length; i++) {
      photo.src = userPhotos[i];
      var cloneImage = photo.cloneNode(true);
      newPhotosContainer.appendChild(cloneImage);
    }
  };

  var markCardPhotos = function (userPhotos) {
    var lastPhotosContainer = apartmentCard.querySelector('.popup__photos');

    if (userPhotos.length === 0 && lastPhotosContainer) {
      lastPhotosContainer.remove();
    } else {
      createPhotosContainer();
      clearOldElements('.popup__photo');
      createNewPhotos(userPhotos);
    }
  };

  var markCardText = function (offer, author) {
    var offerType = offer.type.toUpperCase();

    renderCardValue('.popup__text--address', offer.address);
    renderCardValue('.popup__title', offer.title);
    renderCardValue('.popup__text--price', offer.price + '₽/ночь');
    renderCardValue('.popup__type', window.form.Apartments[offerType].name);
    renderCardValue('.popup__text--capacity', offer.rooms + ' комнаты для ' + offer.guests);
    renderCardValue('.popup__text--time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
    renderCardValue('.popup__description', offer.description);
    apartmentCard.querySelector('.popup__avatar').src = author.avatar;
  };

  var renderCard = function (data) {
    markCardFeatures(data.offer.features);
    markCardText(data.offer, data.author);
    markCardPhotos(data.offer.photos);

    return apartmentCard;
  };

  window.card = {
    renderCard: renderCard,
    apartmentCard: apartmentCard
  };

})();
