package services;

import beans.Player;
import beans.Question;
import beans.Quiz;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.*;

/**
 * Created by Rolv-Arild on 19.09.2017.
 */
@Path("/quizzes/")
public class QuizService {
    private static Map<Integer, Quiz> quizzes = new HashMap<>();
    private static int idCount = 0;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Quiz> getQuizzes() {
        return quizzes.values();
    }

    @GET
    @Path("/{quizId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("quizId") int id) {
        if (!quizzes.containsKey(id)) throw new NotFoundException("Ikke funnet");
        return quizzes.get(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addQuiz(Quiz quiz) {
        quiz.setId(++idCount);
        quizzes.putIfAbsent(quiz.getId(), quiz);
    }

    @PUT
    @Path("/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void changeQuiz(@PathParam("quizId") int id, Quiz quiz) {
        Quiz q = quizzes.get(id);
        if (q == null) throw new NotFoundException("Not found");
        q.setName(quiz.getName());
        q.setStarttime(quiz.getStarttime());
        q.setPlayers(quiz.getPlayers());
        q.setQuestions(quiz.getQuestions());
        quizzes.put(id, q);
    }

    @PATCH
    @Path("/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void patchQuiz(@PathParam("quizId") int id, Quiz quiz) {
        Quiz q = quizzes.get(id);
        String name = quiz.getName();
        Date starttime = quiz.getStarttime();
        List<Player> players = quiz.getPlayers();
        List<Question> questions = quiz.getQuestions();
        if (q == null) throw new NotFoundException("Not found");

        if (name != null && name.length() > 0) q.setName(name);
        if (starttime != null && !starttime.equals(new Date(0))) q.setStarttime(starttime);

        List<Player> qPlayers = q.getPlayers();
        if (players != null) {
            if (qPlayers != null) {
                for (Player p : players) {
                    int index = qPlayers.indexOf(p);
                    if (index >= 0) {
                        qPlayers.set(index, p);
                    } else {
                        qPlayers.add(p);
                    }
                }
            } else {
                q.setPlayers(players);
            }
        }

        List<Question> qQuestions = q.getQuestions();
        if (questions != null) {
            if (qQuestions != null) {
                for (Question que : questions) {
                    int index = qQuestions.indexOf(que);
                    if (index >= 0) {
                        qQuestions.set(index, que);
                    } else {
                        qQuestions.add(que);
                    }
                }
            } else {
                q.setQuestions(questions);
            }
        }
        quizzes.put(id, q);
    }

    @DELETE
    @Path("/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteQuiz(@PathParam("quizId") int id) {
        quizzes.remove(id);
    }
}

