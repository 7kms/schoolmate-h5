(function () {
  let oXMLHttpRequest = window.XMLHttpRequest;
  function cXMLHttpRequest() {
    return new oXMLHttpRequest;
  }
  cXMLHttpRequest.prototype.withCredentials = true;
  window.XMLHttpRequest  = cXMLHttpRequest;
})();

// export default