function setup() {
    $('#click-test-image').click(() => {
        incrementCount('click-count');
    });
    $('#click-test-image').click(() => {
        toggleBorder('click-test-image');
    });
    $('#dblclick-test-image').click(() => {
        toggleBorder('dblclick-test-image');
    })
    $('#dblclick-test-image').dblclick(() => {
        incrementCount('dblclick-count');
    });
    $('#form-test').submit((event) => {
        const form = $('#form-test')[0];
        const log = $('#form-log')[0];
        const data = new FormData(form);
        let output = '';
        for (const entry of data) {
            output = entry[0] + ' = ' + entry[1] + '\r';
        };
        log.innerText = output;
        event.preventDefault();
    });
    $('.change-test').change((event) => {
        const log = $('#change-log')[0];
        log.innerText = event.target.value;
    });
};

const incrementCount = (id) => {
    const element = document.getElementById(id);
    let value = Number(element.innerHTML);
    element.innerHTML = value + 1;
}

const toggleBorder = (id) => {
    const jId = id[0] === '#' ? id : '#' + id;
    const element = $(jId);
    element.toggleClass('none-border');
    element.toggleClass('blue-border');
}

document.addEventListener("DOMContentLoaded", () => {
    setup();
});
