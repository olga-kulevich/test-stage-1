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

  Calendar.prototype.eventsUpdated = function () {
  };

  function findNearestEvent () {
    var notExecutedEvents = EVENT_LIST.filter(function (event) {
      return !event.completed;
    });

    if (notExecutedEvents.length) {
      return notExecutedEvents.reduce(function (event1, event2) {
        return (event1.date < event2.date ? event1 : event2);
      });
    } else {
      return;
    }
  }

  function findAndRunNearestEventForExecution() {
    var currentTime = Math.floor((new Date()).getTime() / 1000);

    if (timerId) {
      clearTimeout(timerId);
    }

    global.Calendar.prototype.eventsUpdated();

    if (EVENT_LIST.length) {

      var nearestEvent = findNearestEvent();

      if (!nearestEvent) {
        return;
      }

      var delay = (nearestEvent.date - currentTime) * 1000;

      timerId = setTimeout(function () {
        nearestEvent.callback();
        nearestEvent.completed = true;
        findAndRunNearestEventForExecution();
      }, delay);
    }
  }

  Calendar.prototype.addEvent = function (options) {
    if (typeof (options.name) !== 'string') {
      throw 'name must be string';
    }
    if (options.name === '') {
      throw 'name cannot be empty string';
    }
    if (typeof (options.date) !== 'number') {
      throw 'date must be number';
    }
    if (typeof (options.callback) !== 'function') {
      throw 'callback must be function';
    }
    var event = new Event(options.date, options.name, options.callback);
    EVENT_LIST.push(event);
    // todo ls.save(EVENT_LIST);

    findAndRunNearestEventForExecution();
    return event;
  };

  Calendar.prototype.deleteEvent = function (options) {
    if (typeof (options.id) !== 'string') {
      throw 'id must be string';
    }
    if (options.id === '') {
      throw 'id cannot be empty string';
    }
    EVENT_LIST = EVENT_LIST.filter(function (event) {
      return event.id !== options.id;
    });
    findAndRunNearestEventForExecution();
  };

  Calendar.prototype.updateEvent = function (options) {
    if (typeof (options.id) !== 'string') {
      throw 'id must be string';
    }
    if (options.id === '') {
      throw 'id cannot be empty string';
    }
    if (options.name) {
      if (typeof (options.name) !== 'string') {
        throw 'name must be string';
      }
      if (options.name === '') {
        throw 'name cannot be empty string';
      }
    }
    if (options.date) {
      if (typeof (options.date) !== 'number') {
        throw 'date must be number';
      }
    }
    if (options.callback) {
      if (typeof (options.callback) !== 'function') {
        throw 'callback must be function';
      }
    }
    if (options.completed) {
      if (typeof (options.completed) !== 'boolean') {
        throw 'completed must be boolean';
      }
    }

    EVENT_LIST = EVENT_LIST.map(function (event) {
      if (event.id === options.id) {
        return Object.assign({}, event, { name: options.newName, date: options.newDate });
      }
      return event;
    });
    findAndRunNearestEventForExecution();
  };

  Calendar.prototype.getEventList = function () {
    return EVENT_LIST.map(function (event) {
      return Object.assign({}, event);
    });

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

    currentTime.setHours(0, 0, 0, 0);
    var distance = dayOfStartWeek - currentDay;
    startOfWeek.setDate(currentTime.getDate() + distance);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return EVENT_LIST.filter(function (event) {
      return (event.date > startOfWeek / 1000 && event.date < endOfWeek / 1000);
    });
  };

  Calendar.prototype.getEventsForMonth = function () {
    var currentTime = new Date();

    currentTime.setHours(0, 0, 0, 0);
    var startOfMonth = currentTime.setDate(1) / 1000;
    var endOfMonth = currentTime.setMonth(currentTime.getMonth() + 1) / 1000;
    return EVENT_LIST.filter(function (event) {
      return (event.date > startOfMonth && event.date < endOfMonth);
    });
  };

  Calendar.prototype.getEventsForPeriod = function (options) {
    if (!options.startOfPeriod || !options.endOfPeriod) {
      throw 'enter startOfPeriod and endOfPeriod';
    }
    if (typeof (options.startOfPeriod) !== 'number' || typeof (options.endOfPeriod) !== 'number') {
      throw 'startOfPeriod and endOfPeriod must be number';
    }
    return EVENT_LIST.filter(function (event) {
      return (event.date > options.startOfPeriod && event.date < options.endOfPeriod);
    });
  };

  global.Calendar = Calendar;
}(typeof module !== 'undefined' ? module.exports : window));
