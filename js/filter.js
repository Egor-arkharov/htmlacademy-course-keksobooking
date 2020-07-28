'use strict';

(function () {
  var MAX_PINS = 5;
  var filterPrice = document.querySelector('#housing-price');

  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var updateByType = function (data, value, type) {
    var typeFilterAds = [];

    for (var i = 0; i < data.length; i++) {
      if (typeFilterAds > MAX_PINS) {
        break;
      }

      if (data[i].offer[type].toString() === value) {
        typeFilterAds.push(data[i]);
      }
    }

    return typeFilterAds;
  };

  var updateByPrice = function (data, type) {
    var priceFilterAds = [];

    for (var i = 0; i < data.length; i++) {
      var price = data[i].offer[type];

      if (priceFilterAds > MAX_PINS) {
        break;
      }

      if (filterPrice.value === 'low' && price <= Price.MIN) {
        priceFilterAds.push(data[i]);
      }

      if (filterPrice.value === 'middle' && price >= Price.MIN && price <= Price.MAX) {
        priceFilterAds.push(data[i]);
      }

      if (filterPrice.value === 'high' && price >= Price.MAX) {
        priceFilterAds.push(data[i]);
      }
    }

    return priceFilterAds;
  };

  var updateByFeatures = function (data, value) {
    var featureFilterAds = [];

    for (var i = 0; i < data.length; i++) {
      if (featureFilterAds > MAX_PINS) {
        break;
      }

      if (data[i].offer.features.includes(value)) {
        featureFilterAds.push(data[i]);
      }
    }

    return featureFilterAds;
  };

  var updateOffers = function (data) {
    var options = document.querySelectorAll('.map__filter');
    var features = document.querySelectorAll('.map__checkbox:checked');

    if (data.length !== 0) {
      window.pin.removeErrorMessage();
    }

    window.pin.removePopup();

    var newOptions = [];

    options.forEach(function (element) {
      if (element.value !== 'any') {
        newOptions.push(element);
      }
    });

    newOptions.forEach(function (option) {
      switch (option.id) {
        case 'housing-type':
          data = updateByType(data, option.value, 'type');
          break;

        case 'housing-rooms':
          data = updateByType(data, option.value, 'rooms');
          break;

        case 'housing-guests':
          data = updateByType(data, option.value, 'guests');
          break;

        case 'housing-price':
          data = updateByPrice(data, 'price');
          break;
      }
    });

    features.forEach(function (feature) {
      data = updateByFeatures(data, feature.value);
    });

    return data;
  };

  window.filter = updateOffers;
})();
