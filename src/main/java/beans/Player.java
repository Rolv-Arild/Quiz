package beans;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

/**
 * Created by Rolv-Arild on 19.09.2017.
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Player {

    @XmlElement(name = "id")
    private int id;

    @XmlElement(name = "username")
    private String username;

    @XmlElement(name = "score")
    private int score;


    /* Getters */
    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public int getScore() {
        return score;
    }

    /* Setters */
    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Player player = (Player) o;

        return username.equals(player.username);
    }
}