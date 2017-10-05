/**
 * Created by Rolv-Arild on 26.09.2017.
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

    var quizID = getUrlParameter('quizId');
    var qIndex = parseInt(getUrlParameter('qIndex'));
    if (qIndex === -1) return;
    var nick = getUrlParameter('nick');
    var selectedIndex = -1;

    $.getJSON("/Quiz/rest/quizzes/" + quizID, function (data) {
        var quiz = data;
        var questions = quiz.questions;

        var has = false;
        for (var j = 0; j < quiz.players.length; j++) {
            if (quiz.players[0].username === nick) {
                has = true;
                break;
            }
        }
        if (!has) {
            quiz.players.push({username: nick, score: 0});
        }

        $.ajax({
            url: '/Quiz/rest/quizzes/' + quizID,
            type: 'PATCH',
            data: JSON.stringify({
                players: quiz.players
            }),
            contentType: 'application/json',
            dataType: 'json'
        });


        if (qIndex >= 0 && qIndex < questions.length) {
            var currentQ = questions[qIndex];
            var i = currentQ.duration;

            $('#title').text(quiz.name);
            $('#question').text(currentQ.question);
            $('#btn1').text(currentQ.options[0]);
            $('#btn2').text(currentQ.options[1]);
            $('#btn3').text(currentQ.options[2]);
            $('#btn4').text(currentQ.options[3]);


            $('#timer').text(i);

            setInterval(function () {
                $('#timer').text(--i);
            }, 1000);

            setTimeout(function () {
                console.log(selectedIndex + ", " + currentQ.answerIndex + ", " + nick);
                if (selectedIndex === currentQ.answerIndex) {
                    for (var c = 0; c < quiz.players.length; c++) {
                        if (quiz.players[c].username === nick) {
                            quiz.players[c].score += 10;
                            break;
                        }
                    }
                    $.ajax({
                        url: '/Quiz/rest/quizzes/' + quizID,
                        type: 'PATCH',
                        data: JSON.stringify({
                            players: quiz.players
                        }),
                        contentType: 'application/json',
                        dataType: 'json'
                    });
                }
                window.location.href = window.location.href.replace("qIndex=" + qIndex, "qIndex=" + (qIndex+1));
            }, currentQ.duration*1000);
        } else {
            window.location.href = "/Quiz/scoreboard/scoreboard.html?quizId=" + quizID;
        }
    });

    $('#back').click(function () {
        window.location.href = "/Quiz/";
    });

    $('#btn1').click(function () {
        $(this).addClass("selected");
        $('#btn2').removeClass("selected");
        $('#btn3').removeClass("selected");
        $('#btn4').removeClass("selected");
        selectedIndex = 0;
    });
    $('#btn2').click(function () {
        $(this).addClass("selected");
        $('#btn1').removeClass("selected");
        $('#btn3').removeClass("selected");
        $('#btn4').removeClass("selected");
        selectedIndex = 1;
    });
    $('#btn3').click(function () {
        $(this).addClass("selected");
        $('#btn2').removeClass("selected");
        $('#btn1').removeClass("selected");
        $('#btn4').removeClass("selected");
        selectedIndex = 2;
    });
    $('#btn4').click(function () {
        $(this).addClass("selected");
        $('#btn2').removeClass("selected");
        $('#btn3').removeClass("selected");
        $('#btn1').removeClass("selected");
        selectedIndex = 3;
    });

});