let form = layui.form;


// 调用函数，使用富文本编辑器
initEditor();

$.ajax({
  url: '/my/article/cates',
  success: function (res) {
      // console.log(res)
      let htmlStr = template('tpl-category', res);
      $('select[name=cate_id]').html(htmlStr);
      // 动态生成了下拉框的选项，要更新渲染
      form.render('select');
  }
});


// -------------- 封面图片的处理 ---------------
$image = $('#image');

let options = {
    // 宽高比
    aspectRatio: 400 / 280,
    // 指定预览器
    preview: '.img-preview'
};

$image.cropper(options);


// 点击按钮，触发文件域的单击事件
$('button:contains("选择封面")').on('click', function () {
  $('#file').trigger('click');
})


// 当文件域的内容改变的时候，更换预览区的图片
$('#file').on('change', function () {
  let fileObj = this.files[0];
  let url = URL.createObjectURL(fileObj);
  // 销毁原来的剪裁区 --> 更换图片 --> 重新生成剪裁区
  $image.cropper('destroy').attr('src', url).cropper(options);
})


// -------------------------------  添加文章 ----------------------------
// 表单提交 ，阻止默认行为 ，收集表单中的数据， ajax提交给接口
$('#add-form').on('submit', function (e) {
  e.preventDefault();

  // 通过FormData收集表单中的数据
  let fd = new FormData(this); // 参数为表单的DOM对象
  // 不要使用append，要使用set来更换原来的content
  fd.set('content', tinyMCE.activeEditor.getContent());
  // 剪裁图片
  let canvas = $image.cropper('getCroppedCanvas', {
      width: 400,
      height: 280
  });
  // 把canvas对象，转成
  canvas.toBlob(function (blob) {
      // 向FormData对象中，追加 cover_img
      fd.append('cover_img', blob);

      // 通过遍历fd，检查fd对象中有哪些值
      // fd.forEach((value, key) => {
      //     console.log(key, value);
      // })

      // return;
      $.ajax({
          type: 'POST',
          url: '/my/article/add',
          data: fd,
          // 提交FormData对象，下面两个选项必填。
          processData: false,
          contentType: false,
          success: function (res) {
              layer.msg(res.message);
              if (res.status === 0) {
                  // 成功后，跳转到文章列表页
                  location.href = '/article/article.html';
              }
          }
      });
  });
})