package ubb.gamestore.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ubb.gamestore.core.domain.Cart;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.core.service.ProductService;
import ubb.gamestore.web.converter.CartConverter;
import ubb.gamestore.web.converter.ProductConverter;
import ubb.gamestore.web.converter.UserConverter;
import ubb.gamestore.web.dto.CartDTO;
import ubb.gamestore.web.dto.ProductDTO;
import ubb.gamestore.web.dto.UserDTO;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {
    public static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;
    @Autowired
    private UserConverter userConverter;
    @Autowired
    private ProductConverter productConverter;
    @Autowired
    private CartConverter cartConverter;

    @RequestMapping(value = "/getProducts", method = RequestMethod.GET)
    public List<ProductDTO> getProducts() {
        List<Product> products = productService.getProducts();
        logger.trace("get - ProductController -> method entered, products = {}", products);
        return productConverter.convertModelsToDtos(products);
    }

    @RequestMapping(value = "/getProductByID", method = RequestMethod.POST)
    public ProductDTO getProductByID(@RequestBody Long ID) {
        Optional<Product> product = productService.getProductByID(ID);
        logger.trace("getProductByID - ProductController -> method entered, ID = {}", ID);
        if(product.isEmpty())
            return null;

        return productConverter.convertModelToDto(product.get());
    }

    @RequestMapping(value = "/addProductToCart", method = RequestMethod.POST)
    public CartDTO addProductToCart(@RequestBody CartDTO cartDTO){
        logger.trace("addProductToCart - ProductController -> method entered, cartDTO = {}", cartDTO);
        Cart cart = productService.addToCart(cartConverter.convertDtoToModel(cartDTO));
        logger.trace("addProductToCart - ProductController -> method finished, cart = {}", cart);
        return cartConverter.convertModelToDto(cart);
    }

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST)
    public ProductDTO addProduct(@RequestBody ProductDTO productDTO){
        logger.trace("addProduct - ProductController -> method entered, productDTO = {}", productDTO);
        //todo
        return productDTO;
    }

    @RequestMapping(value = "/getCartProductsForUser", method = RequestMethod.POST)
    public List<ProductDTO> getCartProductsForUser(@RequestBody UserDTO userDTO){
        logger.trace("getCartProductsForUser - ProductController -> method entered, user = {}", userDTO);
        List<Product> products = productService.getCartProductsForUser(userConverter.convertDtoToModel(userDTO));
        logger.trace("getCartProductsForUser - ProductController -> method finished, products = {}", products);

        return productConverter.convertModelsToDtos(products);
    }

    @RequestMapping(value = "/deleteCart", method = RequestMethod.POST)
    public ResponseEntity<?> deleteCart(@RequestBody Long[] IDs){
        Long productID = IDs[0];
        Long userID = IDs[1];
        logger.trace("deleteCart - ProductController -> method entered, productID = {}, userID = {}", productID, userID);
        productService.deleteCart(productID, userID);
        logger.trace("deleteCart - ProductController -> method finished");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
