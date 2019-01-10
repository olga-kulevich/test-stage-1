var time = document.getElementById('date'),
    name = document.getElementById('name'),
    btn_save = document.getElementById('btn_save');


btn_save.addEventListener('click', function () {

    //dateEvent = time.value;
    //name = name.value;

    Calendar.addEvent();
    Calendar.deleteEvent();
    Calendar.updateEvent();


});