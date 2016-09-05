$trainer = $('#trainer');
$availableTags = $trainer.attr('availtags').split(" ");
$trainer.autocomplete({
      source: $availableTags
    });

$('input').keypress(function (e) {
  if (e.which == 13) {
    $('form#trainerForm').submit();
    return false;
  }
});
