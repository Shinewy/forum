var pagesize = 10;
var zoneId = getQueryString("id");
//var basePath="http://10.144.238.71:8080/wodeworld/";
var basePath="http://www.wodeworld.cn:8080/wodeworld3.0/";
bbsItem(1,pagesize);
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}
function bbsItem(curr,pagesize){
	$("#bbsUl").empty();
	var html="";
	$.post(basePath+"hBbsZoneController/getAllPost",{'zoneId':zoneId,'pageNum':curr,'pageSize':pagesize,},function(result){
		//console.log(result)
		$.each(result.list,function(i,v){
			html+='<li class="fly-list-li">'
				+'<a href="javascript:void(0);" class="fly-list-avatar"><img src="'+v.avatar+'"></a>'
				+'<h2 class="fly-tip">'          
				+'<a href="detail.html?id='+v.id+'">'+v.title+'</a>'         
				if(v.istop==1){
					html+='<span class="fly-tip-stick">置顶</span>'
				}
				if(v.isessence==1){
					html+='<span class="fly-tip-jing">精帖</span> '
				}          
			    html +='</h2><p>'
				+'<span><a href="#">'+v.userName+'</a></span>'
				/*+'<span class="liveTime" data-lta-value="'+v.createTime+'"></span>'*/
				+'<span class="liveTime"  title="'+v.createTime+'">'+v.createTime+'</span>'
				+'<span>'+v.typeName+'</span>'
				+'<span class="fly-list-hint">'             
				+'<i class="iconfont" title="回帖+回复"></i>'+(v.replyCount+v.replyMoreCount)          
				+'<i class="iconfont" title="人气"></i>'+v.browseTime        
				+'</span></p></li>';
		})
		$("#bbsUl").append(html);
		liveTimeAgo();
		laypage({
		   	skin: 'molv',                        //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
		   	skip: false,                         //是否开启跳页
		   	groups: 6 ,                        //连续显示分页数
		    cont: 'pageDiv',                  //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageDiv"></div>
		    pages: result.pages,             //通过后台拿到的总页数
		    curr: curr || 1,                //当前页
		    jump: function(obj, first){    //触发分页后的回调
		       if(!first){                //点击跳页触发函数自身，并传递当前页：obj.curr
		    	   bbsItem(obj.curr,pagesize);
		       }
		    }
		})
	})
}
function getEssencePost(curr,pagesize){
	$("#bbsUl").empty();
	var html="";
	$.post(basePath+"hBbsZoneController/getEssencePost",{'zoneId':zoneId,'pageNum':curr,'pageSize':pagesize,},function(result){
		$.each(result.list,function(i,v){
			html+='<li class="fly-list-li">'
				+'<a href="javascript:void(0);" class="fly-list-avatar"><img src="'+v.avatar+'"></a>'
				+'<h2 class="fly-tip">'          
				+'<a href="detail.html?id='+v.id+'">'+v.title+'</a>'         
				if(v.istop==1){
					html+='<span class="fly-tip-stick">置顶</span>'
				}
				if(v.isessence==1){
					html+='<span class="fly-tip-jing">精帖</span> '
				}          
			    html +='</h2><p>'
				+'<span><a href="#">'+v.userName+'</a></span>'
				/*+'<span class="liveTime" data-lta-value="'+v.createTime+'"></span>'*/
				+'<span class="liveTime"  title="'+v.createTime+'">'+v.createTime+'</span>'
				+'<span>'+v.typeName+'</span>'
				+'<span class="fly-list-hint">'             
				+'<i class="iconfont" title="回帖+回复"></i>'+(v.replyCount+v.replyMoreCount)          
				+'<i class="iconfont" title="人气"></i>'+v.browseTime        
				+'</span></p></li>';
		})
		$("#bbsUl").append(html);
		liveTimeAgo();
		laypage({
		   	skin: 'molv',                        //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
		   	skip: false,                         //是否开启跳页
		   	groups: 6 ,                        //连续显示分页数
		    cont: 'pageDiv',                  //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageDiv"></div>
		    pages: result.pages,             //通过后台拿到的总页数
		    curr: curr || 1,                //当前页
		    jump: function(obj, first){    //触发分页后的回调
		       if(!first){                //点击跳页触发函数自身，并传递当前页：obj.curr
		    	   getEssencePost(obj.curr,pagesize);
		       }
		    }
		})
	});
}
function getPostByType(typeId,curr,pagesize){
	$("#bbsUl").empty();
	var html="";
	$.post(basePath+"hBbsZoneController/getPostByType",{'typeId':typeId,'zoneId':zoneId,'pageNum':curr,'pageSize':pagesize,},function(result){
		//console.log(result)
		$.each(result.list,function(i,v){
			html+='<li class="fly-list-li">'
				+'<a href="javascript:void(0);" class="fly-list-avatar"><img src="'+v.avatar+'"></a>'
				+'<h2 class="fly-tip">'          
				+'<a href="detail.html?id='+v.id+'">'+v.title+'</a>'         
				if(v.istop==1){
					html+='<span class="fly-tip-stick">置顶</span>'
				}
				if(v.isessence==1){
					html+='<span class="fly-tip-jing">精帖</span> '
				}          
			    html +='</h2><p>'
				+'<span><a href="#">'+v.userName+'</a></span>'
				/*+'<span class="liveTime" data-lta-value="'+v.createTime+'"></span>'*/
				+'<span class="liveTime" title="'+v.createTime+'">'+v.createTime+'</span>'
				+'<span>'+v.typeName+'</span>'
				+'<span class="fly-list-hint">'             
				+'<i class="iconfont" title="回帖+回复"></i>'+(v.replyCount+v.replyMoreCount)          
				+'<i class="iconfont" title="人气"></i>'+v.browseTime        
				+'</span></p></li>';
		})
		$("#bbsUl").append(html);
		liveTimeAgo();
		laypage({
		   	skin: 'molv',                        //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
		   	skip: false,                         //是否开启跳页
		   	groups: 6 ,                        //连续显示分页数
		    cont: 'pageDiv',                  //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="pageDiv"></div>
		    pages: result.pages,             //通过后台拿到的总页数
		    curr: curr || 1,                //当前页
		    jump: function(obj, first){    //触发分页后的回调
		       if(!first){                //点击跳页触发函数自身，并传递当前页：obj.curr
		    	   getNotPayPost(obj.curr,pagesize);
		       }
		    }
		})
	});
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
$(document).ready(function(){
	$(".fly-tab-span>a").click(function(){
		$(this).addClass("tab-this").siblings().removeClass("tab-this");
	})
})