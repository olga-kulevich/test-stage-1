(function (global) {
  var repeatEventList = [];
  var timerId;
  var that;

  function Repeater() {
    global.Calendar.apply(this, arguments);
    that = this;
  }

  Repeater.prototype = Object.create(global.Calendar.prototype);
  Repeater.prototype.constructor = Repeater;

  Repeater.prototype.findAndRunNearestRepeatedEvent = function () {
    var currentTime = new Date();
    var dayToday = currentTime.getDay();
    var eventsToday;
    var nearestEventToday;
    var eventTime;
    var hours;
    var minutes;
    var delay;

    if (timerId) {
      clearTimeout(timerId);
    }

    if (repeatEventList.length > 0) {
      eventsToday = repeatEventList.filter(function (event) {
        return (event.days.indexOf(dayToday) !== -1);
      });

      if (eventsToday.length > 0) {
        nearestEventToday = eventsToday.reduce(function (event1, event2) {
          return (new Date(event1.time).getHours() * 60 + new Date(event1.time).getMinutes())
            < (new Date(event2.time).getHours() * 60 + new Date(event2.time).getMinutes())
            ? event1 : event2;
        });

        hours = new Date(nearestEventToday.time).getHours();
        minutes = new Date(nearestEventToday.time).getMinutes();

        eventTime = currentTime.setHours(hours, minutes);

        delay = eventTime - new Date();

        timerId = setTimeout(function () {
          nearestEventToday.callback();
          that.findAndRunNearestRepeatedEvent();
        }, delay);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  Repeater.prototype.addEvent = function (date, name, callback, days) {
    var event = {};
    if (arguments.length < 4 || days.length === 0) {
      global.Calendar.prototype.addEvent.apply(this, arguments);
    }
    if (arguments.length === 4 && days.length > 0) {
      if (typeof (name) === 'string' && typeof (date) === 'number'
        && typeof (callback) === 'function' && typeof (days) === 'object') {
        event = {
          id: new Date().getTime() + '-' + Math.random().toFixed(36).substr(2, 10),
          time: date,
          name: name,
          callback: callback,
          days: days
        };
        repeatEventList.push(event);
        that.findAndRunNearestRepeatedEvent();
        return event;
      }
      return;
    }
  };

  global.Repeater = Repeater;
}(typeof module !== 'undefined' ? module.exports : window));
