/*
* I don't know how much actuall coding is going to go on in the first Chapter
* but I have always found that coding all the examples isn't a bad idea.
* Many of the examples will be broken down into their own files to make it work
* as the author intended. But also all examples will be listed in this file.
* Stephen Bolton
 */

// Most languages have a strftime function, which is a way of taking the current
// time and formating it in a certain way. Here is an implementation in js
// Author goes out of his way to say that all the code in this chapter might
// be a little heavy and all the concepts will be explained in due time
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
    D: "%m/%d/%y"
  };

  return strftime;
}());

var date = new Date(2009,11,5);
console.log(date.strftime("%Y"));
console.log(date.strftime("%m"));
console.log(date.strftime('%d'));
console.log(date.strftime('%y'));

// Simple assert function
function assert(message, expr) {
  if(!expr) {
    throw new Error(message); // need to learn about throwing errors!
  }
  assert.count++;
  return true;
}

assert.count = 0;

// using our assert method for testing
var date = new Date(2009, 9, 2);
try {
  assert('%Y should return full year', date.strftime("%Y") === '2009');
  assert('%m should return month as two digits', date.strftime("%m") === '10');
  assert('%d should return date as two digits', date.strftime("%d") === '02');
  assert('%y should year as two digits', date.strftime("%y") === '09');
  assert('%F should act as %Y-%m-%d', date.strftime("%F") === '2009-10-02');
  console.log(assert.count + " tests OK");
}
catch(e) {
  console.log("Test failed: " + e.message);
}

// using red or green instead of pass or fail is very common in testing
// Here we will use that visual que to grok our tests
function output(text, color) {
  var p = document.createElement('p');
  p.innerHTML = text;
  p.style.color = color;
  document.body.appendChild(p);
}
// console.log can now be replaced with
output(assert.count + " tests OK", '#0c0');
// and for failures:
output("Test failed: " + e.message, "#c00");
