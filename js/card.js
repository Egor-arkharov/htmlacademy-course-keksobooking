'use strict';

(function () {
  var popupTemplate = document.querySelector('#card').content;
  var card = popupTemplate.querySelector('.popup');
  var apartmentCard = card.cloneNode(true);

  var featureContainer = apartmentCard.querySelector('.popup__features');
  var popupText = apartmentCard.querySelector('.popup__text--time');

  var photosContainer = apartmentCard.querySelector('.popup__photos');
  var photo = photosContainer.querySelector('.popup__photo');
  var popupDescription = apartmentCard.querySelector('.popup__description');

  var renderCardValue = function (popupValue, cardValue) {
    apartmentCard.querySelector(popupValue).textContent = cardValue;
  };

  var clearOldElements = function (container, elementClass) {
    var oldElements = container.querySelectorAll(elementClass);

    for (var i = 0; i < oldElements.length; i++) {
      oldElements[i].remove();
    }
  };

  var createNewContainer = function (tagName, className) {
    var newContainer = document.createElement(tagName);
    newContainer.className = className;
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
      createNewContainer('ul', 'popup__features');

      clearOldElements(featureContainer, '.popup__feature');
      featureContainer.innerHTML = '';
      featureContainer.appendChild(createNewFeatures(offerFeatures));

      popupText.insertAdjacentElement('afterend', featureContainer);
    }
  };

  var createNewPhotos = function (userPhotos) {
    for (var i = 0; i < userPhotos.length; i++) {
      photo.src = userPhotos[i];
      var cloneImage = photo.cloneNode(true);
      photosContainer.appendChild(cloneImage);
    }
  };

  var markCardPhotos = function (userPhotos) {
    if (userPhotos.length === 0 && photosContainer) {
      photosContainer.remove();
    } else {
      createNewContainer('div', 'popup__photos');

      clearOldElements(photosContainer, '.popup__photo');
      createNewPhotos(userPhotos);

      popupDescription.insertAdjacentElement('afterend', photosContainer);
    }
  };

  var makeCardAddress = function (location) {
    var address = (location.x + window.utile.pinHalfSize) + ', ' + (location.y + window.utile.pinSizeY + window.utile.pinPointSizeY);
    renderCardValue('.popup__text--address', address);
  };

  var markCardText = function (offer, author) {
    var offerType = offer.type.toUpperCase();

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
    makeCardAddress(data.location);

    markCardPhotos(data.offer.photos);

    return apartmentCard;
  };

  window.card = {
    renderCard: renderCard,
    apartmentCard: apartmentCard
  };

})();
