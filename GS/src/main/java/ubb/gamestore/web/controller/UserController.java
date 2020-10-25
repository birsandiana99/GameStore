package ubb.gamestore.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ubb.gamestore.core.domain.GSUser;
import ubb.gamestore.core.service.UserService;
import ubb.gamestore.core.service.UserServiceImpl;
import ubb.gamestore.web.converter.UserConverter;
import ubb.gamestore.web.dto.UserDTO;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserConverter userConverter;

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public List<UserDTO> get(){
        List<GSUser> users = userService.getUsers();
        return userConverter.convertModelsToDtos(users);
    }
}
