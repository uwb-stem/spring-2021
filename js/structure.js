var navIsOpen = false;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {

    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
    document.getElementById("sideNavBtn").innerHTML = "Close Index";
    
    let projects = document.querySelectorAll(".projectUl");

    console.log(window.innerWidth / 2);
    presentationMargin = window.innerWidth / 2 - 640;

    for (let i  = 0; i < projects.length; i++) {
        projects[i].style.width = "600px";
        // projects[i].style.marginLeft = "300px";
        projects[i].style.marginLeft = presentationMargin + "px";
    }
    navIsOpen = true;
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.body.style.backgroundColor = "#EFEDE4";
    document.getElementById("sideNavBtn").innerHTML = "See All Projects";

    let projects = document.querySelectorAll(".projectUl");

    for (let i  = 0; i < projects.length; i++) {
        projects[i].style.width = "1000px";
        projects[i].style.margin = "auto";
    }

    navIsOpen = false;
}

function sideNavEvent(className) {
    if (navIsOpen) {
        closeNav(className);
    } else {
        openNav(className);
    }
}

function changeOpactiy(tagName, opacity) {
    let elements = document.getElementsByTagName(tagName);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.opacity = opacity;
    }
}

function dimBackground() {
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    changeOpactiy("img", "0.5");
    changeOpactiy("button", "0.4");
    changeOpactiy("hr", "0.4");
}

function undimBackground() {
    changeOpactiy("img", "1");
    changeOpactiy("button", "1");
    changeOpactiy("hr", "1");
}

const zoomLinks = [
    'https://washington.zoom.us/j/94565056844?pwd=S0lDZlM2MFpSc3JUZmR5aVQzdHREQT09',
    'https://washington.zoom.us/j/97929730126?pwd=eGlKSHVuVytPYW1XYVR6RlBPY2gxUT09',
    'https://washington.zoom.us/j/98183179537?pwd=OEkrc3R0TFRGNHpBa2Ntd0JIME8wQT09',
    'https://washington.zoom.us/j/96424726741?pwd=dVJqYkduYWZmeFM4TjhSalJNLzB1QT09',
    'https://washington.zoom.us/j/94503241942?pwd=YWRrNStsQXpZYldCUzYvTWdCNlpydz09',
    'https://washington.zoom.us/j/99737353181?pwd=Z0RzMWd5aGp5ZzRpclNJSzlDM3Axdz09'
]

if (typeof document.getElementById("room-1-presentations") != "undefined") {
    loadCSSEPresentations("room-1-presentations", "js/csseRoom1.json");
    loadCSSEPresentations("room-2-presentations", "js/csseRoom2.json");
    loadCSSEPresentations("room-3-presentations", "js/csseRoom3.json");
    loadCSSEPresentations("room-4-presentations", "js/csseRoom4.json");
    loadCSSEPresentations("room-5-presentations", "js/csseRoom5.json");
    loadCSSEPresentations("room-6-presentations", "js/csseRoom6.json");
    loadTitleToSideNav("js/csseRoom1.json");
    loadTitleToSideNav("js/csseRoom2.json");
    loadTitleToSideNav("js/csseRoom3.json");
    loadTitleToSideNav("js/csseRoom4.json");
    loadTitleToSideNav("js/csseRoom5.json");
    loadTitleToSideNav("js/csseRoom6.json");
} 

function loadCSSEPresentations(room, jsonfile) {
    let container = document.getElementById(room);
    let presentations = JSON.parse(readTextFile(jsonfile))['csse'];

    let zoomLinkText = document.createElement("p");
    zoomLinkText.classList.add("text");
    let zoomLink = document.createElement("a");
    zoomLink.href = zoomLinks[presentations[0].projectId[5] - 1];
    zoomLink.target = '_blank';
    zoomLink.innerHTML = "Click here to join the live CSSE presentations in room " +  presentations[0].projectId[5];
    // zoomLinkText.innerText = "Click here to join the live CSSE presentations in room " + presentations[0].projectId[5];
    zoomLinkText.appendChild(zoomLink);

    container.appendChild(zoomLinkText);

    for (let i = 0; i < presentations.length; i++) {
        let presentation = document.createElement("section");
        presentation.classList.add("presentation");

        let contentUl = document.createElement("ul");
        contentUl.classList.add("projectUl");
        let textLi = document.createElement("li");

        // time
        let time = document.createElement("p");
        time.classList.add("present-time");
        time.appendChild(document.createTextNode(presentations[i].time));
        textLi.appendChild(time);

        // short black line
        let blackLine = document.createElement("hr");
        blackLine.classList.add("short-black-line");
        textLi.appendChild(blackLine);

        // project title
        let title = document.createElement("h3");
        title.appendChild(document.createTextNode(presentations[i].title));
        textLi.appendChild(title);

        // student
        let studentDiv = document.createElement("div");
        studentDiv.classList.add("students");

        let studentName = document.createElement("h4");     // student name
        studentName.appendChild(document.createTextNode(presentations[i].studentName));
        studentDiv.appendChild(studentName);

        let major = document.createElement("h5");     // major
        major.classList.add("majors");
        major.appendChild(document.createTextNode(presentations[i].studentMajor));
        studentDiv.appendChild(major);

        textLi.appendChild(studentDiv);

        // project type
        let projectType = document.createElement("p");
        projectType.appendChild(document.createTextNode("Project type: " + presentations[i].projectType));
        textLi.appendChild(projectType); 

        // faculty advisor
        let advisor = document.createElement("p");
        advisor.appendChild(document.createTextNode("Faculty advisor: " + presentations[i].facultyAdvisor));
        textLi.appendChild(advisor); 

        // button to abstract page
        // let studentAbstractName = presentations[i].studentName.toLowerCase().split(" ");
        let abstractPageBtn = document.createElement("a");
        // abstractPageBtn.href = './csse-abstract-page.html?' + studentAbstractName[0] + "-" + studentAbstractName[1];
        abstractPageBtn.href = './csse-abstract-page.html?' + presentations[i].projectId;
        abstractPageBtn.target = '_blank';
        abstractPageBtn.classList.add("uw-btn", "btn-sm");
        abstractPageBtn.innerHTML = "Read abstract";
        textLi.appendChild(abstractPageBtn);

        // poster image
        let posterLi = document.createElement("li");
        let posterImg = document.createElement("img");
        posterImg.setAttribute('src', presentations[i].posterLink);
        posterLi.appendChild(posterImg);

        // purple bar
        let purpleLine = document.createElement("hr");
        purpleLine.classList.add("purple-line");
        if (presentations[i].projectId !== undefined) {
            purpleLine.setAttribute("id", presentations[i].projectId);
        }
        container.appendChild(purpleLine);

        contentUl.appendChild(textLi);
        contentUl.appendChild(posterLi);
        presentation.appendChild(contentUl);
        container.appendChild(presentation);
    }
}

function loadTitleToSideNav(jsonfile) {
    let sideNav = document.getElementById('mySidenav');
    let presentations = JSON.parse(readTextFile(jsonfile))['csse'];

    let roomDiv = document.createElement("div");
    roomDiv.classList.add("side-room-number");
    roomDiv.innerHTML = "Zoom Room " + presentations[0].projectId[5];

    let ul = document.createElement("ul");

    for (let j = 0; j < presentations.length; j++) {
        let presentationLi = document.createElement("li");
        presentationLi.classList.add("sidenav-title");
        presentationLi.setAttribute("data-id", presentations[j].projectId);
        
        let aTitle = document.createElement('a');
        let studentName = document.createElement('span');
        studentName.appendChild(document.createTextNode(presentations[j].studentName));
        aTitle.innerHTML = presentations[j].title + "<br/>";
        aTitle.appendChild(studentName);
        aTitle.href = '#';

        presentationLi.appendChild(aTitle);
        ul.appendChild(presentationLi);
    }

    sideNav.appendChild(roomDiv);
    sideNav.appendChild(ul);
}

function readTextFile(file) {
    let raw_file = new XMLHttpRequest();
    raw_file.open("GET", file, false);
    let file_content = "";
    raw_file.onreadystatechange = function ()
    {
        if (raw_file.readyState === 4)
        {
            if (raw_file.status === 200 || raw_file.status == 0)
            {
                file_content = raw_file.responseText;
            }
        }
    }
    raw_file.send(null);
    
    return file_content;
}

// Print nav bar from html template file
// document.getElementById("navb").innerHTML = readTextFile("js/navbar.html");

console.log(navIsOpen);

// while (navisOpen == true) {
//     while (window.scrollY >= 175) {
//         document.getElementById("mySidenav").style.height = "100%";
//         document.getElementsByClassName
//     }

//     while (window.scrollY < 175) {
//         changeMargin = 175 - window.scrollY;
//         document.getElementsByClassName("sidenav").style.marginTop = changeMargin;//.toString();
//     }
// }
