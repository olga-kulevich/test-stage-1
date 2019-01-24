(function (global) {
  var repeatEventList = [];
  var parent = global.Calendar;

  function Repeater() {
    parent.apply(this, arguments);
  }

  Repeater.prototype = Object.create(parent.prototype);
  Repeater.prototype.constructor = Repeater;

  Repeater.prototype.addRepeatedEvent = function (options) {
    var seriaOfEvents = {};
    var newEvent;
    var dateNow = new Date();
    var candidate;
    var dateAfterTwoYears;

    if (typeof (options.name) !== 'string') {
      throw 'name must be string';
    }
    if (options.name === '') {
      throw 'name cannot be empty string';
    }
    if (typeof (options.date) !== 'number'){
      throw 'date must be number';
    }
    if (typeof (options.callback) !== 'function') {
      throw 'callback must be function';
    }
    if (typeof (options.repeatedDays) !== 'object') {
      throw 'repeatedDays must be array with day numbers';
    }

    seriaOfEvents = {
      id: new Date().getTime() + '-' + Math.random().toFixed(36).substr(2, 10),
      time: options.date,
      name: options.name,
      callback: options.callback,
      days: options.repeatedDays,
      ids: []
    };

    candidate = new Date(options.date * 1000);
    dateAfterTwoYears = new Date(dateNow.setFullYear(dateNow.getFullYear() + 2));

    while (candidate < dateAfterTwoYears) {
      if (options.repeatedDays.indexOf(candidate.getDay()) !== -1) {
        newEvent = global.Calendar.prototype.addEvent({
          date: candidate.getTime() / 1000,
          name: options.name,
          callback: options.callback
        });
        seriaOfEvents.ids.push(newEvent.id);
      }
      candidate.setDate(candidate.getDate() + 1);
    }
    repeatEventList.push(seriaOfEvents);
  };

  Repeater.prototype.updateRepeatedEvent = function (options) {
    var i;
    var cb;

    if (typeof (options.id) !== 'string') {
      throw 'id must be string';
    }
    if (options.id === '') {
      throw 'id cannot be empty string';
    }
    if (typeof (options.newDate) !== 'number') {
      throw 'date must be number';
    }
    if (typeof (options.newName) !== 'string') {
      throw 'name must be string';
    }
    if (options.newName === '') {
      throw 'name cannot be empty string';
    }
    if (typeof (options.days) !== 'object') {
      throw 'days must be array with day numbers';
    }

    for (i = 0; i < repeatEventList.length; i += 1) {
      if (repeatEventList[i].ids.indexOf(options.id) !== -1) {
        cb = repeatEventList[i].callback;
      }
    }
    global.Calendar.prototype.deleteEvent(options);
    Repeater.prototype.addRepeatedEvent({
      date: options.newDate,
      name: options.newName,
      callback: cb,
      repeatedDays: options.days
    });
  };

  Repeater.prototype.deleteEvent = function (options) {
    var i;
    var j;
    var series;

    if (typeof (options.id) !== 'string') {
      throw 'id must be string';
    }
    if (options.id === '') {
      throw 'id cannot be empty string';
    }
    if (options.single) {
      return parent.prototype.deleteEvent.call(this, { id: options.id, single: true });
    }

    for (i = 0; i < repeatEventList.length; i += 1) {
      if (repeatEventList[i].ids.indexOf(options.id) !== -1) {
        series = repeatEventList[i];
      }
    }

    if (series) {
      for (j = 0; j < series.ids.length; j += 1) {
        global.Calendar.prototype.deleteEvent.call(this, { id: series.ids[j], single: true });
      }
      repeatEventList = repeatEventList.filter(function (seriesEv) {
        return seriesEv.id !== series.id;
      });
    } else {
      global.Calendar.prototype.deleteEvent.call(this, { id: options.id, single: true });
    }
  };

  global.Calendar = Repeater;
}(typeof module !== 'undefined' ? module.exports : window));
