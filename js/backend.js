'use strict';

(function () {

  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };

  window.backendLoad = function (onLoad, onError) {

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

    xhr.open('GET', Url.LOAD);
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

    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

})();
