$(document).ready(function(){

  // variable that indicates whether in work session or not - aka break session
  var inSession = true;

  // timer display
  var timerDisplayTime = 60 * 25;
  var timerDisplayMinutes;
  var updateTimerDisplay = function() {
    if (timerDisplayTime%60 < 10) {
      timerDisplayMinutes = "0" + timerDisplayTime%60
    }
    else {
      timerDisplayMinutes = timerDisplayTime%60
    };
    $("#timerDisplay").replaceWith("<h1 id='timerDisplay' class='text-center'>" + (Math.floor(timerDisplayTime/60)) + ":" + (timerDisplayMinutes) + "</h1>");
  };

  // work sessions
  var length = 1000 * 60 * 25;
  var updateLengthField = function() {
    $("#desiredLength").replaceWith("<h4 id='desiredLength' class='inlineStuff vertAlign'>" + (length / 60000) + "</h4>");
  };
  $("#increaseTimeButton").click(function(){
    length += 60000;
    updateLengthField();
    if (inSession) {
      timerDisplayTime = length / 1000;
      updateTimerDisplay();
    };
  });
  $("#decreaseTimeButton").click(function(){
    if (length >= 120000) {
      length -= 60000;
      updateLengthField();
    if (inSession) {
      timerDisplayTime = length / 1000;
      updateTimerDisplay();
    };
    };
  });

  // break sessions
  var breakTime = 1000 * 60 * 5;
  var updateBreakField = function() {
    $("#desiredBreak").replaceWith("<h4 id='desiredBreak' class='inlineStuff vertAlign'>" + (breakTime / 60000) + "</h4>");
  };
  $("#increaseBreakButton").click(function(){
    breakTime += 60000;
    updateBreakField();
  });
  $("#decreaseBreakButton").click(function(){
    if (breakTime >= 120000) {
      breakTime -= 60000;
      updateBreakField();
    };
  });

  // setting the display functionality
  var intervalFunction = function() {
    if (timerDisplayTime > 0 && inSession === true) {
      timerDisplayTime -= 1;
      updateTimerDisplay();
      $("#timeIcon").toggleClass("fa-customSize1 fa-customSize2");
    }
    else if (timerDisplayTime == 0 && inSession === true) {
      inSession = false;
      timerDisplayTime = breakTime / 1000;
      updateTimerDisplay();
      $("#timeIcon").toggleClass("fa-clock-o fa-bed");
    }
    else if (timerDisplayTime > 0 && inSession === false) {
      timerDisplayTime -= 1;
      updateTimerDisplay();
      $("#timeIcon").toggleClass("fa-customSize1 fa-customSize2");
    }
    else {
      inSession = true;
      timerDisplayTime = length / 1000;
      updateTimerDisplay();
      $("#timeIcon").toggleClass("fa-clock-o fa-bed");
    };

  };

  var myInterval;

  // starting the timer
  $("#startButton").click(function(){
    clearInterval(myInterval);
    myInterval = setInterval(intervalFunction, 1000);
  });

  // Resetting the timer
  $("#resetButton").click(function(){
    clearInterval(myInterval);
    timerDisplayTime = length / 1000;
    inSession = true;
    if ($("#timeIcon").hasClass("fa-bed")) {
      $("#timeIcon").toggleClass("fa-clock-o fa-bed");
    };
    updateTimerDisplay();
  });

});
