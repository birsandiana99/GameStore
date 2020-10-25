package ubb.gamestore.web.converter;

import ubb.gamestore.core.domain.BaseEntity;
import ubb.gamestore.web.dto.BaseDTO;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


public abstract class BaseConverter<Model extends BaseEntity<Long>, Dto extends BaseDTO> implements
                                                                                         Converter<Model, Dto> {

    public List<Dto> convertModelsToDtos(Collection<Model> models) {
        return models.stream()
                .map(model -> convertModelToDto(model))
                .collect(Collectors.toList());
    }

    public List<Model> convertDtosToModels(Collection<Dto> dtos) {
        return dtos.stream()
                .map(dto -> convertDtoToModel(dto))
                .collect(Collectors.toList());
    }
}
