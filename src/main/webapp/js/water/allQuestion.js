var lengthCoast = "";
var riverlength = "";
var streetName = "";
var leftRigth = "";
var partName = "";
var rivervalue = "";//投诉受理河道值
var lrvalue = "";//受理投诉左右岸值
var reachvalue = "";//受理投诉河段值
var areapersonname = "";//区级河长
var streetpersonname = "";//街镇河长
var villagepersonname = "";//村级河长
$(function() {  
	var menu = $("#menu").val();
	//日期时间控件
	$("#search_startTime,#search_endTime").datetimepicker({
		language: 'zh-CN',
		//minView: 2,
		format: "yyyy-MM-dd HH:mm:ss",
		autoclose: true,
		todayBtn: true
	});
	$("#river").comboSelect();
	$("#river").find("option").attr("style","display:none");
	$("#coast").comboSelect();	
	$("#reach").comboSelect();	
	//投诉信息列表
	var applyTable = $('#apply_table').DataTable({
		processing: true,
		serverSide: true,
		lengthChange:false,
		paging: true,
		searching:false,
		ordering: false,
		retrieve:true,
		destroy:true,
		info:false,
		ajax: {
			url : "../waterwx/searchAll",
			type:'post',
			data:{status:35}
		},
		columns:[
		         {'data': 'id',
		        	 'render':function(data){
		        		 return "<input type='checkbox' class='qTdId' id='" + data +"' name='id' value='" + data +"'>";
		        	 }
		         },
		         {'data':'code'},
		         {'data':'reachname'},
		         {'data':'questiontype'},
		         {'data':'questioncontent'},
		         {'data':'complainDate'},
		         {'data':'status',
		        	 'render': function ( data, type, full, meta ) {
		        		 if(data == '0'){
		        			 return "已回复投诉";
		        		 }else if(data == '2'){
		        			 return "<font color='#EEAD0E'>已受理投诉</font>";
		        		 }else if(data == '3'){
		        			 return "<font color='#7AC5CD'>无效投诉</font>";
		        		 }else if(data == '5'){
		        			 return "<font color=''>完结投诉</font>";
		        		 }else{
		        			 return "<font color='#FF0000'>待受理投诉</font>";
		        		 }
		        	 }
		         },
		         {'data':'iscross',
		        	 'render': function ( data, type, full, meta ) {
		        		 if(data == '0'){
		        			 return "是";
		        		 }else{
		        			 return "否";
		        		 }
		        	 }
		         },
		         {'data': 'id',
		        	 'render': function ( data, type, full, meta ) {
		        		 return "<p class='yl look' onclick=\"look('"+data+"');\">查看投诉</p>";
		        		 }
		         }
		         ]
	});
	//查询条件的投诉信息列表
	$('#manageSearchBtn').on('click',function(){
		var code = $("#search_code").val();
		var qtype = $("#qtype").val();
		var isCross = $("#iscross").val();
		var search_startTime = $('#search_startTime').val();
		var area = $("#area").val();
		var search_endTime = $('#search_endTime').val();
		var statu = $("#status").val();
		var iscross;
		if(isCross == "是"){
			iscross="0";
		}else{
			iscross = "1";//未选择类型
		}
		var status;
		if(statu == "已回复投诉"){
			status=0;
		}else if(statu == '已受理投诉'){
			status=2;
		}else if(statu == '无效投诉'){
			status = 3;
		}else if(statu == '待受理投诉'){
			status = 1;
		}else if(statu == '完结投诉'){
			status = 5;
		}else{
			status = 4;//未选择类型
		}
		var river = $("#river").val();
		var coast = $("#coast").val();
		var reach = $("#reach").val();
		var param={
				code:code,
				questiontype:qtype,
				status:status,
				reachname:river,
				leftRight:coast,
				partName:reach,
				area:area,
				iscross:iscross,
				startTime:search_startTime,
				endTime:search_endTime
		}
		applyTable.settings()[0].ajax.data=param;
		applyTable.ajax.reload();
	});
	//问题类型
	$.ajax({
		type : "POST",
		url : "../waterwx/getquestiontype",
		data :  {}, 
		dataType : "json",
		async:false,
		success : function(data) {
			$("#qtype").empty().append("<option>请选择</option>");
			$.each(data, function(i, value){
				$("#qtype").append("<option >"+value.detail+"</option>");
				$("#selecttype11").append("<option >"+value.detail+"</option>");
			});

		}

	});
	//保存选择的问题类型
	$("#selecttype11").on("change",  function (obj){
		//var type = obj.text;
		$("#questiontype1").val($("#selecttype11").val());
	});

	var length="";
	
	//初始化页面加载地区下拉框
	loadArea();
	//riverClick("","river");
	$("#area").on("change",function(){
		var area = $(this).val();
		loadRiver(area,"river");
	}); 
	$("#river").on("change",function(){
		var area = $("#area").val();
		var river = $("#river").val();
		loadCoastAndReach(area,river,"coast");
	});
	$("#coast").on("change",function(){
		var area = $("#area").val();
		var river = $("#river").val();
		var coast = $("#coast").val();
		loadReach(area,river,coast,"reach");
	});
	$("#river").on("click",function(e){
		$("#river").find("option").attr("style","display:none");
	});
	$("#river1").on("click",function(e){
		$("#river1").find("option").attr("style","display:none");
	});
	$("#coast").on("click",function(e){
		$("#coast").find("option").attr("style","display:none");
	});
	$("#coast1").on("click",function(e){
		$("#coast1").find("option").attr("style","display:none");
	});
	$("#reach").on("click",function(e){
		$("#reach").find("option").attr("style","display:none");
	});
	$("#reach1").on("click",function(e){
		$("#reach1").find("option").attr("style","display:none");
	});

	$('#imgShow').on('hide.bs.modal', function () {
		setTimeout(function(){
			$("body").attr("style","text-align:center;");
		}, 500);

	});
});
//完结功能
function end(qId){
	$.ajax({
		type : 'post',
		data : {qId:qId},
		url : "../waterwx/endQuestion",
		success : function(data) {
			if(data == "succ"){
				alert("操作成功！");
				window.location.reload();
			}else{
				alert("操作失败");
			}

		},
		error:function(e){
			alert("error")	;
		}
	}); 
}
//查看投诉
function look(qId){
	$("#lookQuestion").modal('toggle');
	//回复信息
	$.ajax({
		type:'post',
		data:{'questionId':qId},
		url : "../complain/searchAllAnswer",
		success : function(data) {
			var tbody = "";
			$.each(data,function(i,value){
				var tr = "<tr>";
				var username = value.username;
				var content = value.answercontent;
				if(username == "null" || username == null || username == ""){
					username = " ";
					content = "无效投诉";
				}
				tr += "<td>"+username+"</td>";
				tr +="<td>"+value.answerDate+"</td>";
				tr +="<td>"+content+"</td>";
				tr +="</tr>";
				tbody += tr;
			});
			$("#look_answer").find("tbody").empty().append(tbody);
		},
		error:function(e){
			alert("error")	;
		}
	}); 
	//反馈信息
	$.ajax({
		type:'post',
		data:{'qId':qId},
		url : "../complain/searchAllFeedback",
		success : function(data) {
			var tbody = "";
			$.each(data,function(i,value){
				var tr = "<tr>";
				tr += "<td>"+value.username+"</td>";
				tr +="<td>"+value.userrole+"</td>";
				tr +="<td>"+value.content+"</td>";
				tr +="</tr>";
				tbody += tr;
			});
			$("#look_feedback").find("tbody").empty().append(tbody);
		},
		error:function(e){
			alert("error")	;
		}
	}); 
	$.ajax({
		type : 'post',
		data : {'qId':qId},
		url : "../waterwx/getQuestion",
		success : function(data) {
			$("#code1").val(data.code);
			$("#lookType").text(data.questiontype);
			$("#lookPhone").text(data.phone);
			$("#lookContent").text(data.questioncontent);
			$("#lookPosition").text(data.questionposition);
			$("#lookArea").text(data.area);
			var river = data.reachname;
			if(river == null || river == "" || river == "null"){
				river = "";
			}
			var coast = data.leftRight;
			if(coast == null || coast == "" || coast == "null"){
				coast = "";
			}
			var reach = data.partName;
			if(reach == null || reach == "" || reach == "null"){
				reach = "";
			}
			$("#lookRiver").text(river+coast+reach);
			$("#id1").val(data.id);
			$("#lookAreaPerson").text(data.areaPersonName);
			$("#lookStreetPerson").text(data.streetPersonName);
			$("#lookVillagePerson").text(data.villagePersonName);
			var attchIds = data.attachIds;
			var html="";
			for(var i=0;i<attchIds.length;i++){
				html += '<img style="width:250px;height:100px;" src="../weixin/export/'+attchIds[i]+'">';
			}
			$("#imgAttchLook").empty().append(html);
			$("img").click(function(){
				var src = $(this).attr("src");
				$("#lookQuestion").modal('toggle');
				$("#imgShow").modal("toggle");
				$(".bigImg").html("<img  style='width:400px;height:350px;' src="+src+"></img>");
			});
			var x = data.x; // 经度，浮点数，范围为180 ~ -180。
			var y = data.y; // 纬度，浮点数，范围为90 ~ -90
			var ggPoint = new BMap.Point(x,y);

			//地图初始化
			var bm = new BMap.Map("allmaplook");
			bm.centerAndZoom(ggPoint, 15);
			bm.addControl(new BMap.NavigationControl());
			var location=y+","+x;
			//坐标转换完之后的回调函数
			translateCallback = function (data){
				if(data.status === 0) {
					var qsData = {'ak':"WPoOm3CViGGFjSZDkE2TPwsc",'location':data.points[0].lat+","+data.points[0].lng,'output':"json","pois":0};
					$.ajax({  
						type: "get",  
						async: false,  
						url: "http://api.map.baidu.com/geocoder/v2/",  
						dataType: "jsonp",
						data:qsData,
						success: function(data1){
							var address = data1.result.addressComponent;
							var label = address.district+address.street+address.street_number;
							var marker = new BMap.Marker(data.points[0]);
							bm.addOverlay(marker);
							var label = new BMap.Label(label,{offset:new BMap.Size(20,-10)});
							marker.setLabel(label); //添加百度label
							bm.setCenter(data.points[0]);
						},  
						error: function(){  
							alert('fail');  
						}  
					});
				}
			}

			setTimeout(function(){
				var convertor = new BMap.Convertor();
				var pointArr = [];
				pointArr.push(ggPoint);
				convertor.translate(pointArr, 1, 5, translateCallback)
			}, 1000);
		},
		error:function(e){
			alert("error")	;
		}
	}); 
	/*$("select").attr("disabled","disabled");
	$("input").attr("readOnly","readOnly");
	$(".lookClose").attr("style","display:none;");
	$("#answerlimitTime").attr("readOnly","readOnly");*/
}
//投诉受理
function tssl(qId){
	$("#dictUpdate").modal('toggle');
	$("#answerlimitTime").datetimepicker({
		language: 'zh-CN',
		format: "yyyy-MM-dd HH:mm:ss",
		startDate : new Date(), 
		autoclose: true,
		todayBtn: true
	});
	$.ajax({
		type : 'post',
		data : {'qId':qId},
		url : "../waterwx/getQuestion",
		success : function(data) {
			$("#code1").val(data.code);
			$("#selecttype11").val(data.questiontype);
			$("#questioncontent1").val(data.questioncontent);
			$("#area1").val(data.area);
			$("#phone1").val(data.phone);
			$("#questionposition").val(data.questionposition);
			var reachname = data.reachname;
			$("#id1").val(data.id);
			rivervalue = data.reachname;
			lrvalue = data.leftRight;
			reachvalue = data.partName;
			areapersonname = data.areaPersonName;
			streetpersonname = data.streetPersonName;
			villagepersonname = data.villagePersonName;
			var attchIds = data.attachIds;
			var area = $("#area1").val();
			if(area != "请选择" && area != "" && area != null){
				loadRiver(area,"river1");
				if(rivervalue != "请选择" && rivervalue !="" && rivervalue !=null){
					loadCoastAndReach(area,rivervalue,"coast1");
				}
				if(streetpersonname != "请选择" && streetpersonname !="" && streetpersonname !=null){
					getStreetPersonName(area,rivervalue);
				}
				if(villagepersonname != "请选择" && villagepersonname !="" && villagepersonname !=null){
					getVillagePerson1(area,rivervalue);
				}
			}
			$("#area1").on("change",function(){
				var areaValue = $("#area1").val();
				$("#river1").val("");
				
				loadRiver(areaValue,"river1");
				//清空左右岸以及河段input框
				$("#coast1").parent().find(".combo-input").val("");
				$("#reach1").parent().find(".combo-input").val("");
				$("#streetpersonname").val("");
				$("#villagepersonname").val("");
			});
			$("#river1").on("change",function(){
				var area = $("#area1").val();
				var river = $("#river1").val();
				loadCoastAndReach(area,river,"coast1");
			});
			$("#coast1").on("change",function(){
				var area = $("#area1").val();
				var river = $("#river1").val();
				var coast = $("#coast1").val();
				loadReach(area,river,coast,"reach1");
			});
			$("#reach1").on("change",function(){
				var area = $("#area1").val();
				var river = $("#river1").val();
				var reach = $("#reach1").val();
				 getVillagePerson(area,river,"",reach);
			});
			var html="";
			for(var i=0;i<attchIds.length;i++){
				html += '<img style="width:250px;height:100px;" src="../weixin/export/'+attchIds[i]+'">';
			}
			$("#imgAttch").empty().append(html);
			$("img").click(function(){
				var src = $(this).attr("src");
				$("#dictUpdate").modal('toggle');
				$("#imgShow").modal("toggle");
				$(".bigImg").html("<img  style='width:500px;height:350px;' src="+src+"></img>");
				//$('#imgAttch').lightBox();
				//$(this).style("height",$(this).style("height")==="100px"?"300px":"100px");
			});
			var x = data.x; // 经度，浮点数，范围为180 ~ -180。
			var y = data.y; // 纬度，浮点数，范围为90 ~ -90
			var ggPoint = new BMap.Point(x,y);

			//地图初始化
			var bm = new BMap.Map("allmap");
			bm.centerAndZoom(ggPoint, 15);
			bm.addControl(new BMap.NavigationControl());
			var location=y+","+x;
			//坐标转换完之后的回调函数
			translateCallback = function (data){
				if(data.status === 0) {
					var qsData = {'ak':"WPoOm3CViGGFjSZDkE2TPwsc",'location':data.points[0].lat+","+data.points[0].lng,'output':"json","pois":0};
					$.ajax({  
						type: "get",  
						async: false,  
						url: "http://api.map.baidu.com/geocoder/v2/",  
						dataType: "jsonp",
						data:qsData,
						success: function(data1){
							var address = data1.result.addressComponent;
							var label = address.district+address.street+address.street_number;
							var marker = new BMap.Marker(data.points[0]);
							bm.addOverlay(marker);
							var label = new BMap.Label(label,{offset:new BMap.Size(20,-10)});
							marker.setLabel(label); //添加百度label
							bm.setCenter(data.points[0]);
						},  
						error: function(){  
							alert('fail');  
						}  
					});
				}
			}

			setTimeout(function(){
				var convertor = new BMap.Convertor();
				var pointArr = [];
				pointArr.push(ggPoint);
				convertor.translate(pointArr, 1, 5, translateCallback)
			}, 1000);
		},
		error:function(e){
			alert("error")	;
		}
	}); 
}
//保存投诉受理
function saveQuestion(){
	var code = $("#code1").val();
	var content = $("#questioncontent1").val();
	$("#questiontype1").val($("#selecttype11").val());
	$("#river2").val($("#river1").val());
	$("#coast2").val($("#coast1").val());
	$("#reach2").val($("#reach1").val());
	$("#area2").val($("#area1").val());
	var type = $("#questiontype1").val();
	var river2 = $("#river2").val();
	var coast2 = $("#coast2").val();
	var reach2 = $("#reach2").val();
	var area2 = $("#area2").val();
	var id = $("#id1").val();
	var areaname = $("#areapersonname").val();
	var streetname = $("#streetpersonname").val();
	var villagename = $("#villagepersonname").val();
	var position = $("#questionposition").val();
	var limitTime = $("#answerlimitTime").val();
	$.ajax({
		type : 'post',
		data : {'type':type,'content':content,"id":id,'river2':river2,'coast2':coast2,'reach2':reach2,'area2':area2,'position':position,'areaname':areaname,'streetname':streetname,'villagename':villagename,'limitTime':limitTime},
		url : "../waterwx/saveQuestion",
		success : function(data) {
			if(data == "succ"){
				alert("保存成功！");
				window.location.reload();
			}else{
				alert("保存失败");
			}

		},
		error:function(e){
			alert("error")	;
		}
	}); 
}
//投诉受理页面选择一个河涌
function slReach(obj){
	var stat = obj.text;
	var river = "";
	var area = $("#area1").val();
	var river = $("#river1").val();
	var lr = $("#coast1").val();
	$.ajax({
		type : "POST",
		url : "../waterwx/getResponseByFour",
		data :  {area:area,rivername:river,lr:lr,reach:stat}, 
		dataType : "json",
		async:false,
		success : function(data) {
			length=data.length;
			$(".showandHidden").attr("style","display:block");
			$.each(data, function(i, value){
				$("#areaPerson").val(value.distMgrName);
				$("#areaPhone").val(value.distMgrTel);
				$("#streetPerson").val(value.streetMgrName);
				$("#streetPhone").val(value.streetMgrTel);
				$("#villagePerson").val(value.villageMgrName);
				$("#villagePhone").val(value.villageMgrTel);
			});

		}

	});
}
//点击地区下拉框时 obj 区分是搜索框，还是投诉受理页面
function loadArea(){
	//地区
	$.ajax({
		type : "POST",
		url : "../waterwx/findAllArea",
		data :  {}, 
		dataType : "json",
		success : function(data) {
			$.each(data, function(i, value){
				$("#area").append("<option class='areaOption'  >"+value+"</option>");
				$("#area1").append("<option class='areaOption'  >"+value+"</option>");
			});

		}

	});
}
//加载河道信息 area:地区信息
function loadRiver(area,obj){
	var requestData = "";
	var url = "";
	if(area == null || area == "" || area == "请选择"){
		requestData = "";
		url = "../waterwx/getRiver";
	}else{//根据地区获取河道
		requestData = {area:area};
		url = "../waterwx/getRiverByArea";
	}
	if("river1" == obj){
		//获取区级河长姓名
		getAreaPersonName(area);
	}
	//获取所有河道
	$.ajax({
		type : "POST",
		url :url,
		data : requestData, 
		dataType : "json",
		success : function(data) {
			//创建河道下拉框
			$("#"+obj).empty().append("<option>请选择</option>");
			$.each(data, function(i, value){
				$("#"+obj).append("<option class='riverOption' >"+value.riverName+"</option>");
			});
			//投诉受理页面 赋河道值
			if(rivervalue !=""){
				$("#river1").val(rivervalue);
			}
			$("#"+obj).comboSelect();
		}

	});
}
//左右岸下拉框
function loadCoastAndReach(area,river,obj){
	var requestData = {};
	if(area == null || area == "" || area == "请选择"){
		requestData = {rivername:river};
	}else{
		requestData = {area:area,rivername:river};
	}
	var reach = "";
	if(obj == "coast1"){
		reach = "reach1";
		//获取区级河长姓名
		getStreetPersonName(area,river);
		getVillagePerson1(area,river);
	}
	if(obj == "coast"){
		reach = "reach";
	}
	//投诉受理页面选择一个河段时
		$.ajax({
			type : 'post',
			data : requestData,
			dataType : "json",
			url : "../waterwx/getResponseByTwo",
			success : function(data) {
				$("#"+obj).empty();
				$("#"+obj).append("<option>请选择</option>");
				$("#"+reach).empty();
				$("#"+reach).append("<option>请选择</option>");
				$.each(data, function(i, value){
					$("#"+obj).append("<option  class='river' >"+value.leftRight+"</option>");
				});
				for(var i=0;i<data.length;i++){
					for (var j = data.length - 1 ; j > i; j--){
						var partname = data[i].partName;
						var partname1 = data[j].partName;
						if (partname == partname1){
							data.splice(j,1);
						}
					}
					$("#"+reach).append("<option >"+data[i].partName+"</option>");
				}
				if(lrvalue != null && lrvalue !=""){
					$("#coast1").val(lrvalue);
				}
				if(reachvalue != null && reachvalue !=""){
					$("#reach1").val(reachvalue);
				}
				$("#"+reach).comboSelect();	
				$("#"+obj).comboSelect();	
			}
		}); 
}
//改变左右岸，重新加载河段
function loadReach(area,river,coast,obj){
	if(obj == "reach1"){
		 getVillagePerson(area,river,coast,"");
	}
	$.ajax({
		type : "POST",
		url : "../waterwx/getResponseByLf",
		data :  {area:area,rivername:river,lr:coast}, 
		dataType : "json",
		async:false,
		success : function(data) {
			$("#"+obj).empty();
			$("#"+obj).append("<option>请选择</option>");
			$.each(data, function(i, value){
				$("#"+obj).append("<option >"+value.partName+"</option>");
			});
			$("#"+obj).comboSelect();				
		}

	});
}
//获取区级河长姓名
function getAreaPersonName(area){
	$.ajax({
		type : "POST",
		url : "../waterwx/getPersonName",
		data :  {area:area}, 
		dataType : "json",
		success : function(data) {
			$("#areapersonname").empty().append("<option>请选择</option>");
			$.each(data, function(i, value){
				$("#areapersonname").append("<option  class='riverOption1' >"+value+"</option>");

			});
			$("#areapersonname").val(areapersonname);
			//加载区级河长电话
			$("#areapersonname").on("change",function(){
				var areaname = $("#areapersonname").val();
				$.ajax({
					type : "POST",
					url : "../waterwx/getTelByAreaName",
					data :  {areaname:areaname}, 
					dataType : "json",
					success : function(data) {
						$("#areaPhone").empty().append("<option>请选择</option>");
						var phone = "";
						$.each(data, function(i, value){
							phone +=value.distMgrTel+",";
						});
						$("#areaPhone").val(phone);
					}
				});
			}); 
		}

	});
}
//加载街镇河长姓名
function getStreetPersonName(area,river){
	$.ajax({
		type : "POST",
		url : "../waterwx/getPersonName",
		data :  {area:area,rivername:river}, 
		dataType : "json",
		success : function(data) {
			$("#streetpersonname").empty().append("<option>请选择</option>");
			$.each(data, function(i, value){
				$("#streetpersonname").append("<option  class='riverOption1' >"+value+"</option>");

			});
			$("#streetpersonname").val(streetpersonname);
			$("#streetpersonname").on("change",function(){
				var streetname = $("#streetpersonname").val();
				$.ajax({
					type : "POST",
					url : "../waterwx/getTelByStreetName",
					data :  {streetName:streetname}, 
					dataType : "json",
					success : function(data) {
						$("#streetPhone").empty().append("<option>请选择</option>");
						var streetphone = "";
						$.each(data, function(i, value){
							streetphone +=value.streetMgrTel+",";
						});
						$("#streetPhone").val(streetphone);
					}
				}); 
			});
		}		
	});
}
//加载村级河长信息
function getVillagePerson(area,river,coast,reach){
	var requestData = {};
	if(coast == null || coast == "" || coast == "请选择"){
		requestData = {area:area,rivername:river,reach:reach};
	}else{
		requestData = {area:area,rivername:river,lr:coast};
	}
	$.ajax({
		type : "POST",
		url : "../waterwx/getPersonName",
		data : requestData, 
		dataType : "json",
		success : function(data) {
			$("#villagepersonname").empty().append("<option>请选择</option>");
			$.each(data, function(i, value){
				$("#villagepersonname").append("<option  class='riverOption1' >"+value+"</option>");

			});
			$("#villagepersonname").val(villagepersonname);
			//加载村级河长电话
			$("#villagepersonname").on("change",function(){
				var villagename = $("#villagepersonname").val();
				$.ajax({
					type : "POST",
					url : "../waterwx/getTelByVillageName",
					data :  {villageName:villagename}, 
					dataType : "json",
					success : function(data) {
						$("#villagePhone").empty().append("<option>请选择</option>");
						var villagephone = "";
						$.each(data, function(i, value){
							villagephone +=value.villageMgrTel+",";
						});
						$("#villagePhone").val(villagephone);
					}
				}); 
			});
		}

	});
}
//加载村级河长信息
function getVillagePerson1(area,river){
	var requestData = {};
		requestData = {area:area,rivername:river};
	$.ajax({
		type : "POST",
		url : "../waterwx/getVillagePersonName",
		data : requestData, 
		dataType : "json",
		success : function(data) {
			$("#villagepersonname").empty().append("<option>请选择</option>");
			$.each(data, function(i, value){
				$("#villagepersonname").append("<option  class='riverOption1' >"+value+"</option>");

			});
			$("#villagepersonname").val(villagepersonname);
			//加载村级河长电话
			$("#villagepersonname").on("change",function(){
				var villagename = $("#villagepersonname").val();
				$.ajax({
					type : "POST",
					url : "../waterwx/getTelByVillageName",
					data :  {villageName:villagename}, 
					dataType : "json",
					success : function(data) {
						$("#villagePhone").empty().append("<option>请选择</option>");
						var villagephone = "";
						$.each(data, function(i, value){
							villagephone +=value.villageMgrTel+",";
						});
						$("#villagePhone").val(villagephone);
					}
				}); 
			});
		}

	});
}