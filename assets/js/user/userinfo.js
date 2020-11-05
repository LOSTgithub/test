let form = layui.form;

function renderUser () {
  $.ajax({
    url: '/my/userinfo',
    success: function (e) {
      form.val('callB', e.data)
    }
  })
}

renderUser ()

$('form').on('submit', function (e) {
  e.preventDefault();
  let data = $(this).serialize()
  // console.log(result)
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: data,
    success: function (e) {
      layer.msg(e.message)
      window.parent.getAjax();
    },
  })
})

$('button:contains("重置")').on('click', function (e) {
  // 阻止默认行为，就是不让表单清空
  e.preventDefault();
  // 恢复原来的数据。相当于重新进行数据回填
  renderUser();
})