// Array of correct answers
var tally = [];
// How long the sun takes to set
var duration = 30000;
$("#wrong").hide();


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

    $("#thesun").animate({ top: "+=320px",
}, window.duration );

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
          if (submittedAnswer == qQuestion.GetAnswer()) {
            $( "#baby" ).animate({ 
                right: "+=45px",
            }, 1000 );
           //$( "#AnswerHolder" ).html("<div class=\"alert alert-success\">Good job Einstein!</div>");
           // $( "#qDiv" ).addClass("alert alert-success");
           answer = "correct"; 
           window.tally.push("correct")
           if (window.tally.length >= 5) { ShowResults("You Won!"); } else { CreateNewTest(); }
       } else {

            //$( "#AnswerHolder" ).html("<div class=\"alert alert-danger\">Wrong. Dead wrong.</div>");
            //$( "#qDiv" ).addClass("alert alert-danger");
            answer = "incorrect";
            $("#wrong").show().animate({opacity: 1.0}, 800).fadeOut(200, function() {
    // Animation complete.
    CreateNewTest();
  });
        };
        //window.tally.push(answer);
        //console.log(window.tally);

        //if (window.tally.length >= 5) { ShowResults("You Won!"); } else { CreateNewTest(); }
});
    }

    function ShowResults(cause){
        GameTimer.resetCountdown();
        $("#thesun").stop(true,true).css("top","-50px");
        $("#baby").stop(true,true).css("right","-50px");
        $('#myTab a[href="#results"]').tab('show');
        $( "#resultsList" ).html("<span class=\"logothin\">"+ cause +"</span>");
        //$( "#AnswerHolder" ).html("");
        console.log($("#thesun").position())
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
                btnString += "<button type=\"button\" value=\""+RealAnswer+"\" class=\"btn btn-default btn-lg answerBtn\">"+RealAnswer+"</button>";

                AllAnswers.push(RealAnswer);
            }
            else if (NewRandomAnswer < 0 || NewRandomAnswer == RealAnswer || $.inArray( NewRandomAnswer, AllAnswers ) !== -1){
                //console.log(NewRandomAnswer);
            }

            else {
                btnString += "<button type=\"button\" value=\""+NewRandomAnswer+"\" class=\"btn btn-default btn-lg answerBtn\">"+NewRandomAnswer+"</button>";
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

    $('#goToOptions').on('click', function(event) {
      event.preventDefault(); 
      $('#myTab a[href="#startScreen"]').tab('show');

  });

    $('#startTest').on('click', function(event) {
      event.preventDefault(); 
      $('#myTab a[href="#quiz"]').tab('show');
      window.tally = [];
      CreateNewTest();
  });
    $('#startTestAgain').on('click', function(event) {
      event.preventDefault(); 
      $('#myTab a[href="#startScreen"]').tab('show');
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