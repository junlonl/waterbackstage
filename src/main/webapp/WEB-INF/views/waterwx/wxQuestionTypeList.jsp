<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="org.apache.shiro.web.filter.authc.FormAuthenticationFilter"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="X-UA-Compatible" content="IE=9">
	<script type="text/javascript" src="../assets/jquery-1.12.2.min.js"></script>
	<script type="text/javascript" src="../assets/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/admin/common.js"></script>
	<link rel="stylesheet" href="${ctx}/css/thePage.css" />
	<script src="${ctx}/assets/metisMenu/metisMenu.min.js"></script>
	<script type="text/javascript" src="${ctx}/assets/datatables/1.10.10/jquery.dataTables.min.js" ></script>
	<script type="text/javascript" src="${ctx}/assets/datatables/1.10.10/dataTables.bootstrap.min.js" ></script>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=WPoOm3CViGGFjSZDkE2TPwsc"></script>
	<link rel="stylesheet" href="${ctx}/assets/datatables/1.10.10/dataTables.bootstrap.min.css" />
	<link href="../assets/bootstrap/bootstrap.min.css" type="text/css" rel="stylesheet" />
	 	<!--[if lt IE 9]>
	  		<script type='text/javascript' src="${ctx}/assets/bootstrap/respond.min.js"></script>
	  		<script type='text/javascript' src="${ctx}/assets/bootstrap/html5shiv.min.js"></script>
		<![endif]-->
	<style>
		.yl{cursor:pointer;}
		.yl:hover{color:#0000ff;}
		td{padding-left:50px;}
		th{padding-left:50px;}
	</style>
	 <script type="text/javascript">
	 var lengthCoast = "";
	 var riverlength = "";
			   $(function() {  
				   var applyTable = $('#apply_table').DataTable({
						processing: true,
					    serverSide: true,
					    lengthChange:false,
						paging: true,
					    searching:false,
					    ordering: false,
						info:false,
				   	 	ajax: {
				   	 			url : "${ctx}/wxQuestion/searchAllWx",
								type:'post',
								data:{}
							},
						columns:[
							{'data': 'id',
								'render':function(data){
									return "<input type='checkbox' id='" + data +"' name='qtype' value='" + data +"'>";
								}
				       		},
							{'data':'title'}
						]
					});
					// 全选方法
			   		$('#checkAll').on('click', function() {
			   	   		$("input[name='qtype']").prop('checked', $(this).prop('checked'));
			   	   	});
			     	
			   		// 新增操作
			   		$('#btn_add').on('click', function() { 
			   			// 清空所有的input
			   			$('#dictForm input').val("");
			   			
			   			$('#myModalLabel').text('新增无效投诉分类');		// 修改label
			   			$("#dictUpdate").modal('toggle');
			   			
			   			// 更换Action位置
			   			/* $('#dictForm').attr('action', '${ctx}/saveApp'); */
			   			
			   		});
			   		
			   		
			 
			   		// 修改操作
			   		$('#btn_modify').on('click', function() {
			   			// 判断表格中是否有行被选中
			   			var appname;
			   			var check = $("input[name='qtype']").attr("checked");
			   			var num = 0;
			   			$('input[name="qtype"]').each(function(i) {
			   				if ($(this).prop('checked')) {
			   					appname = $(this).attr('value');
			   					num++;
			   					$.ajax({
									type : "POST",
									url : "${ctx}/wxQuestion/findById",
									dataType:"json",
									data :  {id:appname}, 
									success : function(data) {
										$("#id").val(data.id);
										$("#title").text(data.title);
										$("#content").text(data.content);
									}
								});
			   					return;
			   				}
			   			});
			   			if(num>1){
			   				alert("请只选择一条需要修改的数据！");
			   				return;
			   			}
			   			if (appname == null) {
			   				alert("请选择一条需要修改的数据！");
			   				return;
			   			}
			   			
			   			$('#myModalLabel').text('修改河道信息');		// 修改label
			   			$("#dictUpdate").modal('toggle');
			   		});
			   		
			   		// 删除操作
			   		$('#btn_del').on('click', function() {
			   			// 判断表格中是否有行被选中
			   			var appname;
			   			
			   			$('input[name="qtype"]').each(function(i) {
			   				if ($(this).prop('checked')) {
			   					appname += $(this).attr('value') + ";";
			   				}
			   			});
			   			
			   			if (appname == null) {
			   				alert("请选择一条需要删除的数据！");
			   				return;
			   			}
			   			else {
			   				if (confirm("确认删除选中的无效投诉分类？")) {
			   				 $.ajax({
									type : "POST",
									url : "${ctx}/wxQuestion/deleteWx",
									data :  {id:appname}, 
									success : function(data) {
											alert("删除成功");
										$("#dictUpdate").modal('toggle');
											window.location.reload();
									}
								});
			   				}
			   				
			   			}
			   		});
			   });
			   function save(){
				   var id = $("#id").val();
				   var title = $("#title").val();
				   var content = $("#content").val();
		   			if (confirm("确认保存？")) {
		   				
		   			 $.ajax({
							type : "POST",
							url : "${ctx}/wxQuestion/saveWx",
							data :  {id:id,title:title,content:content}, 
							success : function(data) {
								$("#dictUpdate").modal('toggle');
									alert("保存成功");
									window.location.reload();
							}
						});
		   				

		   	      } else {

		   	           return false;

		   	      }
		   		}
		   		
	</script> 
</head>
<body style="text-align:center;">

<div id="wrapper">
		<!-- 回到最顶端的按钮 -->
		<div id="scrollpoint" class="hidden">
			<a class="goup" href="#"> <i class="fa fa-angle-up fa-3x"></i>
			</a>
		</div>
		<!-- top nav -->
		<jsp:include page="../admin/inc/nav_top.jsp"></jsp:include>
				<div class="clearfix">
    		<aside class="sidebar" style="width:200px;">
     			 <nav class="sidebar-nav" id="left_menu_bar">
     			 </nav>
    		</aside>
    		<section class="content">
		      <div id="showspace">
							<div class="col-lg-12">
								<div class="panel panel-info ">
									<div class="panel-heading">无效投诉分类信息</div>
										<div class="panel-body">
											<div class="row">
                                    <div class="col-sm-3" style="margin-left: 0px; margin-bottom: 5px">
                                        
                                    </div>
                                    <div class="col-sm-9 text-right" style="margin-bottom: 5px">
                                        <div class="btn-group">
                                            <button class="btn btn-default" id="btn_add" type="button">
                                                <i class="fa fa-plus"></i> 新增
                                            </button>
                                            <button class="btn btn-default " id="btn_modify" type="button">
                                                <i class="fa fa-pencil"></i> 修改
                                            </button>
                                          <button class="btn btn-default" id="btn_del" type="button" data-toggle="tooltip"
                                                    data-placement="right" title="删除">
                                                <i class="fa fa-minus"></i> 删除 
                                            </button>
                                        </div>
                                </div>
										</div>
								<!--search -->
								<!-- data table -->
								<table class="table table-hover table-striped table-bordered" id="apply_table">
									<thead>
										<tr class="123">
											<th>全选<input type='checkbox' id="checkAll" name='checkAll' value=""></th>
											<th>无效投诉标题</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
								<!-- data table end-->
                                 
							</div>
						</div>
					</div>
				</div>
			<!--Modal-->
    <div class="modal fade" id="dictUpdate" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="true" >
        <div class="modal-dialog" style="width:700px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close"
                            data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        	无效投诉分类详细信息
                    </h4>
                </div>
                <div class="modal-body col-lg-12">
                    <form id="dictForm" role="form" method="post">
                    	<input type="hidden" name="id" id="id">
                    	<div class="form-group col-lg-12">
                            <label for="app_appname" class=" col-lg-2">无效投诉标题</label>
                            <textarea id="title" rows="5" class="col-lg-10"></textarea>
                        </div>
                        <div class="form-group col-lg-12">
                            <label for="app_appname" class=" col-lg-2">无效投诉内容</label>
                             <textarea id="content" rows="10" class="col-lg-10"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"
                            data-dismiss="modal">关闭
                    </button>
                    <button type="button" id="btn_save" class="btn btn-primary" onclick="save();">
                        	保存
                    </button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
        </div>
    	</section>
    	</div>
</div>
</body>
</html>
