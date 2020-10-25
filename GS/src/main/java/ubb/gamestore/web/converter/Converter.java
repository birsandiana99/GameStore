package ubb.gamestore.web.converter;


import ubb.gamestore.core.domain.BaseEntity;
import ubb.gamestore.web.dto.BaseDTO;

public interface Converter<Model extends BaseEntity<Long>, Dto extends BaseDTO> {

    Model convertDtoToModel(Dto dto);

    Dto convertModelToDto(Model model);

}

