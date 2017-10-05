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

    var quizId = getUrlParameter("quizId");

    $.getJSON("/Quiz/rest/quizzes/" + quizId, function (data) {
        $('#quizName').text(data.name);
    });

    setInterval(function () {
        $.getJSON("/Quiz/rest/quizzes/" + quizId, function (data) {
            $('#scoreB tbody').empty();
            $.each(data.players, function (index, player) {
                $('#scoreB tbody').append("<tr><td>" + player.username + "</td><td>" + player.score + "</td></tr>");
            });

            // setInterval(function () {
            //     $('#scoreB tbody').empty();
            //     $.each(data.players, function (index, player) {
            //         $('#scoreB tbody').append("<tr><td>" + player.username + "</td><td>" + player.score + "</td></tr>");
            //     });
            // }, 1000);
        });
    }, 1000);


    $('#back').click(function () {
        window.location.href = "/Quiz/";
    });
});