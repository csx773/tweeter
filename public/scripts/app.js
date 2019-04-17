/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

   // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]


$(document).ready(function() {

  //some event handler here

  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
    console.log("Inside renderTweets function");

    tweets.forEach( function (userData){
      let finishedTweet = createTweetElement(userData);
      //console.log("RETURNED TWEET IS:")
      //console.log(finishedTweet[0])
      finishedTweet.appendTo('.tweets-container');
    });
  }

  function createTweetElement(tweetData){
    console.log("Inside createTweetElement fucntion!!")

    const name = tweetData.user.name;
    const avatar = tweetData.user.avatars.small;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const created_date = tweetData.created_at;

    var $tweet = $("<article>").addClass("tweet")

    var header = $("<header>").addClass("tweet-header").appendTo($tweet)
    var imgElm = $("<img>").addClass("tweet-img")
                        .attr("src", avatar)
                        .appendTo(header)
    var nameElm = $("<h2>").addClass("tweet-name")
                            .text(name)
                            .appendTo(header)
    var handleElm = $("<p>").addClass("tweet-handle")
                            .text(handle)
                            .appendTo(header)

    var sectionElm = $("<section>").addClass("tweet-body").appendTo($tweet)
    var commentElm = $("<p>").text(content)
                              .appendTo(sectionElm)

    var footerElm = $("<footer>").addClass("tweet-footer")
                                .text(`Created at: ${created_date}`)
                                .appendTo($tweet)
    var footerLogosElm = $("<div>").addClass("icons").appendTo(footerElm)
    var logo1 = $("<i>").addClass("fas fa-flag").appendTo(footerLogosElm)
    var logo2 = $("<i>").addClass("fas fa-share-square").appendTo(footerLogosElm)
    var logo3 = $("<i>").addClass("fas fa-heart").appendTo(footerLogosElm)

    return $tweet;
  }


  renderTweets(data);
});


