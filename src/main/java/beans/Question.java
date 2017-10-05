package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Rolv-Arild on 19.09.2017.
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Question {

    @XmlElement(name = "questionId")
    private int id;

    @XmlElement(name = "question")
    private String question;

    @XmlElement(name = "options")
    private List<String> options = new ArrayList<>();

    @XmlElement(name = "answerIndex")
    private int answerIndex;

    @XmlElement(name = "duration")
    private int duration;


    /* Getters */
    public int getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public List<String> getOptions() {
        return options;
    }

    public int getAnswerIndex() {
        return answerIndex;
    }

    public int getDuration() {
        return duration;
    }

    /* Setters */
    public void setId(int id) {
        this.id = id;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public void setAnswerIndex(int answerIndex) {
        this.answerIndex = answerIndex;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Question question1 = (Question) o;

        if (answerIndex != question1.answerIndex) return false;
        if (!question.equals(question1.question)) return false;
        return options.equals(question1.options);
    }
}
