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
    url: '/api/reguser',
    data: data,
    success: function(e) {
      layer.msg(e.message);
      if(e.status === 0) {
        console.log(e)
        $('.login').show().next().hide();
        $('.register form')[0].reset();
      }
    }
  })
})


let form = layui.form;

form.verify({
  changdu: [/^\S{6,12}$/, '长度6~12位，不能有空格'],

  same: function (val) {
      var pwd = $('.pwd').val();

      if (pwd !== val) return '两次密码不一致哟~';
  }

});


// 表单登陆功能
$('.login form').on('submit', function (e) {
  e.preventDefault();
  let data = $(this).serialize();

  console.log('123')
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data: data,
    success: function(e) {
      layer.msg(e.message);
      console.log(e)
      if(e.status === 0) {
        localStorage.setItem('token', e.token)
        location.href = '/index.html'
      }
    }
  })
})