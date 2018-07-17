//----variables----
var qwerty = document.getElementById("qwerty");
let phrase = document.getElementById("phrase");
let missed = 0;
let targt;
let eTrgt;
let letterFound;
let qwertyButton = $('#qwerty .keyrow button'); //variable for only the buttons in the qwerty section
var phrases = [
"procrastination is the art of keeping up with yesterday",
"i have more issues than cosmo",
"my fake plants died because i did not pretend to water them",
"we are all born mad but some remain so",
"my life needs some debugging",
"you are only as good as your last haircut",
"life is so hard it kills you"
];


//----property----

$('.btn__reset').css("cursor", "pointer");  //this makes the cursor of the starter link look as a pointer

qwertyButton.css("cursor", "pointer"); //this makes the cursor of the buttons look as a pointer

$(".tries").css("display", "none");

$(".eRrOr").css("display", "none");

// //----function----


function getRandomPhraseAsArray(phrases){
  let i = Math.floor(Math.random() * phrases.length );   //this gives the array phrase number
  var splt = phrases[i].split('');  //this gives the array split the actual phrase in characters
  return splt;
}

let phraseArray = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(phraseArray){    //this function shows the phrase
  for (let j = 0; j <= phraseArray.length - 1; j++){   //loop that runs the number of elements the chosen phrase has
    let k = phraseArray[j]; //variable for the letter in phraseArray
    $("#phrase ul").append("<li>" + k + "</li>");  //this appends a list item with an phraseArray element
    $("ul li:not(:contains( ))").addClass("letter"); //this makes every element that contains a space in the "ul li" elements to not be considered when adding the class "letter"
    $("ul li:contains( )").addClass("space");
  }
}


function checkLetter(targt){  //this function checks the chosen letters against the ones in the phrase
  targt = event.target;  //variable for the event target
  eTrgt = event.keyCode; //variable for the code on the keyup events
  let lttrContnt = $(".letter").text();  //variable for the contents on the letter chosen
  let qButton = qwertyButton.text(); //variable for the array with the text of all the buttons in qwerty section
  let str = String.fromCharCode(eTrgt); //variable to get string from the code of the keyup event
  let dStr = str.toLowerCase();
  for( let a = 0; a <= qwertyButton.length - 1; a++){ //loop that runs as many times as the length of the buttons
    let qBtn = qButton[a];  //variable for the specific array element of the buttons in the qwerty section in form of string
    let chosenBtn = $(qwertyButton)[a]; //variable for the specific array element of the buttons in the qwerty section
    if(dStr == qBtn){ //conditional if the string of the key pressed is the same as the string of the button on qwerty section
      $(chosenBtn).addClass("chosen"); //this addas the chosen class to the button element when the same key is pressed down
      $(chosenBtn).prop("disabled", true); //this disables every chosen butto

    }
  }
  for(let i = 0; i <= lttrContnt.length- 1; i++){  //loop that runs as many times as the length of the phrase
    let lttr = lttrContnt[i];  //variable for the specific letter on the array lttrContnt
    let lttrElemnt = $(".letter")[i]; //variable for the specific element with the class "letter"
    if ( $(targt).text() == lttr || dStr == lttr ){  /*conditional for the chosen letters if the target event
    content or string of the keyup is the same as specific letter on the array lttrContnt*/
      $(lttrElemnt).addClass("show"); //this adds the show class to the letter element in the phrase
    }
  }

  if (lttrContnt.indexOf($(targt).text()) != -1){ //conditional if the letter chosen with a mouse is not undefined
    letterFound = $(targt).text(); //this adds the value of the chosen letter to letterFound
  } else if (lttrContnt.indexOf(dStr) != -1){ //conditional if the letter chosen with the keyboard is not undefined
    letterFound = dStr; //this adds the value of the chosen letter to letterFound
  } else if (lttrContnt.indexOf($(targt).text()) == -1 && lttrContnt.indexOf(dStr) == -1 ){ /*conditional if the letter chosen is undefined
    when compared to the letters in the phrase*/
    letterFound = null; //this adds the null value to the letterFound variable
    missed = missed + 1;
    $(".tries:nth-child(" + missed + " )").removeClass("tries").addClass("eRrOr"); /*this removes the class tries and adds the
    class eRrOr to the element with the same missed counter*/
    $(".eRrOr img").attr("src", "images/lostHeart.png");/*this changes the image from liveHeart to lostHeart*/
    $('html').bind('keyup', function(e){ //this prevents the specific key to repeat an event keyup
      if(e.keyCode == eTrgt){
        return false;
      }
    });
  }

}


function checkWin(){  //this function chechs if the player won or lost the game
  if ($(".show").length == $(".letter").text().length){ /*conditional if the number of elements with class show
    are the same as the letters in the phrase the players wins*/
    $(".tries").css("display", "none");
    $(".eRrOr").css("display", "none");
    $("#overlay").addClass("win");
    $("#overlay").css("display", "flex");
    $(".title").text("You won!!!");
  } else if (missed >= 5){ //conditional of the missed variable with 5 or more counters if true the player loses the game
    $(".tries").css("display", "none");
    $(".eRrOr").css("display", "none");
    $("#overlay").addClass("lose");
    $("#overlay").css("display", "flex");
    $(".title").text("You lose!!!");
  }
  $(".btn__reset").text("Play Again");
}

//----events-----

$('.btn__reset').click(function(){  //function that start the game and sets all properties as they were at the start
  missed = 0; //this restart the missed variable to 0 everytime a game is started
  $(".eRrOr").addClass("tries").removeClass("eRrOr");
  $(".tries").css("display", "inline-block");
  $(".tries img").attr("src", "images/liveHeart.png"); /*this changes the lostHeart image from the liveHeart image after a Game
  has already been played*/
  $("ul li").css("display", "none");
  $("button").removeClass("chosen");
  $("button").prop("disabled", false);
  $('#overlay').css("display", "none"); //this makes display none to the element with id of overlay
  phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray); //this displays the phrase chosen for the game, when started

  $('html').bind('keyup', function(e){ //this allows that keys used already can be used on the new game
    if(e.keyCode == eTrgt){
      return true;
    }
  });

  $(document).on("keyup", EventTarget, function(event){ //this event is for the keyboard
    checkLetter(targt);
    checkWin();
    console.log(letterFound);
    event.stopImmediatePropagation();
    return letterFound;
  });
});



qwertyButton.click(function(event){ //event on the qwerty buttons
  let eTrgt = event.target;
  $(eTrgt).addClass("chosen"); //this adds the class chosen when a button is clicked
  $(eTrgt).prop("disabled", true);
  checkLetter(targt);
  checkWin();
  return letterFound;
});
