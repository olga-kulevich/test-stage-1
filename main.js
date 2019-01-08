import setEvent from './calendar.js';

const time = document.getElementById('date'),
    message = document.getElementById('msg'),
    btn_save = document.getElementById('btn_save');

let msg;
let dateEvent;

btn_save.addEventListener('click', function () {

    dateEvent = time.value;

    setEvent(dateEvent, showEvent);
});

function showEvent() {
    msg = message.value;
    alert(msg);
}