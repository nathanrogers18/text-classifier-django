function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$selector = $('#sel1')

$selector.change(function(){
  this.form.submit();
})

$createClassifier = $('#createClassifier')
$createClassifier.click(function(){
  $name = $("input[name='classifier_name']").val()
  $user = $("#userID").val()
  $.ajax({
    method: 'POST',
    url:'/api/classifier/',
    data: {'name': $name,
           'user': $user,
           'is_visible': true},
    success: function() {
      console.log("WOW");
      $('#myModal').modal('hide');
    }
  })
})
