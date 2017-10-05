package services;

import beans.Player;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Path("/players/")
public class PlayerService {
    private static Map<Integer, Player> players = new HashMap<>();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Player> getPlayers() {
        return players.values();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Player getPlayer(@PathParam("id") int id) {
        if (!players.containsKey(id)) throw new NotFoundException("Not found");
        return players.get(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addPlayer(Player player) {
        players.putIfAbsent(player.getId(), player);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void changePlayer(@PathParam("id") int id, Player player) {
        Player p = players.get(id);
        if (p == null) throw new NotFoundException("Not found");
        p.setScore(player.getScore());
        p.setUsername(player.getUsername());
        players.put(id, p);
    }

    @DELETE
    @Path("/{id}")
    public void deletePlayer(@PathParam("id") int id) {
        players.remove(id);
    }
}
