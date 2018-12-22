window.data = {};
window.rcoin = 10000;
// data = {
// 	CS304:{
// 		"coin": 50,
// 		"classnum": 2
// 	}
// }
// 

function insertCard() {
	var oUl_course = document.getElementById('courseList');
	var testCourse = getInfo();
	for (var i = 0; i < testCourse.length; i++) {
		var oLi = document.createElement('li');
		oLi.innerHTML = addCourse(testCourse[i]);
		oUl_course.appendChild(oLi);
	}

}

function addCourse(testCourse) {
	var res = "";
	var oCourse;
	var courseName = testCourse.courseName;
	var courseID = testCourse.courseID;
	var classes = testCourse.classes;
	res += "<div class=\"mycard\"><div class=\"card\"><div class=\"card-header\" onclick=removeLi(this)>";
	res += courseID + " " + courseName
	res +=
		"</div><div class=\"card-body\"><div id=\"courses\" class=\"course-selector\"><ul style=\"list-style: none; margin-left:-43px; \">";
	for (var clz in classes) {
		oCourse = new Classes(courseName, classes[clz].teachers, classes[clz].classtime, classes[clz].classroom, classes[clz]
			.period, testCourse.courseID, classes[clz].classnum);
		res += addClass(oCourse);
	}
	res +=
		"</ul></div></div><div class=\"card-footer\"><input type=\"text\" class=\"mytxt\" id=\"coin\" placeholder=\"请输入选课币\"></div></div></div>";
	return res;
}

function addClass(oCourse) {
	var res = "";
	res += "<li><div class=\"class-selector\" data-period=" + oCourse.period + " data-coursename=\"" + oCourse.courseName +
		"\" data-courseid=\"" + oCourse.courseID +
		"\" data-classtime=\"" + oCourse.classtime + "\" data-classroom=\"" + oCourse.classroom + "\" data-classnum=\"" +
		oCourse.classnum + "\" data-teachers=\"" + oCourse.teachers + "\"><p>时间：";
	res += oCourse.classtime;
	res += "</p><p>地点：";
	res += oCourse.classroom;
	res += "</p><p>任课教师：";
	res += oCourse.teachers;
	res +=
		"</p><input class=\"btn mybtn-select\" type=\"button\" name=\"btn\" id=\"btn\" value=\"select\" onclick=fillTable(this) /></li>";

	return res;
}


function fillTable(obj) {
	oDiv = obj.parentElement;
	oUl = oDiv.parentElement.parentElement;
	aBtns = oUl.getElementsByClassName('mybtn-select');
	period = oDiv.dataset.period.split(',');
	name = oDiv.dataset.coursename;
	id = oDiv.dataset.courseid;
	time = oDiv.dataset.classtime;
	room = oDiv.dataset.classroom;
	teachers = oDiv.dataset.teachers;
	classnum = oDiv.dataset.classnum;
	oCard = oUl.parentElement.parentElement.parentElement;
	ot = document.getElementById("classtable");
	aIn = oCard.getElementsByClassName('mytxt');
	// console.log(aIn)
	coin = aIn[0].value;
	if (coin == '') {
		alert("您还未分配选课币！")
		return;
	} else if (isNaN(coin) || coin < 0) {
		alert("请输入一个正整数!")
		return;
	} else if (coin > rcoin) {
		alert("当前选课币不足！")
		return;
	}


	if (obj.title == "pressed") {
		clearThisClass(ot, period);
		obj.setAttribute("title", "released");
		window.rcoin += parseInt(window.data[id].coin)
		delete window.data[id];
		console.log(window.data);
		console.log(window.rcoin);
	} else {
		//判断课程冲突
		if (hasConflict(ot, period)) {
			return;
		}
		//清除该课程选中的班级信息
		clearCourse(ot, aBtns);

		//添加当前选中班级信息
		for (var i = 0; i < period.length;) {
			var rown = parseInt(period[i + 1] - 1);
			var celln = parseInt(period[i]);
			if (rown >= 2) rown++;
			else if (rown >= 5) rown++;
			ot.rows[rown].cells[celln].innerHTML = "<p>" + name + "</p>" + "<p>" + teachers + "</p>" + "<p>" + time + "</p>" +
				"<p>" + room + "</p>";
			i += 2;
		}
		obj.setAttribute("title", "pressed");
		console.log(window.data)
		window.data[id] = {
			"coin": coin,
			"classnum": classnum
		}
		window.rcoin -= parseInt(coin);
		console.log(window.rcoin);
	}
}

function removeLi(obj) {
	oDiv = obj.parentElement.parentElement;
	oLi = oDiv.parentElement;
	oUl = oLi.parentElement;
	ot = document.getElementById("classtable");
	id = oDiv.getElementsByClassName('class-selector')[0].dataset.courseid;
	aBtns = oDiv.getElementsByClassName('mybtn-select');
	//移除课程的时候课表更新！！！！！！！！！！
	clearCourse(ot, aBtns);

	// 这里应该要退还所有的coin```````````````````````
	if (window.data[id]) {
		// window.rcoin += parseInt(window.data[id].coin)
		delete window.data[id];
	}
	oDiv.innerHTML = '';
	startMove(oDiv, 'height', 0);
	setTimeout("oUl.removeChild(oLi);", 2000);
	console.log(window.rcoin);

}

function clearCourse(ot, aBtns) {
	for (var i = 0; i < aBtns.length; i++) {
		if (aBtns[i].title == "pressed") {
			var tempperiod = aBtns[i].parentElement.dataset.period.split(',');
			aBtns[i].setAttribute("title", "released");
			for (var i = 0; i < tempperiod.length;) {
				var rown = parseInt(tempperiod[i + 1] - 1);
				var celln = parseInt(tempperiod[i]);
				if (rown >= 2) rown++;
				else if (rown >= 5) rown++;
				ot.rows[rown].cells[celln].innerHTML = "";
				i += 2;
			}
			window.rcoin += parseInt(window.data[id].coin)
			console.log(window.rcoin);
		}
	}
}

function clearThisClass(ot, period) {
	for (var i = 0; i < period.length;) {
		var rown = parseInt(period[i + 1] - 1);
		var celln = parseInt(period[i]);
		if (rown >= 2) rown++;
		else if (rown >= 5) rown++;
		ot.rows[rown].cells[celln].innerHTML = "";
		i += 2;
	}
}

function hasConflict(ot, period) {
	for (var i = 0; i < period.length;) {
		var rown = parseInt(period[i + 1] - 1);
		var celln = parseInt(period[i]);
		if (rown >= 2) rown++;
		else if (rown >= 5) rown++;
		if (ot.rows[rown].cells[celln].innerHTML != "") {
			temp = ot.rows[rown].cells[celln].firstElementChild.innerHTML;
			alert("与课程 " + temp + " 冲突，请修改班级！")
			return true;
		}
		i += 2;
	}
	return false;
}
