document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!");

    // Event Delegation für die Navigation (Kategorie-Links)
    document.body.addEventListener("click", function (event) {
        let target = event.target;

        // Falls ein Link in der Navigation geklickt wird
        if (target.tagName === "A" && target.closest(".topbar-nav, #category-nav, #topic-nav")) {
            event.preventDefault();
            let url = target.getAttribute("href");
            if (url) {
                loadContent(url);
                updateActiveLink(target);
            }
        }
    });
});

// Funktion zum Laden des Inhalts in den Main-Bereich
function loadContent(url) {
    console.log("Lade Inhalt von:", url);
    fetch(url)
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");
            let newContent = doc.querySelector("main");

            if (newContent) {
                document.getElementById("content").innerHTML = newContent.innerHTML;
                document.getElementById("sidebar").style.display = "block"; // Sidebar sichtbar machen
            }
        })
        .catch(error => console.error("Fehler beim Laden:", error));
}

// Funktion zum Markieren des aktiven Links
function updateActiveLink(activeElement) {
    document.querySelectorAll(".topbar-nav a, #category-nav a, #topic-nav a").forEach(link => {
        link.classList.remove("active");
    });
    activeElement.classList.add("active");
}
