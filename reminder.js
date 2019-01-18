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

  Reminder.prototype.createReminder = function (reminderTime, reminderCallback, id) {
    time = reminderTime;
    callback = reminderCallback;
    idEvent = id;
    that.startEvent();
  };

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

      if (!idEvent) {
        notExecutedEvents = EVENT_LIST.filter(function (event) {
          return !event.completed && !event.notified;
        });
        if (notExecutedEvents.length) {
          nearestEvent = notExecutedEvents.reduce(function (event1, event2) {
            return (event1.date < event2.date ? event1 : event2);
          });
          delay = (nearestEvent.date - currentTime - time) * 1000;

          timerId = setTimeout(function () {
            callback();
            nearestEvent.notified = true;
            that.startEvent();
          }, delay);
        } else {
          return;
        }
      } else if (idEvent) {
        notExecutedEvents = EVENT_LIST.filter(function (event) {
          return !event.completed && !event.notified && event.id === idEvent;
        });
        if (notExecutedEvents.length) {
          nearestEvent = notExecutedEvents[0];

          delay = (nearestEvent.date - currentTime - time) * 1000;

          timerId = setTimeout(function () {
            callback();
            nearestEvent.notified = true;
            that.startEvent();
          }, delay);
        }
      } else {
        return;
      }
    }
  };

  global.Reminder = Reminder;

}(typeof module !== 'undefined' ? module.exports : window));
