$('.login a').on('click', function () {
  $('.login').hide().next().show();
})


$('.register a').on('click', function () {
  $('.login').show().next().hide();
})

$('.register form').on('submit', function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: 'http://ajax.frontend.itheima.net/api/reguser',
    data: data,
    success: function(e) {
      layer.msg(e.message);
      if(e.status === 0) {
        $('.login').show().next().hide();
        $('.register form')[0].reset();
      }
    }
  })
})