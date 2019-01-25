(function (global) {
  var timerId;
  var timerIdEvent;
  var timeToRemind;
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
    timeToRemind = options.reminderTime;
    globalCallback = options.reminderCallback;
    Reminder.prototype.startReminder();
  };

  Reminder.prototype.createReminderForEvent = function (options) {
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
    var reminderForEvent = new ReminderForEvent(
      options.reminderTimeForEvent,
      options.reminderCallbackForEvent,
      options.eventId
    );
    reminderList.push(reminderForEvent);
    Reminder.prototype.startReminder();
    return reminderForEvent;
  };

  function findNearestEventForGlobalReminder () {
    var EVENT_LIST = global.Calendar.prototype.getEventList();
    var notExecutedEvents = EVENT_LIST.filter(function (event) {
      return !event.completed && !event.notified;
    });

    if (!notExecutedEvents.length) {
      return;
    }
    return notExecutedEvents.reduce(function (event1, event2) {
      return (event1.date < event2.date ? event1 : event2);
    });
  }

  function startGlobalReminder() {
    var EVENT_LIST = global.Calendar.prototype.getEventList();
    if (!timeToRemind || !globalCallback) {
      return;
    }
    if (timerId) {
      clearTimeout(timerId);
    }
    if (!EVENT_LIST.length) {
      return;
    }

    var nearestEvent = findNearestEventForGlobalReminder();
    var currentTime = Math.floor((new Date()).getTime() / 1000);

    if (!nearestEvent) {
      return;
    }

    var delay = (nearestEvent.date - currentTime - timeToRemind) * 1000;

    timerId = setTimeout(function () {
      globalCallback();
      nearestEvent.notified = true;
      global.Calendar.prototype.updateEvent(nearestEvent);
      startGlobalReminder();
    }, delay);
  }

  function findNotExecutedEvents () {
    var EVENT_LIST = global.Calendar.prototype.getEventList();
    return EVENT_LIST.filter(function (event) {
      return !event.completed;
    });
  }

  function findEventWithNearestReminder () {
    var notExecutedEvents = findNotExecutedEvents();

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

      var nearestReminderForEvent1 = remindersForEvent1.reduce(function (reminder1, reminder2) {
        return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
      });
      var nearestReminderForEvent2 = remindersForEvent2.reduce(function (reminder1, reminder2) {
        return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
      });

      return (event1.time - nearestReminderForEvent1.reminderTime
      < event2.time - nearestReminderForEvent2.reminderTime
        ? event1
        : event2);
    });
  }

  function findNearestReminder () {
    var eventWithNearestReminder = findEventWithNearestReminder();

    var reminderCandidates = reminderList.filter(function (reminder) {
      return (reminder.id === eventWithNearestReminder.id && !reminder.completed);
    });

    if (!reminderCandidates.length) {
      return null;
    }
    return reminderCandidates.reduce(function (reminder1, reminder2) {
      return (reminder1.reminderTime < reminder2.reminderTime ? reminder1 : reminder2);
    });
  }

  function startReminderForEvent() {
    var EVENT_LIST = global.Calendar.prototype.getEventList();

    if (!EVENT_LIST.length || !reminderList.length) {
      return null;
    }
    if (timerIdEvent) {
      clearTimeout(timerIdEvent);
    }

    var notExecutedEvents = findNotExecutedEvents();

    if (!notExecutedEvents.length) {
      return;
    }

    var eventWithNearestReminder = findEventWithNearestReminder();
    var nearestReminder = findNearestReminder();

    if (!nearestReminder) {
      return;
    }

    var currentTime = Math.floor((new Date()).getTime() / 1000);
    var delay = (eventWithNearestReminder.date - currentTime - nearestReminder.reminderTime) * 1000;

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
