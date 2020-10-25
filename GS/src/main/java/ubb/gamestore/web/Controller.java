package ubb.gamestore.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/test")
public class Controller {

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public List<Integer> get(){
        return Arrays.asList(1,2,3);
    }
}
