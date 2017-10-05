/**
 * Created by Rolv-Arild on 27.09.2017.
 */


function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}


$(document).ready(function () {
    var nick = getUrlParameter('nick');

   $.getJSON("/Quiz/rest/quizzes/" + getUrlParameter("quizId"), function (data) {
       var millisLeft = new Date(data.starttime) - new Date();
       var id = data.quizId;

       $('#waiting').text("Waiting for " + data.name);
       var i = Math.floor(millisLeft/1000);
       $('#secondsLeft').text(i + " seconds left");

       if (millisLeft > 0) {
           setInterval(function () {
               $('#secondsLeft').text((--i) + " seconds left");
           }, 1000);

           setTimeout(function () {
               window.location.href = "/Quiz/playquiz/quiz.html?quizId=" + id + "&qIndex=0&nick=" + nick;
           }, millisLeft)
       }
       else {
           // go to results
           alert("Sorry, quiz has already started, taking you to results");
           window.location.href = "/Quiz/scoreboard/scoreboard.html?quizId=" + id;
       }
   });

    $('#back').click(function () {
        window.location.href = "/Quiz/";
    });
});