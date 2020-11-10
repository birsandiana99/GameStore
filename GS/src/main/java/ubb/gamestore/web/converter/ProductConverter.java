package ubb.gamestore.web.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.web.dto.ProductDTO;

@Component
public class ProductConverter extends BaseConverter<Product, ProductDTO>{
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Product convertDtoToModel(ProductDTO dto) {
        Product product = modelMapper.map(dto, Product.class);
        product.setId(dto.getId());
        return product;
    }

    @Override
    public ProductDTO convertModelToDto(Product product) {
        ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
        productDTO.setId(product.getId());
        return productDTO;
    }
}
