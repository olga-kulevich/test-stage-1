(function (global) {
  var EVENT_LIST = [];
  var timerId;

  function Event(date, name, callback) {
    this.id = new Date().getTime() + '-' + Math.random().toFixed(36).substr(2, 10);
    this.date = date;
    this.name = name;
    this.callback = callback;
    this.completed = false;
  }

  function Calendar() {
  }

  Calendar.prototype.startEvent = function () {
  };

  function findAndRunNearestEventForExecution() {
    var notExecutedEvents;
    var delay;
    var nearestEvent;
    var currentTime = Math.floor((new Date()).getTime() / 1000);

    if (timerId) {
      clearTimeout(timerId);
    }

    if (EVENT_LIST.length > 0) {
      notExecutedEvents = EVENT_LIST.filter(function (event) {
        return !event.completed;
      });

      if (notExecutedEvents.length) {
        nearestEvent = notExecutedEvents.reduce(function (event1, event2) {
          return (event1.date < event2.date ? event1 : event2);
        });
      } else {
        return;
      }

      delay = (nearestEvent.date - currentTime) * 1000;

      timerId = setTimeout(function () {
        nearestEvent.callback();
        nearestEvent.completed = true;
        findAndRunNearestEventForExecution();
        Calendar.prototype.startEvent();
      }, delay);
    }
  }

  Calendar.prototype.addEvent = function (options) {
    var event;
    if (typeof (options.name) === 'string' && typeof (options.date) === 'number' && typeof (options.callback) === 'function') {
      event = new Event(options.date, options.name, options.callback);
      EVENT_LIST.push(event);
      // todo ls.save(EVENT_LIST);
      findAndRunNearestEventForExecution();
      return event;
    }
    return null;
  };

  Calendar.prototype.deleteEvent = function (options) {
    EVENT_LIST = EVENT_LIST.filter(function (event) {
      return event.id !== options.id;
    });
    findAndRunNearestEventForExecution();
  };

  Calendar.prototype.updateEvent = function (options) {
    EVENT_LIST = EVENT_LIST.map(function (event) {
      if (event.id === options.id) {
        return Object.assign({}, event, { name: options.newName, date: options.newDate });
      }
      return event;
    });
    findAndRunNearestEventForExecution();
  };

  Calendar.prototype.getEventList = function () {
    return EVENT_LIST;
  };

  Calendar.prototype.getEventsForDay = function () {
    var currentTime = new Date();
    var tomorrow = new Date();
    currentTime.setHours(0, 0, 0, 0);
    tomorrow.setDate(currentTime.getDate() + 1);
    return (EVENT_LIST.filter(function (event) {
      return (event.date > currentTime / 1000 && event.date < tomorrow / 1000);
    }));
  };

  Calendar.prototype.getEventsForWeek = function () {
    var currentTime = new Date();
    var startOfWeek = new Date();
    var endOfWeek = new Date();
    var dayOfStartWeek = 0;
    var currentDay = currentTime.getDay();
    var distance;

    currentTime.setHours(0, 0, 0, 0);
    distance = dayOfStartWeek - currentDay;
    startOfWeek.setDate(currentTime.getDate() + distance);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return EVENT_LIST.filter(function (event) {
      return (event.date > startOfWeek / 1000 && event.date < endOfWeek / 1000);
    });
  };

  Calendar.prototype.getEventsForMonth = function () {
    var startOfMonth;
    var endOfMonth;
    var currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0);
    startOfMonth = currentTime.setDate(1) / 1000;
    endOfMonth = currentTime.setMonth(currentTime.getMonth() + 1) / 1000;
    return EVENT_LIST.filter(function (event) {
      return (event.date > startOfMonth && event.date < endOfMonth);
    });
  };

  Calendar.prototype.getEventsForPeriod = function (options) {
    if (!options.startOfPeriod || !options.endOfPeriod) {
      return console.error('error');
    }
    return EVENT_LIST.filter(function (event) {
      return (event.date > options.startOfPeriod && event.date < options.endOfPeriod);
    });
  };

  global.Calendar = Calendar;
}(typeof module !== 'undefined' ? module.exports : window));
