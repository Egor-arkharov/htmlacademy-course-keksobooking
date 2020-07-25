'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var formFilter = document.querySelector('.map__filters');

  var disableForm = function () {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  var disableFormFilter = function () {
    var formFilters = formFilter.children;

    for (var i = 0; i < formFilters.length; i++) {
      formFilters[i].setAttribute('disabled', 'disabled');
    }
  };

  disableForm();
  disableFormFilter();

  window.main = {
    disableForm: disableForm,
    disableFormFilter: disableFormFilter
  };
})();
