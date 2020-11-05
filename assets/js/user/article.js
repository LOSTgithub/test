var data = {
  pagenum: 1, // 页码值
  pagesize: 2, // 每页显示多少条
  // cate_id: ,
  // state: ,
};

function renderArticle () {
  $.ajax({
    url: '/my/article/list',
    data: {
      pagenum: 1,
      pagesize: 2
    },
    success: function (res) {
      console.log(res)
      let htmlStr = template('tel-list', res)
      $('tbody').html(htmlStr)
      showPage(res.total)
    }
  })
}

renderArticle()
var laypage = layui.laypage;
  function showPage (t) {
      laypage = layui.laypage;
      laypage.render({
      elem: 'page',
      count: t, //数据总数，从服务端得到
      limit: data.pagesize,
      limits: [2, 3, 4, 5],
      layout: ['limit', 'prev', 'page', 'next', 'count', 'skip'],
      curr: data.pagenum,  // 起始页
      jump: function(obj, first){
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        
        //首次不执行
        if (!first) {
          data.pagenum = obj.curr;
          data.pagesize = obj.limit;
          renderArticle();
        }        
      }
    })
  }
