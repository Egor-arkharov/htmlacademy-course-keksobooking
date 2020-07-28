'use strict';

(function () {

  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200
  };

  var handleRequest = function (xhr, onLoad, onError) {
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
  };

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    handleRequest(xhr, onLoad, onError);
    xhr.open('GET', Url.LOAD);
    xhr.send();

    return xhr.response;
  };

  var saveData = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    handleRequest(xhr, onLoad, onError);
    xhr.open('POST', Url.SAVE);
    xhr.send(data);

    return xhr.response;
  };

  window.backend = {
    loadData: loadData,
    saveData: saveData
  };
})();
