var calendar = new Calendar();
window.calendar = calendar;

//Добавление, удаление, обновление
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 10), name: "a",
  callback: function() {
      console.log("callback 11111!")
  }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 5), name: "b",
  callback: function() {
      console.log("callback 22222!")
  }});
console.log(calendar.getEventList());
calendar.deleteEvent({id: calendar.getEventList()[1].id})
console.log(calendar.getEventList());
calendar.updateEvent({id: calendar.getEventList()[0].id, newName: 'c',
 newDate: Math.floor((new Date).getTime() / 1000 + 2)});
console.log(calendar.getEventList());
*/

//Что будет если создать событие на 9.00, потом изменить его время на 10.00.
// Должен сработать колбэк только в 10.00
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 10), name: "a",
  callback: function() {
      console.log("callback 11111!")
  }});

calendar.updateEvent({id: calendar.getEventList()[0].id, newName: 'c',
  newDate: Math.floor((new Date).getTime() / 1000 + 1)});
 */

//Что будет если создать ивент и удалить его. ничего не должно произойти.
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 3), name: "a",
  callback: function() {
      console.log("callback 11111!")
  }});

console.log(calendar.getEventList());
calendar.deleteEvent({id: calendar.getEventList()[0].id})

console.log(calendar.getEventList());
*/

//если создать событие на 15.00 потом на 14,55.
//Сначала выполнится событие на 14,55, потом на 15.00
/*
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 10), name: "a",
  callback: function() {
      console.log("callback 11111!")
  }});
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 5), name: "b",
  callback: function() {
      console.log("callback 22222!")
  }});
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

//REMINDER.
//Создать события, создать ремайндер для всех событий и для конкретного.
/*
calendar.addEvent({
  date: Math.floor((new Date).getTime() / 1000 + 10),
  name: 'a',
  callback: function () {
    console.log('callback 11111');
  }});

calendar.addEvent({
  date: Math.floor((new Date).getTime() / 1000 + 15),
  name: 'b',
  callback: function () {
    console.log('callback 22222');
  }
});

calendar.createGlobalReminder({
  reminderTime: 1,
  reminderCallback: function () {
    console.log('reminderGLOB');
  }
});

calendar.createReminderForEvent({
  reminderTimeForEvent: 2,
  reminderCallbackForEvent: function () {
    console.log('reminderForEvent');
  },
  eventId: calendar.getEventList()[1].id
});

console.log(calendar.getEventList());
*/

// сначала globalReminder, потом событие
/*
calendar.createGlobalReminder({
  reminderTime: 1, reminderCallback: function () {
    console.log("reminderGLOB")
  }
});

calendar.addEvent({
  date: Math.floor((new Date).getTime() / 1000 + 5), name: "a",
  callback: function () {
    console.log("callback 11111")
  }
});

console.log(calendar.getEventList());
*/
/*
// События с запутанными ремайндерами
calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 15), name: "a",
  callback: function() {
      console.log("callback 11111")
  }});

calendar.addEvent({date: Math.floor((new Date).getTime() / 1000 + 20), name: "b",
  callback: function() {
      console.log("callback 22222")
  }});

calendar.createReminderForEvent({reminderTimeForEvent: 5, reminderCallbackForEvent: function () {
    console.log("reminderForEvent1")}, eventId: calendar.getEventList()[0].id});

calendar.createReminderForEvent({reminderTimeForEvent: 15, reminderCallbackForEvent: function () {
    console.log("reminderForEvent2")}, eventId: calendar.getEventList()[1].id});

console.log(calendar.getEventList());

 */

//REPEATER

//проверяем создание повторящихся событий и удаление их
/*
calendar.addRepeatedEvent({date: parseInt(+new Date() / 1000) + 10, name: 'a',
  callback: function () {
    console.log('callback 11111');
  }, repeatedDays: [2, 3]});

calendar.addRepeatedEvent({date: parseInt(+new Date() / 1000) + 12, name: 'b',
  callback: function () {
    console.log('callback 22222');
  }, repeatedDays: [5, 6]});

console.log(calendar.getEventList());
calendar.deleteEvent({id: calendar.getEventList()[42].id});
console.log(calendar.getEventList());
*/

//проверка создания повторяющегося события на 9,00 по пн,пт.
//потом меняем это событие на 10,00 по пн,вт.
/*
calendar.addRepeatedEvent({
  date: parseInt(+new Date() / 1000) + 2,
  name: 'a',
  callback: function () {
    console.log('callback 11111');
  },
  repeatedDays: [3, 2]
});

calendar.updateRepeatedEvent({
  id: calendar.getEventList()[0].id,
  newDate: parseInt(+new Date() / 1000) + 15,
  newName: 'new name c',
  days: [(new Date()).getDay(), 2]
});

console.log(calendar.getEventList());
*/

//создать повторяющееся событие и потом удалить его.
//Ничего не должно происходить

/*
calendar.addRepeatedEvent({date: parseInt(+new Date() / 1000) + 8, name: 'a',
  callback: function () {
    console.log('callback 11111');
  }, repeatedDays: [(new Date()).getDay()]});

calendar.addRepeatedEvent({date: parseInt(+new Date() / 1000) + 10, name: 'b',
  callback: function () {
    console.log('callback 22222');
  }, repeatedDays: [(new Date()).getDay()]});

console.log(calendar.getEventList());
calendar.deleteEvent({id: calendar.getEventList()[0].id});
console.log(calendar.getEventList());
*/

//проверка создания повтор-ся событий на 15,00 и на 14,55 на одинаковый день.
//должно выполниться на 14,55 потом на 15,00
/*
calendar.addRepeatedEvent({
  date: parseInt(+new Date() / 1000) + 10,
  name: 'a',
  callback: function () {
    console.log('callback 11111');
  },
  repeatedDays: [(new Date()).getDay()]
});

calendar.addRepeatedEvent({
  date: parseInt(+new Date() / 1000) + 5,
  name: 'a',
  callback: function () {
    console.log('callback 22222');
  },
  repeatedDays: [(new Date()).getDay()]
});
*/

//проверка ремайндера для повторяющихся ивентов
/*

calendar.addRepeatedEvent({
  date: parseInt(+new Date() / 1000) + 10, name: 'a',
  callback: function () {
    console.log('callback 11111');
  }, repeatedDays: [(new Date()).getDay()]
});

calendar.createReminderForEvent({
  reminderTimeForEvent: 5,
  reminderCallbackForEvent: function () {
    console.log("reminderForEvent1")
  },
  eventId: calendar.getEventList()[0].id
});

*/
