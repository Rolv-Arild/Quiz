package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Rolv-Arild on 19.09.2017.
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Quiz {

    @XmlElement(name = "quizId")
    private int id;

    @XmlElement(name = "name")
    private String name;

    @XmlElement(name = "starttime")
    private Date starttime;

    @XmlElement(name = "questions")
    private List<Question> questions = new ArrayList<>();

    @XmlElement(name = "players")
    private List<Player> players = new ArrayList<>();

    /* Getters */

    public int getId() {
        return id;
    }

    public Date getStarttime() {
        return starttime;
    }

    public String getName() {
        return name;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public List<Player> getPlayers() {
        return players;
    }

    /* Setters */
    public void setId(int id) {
        this.id = id;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }
}
