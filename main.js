var time = document.getElementById('date'),
    name = document.getElementById('name'),
    btn_save = document.getElementById('btn_save');


btn_save.addEventListener('click', function () {

    //dateEvent = time.value;
    //name = name.value;

    Calendar.addEvent(Math.floor((new Date).getTime()/1000+7), "a",
        function () {console.log("callback 11111!")});
    Calendar.addEvent(Math.floor((new Date).getTime()/1000+10), "b",
        function () {console.log("callback 22222!")});
    Calendar.deleteEvent();
    Calendar.updateEvent();


});