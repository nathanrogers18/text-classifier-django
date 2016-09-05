// Script depends on loading cookie.js first

var $delete_classifier = $('#delete_classifier');

$delete_classifier.click(function() {
    // Send PATCH request, make classifier invisible
    $.ajax({
        url: '../api/classifier/' + window.location.href.split('/').pop() + '/',
        type: 'PATCH',
        data: {
            is_visible: false,
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
});
