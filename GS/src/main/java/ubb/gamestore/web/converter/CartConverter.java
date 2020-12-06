package ubb.gamestore.web.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ubb.gamestore.core.domain.Cart;
import ubb.gamestore.web.dto.CartDTO;

@Component
public class CartConverter extends BaseConverter<Cart, CartDTO> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Cart convertDtoToModel(CartDTO dto) {
        Cart cart = modelMapper.map(dto, Cart.class);
        cart.setId(dto.getId());
        return cart;
    }

    @Override
    public CartDTO convertModelToDto(Cart cart) {
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cartDTO.setId(cart.getId());
        return cartDTO;
    }
}
