document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", function (event) {
        if (event.target.matches("#sidebar-toggle")) {
            const sidebar = document.querySelector("#sidebar");
            if (sidebar) {
                sidebar.classList.toggle("collapsed");
            }
        }
    });
});
