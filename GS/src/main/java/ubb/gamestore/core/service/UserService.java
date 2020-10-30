package ubb.gamestore.core.service;

import ubb.gamestore.core.domain.GSUser;

import javax.persistence.GeneratedValue;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<GSUser> getUsers();

    Optional<GSUser> getUserByUsername(String username);

    Optional<GSUser> getUserByEmailAddress(String emailAddress);

    GSUser save(GSUser user);
}
