$(document).ready(function(){
  $("#login-btn").click(function () {
    $(".modal").toggleClass('show');
    // alert("Login button has been clicked");
  });

  $(".close").click(function() {
    $(".modal").removeClass("show");
  });
});