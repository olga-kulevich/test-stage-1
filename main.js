import {setEvent, addNewEvent, getMessage} from './calendar.js';

const time = document.getElementById('date'),
    message = document.getElementById('msg'),
    btn_save = document.getElementById('btn_save');

let msg;
let dateEvent;

btn_save.addEventListener('click', function () {

    dateEvent = time.value;
    msg = message.value;

    addNewEvent(dateEvent, msg);

    msg = getMessage(dateEvent);

    setEvent(dateEvent, showEvent);
});

function showEvent() {
    alert(msg);
}