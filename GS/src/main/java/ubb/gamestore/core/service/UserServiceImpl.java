package ubb.gamestore.core.service;

import org.apache.catalina.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.gamestore.core.domain.GSUser;
import ubb.gamestore.core.repository.UserRepository;

import java.util.List;

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
}
