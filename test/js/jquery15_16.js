function setup() {
    $('#image').click(() => {
        incrementCount('img-click-count');
    });
    $('#link').click(() => {
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
