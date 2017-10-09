/**
 * Created by Rolv-Arild on 19.09.2017.
 */

$(document).ready(function () {
    var questions = [];

    $('#saveQ').click(function () {

        if (!$('#question').val()) {
            alert("Please insert a question");
            return;
        }
        if (!$('#duration').val()) {
            alert("Please insert a duration");
            return;
        }
        var answerCount = 0;
        if ($('#answer1').val()) answerCount++;
        if ($('#answer2').val()) answerCount++;
        if ($('#answer3').val()) answerCount++;
        if ($('#answer4').val()) answerCount++;
        if (answerCount < 2) {
            alert("Please insert answers");
            return;
        }
        var selectedIndex = -1;
        if (document.getElementById('radio1').checked) selectedIndex = 0;
        else if (document.getElementById('radio2').checked) selectedIndex = 1;
        else if (document.getElementById('radio3').checked) selectedIndex = 2;
        else if (document.getElementById('radio4').checked) selectedIndex = 3;
        if (selectedIndex === -1) {
            alert("Please select an answer");
            return;
        }

        var question = {
            question: $('#question').val(),
            duration: $('#duration').val(),
            options: [$('#answer1').val(), $('#answer2').val(), $('#answer3').val(), $('#answer4').val()],
            answerIndex: selectedIndex,
            picURL : $('#picUrl').val()
        };
        questions.push(question);
        $('#QTable').append(
            "<tr>"+
            "<td>" + $('#question').val() + "</td>"+
            "<td>" + $('#duration').val() + " seconds" + "</td>"+
            "</tr>"
        );
        $('#question').val("");
        $('#duration').val("");
        $('#answer1').val("");
        $('#answer2').val("");
        $('#answer3').val("");
        $('#answer4').val("");
    });

    $("#save").click(function () {

        if (!$('#name').val()) {
            alert("Please enter quiz name");
            return;
        }

        var now = new Date();
        var fut = new Date();
        fut.setSeconds(now.getSeconds() + 315400000);
        if (!$('#startT').val() || new Date($('#startT').val()) <= now || new Date($('#startT').val()) > fut) {
            alert("Please enter valid start time");
            return;
        }

        if (questions.length === 0) {
            alert("Please add at least one question");
            return;
        }

        $.ajax({
            url: 'rest/quizzes',
            type: 'POST',
            data: JSON.stringify({
                name: $('#name').val(),
                starttime: new Date($('#startT').val()),
                questions: questions
            }),
            contentType: 'application/json',
            dataType: 'json'
        });
        window.location.href = '../Quiz';
    });


    $('#answer1').keyup(function () {
        if ($('#answer1').val()) {
            $('#radio1').removeAttr("disabled");
        } else {
            $('#radio1').attr("disabled", true);
            $('#radio1').prop("checked", false);
        }
    });
    $('#answer2').keyup(function () {
        if ($('#answer2').val()) {
            $('#radio2').removeAttr("disabled");
        } else {
            $('#radio2').attr("disabled", true);
            $('#radio2').prop("checked", false);
        }
    });
    $('#answer3').keyup(function () {
        if ($('#answer3').val()) {
            $('#radio3').removeAttr("disabled");
        } else {
            $('#radio3').attr("disabled", true);
            $('#radio3').prop("checked", false);
        }
    });
    $('#answer4').keyup(function () {
        if ($('#answer4').val()) {
            $('#radio4').removeAttr("disabled");
        } else {
            $('#radio4').attr("disabled", true);
            $('#radio4').prop("checked", false);
        }
    });

    $('#back').click(function () {
        window.location.href = "/Quiz/";
    });


    $('#QTable tbody').on('click', 'tr', function () {
        var row = $(this).closest('tr');
        var rowData = questions[row];
        if (rowData === null) return;

        $('#question').val(rowData.question);
        $('#duration').val(rowData.duration);
        $('#answer1').val(rowData.options[0]);
        $('#answer2').val(rowData.options[1]);
        $('#answer3').val(rowData.options[2]);
        $('#answer4').val(rowData.options[3]);

        $('#questionModal').modal();
    });
});