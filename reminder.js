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
    if (typeof (options.reminderTime) !== 'number') {
      throw 'reminderTime must be number';
    }
    if (typeof (options.reminderCallback) !== 'function') {
      throw 'reminderCallback must be function';
    }
    time = options.reminderTime;
    globalCallback = options.reminderCallback;
    Reminder.prototype.startReminder();
  };

  Reminder.prototype.createReminderForEvent = function (
    options
  ) {
    var reminderForEvent;
    if (typeof (options.reminderTimeForEvent) !== 'number') {
      throw 'date must be number';
    }
    if (typeof (options.reminderCallbackForEvent) !== 'function') {
      throw 'callback must be function';
    }
    if (typeof (options.eventId) !== 'string') {
      throw 'id must be string';
    }
    if (options.eventId === '') {
      throw 'id cannot be empty string';
    }
    reminderForEvent = new ReminderForEvent(
      options.reminderTimeForEvent,
      options.reminderCallbackForEvent,
      options.eventId
    );
    reminderList.push(reminderForEvent);
    Reminder.prototype.startReminder();
    return reminderForEvent;
  };

  function startGlobalReminder() {
    var EVENT_LIST = global.Calendar.prototype.getEventList();
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
        delay = (nearestEvent.date - Math.floor((new Date()).getTime() / 1000) - time) * 1000;

        timerId = setTimeout(function () {
          globalCallback();
          nearestEvent.notified = true;
          startGlobalReminder();
        }, delay);
      }
    }
  }

  function startReminderForEvent() {
    var EVENT_LIST = global.Calendar.prototype.getEventList();
    var notExecutedEvents;
    var reminderCandidates;
    var nearestReminder;
    var eventWithNearestReminder;
    var delay;
    var findReminderWithNearestEvent = function () {
      var nearestReminderForEvent1;
      var nearestReminderForEvent2;
      return notExecutedEvents.reduce(function (event1, event2) {
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

        nearestReminderForEvent1 = remindersForEvent1.reduce(function (reminder1, reminder2) {
          return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
        });
        nearestReminderForEvent2 = remindersForEvent2.reduce(function (reminder1, reminder2) {
          return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
        });

        return (event1.time - nearestReminderForEvent1.reminderTime
          < event2.time - nearestReminderForEvent2.reminderTime
          ? event1
          : event2);
      });
    };

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

    eventWithNearestReminder = findReminderWithNearestEvent();

    reminderCandidates = reminderList.filter(function (reminder) {
      return (reminder.id === eventWithNearestReminder.id && !reminder.completed);
    });

    if (reminderCandidates.length === 0) {
      return null;
    }

    nearestReminder = reminderCandidates.reduce(function (reminder1, reminder2) {
      return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
    });

    delay = (eventWithNearestReminder.date - Math.floor((new Date()).getTime() / 1000) - nearestReminder.reminderTime) * 1000;

    timerIdEvent = setTimeout(function () {
      nearestReminder.reminderCallback();
      nearestReminder.completed = true;
      startReminderForEvent();
    }, delay);
  }

  Reminder.prototype.eventsUpdated = function () {
    var result = parent.prototype.eventsUpdated.apply(this, arguments);
    Reminder.prototype.startReminder();
    return result;
  };

  Reminder.prototype.startReminder = function () {
    startGlobalReminder();
    startReminderForEvent();
  };

  global.Calendar = Reminder;
}(typeof module !== 'undefined' ? module.exports : window));
