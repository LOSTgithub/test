
let form = layui.form;

// -------------------------  获取所有的类别，通过模板引擎渲染到页面中 ------------------------
function renderCategory () {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            if (res.status === 0) {
                // 使用模板引擎渲染
                // let htmlStr = template('模板id', 对象形式的数据);
                let htmlStr = template('tpl-list', res);
                // 把组合（模板和数据组合好的结果）好的结果放到 tbody 中
                $('tbody').html(htmlStr);
            }
        }
    });
}
renderCategory();



// -------------------------  添加 --- 点击添加类别出现弹层 ------------------------
let addIndex;
$('button:contains("添加类别")').on('click', function () {

    // 通过jquery，找到模板
    // console.log(  $('#tpl-add').html()  );

    addIndex = layer.open({
        type: 1,
        title: '添加类别',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    });
});

// 必须以事件委托的方式注册事件
$('body').on('submit', '#add-form', function (e) {
    e.preventDefault();
    // console.log('/my/article/addcates')
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(), // 一定要检查表单元素的name属性值
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                renderCategory();
                layer.close(addIndex);
            }
        }
    });
})



// -------------------------  编辑 --- 点击编辑按钮出现弹层 ------------------------
// 换成用事件委托的方式注册事件
$('tbody').on('click', 'button:contains("编辑")', function () {
    // 获取事件源的三个自定义属性（data-id/name/alias）
    let data = $(this).data(); // data() 方法，不传递参数，获取的是元素的全部 data-xxx 属性
    // console.log(data); // {alias: "勿修改", name: "最新", id: 1}
    // 必须等弹层出来之后，然后在设置输入框的默认值
    layer.open({
        type: 1,
        title: '编辑类别',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px'],
        // 弹层之后，执行下面的success函数；在函数中，完成数据回填
        success: function () {
            form.val('abcd', data);
            console.log(form.val('abcd',data))
        }
    });
});





// -------------------------  删除 --------------------------------------------
// 必须使用事件委托的方式，注册单击事件
$('tbody').on('click', 'button:contains("删除")', function () {
    // 获取分类的id
    let id = $(this).data('id'); // data方法，是jquery封装的方法，专门用于获取元素的 data-xxx 属性值
    // console.log(id);

    layer.confirm("你确定删除吗？", function (index) {
        // 点击了确定，执行这里的代码
        // console.log(123)
        $.ajax({
            // url: '/my/article/deletecate/:id', // 只需要把 :id 换成 真实的id值即可
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                layer.msg(res.message);
                if (res.status === 0) {
                    renderCategory(); // 删除成功，重新渲染页面
                }
            }
        });
        layer.close(index);
    });
})