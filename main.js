var calendar = new Calendar();
window.calendar = calendar;

//Добавление, удаление, обновление
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 15), name: "a",
  callback: function() {
      console.log("callback 11111!")
  }});

calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 10), name: "b",
  callback: function() {
      console.log("callback 22222!")
  }});
calendar.deleteEvent(id);

calendar.getEventList();

calendar.updateEvent({id: id, newName: 'c', newDate: Math.floor((new Date).getTime() / 1000 + 2)});
*/

//получить все события за текущий день
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 5), name: "a",
    callback: function() {
        console.log("callback 11111!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 90000), name: "b",
    callback: function() {
        console.log("callback 22222!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 86400), name: "c",
    callback: function() {
        console.log("callback 33333!")
    }});
console.log(calendar.getEventsForDay());
*/

//получить все события за текущую неделю

/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 604820), name: "a",
    callback: function() {
        console.log("callback 11111!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 86400), name: "b",
    callback: function() {
        console.log("callback 22222!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 2), name: "c",
    callback: function() {
        console.log("callback 33333!")
    }});

console.log(calendar.getEventsForWeek());
*/

//получить все события за текущий месяц
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 2592005), name: "a",
    callback: function() {
        console.log("callback 11111!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 86400), name: "b",
    callback: function() {
        console.log("callback 22222!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 2), name: "c",
    callback: function() {
        console.log("callback 33333!")
    }});
console.log(calendar.getEventsForMonth());
*/

//получить все события за указанный период
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 604820), name: "a",
    callback: function () {
        console.log("callback 11111!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 86400), name: "b",
    callback: function () {
        console.log("callback 22222!")
    }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 2), name: "c",
    callback: function () {
        console.log("callback 33333!")
    }});

console.log(calendar.getEventsForPeriod({startOfPeriod: Math.floor((new Date).getTime() / 1000),
endOfPeriod: (Math.floor((new Date).getTime() / 1000) + 172800)}));
*/

//REMINDER. Создать события, создать ремайндер для всех событий и для конкретного.
/*
var reminder = new Reminder();
window.reminder = reminder;

calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 10), name: "a",
  callback: function() {
      console.log("callback 11111")
  }});

calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 50), name: "b",
  callback: function() {
      console.log("callback 22222")
  }});

calendar.createGlobalReminder({reminderTime: 1, reminderCallback: function () {
    console.log("reminderGLOB")}});

calendar.getEventList();

calendar.createReminderForEvent({reminderTimeForEvent: 1, reminderCallbackForEvent: function () {
    console.log("reminderForEvent")}, eventId: 54});

calendar.deleteEvent();
*/

//REPEATER

// проверяем сохрание повторящихся событий и удаление их
/*
calendar.addRepeatedEvent({date: parseInt(+new Date() / 1000) + 10, name: 'a',
  callback: function () {
    console.log('callback 11111');
  }, repeatedDays: [2, 3]});

calendar.addRepeatedEvent({date: parseInt(+new Date() / 1000) + 12, name: 'b',
  callback: function () {
    console.log('callback 22222');
  }, repeatedDays: [5, 6]});

calendar.getEventList();
calendar.deleteEvent();
*/

//проверка посторяющихся событий
