Date.prototype.strftime = (function() {
  function strftime(format) {
    var date = this;

    return (format + "").replace(/%([a-zA-Z])/g,
    function(m, f) {

      var formatter = Date.formats && Date.formats[f];

      if(typeof formatter == 'function') {
        return formatter.call(Date.formats, date);
      }
      else if(typeof formatter == 'string') {
        return date.strftime(formatter);
      }
      return f;
    });
  }
  // Internal helper
  function zeroPad(num) {
    return (+num < 10 ? "0" : "") + num;
  }

  Date.formats = {
    // formatting methods
    d: function(date) {
      return zeroPad(date.getDate());
    },
    m: function(date) {
      return zeroPad(date.getMonth() + 1); // months are index based so + 1
    },
    y: function(date) {
      return zeroPad(date.getFullYear() % 100); // returns remainder:  2016 to 16
    },
    Y: function(date) {
      return date.getFullYear();
    },
    // format shorthands
    F: "%Y-%m-%d",
    D: "%m/%d/%y",
    j: function(date) {
      var jan1 = new Date(date.getFullyear(), 0, 1);
      var diff = date.getTime() - jan1.getTime();

      // 86400000 == 60 * 60 * 24 * 1000
      return Math.ceil(diff / 86400000);
    }
  };

  return strftime;
}());
