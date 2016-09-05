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




$delete_classifier = $('#delete_classifier');

$delete_classifier.click(function() {
    // Send PATCH request, make classifier invisible
    $.ajax({
    url: '../api/classifier/' +  window.location.href.split('/').pop() + '/',
    type: 'PATCH',
    data: {
        is_visible: false,
        'csrfmiddlewaretoken': document.cookie.match(/csrftoken=(\w*)/)[1],
    },
    error: function(e) {
         console.log('Failed to remove classifier visibility');
     },
    success: function(result) {
        console.log('success!');
        // Redirect to the index page upon success
        window.location.replace('../');
    },
});

    // Notify user that deletion was successful
    // Send user back to index page
});
