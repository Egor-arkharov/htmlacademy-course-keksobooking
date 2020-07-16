'use strict';

(function () {

  var URL = {
    URL_LOAD: 'https://javascript.pages.academy/keksobooking/data',
    URL_SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };

  window.backendLoad = function (onLoad, onError) {

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

    xhr.open('GET', URL.URL_LOAD);
    xhr.send();

    return xhr.response;
  };

  window.backendSave = function (data, onLoad, onError) {
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

    xhr.open('POST', URL.URL_SAVE);
    xhr.send(data);
  };

})();
