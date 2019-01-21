(function (global) {
  var repeatEventList = [];
  var that;

  function Repeater() {
    global.Calendar.apply(this, arguments);
    that = this;
  }
  Repeater.prototype = Object.create(global.Calendar.prototype);
  Repeater.prototype.constructor = Repeater;

  Repeater.prototype.addRepeatedEvent = function (date, name, callback, repeatedDays) {
    var event = {};
    var dateNow = new Date();
    var candidate;

    if (typeof (name) === 'string' && typeof (date) === 'number'
      && typeof (callback) === 'function' && typeof (repeatedDays) === 'object') {
      event = {
        id: new Date().getTime() + '-' + Math.random().toFixed(36).substr(2, 10),
        time: date,
        name: name,
        callback: callback,
        days: repeatedDays
      };

      repeatEventList.push(event);
      candidate = new Date(date);
      while (candidate < dateNow.setFullYear(dateNow.getFullYear() + 2)) {
        if (repeatedDays.indexOf(candidate.getDay()) !== -1) {
          console.log(candidate);
          //that.addEvent();
          // @todo add event
        }
        candidate.setDate(candidate.getDate() + 1);
      }
    } else {
      return;
    }
  };

  global.Repeater = Repeater;
}(typeof module !== 'undefined' ? module.exports : window));
