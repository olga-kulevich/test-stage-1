var time = document.getElementById('date'),
    message = document.getElementById('msg'),
    btn_save = document.getElementById('btn_save');

var msg;
var dateEvent;

btn_save.addEventListener('click', function () {

    dateEvent = time.value;
    msg = message.value;

    Calendar.addNewEvent(dateEvent, msg);

    msg = Calendar.getMessage(dateEvent);

    Calendar.setEvent(dateEvent, showEvent);
});

function showEvent() {
    alert(msg);
}