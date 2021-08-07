function getParameterByName(name) {
    url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

switch (location.href.split("/").slice(-1)[0].split("?")[0]) {
        case "index.html":
            document.getElementById("title").innerHTML
            document.getElementById("index_startbutton").innerHTML
            document.getElementById("index_text").innerHTML
            document.getElementById("index_contacts_text").innerHTML
            document.getElementById("index_contacts").innerHTML
            // buttons
            document.getElementById("index_startbutton").onclick = function ()
            // dropdown
            window.onclick = function (event) {
                if (!(event.target.id == "dropbtn")) {
                    var dropdown = document.getElementById("dropdown-content")
                    if (dropdown.classList.contains('show')) {
                        dropdown.classList.remove('show')
                    }
                }
            }
            // dropdown settings
            document.getElementById("dropbtn").innerHTML
            for (var i = 0; i < Object.keys(localisation).length; i++) {
                document.getElementById("dropdown-content").innerHTML += "<a onclick=>" + Object.values(localisation)[i].name + "</a>"
            }
            break
        case "instructions.html":
            document.getElementById("title").innerHTML
            document.getElementById("instructions_title").innerHTML
            document.getElementById("instructions_text").innerHTML
            document.getElementById("instructions_gotitbutton").innerHTML
            document.getElementById("instructions_nevermind").innerHTML
            // buttons
            document.getElementById("instructions_gotitbutton").onclick = function () {
                location.href = "quiz.html"
            }
            document.getElementById("instructions_nevermind").onclick = function () {
                location.href = "index.html"
            }
            break
        case "quiz.html":
            document.getElementById("title").innerHTML
        case "results.html":
            document.getElementById("title").innerHTML
    }
} else {
    if (window.location.href.includes("?")) {
        window.location.href = window.location.href
    } else if (window.location.href.endsWith("/")) {
        window.location.href = window.location.href + "index.html"
    } else {
        window.location.href = window.location.href
}
