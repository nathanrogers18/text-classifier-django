// Script depends on loading cookie.js first
$('.btn-danger').click(function(e) {
    $.ajax({
        url: '../api/classifier/' + e.target.value + '/',
        type: 'PATCH',
        data: {
            is_visible: false,
        },
        error: function(e) {
            console.log('Failed to remove classifier visibility');
        },
        success: function(result) {
            console.log('success!');
            window.location.reload();
            // Redirect to the index page upon success
            // window.location.replace('../');
        },
    });
});
