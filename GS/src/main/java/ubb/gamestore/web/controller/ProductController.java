package ubb.gamestore.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.core.service.ProductService;
import ubb.gamestore.web.converter.ProductConverter;
import ubb.gamestore.web.dto.ProductDTO;

import java.util.List;
import java.util.Optional;

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

    /*@RequestMapping(value = "/getProductByID", method = RequestMethod.POST)
    public ProductDTO getProductByID(@RequestParam Long ID) {
        Optional<Product> product = productService.getProductByID(ID);
        logger.trace("getProductByID - ProductController -> method entered, ID = {}", ID);
        if(product.isEmpty())
            return null;

        return productConverter.convertModelToDto(product.get());
    }*/

    @RequestMapping(value = "/getProductByID", params = "ID", method = RequestMethod.GET)
    public ProductDTO getProductByID(@RequestParam Long ID) {
        Optional<Product> product = productService.getProductByID(ID);
        logger.trace("getProductByID - ProductController -> method entered, ID = {}", ID);
        if(product.isEmpty())
            return null;

        return productConverter.convertModelToDto(product.get());
    }
}
