var lengthCoast = "";
var riverlength = "";
$(function() {  
	loadRole();//根据权限加载行政区域
	loadDict("grade");//加载河道等级字典
	var data={};
	var area=$("#hide_area").val();
	var role=$("#hide_role").val();
	if(role=="areamanager"){
		data={area:area};
	}
	var applyTable = $('#apply_table').DataTable({
		processing: true,
		serverSide: true,
		lengthChange:false,
		paging: true,
		searching:false,
		ordering: false,
		info:false,
		ajax: {
			url : "../response/searchAllResponse",
			type:'post',
			data:data
		},
		columns:[
		         {'data': 'id',
		        	 'render':function(data){
		        		 return "<input type='checkbox' id='" + data +"' name='qtype' value='" + data +"'>";
		        	 }
		         },
		         {'data':'riverCode'},
		         {'data':'riverName'},
		         {'data':'leftRight'},
		         {'data':'partName'},
		         {'data':'distMgrName'},
		         {'data':'streetMgrName'},	
		         {'data':'villageMgrName'},
		         {'data':'id',
		        	 'render':function(data){
		        		 return '<a href="#" onclick="showResponseInfo(\''+data+'\');">查看详情</a>';
		        	 }
		         }
		        
		         ]
	});
	$('#searchBtn').on('click',function(){
		var area = $("#areaSearch").val();
		var grade = $("#gradeSearch").val();
		var river = $("#riverSearch").val();
		var status;
		if(grade == "重要河道"){
			status="1";
		}else if(grade == '一般河道'){
			status="2";
		}
		var param={
				area:area,
				grade:status,
				river:river
		}
		applyTable.settings()[0].ajax.data=param;
		applyTable.ajax.reload();
	});
	
	//TODO
	$('#btn_upload').on('click',function(){
		$("#dataUpload").modal('toggle');
	});
	
	$('#uploadXlsFile').change(function(){
		var importFileName=$("#uploadXlsFile").val();
	    if(importFileName=="" ||importFileName==null ){
		   alert("文件不能为空，请选择文件!");
		   return false;
		}else{
			var d1=/\.[^\.]+$/.exec(importFileName);  
			 if(d1==".xls"){  
				 var formData = new FormData($("#upload_form")[0]);
				 //$('#importForm').attr('action', '${ctx}/main/importExcel1');
				// $('#importForm').submit(); 
				   $.ajax({
						type : "POST",
						url : "../response/upload",
						cache: false,
						async: true,
						contentType: false,  
				        processData: false, 
						data :  formData, 
						dataType : "json",
						success : function(data) {
							if(data == true){
								$("#dataUpload").modal('toggle');
								$("#uploadXlsFile").val('');
								applyTable.ajax.reload();
								//window.location.href="${ctx}/main/serviceList1?appname="+appname;
							} else {
								alert("产品名称与导入文件中产品不相同，导入失败");
							}
						},
						error:function(data){
							alert("文件导入失败！");
						}
					});	   
			 }else{
				 alert("文件格式不对，请选择xls格式文件！");  
			 }
			}
	});
	
	
	
	// 全选方法
	$('#checkAll').on('click', function() {
		$("input[name='qtype']").prop('checked', $(this).prop('checked'));
	});

	// 新增操作
	$('#btn_add').on('click', function() { 
		// 清空所有的input
		$('#dictForm input').val("");

		$('#myModalLabel').text('新增河涌');		// 修改label
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
					url : "../response/findById",
					data :  {id:appname}, 
					success : function(data) {
						var resp = data.resp;
						var river = data.river;
						console.log(resp.resp);
						$("#respid").val(resp.id);
						$("#riverid").val(river.id);
						$("#riverCode").val(resp.riverCode);
						$("#riverName").val(resp.riverName);
						$("#leftRight").val(resp.leftRight);
						$("#partName").val(resp.partName);
						$("#distMgrName").val(resp.distMgrName);
						$("#distMgrOrg").val(resp.distMgrOrg);
						$("#distMgrTel").val(resp.distMgrTel);
						$("#distMgrPosition").val(resp.distMgrPosition);
						$("#streetMgrName").val(resp.streetMgrName);
						$("#streetMgrOrg").val(resp.streetMgrOrg);
						$("#streetMgrTel").val(resp.streetMgrTel);
						$("#streetMgrPosition").val(resp.streetMgrPosition);
						$("#villageMgrName").val(resp.villageMgrName);
						$("#villageMgrOrg").val(resp.villageMgrOrg);
						$("#villageMgrTel").val(resp.villageMgrTel);
						$("#villageMgrPosition").val(resp.villageMgrPosition);
						$("#manageMgrName").val(resp.manageMgrName);
						$("#manageMgrOrg").val(resp.manageMgrOrg);
						$("#manageMgrTel").val(resp.manageMgrTel);
						$("#manageMgrPosition").val(resp.manageMgrPosition);
						$("#area1").val(river.area);
						if(river.grade == 1){
							$("#grade1").val("重要河道");
						}else if(river.grade == 2){
							$("#grade1").val("一般河道");
						}else{
							$("#grade1").val(river.grade);
						}
						$("#length").val(river.length);
						$("#width").val(river.width);
						$("#coverArea").val(river.coverArea);
						$("#start").val(river.start);
						$("#end").val(river.end);
						$("#remark").val(river.remark);
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
			if (confirm("确认删除选中的河道！？")) {
				$.ajax({
					type : "POST",
					url : "../response/deleteResponse",
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
	var grade = $("#grade1").val();
	var area = $("#area1").val();
	if(grade == "重要河道"){
		grade = "1";
	}else if(grade == "一般河道"){
		grade = "2";
	}else{
		grade = "3";
	}
	$("#grade").val(grade);
	$("#area").val(area);
	if (confirm("确认保存？")) {
		$.ajax({
			type : "POST",
			url : "../response/saveResponse",
			data :  $("#dictForm").serialize(), 
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
//加载行政区域
function loadDict(dict){
	var requestData = {};
	var opt = "";
	var search = "";
	if(dict == "area"){
		requestData = {dict:'area'};
		opt = "area1";
		search = "areaSearch";
	}else{
		requestData = {dict:'grade'};
		opt = "grade1";
		search = "gradeSearch";
	}
	$.ajax({
		type:'post',
		url : "../response/findDict",
		data :  requestData, 
		dataType : "json",
		success:function(data){
			$("#"+opt).empty().append("<option></option>");
			$("#"+search).empty().append("<option></option>");
			$.each(data, function(i, value){
				$("#"+opt).append("<option>"+value.name+"</option>");
				$("#"+search).append("<option>"+value.name+"</option>");
			});
		}
	});
}

function loadRole(){
	var area=$("#hide_area").val();
	var role=$("#hide_role").val();
	if(role==null||role==''||role!="areamanager"){
		loadDict("area");
	}else{
		$("#area1").append("<option>"+area+"</option>");
		$("#areaSearch").append("<option>"+area+"</option>");
		$('#dictForm input').val("");
		$('#area').val(area);
	}
	
}

function showResponseInfo(id){
	$("#dictInfo").modal('toggle');
	
	$.ajax({
		type : "POST",
		url : "../response/findById",
		data :  {'id':id}, 
		success : function(data) {
			var resp = data.resp;
			var river = data.river;
			console.info(resp);
			$("#info_riverCode").html(resp.riverCode);
			$("#info_riverName").html(resp.riverName);
			$("#info_leftRight").html(resp.leftRight);
			$("#info_partName").html(resp.partName);
			$("#info_distMgrName").html(resp.distMgrName);
			$("#info_distMgrOrg").html(resp.distMgrOrg);
			$("#info_distMgrTel").html(resp.distMgrTel);
			$("#info_distMgrPosition").html(resp.distMgrPosition);
			$("#info_streetMgrName").html(resp.streetMgrName);
			$("#info_streetMgrOrg").html(resp.streetMgrOrg);
			$("#info_streetMgrTel").html(resp.streetMgrTel);
			$("#info_streetMgrPosition").html(resp.streetMgrPosition);
			$("#info_villageMgrName").html(resp.villageMgrName);
			$("#info_villageMgrOrg").html(resp.villageMgrOrg);
			$("#info_villageMgrTel").html(resp.villageMgrTel);
			$("#info_villageMgrPosition").html(resp.villageMgrPosition);
			$("#info_manageMgrName").html(resp.manageMgrName);
			$("#info_manageMgrOrg").html(resp.manageMgrOrg);
			$("#info_manageMgrTel").html(resp.manageMgrTel);
			$("#info_manageMgrPosition").html(resp.manageMgrPosition);
			$("#info_coverArea").html(resp.coverArea);
			$("#info_remark").html(resp.remark);
			$("#info_area").html(river.area);
			$("#info_length").html(river.length);
			$("#info_width").html(river.width);
			$("#info_start").html(river.start);
			$("#info_end").html(river.end);

		}
	});
}

