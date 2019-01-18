(function (global) {
  var timerId;
  var time;
  var idEvent;
  var callback;
  var that;

  function Reminder() {
    global.Calendar.apply(this, arguments);
    that = this;
  }

  Reminder.prototype = Object.create(global.Calendar.prototype);
  Reminder.prototype.constructor = Reminder;

  Reminder.prototype.startEvent = function () {
    var EVENT_LIST = that.getEventList();
    var currentTime = Math.floor((new Date()).getTime() / 1000);
    var notExecutedEvents;
    var delay;
    var nearestEvent;

    if (!time || !callback) {
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
      } else {
        return;
      }

      delay = (nearestEvent.date - currentTime - time) * 1000;

      timerId = setTimeout(function () {
        callback();
        nearestEvent.notified = true;
        that.startEvent();
      }, delay);
    }
  };

  Reminder.prototype.createReminderForAllEvents = function (reminderTime, reminderCallback) {
    time = reminderTime;
    callback = reminderCallback;
    that.startEvent();
  };

  global.Reminder = Reminder;

}(typeof module !== 'undefined' ? module.exports : window));
