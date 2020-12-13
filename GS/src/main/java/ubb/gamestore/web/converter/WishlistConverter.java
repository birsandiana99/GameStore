package ubb.gamestore.web.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ubb.gamestore.core.domain.Wishlist;
import ubb.gamestore.web.dto.WishlistDTO;

@Component
public class WishlistConverter implements Converter<Wishlist, WishlistDTO> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Wishlist convertDtoToModel(WishlistDTO dto) {
        Wishlist wishlist = modelMapper.map(dto, Wishlist.class);
        wishlist.setId(dto.getId());
        return wishlist;
    }

    @Override
    public WishlistDTO convertModelToDto(Wishlist wishlist) {
        WishlistDTO wishlistDTO = modelMapper.map(wishlist, WishlistDTO.class);
        wishlistDTO.setId(wishlist.getId());
        return wishlistDTO;
    }
}
