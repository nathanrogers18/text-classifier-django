$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
    $('.nav-tabs a').on('show.bs.tab');
    $('.nav-tabs a').on('shown.bs.tab');
    $('.nav-tabs a').on('hide.bs.tab');
    $('.nav-tabs a').on('hidden.bs.tab');
});

$trainer = $('#trainer')
$availableTags = $trainer.attr('availtags').split(" ")
$trainer.autocomplete({
      source: $availableTags
    });
