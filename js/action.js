window.onload = function () {
    document.getElementById("commit_Edit").style.display = "none";
    document.getElementById("all_label").style.display = "none";
    var labels_obj = generate_labels();
    for (var label in labels_obj) {
        document.getElementById("all_label").appendChild(labels_obj[label]);
    }


};

function showFullLabel() {
    document.getElementById("label").classList.replace("col-md-1", "col-md-4");
    document.getElementById("Edit").style.display = "none";
    document.getElementById("commit_Edit").style.display = "inline";
    document.getElementById("all_label").style.display = "inline";


}

function showSelectedLabel() {
    document.getElementById("label").classList.replace("col-md-4", "col-md-1");
    document.getElementById("commit_Edit").style.display = "none";
    document.getElementById("Edit").style.display = "inline";
    document.getElementById("all_label").style.display = "none";

}

function generate_labels() {
    var labels_title = {"grade": "面向年级", "character": "课程性质", "department": "开课院系"};
    var labels = {"grade": "大一 大二 大三 大四", "character": "必修 选修", "department": "计算机 "};

    var labels_obj = [];
    for (var i in labels) {
        var l_obj = document.createElement('div');
        var ls = labels[i].split(" ");
        var title_obj = document.createElement("h4");
        title_obj.innerHTML = labels_title[i];
        title_obj.classList.add("label_title");
        l_obj.appendChild(title_obj);
        for (var j in ls) {
            // <button id="Edit" type="button" class="btn btn-primary " onclick="showFullLabel()">编辑</button>

            var label_name = ls[j];

            var single_label = document.createElement("button");
            single_label.id = label_name;
            single_label.classList.add("btn");
            single_label.classList.add("btn-info");
            single_label.classList.add("col-md-3");
            // single_label.classList.add("label_button");

            single_label.innerHTML = label_name;
            l_obj.appendChild(single_label);

            // single_label.classList.add("col-md-3");

        }

        labels_obj.push(l_obj);
        var br = document.createElement("br");
        labels_obj.push(br);
    }

    return labels_obj;
}