(function (global) {
  var timerId;
  var timerIdEvent;
  var time;
  var globalCallback;
  var that;
  var reminderList = [];

  function Reminder() {
    global.Calendar.apply(this, arguments);
    that = this;
  }

  function ReminderForEvent(reminderTime, reminderCallback, eventId) {
    this.id = eventId;
    this.reminderTime = reminderTime;
    this.reminderCallback = reminderCallback;
    this.completed = false;
  }

  Reminder.prototype = Object.create(global.Calendar.prototype);
  Reminder.prototype.constructor = Reminder;

  Reminder.prototype.createGlobalReminder = function (reminderTime, reminderCallback) {
    time = reminderTime;
    globalCallback = reminderCallback;
    that.startEvent();
  };

  Reminder.prototype.createReminderForEvent = function (
    reminderTimeForEvent,
    reminderCallbackForEvent,
    eventId
  ) {
    var reminderForEvent = new ReminderForEvent(
      reminderTimeForEvent,
      reminderCallbackForEvent,
      eventId
    );
    reminderList.push(reminderForEvent);
    that.startEvent();
    return reminderForEvent;
  };

  function startGlobalReminder() {
    var EVENT_LIST = that.getEventList();
    var currentTime = Math.floor((new Date()).getTime() / 1000);
    var notExecutedEvents;
    var delay;
    var nearestEvent;

    if (!time || !globalCallback) {
      return;
    }

    if (EVENT_LIST.length > 0) {
      if (timerId) {
        clearTimeout(timerId);
      }

      notExecutedEvents = EVENT_LIST.filter(function (event) {
        return !event.completed && !event.notified;
      });

      if (notExecutedEvents.length) {
        nearestEvent = notExecutedEvents.reduce(function (event1, event2) {
          return (event1.date < event2.date ? event1 : event2);
        });
        delay = (nearestEvent.date - currentTime - time) * 1000;

        timerId = setTimeout(function () {
          globalCallback();
          nearestEvent.notified = true;
          startGlobalReminder();
        }, delay);
      }
    }
  }

  function startReminderForEvent() {
    var EVENT_LIST = that.getEventList();
    var currentTime = Math.floor((new Date()).getTime() / 1000);
    var notExecutedEvents;
    var remindersForNearestEvent;
    var nearestReminder;
    var delay;
    var nearestEvent;

    if (EVENT_LIST.length > 0 && reminderList.length > 0) {

      if (timerIdEvent) {
        clearTimeout(timerIdEvent);
      }

      notExecutedEvents = EVENT_LIST.filter(function (event) {
        return !event.completed;
      });

      if (notExecutedEvents.length > 0) {
        nearestEvent = notExecutedEvents.reduce(function (event1, event2) {
          return (event1.date < event2.date ? event1 : event2);
        });

        remindersForNearestEvent = reminderList.filter(function (reminder) {
          return (reminder.id === nearestEvent.id && !reminder.completed);
        });

        if (remindersForNearestEvent.length > 0) {
          nearestReminder = remindersForNearestEvent.reduce(function (reminder1, reminder2) {
            return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
          });

          delay = (nearestEvent.date - currentTime - nearestReminder.reminderTime) * 1000;

          timerIdEvent = setTimeout(function () {
            nearestReminder.reminderCallback();
            nearestReminder.completed = true;
            startReminderForEvent();
          }, delay);
        }
      } else {
        return;
      }
    }
  }

  Reminder.prototype.startEvent = function () {
    global.Calendar.prototype.startEvent.apply(this, arguments);
    startGlobalReminder();
    startReminderForEvent();
  };

  Reminder.prototype.addEvent = function (date, name, callback) {
    global.Calendar.prototype.addEvent.apply(this, arguments);
    that.startEvent();
  };

  Reminder.prototype.updateEvent = function (id, newName, newDate) {
    global.Calendar.prototype.updateEvent.apply(this, arguments);
    that.startEvent();
  };

  Reminder.prototype.deleteEvent = function (id) {
    global.Calendar.prototype.deleteEvent.apply(this, arguments);
    that.startEvent();
  };

  global.Reminder = Reminder;
}(typeof module !== 'undefined' ? module.exports : window));
