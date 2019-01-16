(function (global) {
  var EVENT_LIST = [];

  function Event(date, name, callback) {
    this.id = Date.now();
    this.date = date;
    this.name = name;
    this.callback = callback;
  }

  function Calendar() {}

  global.Calendar = Calendar;

  Calendar.prototype.addEvent = function (date, name, callback) {
    if (typeof (name) === 'string' && typeof (date) === 'number' && typeof (callback) === 'function') {
      var event = new Event(date, name, callback);
      EVENT_LIST.push(event);
      // todo ls.save(EVENT_LIST);
      return event;
    }
  };

  Calendar.prototype.deleteEvent = function (id) {
    EVENT_LIST = EVENT_LIST.filter(function (event) {
      return event.id !== id;
    });
  };

  Calendar.prototype.updateEvent = function (id, newName, newDate) {
    EVENT_LIST = EVENT_LIST.map(function (event) {
      if (event.id === id) {
        return Object.assign({}, event, { name: newName, date: newDate });
      }
      return event;
    });
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

    currentTime.setHours(0,0,0,0);
    distance = dayOfStartWeek - currentDay;
    startOfWeek.setDate(currentTime.getDate() + distance);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return EVENT_LIST.filter(function (event) {
      return (event.date > startOfWeek / 1000 && event.date < endOfWeek / 1000)
    });
  };

  Calendar.prototype.getEventsForMonth = function () {
    var startOfMonth;
    var endOfMonth;
    var currentTime = new Date();
    currentTime.setHours(0,0,0,0);
    startOfMonth = currentTime.setDate(1) / 1000;
    endOfMonth = currentTime.setMonth(currentTime.getMonth() + 1) / 1000;
    return EVENT_LIST.filter(function (event) {
      return (event.date > startOfMonth && event.date < endOfMonth);
    });
  };

  Calendar.prototype.getEventsForPeriod = function (startOfPeriod, endOfPeriod) {
    if (!startOfPeriod || !endOfPeriod) {
      return console.error('error');
    }
    return EVENT_LIST.filter(function (event) {
      return (event.date > startOfPeriod && event.date < endOfPeriod);
    });
  };

}(typeof module !== 'undefined' ? module.exports : window));
