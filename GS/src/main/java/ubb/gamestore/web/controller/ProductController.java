package ubb.gamestore.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.core.service.ProductService;
import ubb.gamestore.web.converter.ProductConverter;
import ubb.gamestore.web.dto.ProductDTO;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    public static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductConverter productConverter;

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public List<ProductDTO> get() {
        List<Product> products = productService.getProducts();
        logger.trace("get - ProductController -> method entered, products = {}", products);
        return productConverter.convertModelsToDtos(products);
    }
}
