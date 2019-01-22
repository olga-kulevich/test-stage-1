var repeater = new Repeater();

window.repeater = repeater;

// проверяем сохзание повторящихся событий и удаление их
/*
repeater.addRepeatedEvent(parseInt(+new Date() / 1000) + 30, 'a',
  function () {
    console.log('callback 11111');
  }, [2, 3]);

repeater.addRepeatedEvent(parseInt(+new Date() / 1000) + 40, 'a',
  function () {
    console.log('callback 22222');
  }, [5, 6]);

repeater.getEventList();
repeater.deleteEvent();
*/

//проверка посторяющихся событий
/*
repeater.addEvent(Math.floor((new Date()).getTime() + 30000), 'a',
  function () {
    console.log('callback 11111');
  }, [1]);

*/
//проверка работы globalreminder && reminderForEvent

/*
var reminder = new Reminder();
window.reminder = reminder;

reminder.addEvent(Math.floor((new Date).getTime() / 1000 + 60), "a",
  function() {
      console.log("callback 11111")
  });

reminder.addEvent(Math.floor((new Date).getTime() / 1000 + 50), "b",
  function() {
      console.log("callback 22222")
  });

reminder.getEventList();

reminder.createGlobalReminder(1, function () {
    console.log("reminderGLOB")});

reminder.createReminderForEvent(1, function () {
    console.log("reminder")}, 54);

reminder.deleteEvent()
*/

// проверка удаления
/*
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 7), "a",
    function() {
        console.log("callback 11111!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 10), "b",
    function() {
        console.log("callback 22222!")
    });
Calendar.deleteEvent('a');
*/

//проверка обновления события
/*
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 3), "a",
    function() {
        console.log("callback 11111!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "b",
    function() {
        console.log("callback 22222!")
    });

Calendar.updateEvent('a', 'c', null);
Calendar.updateEvent('c', null, Math.floor((new Date).getTime() / 1000 + 2));
*/

//проверка выполнения нескольких событий друг за другом
/*
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 5), "a",
    function() {
        console.log("callback 1!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 5), "aa",
    function() {
        console.log("callback 11!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 7), "b",
    function() {
        console.log("callback 2!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 9), "c",
    function() {
        console.log("callback 3!")
    });
Calendar.deleteEvent('c');
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 11), "d",
    function() {
        console.log("callback 4!")
    });
*/

//получить все события за текущий день
/*
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 5), "a",
    function() {
        console.log("callback 11111!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86401), "b",
    function() {
        console.log("callback 22222!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86400), "b",
    function() {
        console.log("callback 33333!")
    });
console.log(Calendar.getEventsForDay());
*/

//получить все события за текущий месяц
/*
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2592000), "a",
    function() {
        console.log("callback 11111!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86400), "b",
    function() {
        console.log("callback 22222!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "c",
    function() {
        console.log("callback 33333!")
    });
console.log(Calendar.getEventsForMonth());
*/

//получить все события за текущую неделю

/*calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 604820), "a",
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

//получить все события за указанный период
/*
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 604820), "a",
    function () {
        console.log("callback 11111!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 86400), "b",
    function () {
        console.log("callback 22222!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "c",
    function () {
        console.log("callback 33333!")
    });

console.log(Calendar.getEventsForPeriod(Math.floor((new Date).getTime() / 1000),
(Math.floor((new Date).getTime() / 1000) + 172800)));

console.log(Calendar.getEventsForPeriod(Math.floor((new Date).getTime() / 1000)));
*/

//проверка добавления события
/*
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 3), "a",
    function() {
        console.log("callback 11111!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "a",
    function() {
        console.log("callback 22222!")
    });
Calendar.addEvent(Math.floor((new Date).getTime() / 1000 + 2), "b", 5);
*/


//________________________________
/*
console.log(calendar.addEvent(Math.floor((new Date()).getTime() / 1000 + 2), 'a',
  function () {
    console.log('callback 22222!');
}));
var calendar = new Calendar();
console.log(calendar.addEvent(Math.floor((new Date()).getTime() / 1000 + 3), 'b',
  function () {
      console.log('callback 33333!');
  }));

console.log(calendar.getEventList());

//console.log(calendar.getEventsForDay());
*/