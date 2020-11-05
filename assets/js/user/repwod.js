let form = layui.form;

form.verify({
  len: [/^\S{6,12}$/,"密码长度是6位,不能有空格"],
  diff: function (val) {
    let oldPwd = $('input[name=oldPwd]').val();
    if(oldPwd === val);
    return "新密码不能和旧密码相同"
  },
  same: function (val) {
    let newPwd = $('input[name=newPwd]').val();
    if(newPwd !== val) {
      return '两次密码不一致'
    }
  }
})

$('form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            // 成功/失败的提示
            layer.msg(res.message);
            if (res.status === 0) {
                $('form')[0].reset();
            }
        }
    })
})