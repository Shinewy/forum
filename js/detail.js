var postId=getQueryString("id");
var zoneId=0;
var toUserId=0;
var replyId=0;
//var basePath="http://10.144.238.71:8080/wodeworld/";
var basePath="http://www.wodeworld.cn:8080/wodeworld3.0/";
var user= JSON.parse(sessionStorage.getItem("session_user"));
var postUserId;
initDetail();
function initDetail(){
	setTimeout(postDetail,200);//获取主帖详情
	addBrowseTime();
}
//提交回帖
$(".postReply_btn").click(function() {
	var content=$("#L_content").val();
	if(!content) {
		layer.msg("请输入回复内容");
		return false;
	}
	/*if(!user) {
		layer.msg("您还没有登录");
		setTimeout("window.location.href='/s/login.html?targetUrl="+window.location.href+"'",500);
	}else {
		postReplyAdd()
	}*/
	getReplys(content);
	$("#L_content").val("")
})

function getReplys(reply){
		/*$("#jieda").empty();*/
		var _htm="";
			_htm+='<li class="jieda-daan">'
						+'<div class="detail-about detail-about-reply">'
			  				+'<a class="jie-user" href="javascript:void(0)">'
				   				+' <img src="" alt="">'
				    			+'<cite><i class="reply_name">111</i></cite>'
			 				+'</a>'
			 				/*+ '<div class="detail-hits reply_time">'
							   +' <span>'+dealWithTime(v.createTime)+'</span>'
							   +'<span class="liveTime">'+dealWithTime(v.createTime)+'</span>'
				  			+'</div>'*/
			 			+'</div>'
						+'<div class="detail-body jieda-body">'
						 	+this_fly.content(reply)
						+'</div>'
						+'<div class="jieda-reply" style="text-align:right;">'
							+'<span type="reply" class="question_reply"><i class="iconfont icon-svgmoban53"></i>回复(1)</span>'
			  			+'</div>'
			  			+'<div class="reply_content">'
							+'<ul jieda photos class="reply_mess">'
						+'</ul></div>'
					+'</li>';
		$("#jieda").append(_htm);
		liveTimeAgo();
}

//点击回复
$(document).on("click",".question_reply",function(){
	var _this=$(this);
	var htm='<div class="copy_reply_textarea">'
		+'<div class="layui-form layui-form-pane">'
		+' <div class="layui-form-item layui-form-text">'
		+'<div class="layui-input-block">'
		+' <textarea id="copy_reply_content" name="content" required lay-verify="required" placeholder="我要回复"  class="layui-textarea fly-editor" style="height: 150px;"></textarea>'
		+'</div>'
		+'</div>'
		+'<div class="layui-form-item">'
		+' <input type="hidden" name="jid" value="0">'
		+'<button class="layui-btn btn-left postReplyMore_btn" lay-filter="*" lay-submit data-user-id="'+$(this).attr("data-user-id")+'" data-id="'+$(this).attr("data-id")+'">回复</button>'
		+'</div>'
		+'</div>'
		+'<div>';
		$(".layui-form-pane .fly-edit").remove();
	if($(this).parent().next(".copy_reply_textarea").length>0){//如果存在
		return false;
		}
	
	if($(".copy_reply_textarea").length>0){//如果其它地方有
		if($("#copy_reply_content").val()!=null&&$.trim($("#copy_reply_content").val())!=""){//如果有内容
			layer.open({
			  content: '确定要放弃正在编辑的回复？'
			  ,btn: ['确认', '取消']
			  ,yes: function(index, layero){
			    layer.close(index);
			    $(".copy_reply_textarea").remove();
			    $(".layui-form-pane .fly-edit").remove();
			    _this.parent().after(htm);
			    my_init();
			  },btn2: function(index, layero){
			    layer.close(index);
			    return false;
			  },cancel: function(){ 
			  }
			});
			/*if(confirm("确定要放弃正在编辑的回复？")){
				$(".copy_reply_textarea").remove();
			}else{
				return;
			}*/
		}else{
			$(".copy_reply_textarea").remove();
			$(this).parent().after(htm);
		}
	}else {
		$(this).parent().after(htm);
	}
	my_init();
});

function getReplyDetail(_toUser,content1) {
	var _htm=' <li  class="jieda-daan"><div class="detail-about detail-about-reply">'
		            +'<a class="jie-user" href="javascript:void(0)">'
		            +'<img src="" alt="">'
		            +' <cite><i class="reply_name">222</i><span class="reply_txt">回复</span><i class="reply_name">'+_toUser+'</i>：</cite>'
		            +' </a>'
		            +' <div class="detail-hits reply_time">'
		            +'<span class="liveTime"></span>'
		            +' </div>'
					+'</div>'
		            +'<div class="detail-body jieda-body">'
		            +this_fly.content(content1)
		            +'</div>'
		            +'<div class="jieda-reply" style="text-align:right;">'
		            +'<span type="reply"  class="question_reply"><i class="iconfont icon-svgmoban53"></i>回复</span>';
		            /*if(user!=null&&(postUserId==user.pk||user.pk==v1.fromUser.pk)){
		            	_htm+=' <span type="del" onclick="deleteReplymoreById('+v1.id+')">删除</span>';
		            }*/
		        +'</div></li >';
	return _htm;
				
}

//处理空白点击
//$(document).on("click","body",function(){
//	if($(".copy_reply_textarea").val()==null||$.trim($(".copy_reply_textarea").val())==""){
//		$(".copy_reply_textarea").remove();
//	}
//});

//提交回复
$(document).on("click",".postReplyMore_btn",function() {
	var content=$("#copy_reply_content").val();
	toUserId=$(this).attr("data-user-id");
	replyId=$(this).attr("data-id");
	if(!content) {
		layer.msg("请输入回复内容");
		return false;
	}
	/*if(!user) {
		layer.msg("您还没有登录");
		setTimeout("window.location.href='/s/login.html?targetUrl="+window.location.href+"'",500);
	}else {
		postReplyMoreAdd();
	}*/
	var _this=$(this).parents("li").find(".jie-user .reply_name").text();
	
	$(this).parents(".jieda-daan").find(".reply_content .reply_mess").append(getReplyDetail(_this,content));
	$(".copy_reply_textarea").remove();
	
});

function postReplyMoreAdd() {
	$.post(basePath+"postDetailController/addReplymore",{"zoneId":zoneId,"postId":postId,"fromUserId":user.pk,"toUserId":toUserId,"replyId":replyId,"content":$("#copy_reply_content").val()},function(result) {
		if(result==1){
			layer.msg("回复成功");
			setTimeout("window.location.reload()",1000);
		}else{
			layer.msg("回复异常");
		}
	})
}


function addBrowseTime(){//浏览次数++
	$.post(basePath+"hBbsZoneController/addBrowseTime",{"postId":postId},function(result) {	
	});
}

function postDetail() {
	$.post(basePath+"postDetailController/getPost",{"postId":postId},function(result) {
		//console.log(result);
		zoneId=result.hBbsPost.zoneId;
		postUserId=result.hUser.pk;
		$(".callbackToList").attr("href","/s/forum/bbsList.html?id="+zoneId);
		$(".post_title").text(result.hBbsPost.title);
		$(".post_user img").attr("src",result.hUser.avatar);
		$(".post_user cite").prepend(result.hUser.name);
		$(".post_user cite em").text(dealWithTime(result.hBbsPost.createTime));
		$('.post_content').each(function(){
		    $(this).html(this_fly.content(result.hBbsPost.content));
		  });
		$("#jiedaCount").text(result.replyCount);
		$(".replyCount").text((result.replyCount+result.replymoreCount));
		$(".browseTime").text(result.hBbsPost.browseTime);
		 
		 $(".detail-hits").append('<span style="color:#FF7200">'+result.typeName+'</span>');
		if(user!=null&&postUserId==user.pk){
		$(".detail-hits").append('<span type="del" onclick="delPost()" class="post_del">删除</span>');
		if(result.hBbsPost.istop==1){$(".fly-tip-stick").css("display","inline-block");}
		if(result.hBbsPost.isessence==1){$(".fly-tip-jing").css("display","inline-block");}
		}
		getReplys();//获取评论回复
	})
}


function postReplyAdd() {
	$.post(basePath+"postDetailController/addReply",{"zoneId":zoneId,"postId":postId,"userId":user.pk,"content":$("#L_content").val()},function(result) {
		if(result==1){
			layer.msg("回帖成功");
			setTimeout("window.location.reload()",1000);
		}else{
			layer.msg("回帖异常");
		}
	})
}

//删除帖子
function delPost(){
	layer.open({
		  content: '确定删除该帖子？'
		  ,btn: ['确认', '取消']
		  ,yes: function(index, layero){
			  $.post(basePath+"postDetailController/delPost",{"postId":postId},function(result){
				  if(result==1){
						layer.msg("删除成功");
						window.location.href="/s/forum/bbsList.html?id="+zoneId;
					}else{
						layer.msg("删除失败");
					}	
				});
		  },btn2: function(index, layero){
		    layer.close();
		  }
		  ,cancel: function(){ 
		    //右上角关闭回调
		  }
		});
}
//删除回帖
function deleteReplyById(replyId){
layer.open({
	  content: '确定删除该回帖？'
	  ,btn: ['确认', '取消']
	  ,yes: function(index, layero){
		  $.post(basePath+"postDetailController/deleteReplyById",{"replyId":replyId},function(result){
				if(result==1){
					layer.msg("删除成功");
					$(".reply_"+replyId).remove();
				}else{
					layer.msg("删除失败");
				}
				});
	  },btn2: function(index, layero){
	    layer.close();
	  }
	  ,cancel: function(){ 
	    //右上角关闭回调
	  }
	});
}

//删除回复
function deleteReplymoreById(replymoreId){
layer.open({
	  content: '确定删除该回帖？'
	  ,btn: ['确认', '取消']
	  ,yes: function(index, layero){
		  $.post(basePath+"postDetailController/deleteReplymoreById",{"replymoreId":replymoreId},function(result){
				if(result==1){
					layer.msg("删除成功");
					$(".replymore_"+replymoreId).remove();
				}else{
					layer.msg("删除失败");
				}
			});
	  },btn2: function(index, layero){
	    layer.close();
	  }
	  ,cancel: function(){ 
	    //右上角关闭回调
	  }
	});
}


//处理采纳
function updateIsAccept(id,isAccept){
	if(isAccept==1){//采纳
		$.post(basePath+"postDetailController/updateReply",{"id":id,"isAccept":isAccept},function(result){
			 if(result==1){
				 var oid=$(".isAccept_active").attr("data-id");
				 $.post(basePath+"postDetailController/updateReply",{"id":oid,"isAccept":0},function(result){
				 });
				 $(".isAccept_active").addClass("isAccept").removeClass("isAccept_active");
				 $(".reply_"+oid).find(".jieda-accept").attr("onclick","updateIsAccept("+oid+",1)");
				 $(".reply_"+oid).find(".jieda-accept").text("采纳");
				 $(".reply_"+id).find(".isAccept").removeClass("isAccept").addClass("isAccept_active");
				 $(".reply_"+id).find(".jieda-accept").attr("onclick","updateIsAccept("+id+",0)");
				$(".reply_"+id).find(".jieda-accept").text("取消采纳");
				 layer.msg("已采纳");
			 }else{
				 layer.msg("操作失败");
			 }
		 });
	}else{//取消采纳
		$.post(basePath+"postDetailController/updateReply",{"id":id,"isAccept":isAccept},function(result){
			if(result==1){
				$(".isAccept_active").addClass("isAccept").removeClass("isAccept_active");
				$(".reply_"+id).find(".jieda-accept").attr("onclick","updateIsAccept("+id+",1)");
				$(".reply_"+id).find(".jieda-accept").text("采纳");
				layer.msg("已取消采纳");
			}else{
				layer.msg("操作失败");	
			}
		 });
	}
	 
}

function getQueryString(name) { //解析地址栏
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}
//时间处理（处理.0）
function dealWithTime(time){
	if(time.indexOf(".")>0){
	time=time.substring(0,time.lastIndexOf("."));
	}
	return time;
}
//时间处理（并去掉年和秒）
function dealWithTime_short(time){
		time=time.substring(5,16);
	return time;
}
function liveTimeAgo(){
	$('.liveTime').liveTimeAgo({
		translate : {
			'year' : '%年前',
			'years' : '%年前',
			'month' : '%个月前',
			'months' : '%个月前',
			'day' : '%天前',
			'days' : '%天前',
			'hour' : '%小时前',
			'hours' : '%小时前',
			'minute' : '%分钟前',
			'minutes' : '%分钟前',
			'seconds' : '几秒钟前',
			'error' : '未知的时间',
		}
	});
}
