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
// var date = new Date(2009, 9, 2);
// try {
//   assert('%Y should return full year', date.strftime("%Y") === '2009');
//   assert('%m should return month as two digits', date.strftime("%m") === '10');
//   assert('%d should return date as two digits', date.strftime("%d") === '02');
//   assert('%y should year as two digits', date.strftime("%y") === '09');
//   assert('%F should act as %Y-%m-%d', date.strftime("%F") === '2009-10-02');
//   console.log(assert.count + " tests OK");
// }
// catch(e) {
//   console.log("Test failed: " + e.message);
// }

// using red or green instead of pass or fail is very common in testing
// Here we will use that visual que to grok our tests
function output(text, color) {
  var p = document.createElement('p');
  p.innerHTML = text;
  p.style.color = color;
  document.body.appendChild(p);
}
// console.log can now be replaced with
// output(assert.count + " tests OK", '#0c0');
// // and for failures:
// output("Test failed: " + e.message, "#c00");

// The major problem with our above test methods is that if one test fails it
// will throw an error and we won't know if tests after that are passing or
// failing.
// For mor control we would organize our tests into test functions, were each
// test function should exercise only one unit, but may do so using one or more
// assertions. For complete control we can also require each test to only test
// one specific behavior or a single unit
function testCase(name, tests) {
  assert.count = 0;
  var successful = 0;
  var testCount = 0;
  var hasSetup = typeof tests.setUp == "function";
  var hasTeardown = typeof tests.tearDown == "function";

  for(var test in tests) {
    if(!/^test/.test(test)) {
      continue;
    }
    testCount++;

    try {
      if(hasSetup) {
        tests.setUp();
      }
      tests[test]();
      output(test, "#0c0");

      if(hasTeardown) {
        tests.tearDown();
      }

      // If the tearDown method throws an error, it is
      // considered a test failure, so we don't count
      // success until all methods have run successfully
      successful++;
    }

    catch(e) {
      output(test + " failed: " + e.message, "#c00");
    }
  }
  // ternary operators are cool!!
  var color = successful == testCount ? "#0C0" : "#c00";
  output("<strong>" + testCount + " tests, " + (testCount - successful)
    + " failures</strong>", color);

}

// Use our new test case for our test
testCase("strftime test", {
  setUp: function() {
    this.date = new Date(2009, 9, 2, 22, 14, 45);
  },
  "test format specifier %Y" : function() {
    assert("%Y should return full year",
      this.date.strftime("%Y") === "2009");
  },
  "test format specifier %m": function() {
    assert("%m should return month as two digits",
      this.date.strftime("%m") === "10");
  },
  "test format specifier %d" : function() {
    assert("%d should return date as 2 digits",
      this.date.strftime("%d") === "02");
  },
  "test format specifier %y" : function() {
    assert("%y should return year as two digits",
      this.date.strftime("%y") === "09");
  },
  "test format shorthand %F" : function() {
    assert("%F should act as %Y-%m-%d",
      this.date.strftime("%F") === "2009-10-02");
  }
});
