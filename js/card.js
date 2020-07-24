'use strict';

(function () {
  var popupTemplate = document.querySelector('#card').content;
  var card = popupTemplate.querySelector('.popup');
  var apartmentCard = card.cloneNode(true);

  var apartmentType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
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

  var clearOldPhotos = function () {
    var lastPhotos = apartmentCard.querySelectorAll('.popup__photo');

    for (var i = 0; i < lastPhotos.length; i++) {
      lastPhotos[i].remove();
    }
  };

  var markCardPhotos = function (userPhotos) {
    var photosContainer = apartmentCard.querySelector('.popup__photos');
    var photo = photosContainer.querySelector('.popup__photo');

    if (userPhotos.length === 0) {
      photosContainer.classList.add('hidden');
    } else {
      photosContainer.classList.remove('hidden');

      clearOldPhotos();

      for (var i = 0; i < userPhotos.length; i++) {
        photo.src = userPhotos[i];
        var cloneImage = photo.cloneNode(true);
        photosContainer.appendChild(cloneImage);
      }
    }
  };

  var markCardText = function (offer, author) {
    var offerType = offer.type.toUpperCase();

    renderCardValue('.popup__text--address', offer.address);
    renderCardValue('.popup__title', offer.title);
    renderCardValue('.popup__text--price', offer.price + '₽/ночь');
    renderCardValue('.popup__type', apartmentType[offerType]);
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
