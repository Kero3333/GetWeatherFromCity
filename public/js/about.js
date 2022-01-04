document.querySelectorAll("article").forEach(article => {
    article.addEventListener("click", () => {
        window.open(`https://github.com/${article.getAttribute("data-username")}`, "_blank");
    })
});