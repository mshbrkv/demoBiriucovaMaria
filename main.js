class RequestsSender {

    constructor(url, callback, isAsync = true) {
        this.url = url;
        this.callback = callback;
        this.isAsync = isAsync;
    }

    httpGet(path = "") {
        var xmlHttp = new XMLHttpRequest();
        let callback = this.callback;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", this.url + "/" + path, this.isAsync);
        xmlHttp.send(null);
    }

    httpPost(path = "", data, contentType = null) {
        var xmlHttp = new XMLHttpRequest();
        let callback = this.callback;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("POST", this.url + "/" + path, this.isAsync);
        if (contentType != null) {
            xmlHttp.setRequestHeader("Content-Type", contentType);
        }
        xmlHttp.send(data);
    }
}

function logCallback(text) {
    console.log(text)
}

function alertCallback(text) {
    alert(text)
}

function mapScoreToBootstrapStyle(score, name) {
    if (score < 1 || name.trim() === "@mshbrkv") {
        return "table-danger";
    }
    if (1 <= score && score < 3)
        return "table-warning";
    return "table-success";
}

function apiCallback(text) {
    let data = JSON.parse(text);

    console.log(data.students);

    const table = document.getElementById("apiData");

    for (const [studentID, student] of Object.entries(data.students)) {
        console.log(studentID, student.name, student.attendance, student.points, student.attendance + student.points);

        const newRow = document.createElement("tr");

        const cellID = document.createElement("td");
        cellID.textContent = studentID;
        newRow.appendChild(cellID);

        const cellName = document.createElement("td");
        cellName.textContent = student.name.replace(/@/g, "");
        newRow.appendChild(cellName);

        const cellAttendance = document.createElement("td");
        cellAttendance.textContent = student.attendance;
        newRow.appendChild(cellAttendance);

        const cellPoints = document.createElement("td");
        cellPoints.textContent = student.points;
        newRow.appendChild(cellPoints);

        let score = student.attendance + student.points;
        newRow.classList.add(mapScoreToBootstrapStyle(score, student.name));

        table.appendChild(newRow);
    }

}

function less(left, right) {
    if (!isNaN(left)) {
        return parseInt(left) < parseInt(right);
    } else {
        return left.innerHTML.toLowerCase() < right.innerHTML.toLowerCase();
    }
}

function compare(x, y, dir) {
    /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
    if (dir == "asc")
        return less(y, x);
    else
        return less(x, y);
}

function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("stats");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];

            shouldSwitch = compare(x, y, dir);
            if (shouldSwitch)
                break;
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

$(document).ready(function () {
    $("#filter").on("keyup", function () {
        let value = $(this).val().toLowerCase();
        $("#apiData tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

document.getElementById("row-limit").addEventListener("input", function () {
    let limit = parseInt(this.value);
    limit = isNaN(limit) ? 0 : limit;
    const rows = document.querySelectorAll("#apiData tr");

    for (let i = 0; i < rows.length; i++) {
        if (i < limit) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
});
const devApiURL = "http://127.0.0.1:8000";
const apiURL = "https://lhelper.pythonanywhere.com";
let rs = new RequestsSender(apiURL, apiCallback);
rs.httpGet("ping/")

particlesJS(
    "particles",
    {
        "particles": {
            "number": {"value": 80, "density": {"enable": true, "value_area": 800}},
            "color": {"value": "#000000"},
            "shape": {
                "type": "circle",
                "stroke": {"width": 0, "color": "#000000"},
                "polygon": {"nb_sides": 5},
                "image": {"src": "img/github.svg", "width": 100, "height": 100}
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {"enable": false, "speed": 1, "opacity_min": 0.1, "sync": false}
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {"enable": false, "speed": 40, "size_min": 0.1, "sync": false}
            },
            "line_linked": {"enable": true, "distance": 150, "color": "#000000", "opacity": 0.4, "width": 1},
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {"enable": false, "rotateX": 600, "rotateY": 1200}
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {"enable": true, "mode": "repulse"},
                "onclick": {"enable": true, "mode": "push"},
                "resize": true
            },
            "modes": {
                "grab": {"distance": 400, "line_linked": {"opacity": 1}},
                "bubble": {"distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3},
                "repulse": {"distance": 200, "duration": 0.4},
                "push": {"particles_nb": 4},
                "remove": {"particles_nb": 2}
            }
        },
        "retina_detect": true
    }
);

const coords = {x: 0, y: 0};
const circles = document.querySelectorAll(".circle");

const colors = [
    "#71a3d4",
    "#6ba1d0",
    "#659ece",
    "#5f9ccc",
    "#599bca",
    "#5399c6",
    "#4d97c2",
    "#4796be",
    "#4194bb",
    "#3b92b7",
    "#3590b3",
    "#2f8eb1",
    "#298cb1",
    "#238aad",
    "#1d88ab",
    "#1785a7",
    "#1183a3",
    "#0b81a1",
    "#057f9d",
    "#007d9b",
    "#007b99",
    "#007997",
    "#007794"

];

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;

});

function animateCircles() {

    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}

animateCircles();

