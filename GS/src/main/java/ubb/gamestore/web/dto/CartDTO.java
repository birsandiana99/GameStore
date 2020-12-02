package ubb.gamestore.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ubb.gamestore.core.domain.GSUser;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartDTO extends BaseDTO{
    private UserDTO GSUser_id;
    private ProductDTO Product_id;
}
