/**
 * Created by Rolv-Arild on 19.09.2017.
 */

$(document).ready(function() {
    var quizT = $("#quizTable");

    quizT.DataTable({
        ajax: {
            url: 'rest/quizzes',
            dataSrc: ''
        },
        columns: [
            {data: 'name'},
            {data: 'starttime', render: function (data) {
                var date = new Date(data);
                return date.toLocaleString();
            }},
            {data: 'quizId', visible: false}
        ]
    });

    setInterval(function () {
        quizT.DataTable().ajax.reload();
    },
    30000);

    $('#quizTable tbody').on('click', 'tr', function () {
        var row = $(this).closest('tr');
        var rowData = quizT.dataTable().fnGetData(row);
        if (rowData === null) return;
        var id = rowData.quizId;

        $('#quizModal').modal();

        $('#enterQuiz').click(function () {
            if (!$('#nick').val()) {
                alert("Please enter a username");
                return;
            }
            window.location.href = "/Quiz/playquiz/waitingroom.html?quizId=" + id + "&qIndex=0&nick=" + $('#nick').val();
        });

        $('#viewScoreB').click(function () {
            window.location.href = "/Quiz/scoreboard/scoreboard.html?quizId=" + id;
        })
    });
});