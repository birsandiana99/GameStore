package ubb.gamestore.web.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ubb.gamestore.core.domain.GSUser;
import ubb.gamestore.web.dto.UserDTO;

import javax.persistence.Column;

@Component
public class UserConverter extends BaseConverter<GSUser, UserDTO> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public GSUser convertDtoToModel(UserDTO dto) {
        GSUser user = modelMapper.map(dto, GSUser.class);
        user.setId(dto.getId());
        return user;
    }

    @Override
    public UserDTO convertModelToDto(GSUser gsUser) {
        UserDTO userDTO = modelMapper.map(gsUser, UserDTO.class);
        userDTO.setId(gsUser.getId());
        return userDTO;
    }
}
