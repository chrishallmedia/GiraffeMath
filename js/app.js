// Array of correct answers
var tally = [];
// How long the sun takes to set
var duration = 30000;
$("#wrong,#right").hide();

var numReqCorrQues = 5;


function CQuestion(sV1, sV2, sOperand)
{
    this.V1 = sV1;
    this.operand = sOperand;
    this.V2 = sV2;

    this.GetQuestion = function ()
    {
        return this.V1 + " " + this.operand + " " + this.V2;
    }

    this.GetAnswer = function ()
    {
        return eval(this.GetQuestion());
    }
}

var garrQuestions = [];

var SkillLevel = {
    Easy: 1,
    Challenging : 2
};


function CreateNewTest()
{

    $("#thesun").animate({ top: "+=320px" }, window.duration );

    // $("#night").animate({ opacity: .4
    // }, window.duration );


    var optAddition = document.getElementById("optAddition");
    var optSubtraction = document.getElementById("optSubtraction");
    var optMultiplication = document.getElementById("optMultiplication");
    var optDivision = document.getElementById("optDivision");

    var ddlSkillLevel = document.getElementById("ddlSkillLevel");
    var iSkillLevel = ddlSkillLevel.options[ddlSkillLevel.selectedIndex].value;

    var fnCreateQuestion = null;

    if (optAddition.checked) { fnCreateQuestion = CreateAdditionQuestion; }
    else if (optSubtraction.checked) { fnCreateQuestion = CreateSubtractionQuestion; }
    else if (optMultiplication.checked) { fnCreateQuestion = CreateMultiplicationQuestion; }
    else if (optDivision.checked) { fnCreateQuestion = CreateDivisionQuestion; }

    var QuestionHolder = document.getElementById("QuestionHolder");
    var sQHtml = "";
    var iIndex;

    garrQuestions = [];


        // Start the timer
        GameTimer.Timer.play(); 


        for (iIndex = 0; iIndex < 1; iIndex++)
        {
            var qQuestion = fnCreateQuestion(iSkillLevel);

            sQHtml += "<div id=\"qDiv\">" + qQuestion.GetQuestion() + "</div><div id=\"aDiv\">" + CreateAndSortAnswers(qQuestion.GetAnswer()) + "</div><div id=\"divQuestionResult" + iIndex + "\"></div>";

            garrQuestions.push(qQuestion);
        }
        
        QuestionHolder.innerHTML = sQHtml;
        

        var result = $('.answerBtn').on('click', function(event) {
          var submittedAnswer = $(this).attr("value");
          var answer = "";
          if (submittedAnswer == qQuestion.GetAnswer()) {  // if the answer is right
            var winlength = $( window ).width();
            var mompos = $( "#mama" ).offset();
            var goal = 170;
            var totallength = winlength - goal;
            var moveamount = totallength / numReqCorrQues;
            answer = "correct"; 
            window.tally.push("correct");
            


            if (window.tally.length >= numReqCorrQues) { // if enough right

                $( "#hills" ).animate({ right: "-=" + moveamount/2 }, 700, "linear");
               $( "#baby" ).animate({ right: "+=" + moveamount }, 900, "linear");
               $('#aDiv *').prop('disabled', true);

                $( "#mama" ).animate({ left: "+=" + 120 }, 2000, "linear", function () {
                    setTimeout(function() { 
                        ShowResults("You Won!"); 
                        $('#aDiv *').prop('disabled', false);
                    },3000);
                });



            } else { // if enough right not met

               $( "#hills" ).animate({ right: "-=" + moveamount/2 }, 700, "linear");
               $( "#baby" ).animate({ right: "+=" + moveamount }, 900, "linear");
               $('#aDiv *').prop('disabled', true);

               $("#right").show().animate({opacity: 1.0}, 800).hide(0, function() {
                // Animation complete.
                $('#aDiv *').prop('disabled', false);
                CreateNewTest();
            });
           }

           


            // $( "#baby" ).animate({ right: "+=" + moveamount }, 900, "linear", function () {
            //         if (window.tally.length >= numReqCorrQues) { 
            //             $( "#mama" ).animate({ right: "+=" + 150 }, 1000, "linear", function () {ShowResults("You Won!")});

            //     } else { CreateNewTest(); }
            // });


       } else { // if the answer is wrong
        answer = "incorrect";
        $("#wrong").show().animate({opacity: 1.0}, 800).hide(0, function() {
                // Animation complete.
                $('#aDiv *').prop('disabled', false);
                CreateNewTest();
            });
    };
});
}

function ShowResults(cause){
    GameTimer.resetCountdown();
    
    $.mobile.changePage( "#results-page", {
      transition: "none",
      reverse: false,
      changeHash: false
  });
    $("#thesun").stop(true,true).css("top","-50px");
    $("#baby").stop(true,true).css("right","20px");
    $("#hills").stop(true,true).css("right","0");
    $("#mama").stop(true,true).css("left","-200px");
    $( "#resultsList" ).html("<span class=\"logothin\">"+ cause +"</span>");
    // $("#night").css("opacity","0");
        //$( "#AnswerHolder" ).html("");
        //console.log($("#thesun").position());
    }

    function CreateAndSortAnswers(answer) {
        var RealAnswer = answer;
        var AllAnswers = [];
        var aIndex;
        var randomIndex = Random(0,4);
        var btnString = "";

        

        for (aIndex = 0; AllAnswers.length < 4; aIndex++)
        {
            var NewRandomAnswer = Random(RealAnswer - 10,RealAnswer + 10);
            
            if (aIndex == randomIndex) {
                btnString += "<button type=\"button\" value=\""+RealAnswer+"\" class=\"answerBtn\">"+RealAnswer+"</button>";

                AllAnswers.push(RealAnswer);
            }
            else if (NewRandomAnswer < 0 || NewRandomAnswer == RealAnswer || $.inArray( NewRandomAnswer, AllAnswers ) !== -1){
                //console.log(NewRandomAnswer);
            }

            else {
                btnString += "<button type=\"button\" value=\""+NewRandomAnswer+"\" class=\"answerBtn\">"+NewRandomAnswer+"</button>";
                AllAnswers.push(NewRandomAnswer);
            }

            //"<input id=\"cmdBeginTest\" type=\"button\"value=\""+  +"\"/>";

        }
        //console.log(AllAnswers);
        return btnString
    }

    function CreateAnswerButtons(answerArray) {

    }

    function CreateAdditionQuestion(iSkillLevel)
    {
        var iMax1, iMax2;
        iMax1 = iSkillLevel === SkillLevel.Easy ? 10 : 20;
        iMax2 = iSkillLevel === SkillLevel.Easy ? 5 : 10;

        return new CQuestion(Random(0, iMax1), Random(0, iMax2), "+");
    }

    function CreateSubtractionQuestion()
    {
        var queNew = new CQuestion(Random(0, 20), Random(0, 20), "-");

        if (queNew.V2 > queNew.V1)
        {
            var iSwap = queNew.V1;
            queNew.V1 = queNew.V2;
            queNew.V2 = iSwap;
        }

        return queNew;
    }

    function CreateMultiplicationQuestion()
    {
        return new CQuestion(Random(0, 10), Random(0, 10), "*");
    }


    function CreateDivisionQuestion()
    {
        var V1, V2;

        while (true)
        {
            V1 = Random(0, 100);
            V2 = Random(0, 10);

            if (V1 % V2 === 0)
            {
                break;
            }
        }

        return new CQuestion(V1, V2, "/");
    }


    function Random(iMin, iMax)
    {
        return Math.floor(Math.random() * (iMax - iMin) + iMin);
    }


    $('#startTest').on('click', function(event) {
      event.preventDefault(); 
      // $('#myTab a[href="#quiz"]').tab('show');
      $.mobile.changePage( "#game-page", {
          transition: "flip",
          reverse: false,
          changeHash: false
      });
      window.tally = [];
      CreateNewTest();
  });
    $('#startTestAgain').on('click', function(event) {
      event.preventDefault(); 
      // $('#myTab a[href="#startScreen"]').tab('show');
      $.mobile.changePage( "#options-page", {
          transition: "flip",
          reverse: false,
          changeHash: false
      });
  });

    
     // Output time and increment
     function updateTimer() {
        var timeString = formatTime(currentTime);
        $stopwatch.html(timeString);
        currentTime += incrementTime;
    }

    function formatTime(time) {
        time = time / 10;
        var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60);
//    hundredths = pad(time - (sec * 100) - (min * 6000), 2);<br />
return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) /*+ ":" + hundredths*/;
}
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}

// TIMER TIMER TIMER
var GameTimer = new (function() {

    var $countdown;
    var $form;
    var incrementTime = 70;
    var currentTime = window.duration; // in milliseconds)

$(function() {

        // Setup the timer
        $countdown = $('#countdown');
        GameTimer.Timer = $.timer(updateTimer, incrementTime, false);

    });

function updateTimer() {

        // Output timer position
        var timeString = formatTime(currentTime);
        $countdown.html(timeString);

        // If timer is complete, trigger alert
        if (currentTime == 0) {
            GameTimer.Timer.stop();
           // alert('Time\'s Up!');
           ShowResults("Time\'s up!");
           GameTimer.resetCountdown();
           return;
       }

        // Increment timer position
        currentTime -= incrementTime;
        if (currentTime < 0) currentTime = 0;

    }

    this.resetCountdown = function() {

        //$("#startScreen").show();
        // Set new time
        var newTime = window.duration;
        if (newTime > 0) {currentTime = newTime;}

        // Stop and reset timer
        GameTimer.Timer.stop().once();

    };

});

// END TIMER