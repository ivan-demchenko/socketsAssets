(function (document) {
  
  function action() {
    alert('Action! The data from the form has gone');
  }

  var submitBtn = document.querySelector('#login-form #submit-btn');
  submitBtn.addEventListener('click', action, false);

})(document)