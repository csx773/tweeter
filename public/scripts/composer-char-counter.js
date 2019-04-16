
$(document).ready(function() {
  // --- our code goes here ---
  console.log('Document is ready ==> LOADED UP CHAR COUNTER .JS');
  const textbox = document.querySelector('#current-tweet');


  $("#current-tweet").on('input', function(event) {
    console.log('INSIDE change event');
    let length = $(this).val().length;
    let characterLeft = 140 - length;
    // find the innerText of <span> by going up one node and searching down
    let counterElm = $(this).parent().find("span")

    if(characterLeft >= 0){
      //updated counter in HTML
      counterElm.text(characterLeft);
    } else {
      // turn the counter text to red and update

    }


  });


});

