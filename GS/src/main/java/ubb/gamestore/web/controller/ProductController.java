package ubb.gamestore.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ubb.gamestore.core.domain.Cart;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.core.domain.Review;
import ubb.gamestore.core.domain.Wishlist;
import ubb.gamestore.core.service.ProductService;
import ubb.gamestore.web.converter.*;
import ubb.gamestore.web.dto.*;

import java.io.IOException;
import java.util.Arrays;
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
    @Autowired
    private WishlistConverter wishlistConverter;
    @Autowired
    private ReviewConverter reviewConverter;

    @RequestMapping(value = "/getProducts", method = RequestMethod.GET)
    public List<ProductDTO> getProducts() {
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

    @RequestMapping(value = "/addProductToCart", method = RequestMethod.POST)
    public CartDTO addProductToCart(@RequestBody CartDTO cartDTO){
        logger.trace("addProductToCart - ProductController -> method entered, cartDTO = {}", cartDTO);
        Cart cart = productService.addToCart(cartConverter.convertDtoToModel(cartDTO));
        logger.trace("addProductToCart - ProductController -> method finished, cart = {}", cart);
        return cartConverter.convertModelToDto(cart);
    }

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST)
    public ProductDTO addProduct(@RequestBody ProductDTO productDTO) {
        logger.trace("addProduct - ProductController -> method entered, productDTO = {}", productDTO);
        Product addedProduct = productService.addProduct(productConverter.convertDtoToModel(productDTO));
        ProductDTO addedProductDTO = productConverter.convertModelToDto(addedProduct);
        logger.trace("addProduct - ProductController -> method entered, addedProductDTO = {}", addedProductDTO);
        return addedProductDTO;
    }

    @RequestMapping(value = "/updateProduct", method = RequestMethod.POST)
    public ResponseEntity<?> updateProduct(@RequestBody ProductDTO productDTO){
        logger.trace("updateProduct - ProductController -> method entered, productDTO = {}", productDTO);
        productService.updateProduct(productConverter.convertDtoToModel(productDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteProduct/{productID}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteProduct(@PathVariable Long productID){
        logger.trace("deleteProduct - ProductController -> method entered, productID = {}", productID);
        productService.deleteProduct(productID);
        return new ResponseEntity<>(HttpStatus.OK);
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

    @RequestMapping(value = "/addProdToWishlist", method = RequestMethod.POST)
    public WishlistDTO addProdToWishlist(@RequestBody WishlistDTO wishlistDTO) {
        logger.trace("addProdToWishlist - ProductController -> method entered, wishlistDTO = {}", wishlistDTO);
        Wishlist wishlist = productService.addToWishlist(wishlistConverter.convertDtoToModel(wishlistDTO));
        logger.trace("addProdToWishlist - ProductController -> method finished, wishlist = {}", wishlist);
        return wishlistConverter.convertModelToDto(wishlist);
    }

    @RequestMapping(value = "/getWishlistProductsForUser", method = RequestMethod.POST)
    public List<ProductDTO> getWishlistProductForUser(@RequestBody UserDTO userDTO) {
        logger.trace("getWishlistProductsForUser - ProductController -> method entered, user = {}", userDTO);
        List<Product> products = productService.getWishlistProductsForUser(userConverter.convertDtoToModel(userDTO));
        logger.trace("getWishlistProductsForUser - ProductController -> method finished, products = {}", products);

        return productConverter.convertModelsToDtos(products);
    }

    @RequestMapping(value = "/deleteWishlist", method = RequestMethod.POST)
    public ResponseEntity<?> deleteWishlist(@RequestBody Long[] IDs) {
        Long productID = IDs[0];
        Long userID = IDs[1];
        logger.trace("deleteWishlist - ProductController -> method entered, productID = {}, userID = {}", productID, userID);
        productService.deleteWishlist(productID, userID);
        logger.trace("deleteWishlist - ProductController -> method finished");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/getReviewsForProductID", params = "ID", method = RequestMethod.GET)
    public List<ReviewDTO> getReviewsForProductID(@RequestParam Long ID) {
        logger.trace("getReviewsForProductID - ProductController -> method entered, ID = {}", ID);
        List<Review> reviews = productService.getReviewsForProduct(ID);
        logger.trace("getReviewsForProductID - ProductController -> method finished, reviews = {}", reviews);
        return reviewConverter.convertModelsToDtos(reviews);
    }

    @RequestMapping(value = "/addReview", method = RequestMethod.POST)
    public ReviewDTO addReview(@RequestBody ReviewDTO reviewDTO){
        logger.trace("addReview - ProductController -> method entered, reviewDTO = {}", reviewDTO);
        Review addedReview = productService.addReview(reviewConverter.convertDtoToModel(reviewDTO));
        ReviewDTO addedReviewDTO = reviewConverter.convertModelToDto(addedReview);
        logger.trace("addReview - ProductController -> method entered, addedReviewDTO = {}", addedReviewDTO);
        return addedReviewDTO;
    }

    @RequestMapping(value = "/updateReview", method = RequestMethod.POST)
    public ResponseEntity<?> updateReview(@RequestBody ReviewDTO reviewDTO){
        logger.trace("updateReview - ProductController -> method entered, reviewDTO = {}", reviewDTO);
        productService.updateReview(reviewConverter.convertDtoToModel(reviewDTO));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteReview/{reviewID}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewID){
        logger.trace("deleteReview - ProductController -> method entered, reviewID = {}", reviewID);
        productService.deleteReview(reviewID);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
