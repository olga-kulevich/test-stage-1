//import createEvent from './calendar.js';

const time = document.getElementById('date'),
    message = document.getElementById('msg'),
    btn_save = document.getElementById('btn_save');



btn_save.addEventListener('click', function () {
    if (time.value.length !== 0 && message.value.length !== 0) {
        let interval = time.value - (Math.floor((new Date).getTime()/1000));
        setTimeout(function() {alert(message.value)}, interval);
    }
});

//createEvent();
