$(document).ready(function(){
  $(".new_item_button").click(function(event){
    event.preventDefault();
    const name = $(this).siblings("#item_name").val();
    const description = $(this).siblings("#item_description").val();
    const type = $(this).siblings("#item_type").val();
    const price = $(this).siblings("#item_price").val();
    const time = $(this).siblings("#item_estimated_time").val();
    const image = $(this).siblings("#item_image").val();

    console.log("time", time);

    $.ajax({
      type: "POST",
      url: "/roasted/owner/addItem",
      data:{
        name,
        description,
        type,
        price,
        estimated_time: time,
        image
      },
      success: function(item){
        console.log("POST SUCCESS");
        console.log(item);
        $("#show_name").text(item.name);
        $("#show_description").text(item.description);
        $("#show_type").text(item.type);
        $("#show_price").text(item.price);
        $("#show_time").text(item.order_time_estimate);
        $(".new_item_summary_container").slideDown();
      }
    })
    .done();
  });
});
