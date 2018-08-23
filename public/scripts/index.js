$(() => {
  $.ajax({
    method: "GET",
    url: "/api/roasted"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
