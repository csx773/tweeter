
$(document).ready(function() {
  // --- our code goes here ---
  console.log('Document is ready!! Inside composer-char-counter.js');

  $("#current-tweet").on('input', function(event) {
    //console.log('INSIDE change event');
    let length = $(this).val().length;
    let characterLeft = 140 - length;
    // find the innerText of <span> by going up one node and searching down
    let counterElm = $(this).parent().find("span")

    if(characterLeft >= 0){
      //updated counter in HTML, sets text color to black
      counterElm.css("color", "black");
      counterElm.text(characterLeft);
    } else {
      // turn the counter text to red and update
      counterElm.css("color", "red");
      counterElm.text(characterLeft);
    }

  });


});

