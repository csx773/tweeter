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
    // console.log(`Submitted textArea is: ${textArea}`)
    // console.log(`counter is: ${characterCount}`)

    if ( characterCount < 0){
      alert("Exceeded character counter. Please shorten tweet.");
      validData = false;
    } else if ( textArea.length === 0){
      alert("Please enter some text.");
      validData = false;
    } else if (validData === true){
      $.ajax({
          url: '/tweets',
          method: "POST",
          data: formData,
          success: function() {
            console.log("Success AJAX POST request!");
            loadTweets();
          },
          failure: function(error) {
            console.log("Failed Ajax request, error code is: ", + error);
          }
      });
    }

  });

  function loadTweets(){
    console.log("inside loadTweets() function")
    $.ajax('/tweets', {method: 'GET'}).then( function(data){
      console.log("GET Recieved response from server")
      //gets back an array of data for all users
      //pass in all tweet data to render, data is an array
      renderTweets(data);
    });
  }

  //init tweets already in /tweets
  loadTweets();


  //renders passed in $ajax array of user tweet data
  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
    console.log("Inside renderTweets function");

    tweets.forEach( function (userData){
      let finishedTweet = createTweetElement(userData);
      finishedTweet.appendTo('.tweets-container');
    });
  }

  //creates the HTML format for a tweet
  function createTweetElement(tweetData){
    console.log("Inside createTweetElement function!!")

    const name = tweetData.user.name;
    const avatar = tweetData.user.avatars.small;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const created_date = tweetData.created_at;
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
    var footerElm = $("<footer>").addClass("tweet-footer")
                                .text(`Created at: ${created_date}`)
    var footerLogosElm = $("<div>").addClass("icons").appendTo(footerElm)
    var logo1 = $("<i>").addClass("fas fa-flag").appendTo(footerLogosElm)
    var logo2 = $("<i>").addClass("fas fa-share-square").appendTo(footerLogosElm)
    var logo3 = $("<i>").addClass("fas fa-heart").appendTo(footerLogosElm)

    footerElm.appendTo($tweet)

    return $tweet;
  }

});


