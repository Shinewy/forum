var user= JSON.parse(sessionStorage.getItem("session_user"));
var userId=1;
var userName=1;
/*if(user) {
	userId=user.pk;
	userName=user.name;
}else{
	alert("请先登录");
	setTimeout("window.location.href='/s/login.html?targetUrl="+window.location.href+"'",500);
}*/
//var basePath="http://10.144.238.71:8080/wodeworld/";
/*var basePath="http://www.wodeworld.cn:8080/wodeworld3.0/";*/
$(function() {
	$(".publish").click(function() {
		var title=$("#L_title").val();
		var content=$("#L_content").val();
		var type_txt=$(".type_content").siblings(".layui-form-select").find(".layui-this");
		var zone_txt=$(".zone_content").siblings(".layui-form-select").find(".layui-this");
		var typeId=type_txt.attr("lay-value");
		var zoneId=zone_txt.attr("lay-value");
		/*alert(zoneId)
		alert(typeId)*/
		if(!title) {
			layer.msg("请输入标题");
			return false;
		}
		if(!content) {
			layer.msg("请输入内容");
			return false;
		}
		if(!zone_txt.length) {
			layer.msg("请选择专区");
			return false;
		}
		if(!type_txt.length) {
			layer.msg("请选择类别");
			return false;
		}
		if(!title) {
			layer.msg("请输入标题");
			return false;
		}
		if(!user) {
			layer.msg("您还没有登录");
			window.location.href="../login.html";
		}else {
			$("#L_title").val("");
			$("#L_content").val("");
			$(".main").find(".layui-select-title input").val("");
			/*publish(title,zoneId,typeId,content)*/
		}
		
	})
})

function publish(title,zoneId,typeId,content) {
	$.post(basePath+"postDetailController/savePost",{"title":title,"zoneId":zoneId,"typeId":typeId,"userId":userId,"userName":userName,"content":content},function(result) {
		//alert()
		$("#L_title").val("");
		$("#L_content").val("");
		$(".main").find(".layui-select-title input").val("");
		window.location.href="/s/forum/detail.html?id="+result;
	})
}

