/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //some event handler here

  //AJAX function to handle submit POST request and update new tweet
  $('form').on('submit', function(){
    console.log("SUBMIT BUTTON CLICKED, performing AJAX request");
    event.preventDefault();
    // formData is serialized in a string: key=value format
    let formData = $(this).serialize();
    let textArea = $("#current-tweet").val();
    let characterCount = $("span[class='counter']").text();
    let validData = true;

    if ( characterCount < 0){
      $('#error-msg').slideDown().html('<i class="fa fa-times-circle"></i> Error: Exceeded character count.')
      validData = false;
    } else if ( textArea.length === 0){
      $('#error-msg').slideDown().html('<i class="fa fa-times-circle"></i> Error: Please enter some text.')
      validData = false;
    } else if (validData === true){
      //hide any previous error message
      $("#error-msg").slideUp()
      //all error handling tests passed, can go and send AJAX request
      $.ajax({
          url: '/tweets',
          method: "POST",
          data: formData,
          success: function(data) {
            //if status code is good
            console.log("Success AJAX POST request!");
            //clear the input textarea and reset counter
            $('#current-tweet').val('');
            $('span.counter').text('140');
            //only want to load in one NEW tweet
            loadTweets(true);
          },
          failure: function(error) {
            console.log("Failed Ajax request, error code is: ", + error);
          }
      });
    }

  });

  function loadTweets(isSingleTweet){
    if (isSingleTweet){
      //passed in from AJAX POST request for single new tweet
      console.log("loading SINGLE NEW TWEET")
      $.ajax('/tweets', {method: 'GET'}).then( function(data){
        let newTweet = data.slice(data.length-1);
        renderTweets(newTweet);
      });
    } else {
      //load all tweets from database
      $.ajax('/tweets', {method: 'GET'}).then( function(data){
        //gets back an array of data for all users and tweets
        renderTweets(data);
      });
    }
  }

  //renders passed in $ajax array of user tweet data
  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
    console.log("Inside renderTweets function");
    console.log(tweets);
    tweets.forEach(function (userData){
      let finishedTweet = createTweetElement(userData);
      finishedTweet.prependTo('.tweets-container');
    });
  }

  //creates the HTML format for a tweet
  function createTweetElement(tweetData){
    console.log("INSIDE createTweetElement")
    // need to create new Date() and find how long ago tweet was created
    let date_created = new Date(tweetData.created_at);
    let today = new Date();

    //used to find how many days ago from today
    var date_diff_indays = function(date1, date2) {
      dt1 = new Date(date1);
      dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

    //only called if time difference is 0 days ==> dt2 is date_created, dt1 is today
    function diff_hours_and_mins(dt2, dt1)
    {
      let hourAndMin = [];
      let createdDT = new Date(dt2);
      let todayDT = new Date(dt1);

      //getTime() returns in muliseconds
      var diffHours =(createdDT.getTime() - todayDT.getTime()) / 1000;
      diffHours /= (60 * 60);
      //console.log("hour diff is: ", diffHours);
      hourAndMin.push( Math.abs(Math.round(diffHours)) );

      var diffMins =(createdDT.getTime() - todayDT.getTime()) / 1000;
      diffMins /= (60);
      //find only difference from start of the hour, result is between 0-60 mins
      diffMins = diffMins % 60;
      //console.log("minute diff is: ", diffMins);

      hourAndMin.push( Math.abs(Math.round(diffMins)) );
      //console.log(hourAndMin);
      return hourAndMin;

    }

    //TESTING date functions
    let daysCreated = date_diff_indays(date_created, today);
    console.log("Days created ago is: ", daysCreated);

    if (daysCreated === 0){
      console.log("Time differnce is less than 1 day, now finding HH:MM");
      let timeDiff = diff_hours_and_mins(date_created, today);
      let hour = timeDiff[0];
      let minute = timeDiff[1];
      console.log(`TEST Posted ${hour} hours ${minute} minutes ago!`);
    }


    let name = tweetData.user.name;
    let avatar = tweetData.user.avatars.small;
    let handle = tweetData.user.handle;
    let content = tweetData.content.text;
    let created_date = daysCreated;



    //main article element
    var $tweet = $("<article>").addClass("tweet")
    //article => header element
    var header = $("<header>").addClass("tweet-header")
    var imgElm = $("<img>").addClass("tweet-img").attr("src", avatar).appendTo(header)
    var nameElm = $("<h2>").addClass("tweet-name")
                            .text(name)
                            .appendTo(header)
    var handleElm = $("<p>").addClass("tweet-handle")
                            .text(handle)
                            .appendTo(header)
    header.appendTo($tweet)

    // article => section element
    var sectionElm = $("<section>").addClass("tweet-body")
    var commentElm = $("<p>").text(content)
                              .appendTo(sectionElm)
    sectionElm.appendTo($tweet)

    //article => footer element
    var footerElm = $("<footer>").addClass("tweet-footer").text(`Posted ${created_date} days ago`)
    var footerLogosElm = $("<div>").addClass("icons").appendTo(footerElm)
    var logo1 = $("<i>").addClass("fas fa-flag").appendTo(footerLogosElm)
    var logo2 = $("<i>").addClass("fas fa-share-square").appendTo(footerLogosElm)
    var logo3 = $("<i>").addClass("fas fa-heart").appendTo(footerLogosElm)

    footerElm.appendTo($tweet)

    return $tweet;
  }

  //compose button toggle slide function
  $("#compose-btn").click( function() {
    console.log('Compose toggle button is clicked!!!')
    $("#new-tweet").slideToggle(350, function(){
      //need to focus in on textarea
      $('#current-tweet').focus();
    });
  });

  /////////////////////////////////
  //init load tweets
  loadTweets();
  //hide error msg div element
  $("#error-msg").hide();

});


