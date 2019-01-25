(function (global) {
  var repeatEventList = [];
  var parent = global.Calendar;

  function Repeater() {
    parent.apply(this, arguments);
  }

  Repeater.prototype = Object.create(parent.prototype);
  Repeater.prototype.constructor = Repeater;

  Repeater.prototype.addRepeatedEvent = function (options) {
    var dateNow = new Date();

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

    var seriaOfRepeatedEvents = {
      id: new Date().getTime() + '-' + Math.random().toFixed(36).substr(2, 10),
      time: options.date,
      name: options.name,
      callback: options.callback,
      days: options.repeatedDays,
      ids: []
    };

    var candidateDate = new Date(options.date * 1000);
    var dateAfterTwoYears = new Date(dateNow.setFullYear(dateNow.getFullYear() + 2));

    while (candidateDate < dateAfterTwoYears) {
      if (options.repeatedDays.indexOf(candidateDate.getDay()) !== -1) {
        var newEvent = global.Calendar.prototype.addEvent({
          date: candidateDate.getTime() / 1000,
          name: options.name,
          callback: options.callback
        });
        seriaOfRepeatedEvents.ids.push(newEvent.id);
      }
      candidateDate.setDate(candidateDate.getDate() + 1);
    }

    repeatEventList.push(seriaOfRepeatedEvents);
  };

  Repeater.prototype.updateRepeatedEvent = function (options) {
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

    for (var i = 0; i < repeatEventList.length; i++) {
      if (repeatEventList[i].ids.indexOf(options.id) !== -1) {
        var cb = repeatEventList[i].callback;
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

    for (i = 0; i < repeatEventList.length; i += 1) {
      if (repeatEventList[i].ids.indexOf(options.id) !== -1) {
        series = repeatEventList[i];
      }
    }

    if (series) {
      for (j = 0; j < series.ids.length; j += 1) {
        parent.prototype.deleteEvent.call(this, { id: series.ids[j] });
      }
      repeatEventList = repeatEventList.filter(function (seriesEv) {
        return seriesEv.id !== series.id;
      });
    } else {
      return parent.prototype.deleteEvent.call(this, { id: options.id });
    }
  };

  global.Calendar = Repeater;
}(typeof module !== 'undefined' ? module.exports : window));
