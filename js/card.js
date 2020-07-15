'use strict';

(function () {
  var popupTemplate = document.querySelector('#card').content;
  var card = popupTemplate.querySelector('.popup');
  var apartmentCard = card.cloneNode(true);

  var apartments = {
    BUNGALO: 'Бунгало',
    FLAT:'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };

  var renderCardValue = function (popupValue, cardValue) {
    apartmentCard.querySelector(popupValue).textContent = cardValue;
  };

  var markCardFeatures = function (offerFeatures) {
    var cardFeatures = apartmentCard.querySelectorAll('.popup__feature');

    for (var i = 0; i < cardFeatures.length; i++) {
      cardFeatures[i].classList.add('hidden');
      for (var j = 0; j < offerFeatures.length; j++) {
        cardFeatures[j].classList.remove('hidden');
      }
    }
  };

  var clearOldPhotos = function (oldPhotos) {
    for (var i = 0; i < oldPhotos.length; i++) {
      oldPhotos[i].remove();
    }
  };

  var addNewPhotos = function (newPhotos, newPhoto, container) {
    for (var i = 0; i < newPhotos.length; i++) {
      newPhoto.src = newPhotos[i];
      var cloneImage = newPhoto.cloneNode(true);
      container.appendChild(cloneImage);
    }
  };

  var markCardPhotos = function (userPhotos) {
    var photosContainer = apartmentCard.querySelector('.popup__photos');
    var photo = photosContainer.querySelector('.popup__photo');
    var lastPhotos = apartmentCard.querySelectorAll('.popup__photo');

    if (userPhotos.length === 0) {
      photosContainer.classList.add('hidden');
    } else {
      photosContainer.classList.remove('hidden');

      clearOldPhotos(lastPhotos);
      addNewPhotos(userPhotos, photo, photosContainer);
    }
  };

  var markCardText = function (offer, author) {
    var offerType = offer.type.toUpperCase();

    renderCardValue('.popup__text--address', offer.address);
    renderCardValue('.popup__title', offer.title);
    renderCardValue('.popup__text--price', offer.price + '₽/ночь');
    renderCardValue('.popup__type', apartments[offerType]);
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
