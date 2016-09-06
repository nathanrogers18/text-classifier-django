// Script depends on loading cookie.js first

$selector = $('#sel1');

$selector.change(function(){
  this.form.submit();
});

$createClassifier = $('#createClassifier');
$createClassifier.click(function(){
  $name = $("input[name='classifier_name']").val();
  $user = $("#userID").val();
  $.ajax({
    method: 'POST',
    url:'/api/classifier/',
    data: {'name': $name,
           'user': $user,
           'is_visible': true},
    success: function() {
      console.log("WOW");
<<<<<<< HEAD
      $('#myModal').modal('hide');
=======
>>>>>>> 1d0e73c694c63d8d38f58f88ea62dffcdb5086dc
    }
});
});
