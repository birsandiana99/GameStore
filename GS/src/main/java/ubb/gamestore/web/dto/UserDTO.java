package ubb.gamestore.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO extends BaseDTO{
    private String username;
    private String password;
    private String email;
    private String name;
    private Date dateOfBirth;
    private Boolean isAdmin;
}
