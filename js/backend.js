'use strict';

(function () {

  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };

  window.backend = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        var loadResponse = onLoad(xhr.response);
        return loadResponse;
      }

      var errorResponse = onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      return errorResponse;
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    if (data) {
      xhr.open('POST', Url.SAVE);
      xhr.send(data);
    } else {
      xhr.open('GET', Url.LOAD);
      xhr.send();
    }
  };
})();
