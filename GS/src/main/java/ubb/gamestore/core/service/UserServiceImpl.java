package ubb.gamestore.core.service;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.gamestore.core.domain.GSUser;
import ubb.gamestore.core.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    public static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<GSUser> getUsers() {
        List<GSUser> users = userRepository.findAll();
        logger.trace("In UserService getUsers={}", users);
        return users;
    }

    @Override
    public Optional<GSUser> getUserByUsername(String username) {
        logger.trace("getUserByUsername - UserService -> method entered, username = {}", username);
        return userRepository.findAll().stream().filter(user -> user.getUsername().equals(username)).findFirst();
    }

    @Override
    public Optional<GSUser> getUserByEmailAddress(String emailAddress) {
        logger.trace("getUserByEmailAddress - UserService -> method entered, emailAddress = {}", emailAddress);
        return userRepository.findAll().stream().filter(user -> user.getEmail().equals(emailAddress)).findFirst();
    }

    @Override
    public GSUser save(GSUser user) {
        logger.trace("save - UserService -> method entered, user = {}", user);
        GSUser addedUser = userRepository.save(user);
        logger.trace("In save - UserService -> method finished, addedUser = {}", addedUser);
        return addedUser;
    }
}
