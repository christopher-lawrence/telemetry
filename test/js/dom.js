function setup() {
    document.getElementById("image").addEventListener("click", () => {
        incrementCount('img-click-count');
    });
    document.getElementById("link").addEventListener('click', () => {
        incrementCount('link-click-count');
    });
};

const incrementCount = (id) => {
    const element = document.getElementById(id);
    let value = Number(element.innerHTML);
    element.innerHTML = value + 1;
}

document.addEventListener("DOMContentLoaded", () => {
    setup();
});

