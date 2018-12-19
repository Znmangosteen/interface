function insertCard() {
	var oUl_course = document.getElementById('courseList');
	var oLi = document.createElement('li');
	//test
	var testCourse = getInfo();
	oLi.innerHTML = addCourse(testCourse);
	oUl_course.appendChild(oLi);
}

function addCourse(testCourse) {
	var res = "";
	var oCourse;
	var courseName = testCourse.courseName;
	var classes = testCourse.classes;
	res += "<div class=\"mycard\"><div class=\"card\"><div class=\"card-header\">";
	res += courseName
	res +=
		"</div><div class=\"card-body\"><div id=\"courses\" class=\"course-selector\"><ul style=\"list-style: none; margin-left:-43px; \">";
	for (var clz in classes) {
		oCourse = new Classes(courseName, classes[clz].teachers, classes[clz].classtime, classes[clz].classroom, classes[clz]
			.period);
		res += addClass(oCourse);
	}
	res += "</ul></div></div></div></div>";
	return res;
}

function addClass(oCourse) {
	var res = "";
	res += "<li><div class=\"class-selector\" data-period=" + oCourse.period + " data-coursename=\""+oCourse.courseName + "\" data-classtime=\""+oCourse.classtime+"\" data-classroom=\""+oCourse.classroom+"\" data-teachers=\""+oCourse.teachers+ "\"><p>时间：";
	res += oCourse.classtime;
	res += "</p><p>地点：";
	res += oCourse.classroom;
	res += "</p><p>任课教师：";
	res += oCourse.teachers;
	res +=
		"</p><div class=\"form-inline\"><input type=\"text\" class=\"mytxt\" id=\"coin\" placeholder=\"请输入选课币\" /><input class=\"btn btn-select\" type=\"button\" name=\"btn\" id=\"btn\" value=\"select\" onclick=fillTable(this) /></div></li>";
	return res;
}

function fillTable(obj){
	oDiv = obj.parentElement.parentElement;
	period = oDiv.dataset.period.split(',');
	name = oDiv.dataset.coursename;
	time = oDiv.dataset.classtime;
	room = oDiv.dataset.classroom;
	teachers = oDiv.dataset.teachers;
	var ot = document.getElementById("classtable");
	var rown = 0;
	var celln = 0;
	for (var i = 0; i<ot.rows.length;i++){
		for (var j = 0; j<ot.rows[0].cells.length; j++){
			if(i == 2 || i == 5){
				break;
			}else if(ot.rows[i].cells[j].innerHTML.indexOf(name) != -1){
				ot.rows[i].cells[j].innerHTML="";
			}
		}
	}
	for (var i = 0; i< period.length;){
		rown = parseInt(period[i+1]-1);
		celln = parseInt(period[i]);
		if (rown >= 2) rown ++;
		else if ( rown >= 5) rown ++;
		ot.rows[rown].cells[celln].innerHTML = "<p>"+name+"</p>"+"<p>"+teachers+"</p>"+"<p>"+time+"</p>"+"<p>"+room+"</p>";
		i+= 2;
	}
	
}