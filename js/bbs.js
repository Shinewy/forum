bbsZone();
function bbsZone(){
	$("#bbs").empty();
	//var basePath="http://10.144.238.71:8080/wodeworld/";
	var basePath="http://www.wodeworld.cn:8080/wodeworld3.0/";
	var html='';
	$.post(basePath+"hBbsZoneController/getAllZone",function(result){
	//	console.log(result);
		$.each(result,function(i,v){
		//	console.log(v.hBbsPost)
			html+='<div class="col-xs-6 col-sm-6 bbsItem"><div class="media">'
				+ '<a class="media-left media-middle" href="bbsList.html?id='+v.hBbsZone.id+'">'
				+ '<img src="'+v.hBbsZone.iconUrl+'" alt="...">'
				+ '</a>'
				+ '<div class="media-body"><h5 class="media-heading">'
				+ '<a href="bbsList.html?id='+v.hBbsZone.id+'">'+v.hBbsZone.name+'</a></h5>'
				+ '<ul class="list-unstyled"><li>帖数：'+v.count+'</li></ul>'
				+ '<ul class="list-unstyled lastUl">'
				if(v.hBbsPost){
					var date = v.hBbsPost.modifyTime.substring(0,19);
					html+=	'<li class="titleHandle">'    
						+ '<a href="detail.html?id='+v.hBbsPost.id+'">'+v.hBbsPost.title+'</a></li>'
					    +'<li class="liveTime" data-lta-value="'+date+'"></li><li>'+v.hBbsPost.userName+'</li>';
				}else{
					console.log(v.hBbsPost)
					html+='<li>暂无</li>'
				}
				html+= '</ul></div></div></div>';
		})
		$("#bbs").append(html);
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
	})
}