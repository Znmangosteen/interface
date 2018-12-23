window.class_data =[{
    "courseName": "人工智能",
    "courseID": "CS304",
    "credit":3,
    "note": "课程系统完整地讲解当今整地讲解当今整地讲解当今整地讲解当今主流当今整地对xxx...",
    "classes": [{
        "teachers": "唐柯",
        "classinfo": ["周二3-4节 荔园一栋101","周五5-6节 荔园6栋403"],
        "classnum": 101,
        "period": [2, 2, 5, 3]
    },
        {
            "teachers": "唐柯",
            "classinfo": ["周二3-4节 荔园一栋101","周三5-6节 荔园6栋403"],
            "classnum": 101,
            "period": [2, 2, 3, 3]
        }
    ]
},
    {
        "courseName": "面向对象",
        "courseID": "CS303",
        "classes": [{
            "teachers": "张誉群",
            "classinfo": ["周四3-4节 荔园一栋101","周三5-6节 荔园6栋403"],
            "classnum": 101,
            "period": [4, 2, 3, 3]
        }]
    }
];

window.onload = function () {
    document.getElementById("commit_Edit").style.display = "none";
    document.getElementById("all_label").style.display = "none";
    var labels_obj = generate_labels();
    for (var label in labels_obj) {
        document.getElementById("all_label").appendChild(labels_obj[label]);
    }
    loadCourseTable();
    insertCard(window.class_data);
};

function loadCourseTable() {
    updateRcoin();
    var oCoin = document.getElementById('rcoin');
    var oDiv1 = document.getElementById('div1');
    var oBtn = document.getElementById('span');
    var begin = getStyle(oDiv1, 'left');
    begin = parseInt(begin.substr(0, begin.length - 2));
    oDiv1.onmouseover = function () {
        startMove(oDiv1, 'left', begin + oDiv1.offsetWidth);
    };
    oDiv1.onmouseout = function () {
        startMove(oDiv1, 'left', begin);
    };
    var oUl_course = document.getElementById('courseList');
    var oBtn_insert = document.getElementById('insert');
    // oBtn_insert.onclick = "insertCard()";
}


$(document).ready(function () {

    $('#class_table').bootstrapTable({
        data: window.class_data,
        editable: true,//开启编辑模式
        clickToSelect: true,
        cache: false,
        // showToggle:true, //显示切换按钮来切换表/卡片视图。
        // showPaginationSwitch:true, //显示分页切换按钮
        pagination: true,
        classes: 'table-no-bordered',
        pageList: [25],
        pageSize: 15,
        pageNumber: 1,
        uniqueId: 'index', //将index列设为唯一索引
        striped: true,

        // search: true,
        height: 655,
        // showRefresh: true,
        minimumCountColumns: 2,
        smartDisplay: true,
        onClickRow: function (row, $element) {
            // alert(row.html);
            $('#myModal').modal('show');
            // $('.info').removeClass('info');//移除class
            // $($element).addClass('info');//添加class
            // $('.course_card').css("display", "inline-block");
        },
        columns: [{
            field: 'courseID',
            title: '课程编号',
            class: "col-md-1"
        }, {
            field: 'courseName',
            title: '课程名称',
            class: "col-md-1"
        }, {
            field: 'credit',
            title: '学分',
            class: "col-md-1 text-center"
        }, {
            field: 'lecturer',
            title: '任课教师',
            class: "col-md-2"
        }, {
            field: 'note',
            title: '备注',
            rowspan: 1,
            class: "col-md-7"
        },
        ],

    });
});


function refreshCourseTable(rdata) {
    $('#class_table').bootstrapTable('removeAll');
    $('#class_table').bootstrapTable('prepend', rdata);
}

function search_class() {
    var data = $('#searchContent').val(); //string
    $.ajax({
        type: 'GET',
        url: "/searchCourse",
        anysc: false,
        data: JSON.stringify(data),  //转化字符串
        contentType: 'application/json',
        dataType:'json',
        success: function (rdata) { //成功的话，得到消息
            //rdata's type is json
            //returnClass(data);
        }
    });
    var rdata = [{
        "courseName": "面向对象",
        "courseID": "CS303",
        "classes": [{
            "teachers": "张誉群",
            "classinfo": ["周四3-4节 荔园一栋101","周三5-6节 荔园6栋403"],
            "classnum": 101,
            "period": [4, 2, 3, 3]
        }]
    }];
    refreshCourseTable(rdata);



}

function pull_course() {
    window.class_data = [{
        "courseName": "面向对象",
        "courseID": "CS303",
        "classes": [{
            "teachers": "张誉群",
            "classinfo": ["周四3-4节 荔园一栋101","周三5-6节 荔园6栋403"],
            "classnum": 101,
            "period": [4, 2, 3, 3]
        }]
    }];

}

function showFullLabel() {
    document.getElementById("label").classList.replace("col-md-1", "col-md-8");
    document.getElementById("Edit").style.display = "none";
    document.getElementById("commit_Edit").style.display = "inline";
    document.getElementById("all_label").style.display = "inline";
    document.getElementById("selected_label").classList.replace("col-md-12", "col-md-2");

    /*    var data = {
            "class_id": "1",
            "class_name": "2",
            "credit": "3",
            "lecture": "4",
            "capacity": "5",
            "current_number": "6"
        };
        $('#class_table').bootstrapTable('prepend', data);*/


}

function searchByLebel() {
    var datal = {"Grade": [], "Departments": [], "CourseType": [], "interval": [], "day": []}; //dictionary
    $.ajax({
        type: 'GET',
        url: "/searchLabel",
        anysc: false,
        data: JSON.stringify(datal),  //转化字符串
        contentType: 'application/json',
        dataType: 'json',
        success: function (rdata) { //成功的话，得到消息
            //rdata's type is json
            //returnClass(data);
        }
    });
    var rdata = [{
        "courseName": "人工智能",
        "courseID": "CS303",
        "lecturer": "唐珂",
        "classes": [{
            "teachers": "唐珂",
            "classinfo": ["周四3-4节 荔园一栋101","周三5-6节 荔园6栋403"],
            "classnum": 101,
            "period": [4, 2, 3, 3]
        }]
    },{
        "courseName": "人工智能",
        "courseID": "CS303",
        "classes": [{
            "teachers": "唐珂",
            "classinfo": ["周四3-4节 荔园一栋101","周三5-6节 荔园6栋403"],
            "classnum": 101,
            "period": [4, 2, 3, 3]
        }]
    },{
        "courseName": "人工智能",
        "courseID": "CS303",
        "classes": [{
            "teachers": "唐珂",
            "classinfo": ["周四3-4节 荔园一栋101","周三5-6节 荔园6栋403"],
            "classnum": 101,
            "period": [4, 2, 3, 3]
        }]
    }];
    refreshCourseTable(rdata);

}

function showSelectedLabel() {
    document.getElementById("label").classList.replace("col-md-8", "col-md-1");
    document.getElementById("commit_Edit").style.display = "none";
    document.getElementById("Edit").style.display = "inline";
    document.getElementById("all_label").style.display = "none";
    document.getElementById("selected_label").classList.replace("col-md-2", "col-md-12");

    searchByLebel();
}

function generate_labels() {
    var labels_title = {"grade": "面向年级", "character": "课程性质", "department": "面向院系", "week": "星期", "time": "节次"};
    var labels = {
        "grade": "大一 大二 大三 大四",
        "character": "必修 选修",
        "department": "通识基础 数学系 物理系 化学系 生物系 计算机系 电子系 地空系 海洋系 材料系 环境系 机械系 生医工系 金融系 人文中心 社科中心 语言中心 艺术中心 体育中心",
        "week": "星期一 星期二 星期三 星期四 星期五 星期六 星期日",
        "time": "1-2节 3-4节 5-6节 7-8节 9-10节 11节"
    };

    var labels_obj = [];
    for (var i in labels) {
        var l_obj = document.createElement('div');
        l_obj.classList.add("label_set");
        l_obj.classList.add("col-md-6");
        var ls = labels[i].split(" ");
        var title_obj = document.createElement("h4");
        title_obj.innerHTML = labels_title[i];
        title_obj.classList.add("label_title");
        l_obj.appendChild(title_obj);
        for (var j in ls) {
            // <button id="Edit" type="button" class="btn btn-primary " onclick="showFullLabel()">编辑</button>

            var label_name = ls[j];

            var single_label = document.createElement("button");
            // single_label.id = label_name;
            // single_label.classList.add("label_button");

            single_label.setAttribute("onclick", "select_label(this)");


            single_label.setAttribute("class", "w3-btn w3-white w3-border w3-border col-md-3");
            // single_label.classList.add("btn");
            single_label.setAttribute("style", "padding:5px;text-align: center;");
            single_label.setAttribute("title", "unselected");
            single_label.setAttribute("id", label_name);
            single_label.innerHTML = label_name;
            l_obj.appendChild(single_label);

            // single_label.classList.add("col-md-3");
        }


        labels_obj.push(l_obj);
        // var br = document.createElement("br");
        // labels_obj.push(br);
    }

    return labels_obj;
}

function copy(obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

function select_label(obj) {
    if (obj.title === "unselected") {
        // obj.classList.replace("btn-info", "btn-success");
        obj.setAttribute("class", "w3-btn w3-indigo w3-border col-md-3 ");

        obj.setAttribute("title", "selected");
        var show_it = obj.cloneNode(true);
        show_it.innerHTML = obj.innerHTML;
        show_it.setAttribute("id", "show_" + obj.id);
        show_it.setAttribute("title", obj.id + "show_only");
        // show_it.classList.replace("col-md-3", "col-md-12");

        show_it.setAttribute("class", "w3-btn w3-indigo w3-border col-md-12 ");
        document.getElementById("selected_label").appendChild(show_it);

    } else if (obj.title === "selected") {

        // obj.classList.replace("btn-success", "btn-info");
        obj.setAttribute("class", "w3-btn w3-white w3-border w3-border col-md-3");

        obj.setAttribute("title", "unselected");
        var shown = document.getElementById("show_" + obj.id);
        document.getElementById("selected_label").removeChild(shown);
    }
    else {
        var cname = obj.id;
        var true_name = cname.substring(5);
        obj.parentElement.removeChild(obj);
        obj = document.getElementById(true_name);
        obj.classList.replace("btn-success", "btn-info");
        obj.setAttribute("class", "w3-btn w3-white w3-border w3-border col-md-3");
        obj.setAttribute("title", "unselected");
    }

}

/*function add_class_row() {
    return {
        "class_id": "1",
        "class_name": "2",
        "credit": "3",
        "lecture": "4",
        "capacity": "5",
        "current_number": "6"
    };
}*/

/*
function show_class_card(obj) {

    alert("AMD!yes!")
}*/
