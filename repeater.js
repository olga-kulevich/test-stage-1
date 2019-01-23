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

    if (typeof (options.name) === 'string' && typeof (options.date) === 'number'
      && typeof (options.callback) === 'function' && typeof (options.repeatedDays) === 'object') {
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
          newEvent = Repeater.prototype.addEvent({date: candidate.getTime() / 1000, name: options.name, callback: options.callback});
          seriaOfEvents.ids.push(newEvent.id);
        }
        candidate.setDate(candidate.getDate() + 1);
      }
      repeatEventList.push(seriaOfEvents);
    }
  };

  Repeater.prototype.updateRepeatedEvent = function (options) {
    var i;
    var cb;

    for (i = 0; i < repeatEventList.length; i += 1) {
      if (repeatEventList[i].ids.indexOf(options.id) !== -1) {
        cb = repeatEventList[i].callback;
      }
    }
    Repeater.prototype.deleteEvent(options);
    Repeater.prototype.addRepeatedEvent({date: options.newDate, name: options.newName, callback: cb, repeatedDays: options.days});
  };

  Repeater.prototype.deleteEvent = function (options) {
    var i;
    var j;
    var series;

    for (i = 0; i < repeatEventList.length; i += 1) {
      if (repeatEventList[i].ids.indexOf(options.id) !== -1) {
        series = repeatEventList[i];
      }
    }

    if (series) {
      for (j = 0; j < series.ids.length; j += 1) {
        parent.prototype.deleteEvent.call(this, {id: series.ids[j]});
      }
      repeatEventList = repeatEventList.filter(function (seriesEv) {
        return seriesEv.id !== series.id;
      });
    } else {
      parent.prototype.deleteEvent.call(this, {id: options.id});
    }
  };

  global.Calendar = Repeater;
}(typeof module !== 'undefined' ? module.exports : window));
