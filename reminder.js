(function (global) {
  var timerId;
  var timerIdEvent;
  var time;
  var globalCallback;
  var reminderList = [];
  var parent = global.Calendar;

  function ReminderForEvent(reminderTime, reminderCallback, eventId) {
    this.id = eventId;
    this.reminderTime = reminderTime;
    this.reminderCallback = reminderCallback;
    this.completed = false;
  }

  function Reminder() {
    parent.apply(this, arguments);
  }

  Reminder.prototype = Object.create(parent.prototype);
  Reminder.prototype.constructor = Reminder;

  Reminder.prototype.createGlobalReminder = function (options) {
    time = options.reminderTime;
    globalCallback = options.reminderCallback;
    Reminder.prototype.startReminder();
  };

  Reminder.prototype.createReminderForEvent = function (
    options
  ) {
    var reminderForEvent = new ReminderForEvent(
      options.reminderTimeForEvent,
      options.reminderCallbackForEvent,
      options.eventId
    );
    reminderList.push(reminderForEvent);
    Reminder.prototype.startReminder();
    return reminderForEvent;
  };

  function startGlobalReminder() {
    var EVENT_LIST = Reminder.prototype.getEventList();
    var currentTime = Math.floor((new Date()).getTime() / 1000);
    var notExecutedEvents;
    var delay;
    var nearestEvent;

    if (!time || !globalCallback) {
      return;
    }

    if (timerId) {
      clearTimeout(timerId);
    }

    if (EVENT_LIST.length > 0) {
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
    var EVENT_LIST = Reminder.prototype.getEventList();
    var currentTime = Math.floor((new Date()).getTime() / 1000);
    var notExecutedEvents;
    var reminderCandidates;
    var nearestReminder;
    var delay;

    if (EVENT_LIST.length === 0 || reminderList.length === 0) {
      return null;
    }

    if (timerIdEvent) {
      clearTimeout(timerIdEvent);
    }

    notExecutedEvents = EVENT_LIST.filter(function (event) {
      return !event.completed;
    });

    if (notExecutedEvents.length === 0) {
      return;
    }

    var eventWithNearestReminder = notExecutedEvents.reduce(function (event1, event2) {
      var remindersForEvent1 = reminderList.filter(function (reminder) {
        return (reminder.id === event1.id && !reminder.completed);
      });
      var remindersForEvent2 = reminderList.filter(function (reminder) {
        return (reminder.id === event2.id && !reminder.completed);
      });
      if (remindersForEvent1.length === 0) {
        return event2;
      }
      if (remindersForEvent2.length === 0) {
        return event1;
      }

      var nearestReminderForEvent1 = remindersForEvent1.reduce(function (reminder1, reminder2) {
        return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
      });
      var nearestReminderForEvent2 = remindersForEvent2.reduce(function (reminder1, reminder2) {
        return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
      });

      return (event1.time - nearestReminderForEvent1.reminderTime < event2.time - nearestReminderForEvent2.reminderTime
        ? event1
        : event2);
    });

    reminderCandidates = reminderList.filter(function (reminder) {
      return (reminder.id === eventWithNearestReminder.id && !reminder.completed);
    });

    if (reminderCandidates.length === 0) {
      return null;
    }

    nearestReminder = reminderCandidates.reduce(function (reminder1, reminder2) {
      return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
    });

    delay = (eventWithNearestReminder.date - currentTime - nearestReminder.reminderTime) * 1000;

    timerIdEvent = setTimeout(function () {
      nearestReminder.reminderCallback();
      nearestReminder.completed = true;
      startReminderForEvent();
    }, delay);
  }

  Reminder.prototype.startEvent = function () {
    var result = parent.prototype.startEvent.apply(this, arguments);
    Reminder.prototype.startReminder();
    return result;
  };

  Reminder.prototype.startReminder = function () {
    startGlobalReminder();
    startReminderForEvent();
  };

  Reminder.prototype.addEvent = function () {
    return parent.prototype.addEvent.apply(this, arguments);
  };

  Reminder.prototype.updateEvent = function () {
    var result = parent.prototype.updateEvent.apply(this, arguments);
    Reminder.prototype.startReminder();
    return result;
  };

  Reminder.prototype.deleteEvent = function () {
    var result = parent.prototype.deleteEvent.apply(this, arguments);
    Reminder.prototype.startReminder();
    return result;
  };

  global.Calendar = Reminder;
}(typeof module !== 'undefined' ? module.exports : window));
