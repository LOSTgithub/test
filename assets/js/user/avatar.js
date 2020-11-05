// ---------------  创建剪裁区 ------------------
// - 找到剪裁区的图片 （img#image）
var $image = $('#image');
// - 设置配置项
var option = {
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
};
// - 调用cropper方法，创建剪裁区
$image.cropper(option);

// 点击上传 选择图片
$('button:contains("上传")').on('click',function () {
  $('#file').trigger('click');
})
  

// 选择图片 更换裁剪区的图片
$('#file').on('change', function () {
  let fileObj = this.files[0];
  let url = URL.createObjectURL(fileObj);
  $image.cropper('destroy').attr('src',url).cropper(option);
})

// 点击确定按钮 剪裁并更换图片

$('button:contains("确定")').on('click', function () {
  // 先剪裁 得到图片
  let canvas = $image.cropper('getCroppedCanvas', {
    width: 100,
    height: 100
  });
  // 把剪裁完后的图片,转成64格式图片
  let base64 = canvas.toDataURL('image/png')

  $.ajax({
    type: 'post',
    url: '/my/update/avatar',
    data: {
      avatar: base64
    },
    success: function (e) {
      layer.msg(e.message);
      window.parent.getAjax();
    }
  })
})