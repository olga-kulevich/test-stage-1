import setEvent from './calendar.js';

const time = document.getElementById('date'),
    message = document.getElementById('msg'),
    btn_save = document.getElementById('btn_save');
let msg;

function showEvent() {
    alert(msg);
}

btn_save.addEventListener('click', function () {

    var dateEvent = time.value;
     msg = message.value;

    setEvent(dateEvent, showEvent());
});
