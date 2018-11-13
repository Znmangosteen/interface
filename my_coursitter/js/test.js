// 右侧宽度可调整
/** opt参数：
 * onmousemove: 为必须参数，需定义宽度控件宽度调整的代码
 * regionWidth: 鼠标点击的响应宽度范围（px），可不传
 * onmouseup: 鼠标up事件回调代码
 * isCatch: 是否捕获回调函数的异常，默认true
 */
$.fn.onEastDrag = function(opt) {
	$(this).bind('mousedown', function(downEvent) {
		var isMoving = false;
		if (opt.isCatch == undefined || opt.isCatch == null) opt.isCatch = true;
		var _thisEl = $(this); //获取到控件
		var elPosLeft = _thisEl.offset().left; // 左侧边界位置
		var startPos = downEvent.pageX; // 鼠标起始位置
		var startTime = new Date().getTime();
		var oriWidth = _thisEl.width();
		var _parentEl = _thisEl.parent();
		// 右侧边界位置
		var elPosRight = elPosLeft + oriWidth;
		var regionWidth = opt.regionWidth && opt.regionWidth > 0 ? opt.regionWidth : 6; // 点击响应区域，默认6px宽度
		if (elPosRight - regionWidth <= startPos && startPos <= elPosRight) {
			isMoving = true; //如果在右侧边缘偏左6px内.允许移动
			_parentEl.append(
				'<div id="move-mask-laver" style="position:fixed;width: 100%;height: 100%;z-index: 9999;opacity: 0;top: 0px;cursor: col-resize;"></div>'
			);

			window.onmousemove = function(moveEvent) {
				//如果在范围内
				if (isMoving) {
					//获取移动的宽度
					var move = moveEvent.pageX - startPos;
					var ev = {
						oriWidth: oriWidth, // 控件最初的宽度
						startTime: startTime, // mousedown时间
						moveDistance: move, // 移动的距离（与最初位置相比）
						downEvent: downEvent, // mousedown事件
						moveEvent: moveEvent, // 当前move事件
					}
					try {
						opt.onmousemove(_thisEl, ev); // 宽度设置由调用者决定
					} catch (e) {
						if (opt.isCatch) console.warn(e);
						else throw e;
					}

				}
				//最后返回false;
				return false;
			};
			//鼠标松开清空所有事件
			window.onmouseup = function(upEvent) {
				window.onmousemove = null;
				window.onmouseup = null;
				isMoving = false;
				_parentEl.find('#move-mask-laver').remove();
				if (opt.onmouseup) {
					try {
						opt.onmouseup(_thisEl, upEvent);
					} catch (e) {
						if (opt.isCatch) console.warn(e);
						else throw e;
					}
				}
			};
			return false;
		}
		return true;
	});
}


$(function() {
	autoCntWidth();
});


function autoCntWidth() {
	$('#cnt').width($('#cnt').parent().width() - $('#nav').width() - 5);
}



$('#nav').onEastDrag({
	onmousemove: function(el, event) {
		el.width(event.oriWidth + event.moveDistance);
		autoCntWidth();
	},
	regionWidth: 10,
});
