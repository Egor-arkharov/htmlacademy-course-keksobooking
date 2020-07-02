'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');


  var disablePage = function () {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  disablePage();

})();
