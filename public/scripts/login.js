$(document).ready(function(){
  $("#login-btn").click(function () {
    $("#login-section").css('visibility', 'visible');
    $("#register-section").css('visibility', 'hidden');
  });

  $(".close").click(function() {
    $("#login-section").css('visibility', 'hidden');
    $("#register-section").css('visibility', 'hidden');
  });

  $('#signup-link').click(function(e) {
    e.preventDefault();
    $("#login-section").css('visibility', 'hidden');
    $("#register-section").css('visibility', 'visible');
  });

  $("#login-link").click(function (e) {
    e.preventDefault();
    $("#login-section").css('visibility', 'visible');
    $("#register-section").css('visibility', 'hidden');
  });

  $("#owner-login-btn").click(function (e) {
    e.preventDefault();
    $("#owner-login-form").css('visibility', 'show');
  });

  $('#login-submit').click(function(e) {
    e.preventDefault();
    let $email = $('#email').val();
    let $pass  = $('#password').val();
    $.ajax( '/roasted/login', {
      method: 'POST',
        data: {
          email: $email,
          pass: $pass
        },
      error: function() {
        $('.err-msg').slideDown();
      }, 
      success: function(data) {
        window.location.href = data.redirect;
      } 
    });
  });

  $("#register-submit").click(function (e) {
    e.preventDefault();
    let $registerEmail = $("#register-email").val();
    let $phone = $("#phone").val().replace(/\D/g, '');
    console.log($phone);
    $.ajax('/roasted/register', {
      method: 'POST',
      data: {
        email: $registerEmail,
        phone_num: $phone
      }, 
      error: function () {
        $(".err-register").slideDown();
      },
      success: function(data) {
        window.location.href = data.redirect;
      }
    });
  });


});