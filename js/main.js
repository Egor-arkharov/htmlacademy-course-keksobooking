'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');


  var disableForm = function () {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  disableForm();

  window.main = {
    disableForm: disableForm
  }
})();
