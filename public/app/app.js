(function(global, document) {

  var button = document.getElementById('call-module-btn');
  var placeholder = document.getElementById('module-placeholder');

  function injectScript(code) {
    var script = document.createElement('script');
    script.innerHTML = code;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function injectCSS(code) {
    var style = document.createElement('style');
    style.innerHTML = code;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function requestLoginModule() {
    global.socketStatic.request('/app/login', injectModule);
  }

  function injectModule(data) {
    placeholder.innerHTML = data.contents['module.html'];
    injectScript(data.contents['module.js']);
    injectCSS(data.contents['module.css']);
  }

  button.addEventListener('click', requestLoginModule, false);

})(window, document);