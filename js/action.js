window.onload = function () {
    var oDiv1 = document.getElementById('label');
    oDiv1.onmouseover = function () {
        // changeSize(this, 500, 500);
        document.getElementById("label").classList.replace("col-md-1","col-md-4")

    };
    oDiv1.onmouseout = function () {
        // changeSize(this, 200, 100);
        document.getElementById("label").classList.replace("col-md-4","col-md-1")

    };

};


function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name];
    }
}

function startMove(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur = parseInt(getStyle(obj, attr));

        var speed = (iTarget - cur) / 6;

        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (cur == iTarget) {
            clearInterval(obj.timer);
        }
        else {
            obj.style[attr] = cur + speed + 'px';
        }
    }, 30);
}

function changeSize(obj, iTarget1, iTarget2) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var cur1 = parseInt(getStyle(obj, 'height'));
        var cur2 = parseInt(getStyle(obj, 'width'));

        var speed1 = (iTarget1 - cur1) / 6;
        var speed2 = (iTarget2 - cur2) / 6;

        speed1 = speed1 > 0 ? Math.ceil(speed1) : Math.floor(speed1);
        speed2 = speed2 > 0 ? Math.ceil(speed2) : Math.floor(speed2);

        if (cur1 === iTarget1) {
            clearInterval(obj.timer);
        }
        else {
            obj.style['height'] = cur1 + speed1 + 'px';
            obj.style['width'] = cur2 + speed2 + 'px';

        }
    }, 30);
}
