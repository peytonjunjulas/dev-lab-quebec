
$(".delete").click(function(){
  console.log("delete buttong clicked");
  var id = $(this).attr("id");
  
  fetch(`players/player_id:${id}`, {
    method:"delete",
    headers: {'Content-Type': 'applications/json'}
  })

})

$(".update").click(function(){
  console.log("update button clicked");
  var id2 = $(this).attr("id");

  fetch(`players/player_id:${id2}`, {
    method: "put",
    header: {'Content-Type': 'applications/json'}
  })

})