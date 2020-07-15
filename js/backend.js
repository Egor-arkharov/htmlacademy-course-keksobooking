'use strict';

(function () {

  var StatusCode = {
    OK: 200
  };

  window.backendLoad = function (onLoad, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();

    return xhr.response;
  };

})();
