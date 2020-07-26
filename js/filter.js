'use strict';

(function () {
  var filterPrice = document.querySelector('#housing-price');

  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var updateByType = function (data, value, type) {
    var typeFilter = data.filter(function (pin) {
      return pin.offer[type].toString() === value;
    });

    return typeFilter;
  };

  var updateByPrice = function (data, type) {
    var priceFilter = data.filter(function (pin) {
      var price = pin.offer[type];

      if (filterPrice.value === 'low') {
        return price <= Price.MIN;
      }

      if (filterPrice.value === 'middle') {
        return price >= Price.MIN && price <= Price.MAX;
      }

      if (filterPrice.value === 'high') {
        return price >= Price.MAX;
      }

      return pin;
    });

    return priceFilter;
  };

  var updateByFeatures = function (data, value) {
    var featureFilter = data.filter(function (pin) {
      return pin.offer.features.includes(value);
    });

    return featureFilter;
  };

  var updateOffers = function (data) {
    var options = document.querySelectorAll('.map__filter');
    var features = document.querySelectorAll('.map__checkbox:checked');

    if (data.length !== 0) {
      window.pin.removeErrorMessage();
    }

    window.pin.removePopup();

    options = Array.from(options).filter(function (option) {
      return option.value !== 'any';
    });

    options.forEach(function (option) {
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
