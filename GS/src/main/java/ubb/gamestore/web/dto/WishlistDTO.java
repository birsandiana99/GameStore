package ubb.gamestore.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class WishlistDTO extends BaseDTO{
    private UserDTO user;
    private ProductDTO product;
}
