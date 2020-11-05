
function getAjax () {
  $.ajax({
    url: '/my/userinfo',
    success: function (e) {
      if(e.status === 0) {
        // 设置名字及
        let name = e.data.nickname || e.data.username;
        $('.username').text(name);
        // 设置头像
        if(e.data.user_pic) {
          $('.layui-nav-img').attr('src', e.data.user_pic).show();
          // $('.text-heard').hide()
        } else {
          let first = name.substr(0, 1).toUpperCase();
          $('.text-heard').text(first).css('display', 'inline-block');
        }
      }
    }
  })
}
getAjax()

$('.sign_out').on('click', function () {
  layer.confirm('你确定要退出吗', function (index) {
    localStorage.removeItem('token')
    location.href = '/login.html'
    layer.close(index);
  })
})