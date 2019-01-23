var calendar = new Calendar();
window.calendar = calendar;

//Добавление, удаление, обновление
/*
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 15), "a",
  function() {
      console.log("callback 11111!")
  });

calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 10), "b",
  function() {
      console.log("callback 22222!")
  });
calendar.deleteEvent(id);

calendar.getEventList();

calendar.updateEvent(id, 'c', Math.floor((new Date).getTime() / 1000 + 2));
*/

//получить все события за текущий день
/*
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 5), "a",
    function() {
        console.log("callback 11111!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 90000), "b",
    function() {
        console.log("callback 22222!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86400), "c",
    function() {
        console.log("callback 33333!")
    });
console.log(calendar.getEventsForDay());
*/

//получить все события за текущую неделю

/*
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 604820), "a",
    function() {
        console.log("callback 11111!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86400), "b",
    function() {
        console.log("callback 22222!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "c",
    function() {
        console.log("callback 33333!")
    });

console.log(calendar.getEventsForWeek());
*/

//получить все события за текущий месяц
/*
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2592005), "a",
    function() {
        console.log("callback 11111!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86400), "b",
    function() {
        console.log("callback 22222!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "c",
    function() {
        console.log("callback 33333!")
    });
console.log(calendar.getEventsForMonth());
*/

//получить все события за указанный период
/*
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 604820), "a",
    function () {
        console.log("callback 11111!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86400), "b",
    function () {
        console.log("callback 22222!")
    });
calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "c",
    function () {
        console.log("callback 33333!")
    });

console.log(calendar.getEventsForPeriod(Math.floor((new Date).getTime() / 1000),
(Math.floor((new Date).getTime() / 1000) + 172800)));
*/

//REMINDER. Создать события, создать ремайндер для всех событий и для конкретного.
/*
var reminder = new Reminder();
window.reminder = reminder;

calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 10), "a",
  function() {
      console.log("callback 11111")
  });

calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 50), "b",
  function() {
      console.log("callback 22222")
  });

calendar.createGlobalReminder(1, function () {
    console.log("reminderGLOB")});

calendar.getEventList();

calendar.createReminderForEvent(1, function () {
    console.log("reminderForEvent")}, 54);

calendar.deleteEvent();
*/

//REPEATER

// проверяем сохрание повторящихся событий и удаление их
/*
calendar.addRepeatedEvent(parseInt(+new Date() / 1000) + 10, 'a',
  function () {
    console.log('callback 11111');
  }, [2, 3]);

calendar.addRepeatedEvent(parseInt(+new Date() / 1000) + 12, 'b',
  function () {
    console.log('callback 22222');
  }, [5, 6]);

calendar.getEventList();
calendar.deleteEvent();
*/

//проверка посторяющихся событий
