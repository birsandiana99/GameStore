package ubb.gamestore.core.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ubb.gamestore.core.domain.*;
import ubb.gamestore.core.repository.CartRepository;
import ubb.gamestore.core.repository.ProductRepository;
import ubb.gamestore.core.repository.ReviewRepository;
import ubb.gamestore.core.repository.WishlistRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    public static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Product> getProducts() {
        List<Product> products = productRepository.findAll();
        logger.trace("In ProductService - getProducts -> method entered, products = {}", products);
        return products;
    }

    @Override
    public List<Review> getReviewsForProduct(Long productID) {
        List<Review> reviews = reviewRepository.findAll().stream()
                .filter(review -> review.getProduct().getId().equals(productID))
                .collect(Collectors.toList());

        logger.trace("In ProductService - getReviewsForProduct -> method entered, reviews = {}", reviews);
        return reviews;
    }

    @Override
    public Product addProduct(Product product) {
        logger.trace("addProduct - ProductService -> method entered, Product = {}", product);
        Product addedProduct = productRepository.save(product);
        logger.trace("addProduct - ProductService -> method finished, Product = {}", addedProduct);
        return addedProduct;
    }

    @Override
    @Transactional
    public void updateProduct(Product updatedProduct) {
        logger.trace("updateProduct - ProductService -> method entered, Product = {}", updatedProduct);
        logger.trace("updateProduct - ProductService -> method entered, id = {}", updatedProduct.getId());
        Optional<Product> optionalProduct = productRepository.findById(updatedProduct.getId());
        if(optionalProduct.isEmpty())
            return;
        Product product = optionalProduct.get();
        product.setDescription(updatedProduct.getDescription());
        product.setImage(updatedProduct.getImage());
        product.setName(updatedProduct.getName());
        product.setPrice(updatedProduct.getPrice());

        logger.trace("updateProduct - ProductService -> method entered, updatedProduct = {}", product);

    }

    @Override
    public void deleteProduct(Long productID) {
        logger.trace("deleteProduct - ProductService -> method entered, ProductID = {}", productID);
        List<Long> cartIDs = cartRepository.findAll().stream()
                .filter(cart -> cart.getProduct().getId().equals(productID))
                .map(BaseEntity::getId)
                .collect(Collectors.toList());
        cartIDs.forEach(id -> cartRepository.deleteById(id));

        List<Long> wishlistIDs = wishlistRepository.findAll().stream()
                .filter(wishlist -> wishlist.getProduct().getId().equals(productID))
                .map(BaseEntity::getId)
                .collect(Collectors.toList());
        wishlistIDs.forEach(id -> wishlistRepository.deleteById(id));

        List<Long> reviewIDs = reviewRepository.findAll().stream()
                .filter(review -> review.getProduct().getId().equals(productID))
                .map(BaseEntity::getId)
                .collect(Collectors.toList());
        reviewIDs.forEach(id -> reviewRepository.deleteById(id));
        productRepository.deleteById(productID);
    }

    @Override
    public Review addReview(Review review) {
        logger.trace("addReview - ProductService -> method entered, Review = {}", review);
        Review addedReview = reviewRepository.save(review);
        logger.trace("addReview - ProductService -> method finished, Review = {}", addedReview);
        return addedReview;
    }

    @Override
    @Transactional
    public void updateReview(Review updatedReview) {
        logger.trace("updateReview - ProductService -> method entered, Review = {}", updatedReview);
        reviewRepository.findAll().forEach(review -> {
            if(review.getId().equals(updatedReview.getId())){
                review.setText(updatedReview.getText());
            }
        });
    }

    @Override
    public void deleteReview(Long reviewID) {
        logger.trace("deleteReview - ProductService -> method entered, ReviewID = {}", reviewID);
        reviewRepository.deleteById(reviewID);
    }

    @Override
    public Optional<Product> getProductByName(String name) {
        logger.trace("getProductByName - ProductService -> method entered, name = {}", name);
        return productRepository.findAll().stream().filter(product -> product.getName().equals(name)).findFirst();
    }

    @Override
    public Optional<Product> getProductByDescription(String description) {
        logger.trace("getProductByDescription - ProductService -> method entered, description = {}", description);
        return productRepository.findAll().stream().filter(product -> product.getDescription().equals(description)).findFirst();
    }

    @Override
    public Optional<Product> getProductByID(Long ID) {
        logger.trace("getProductByID - ProductService -> method entered, ID = {}", ID);
        Optional<Product> optionalProduct =
                productRepository.findAll().stream().filter(product -> product.getId().equals(ID)).findFirst();
        if (optionalProduct.isEmpty()) {
            logger.trace("getProductByID - ProductService -> no product with ID = {}", ID);
        }
        else{
            logger.trace("getProductByID - ProductService -> product with ID = {} found, prod ={} ", ID, optionalProduct.get());
        }
        return optionalProduct;
    }

    @Override
    public Cart addToCart(Cart cart) {
        logger.trace("addToCart - ProductService -> method entered, Cart = {}", cart);
        Cart addedCart = cartRepository.save(cart);
        logger.trace("addToCart - ProductService -> method finished, Cart = {}", cart);
        return addedCart;
    }

    @Override
    public void deleteCart(Long productID, Long userID) {
        logger.trace("deleteCart - ProductService -> method entered, productID = {}, userID = {}", productID, userID);
        Optional<Cart> cartOptional = cartRepository.findAll().stream()
                .filter(cart -> cart.getUser().getId().equals(userID))
                .filter(cart -> cart.getProduct().getId().equals(productID))
                .findFirst();
        cartOptional.ifPresent(cart -> cartRepository.deleteById(cart.getId()));
        logger.trace("deleteCart - ProductService -> method finished");
    }

    @Override
    public List<Product> getCartProductsForUser(GSUser user) {
        logger.trace("getCartProductsForUser - ProductService -> method entered, GSUser = {}", user);
        List<Product> shoppingCart = cartRepository.findAll().stream()
                .filter(cart -> cart.getUser().getId().equals(user.getId()))
                .map(Cart::getProduct)
                .collect(Collectors.toList());
        logger.trace("getCartProductsForUser - ProductService -> method finished, shoppingCart = {}", shoppingCart);
        return shoppingCart;
    }

    @Override
    public Wishlist addToWishlist(Wishlist wishlist) {
        logger.trace("addToWishlist - ProductService -> method entered, Wishlist = {}", wishlist);
        Wishlist addedWishlist = wishlistRepository.save(wishlist);
        logger.trace("addToWishlist - ProductService -> method finished, Wishlist = {}", wishlist);
        return addedWishlist;
    }

    @Override
    public void deleteWishlist(Long productID, Long userID) {
        logger.trace("deleteWishlist - ProductService -> method entered, productID = {}, userID = {}", productID, userID);
        Optional<Wishlist> wishlistOptional = wishlistRepository.findAll().stream().
                filter(wishlist -> wishlist.getUser().getId().equals(userID)).
                filter(wishlist -> wishlist.getProduct().getId().equals(productID)).
                findFirst();
        wishlistOptional.ifPresent(wishlist -> wishlistRepository.deleteById(wishlist.getId()));
        logger.trace("deleteWishlist - ProductService -> method finished");
    }

    @Override
    public List<Product> getWishlistProductsForUser(GSUser user) {
        logger.trace("getWishlistProductsForUser - ProductService -> method entered, GSUser = {}", user);
        List<Product> wishList = wishlistRepository.findAll().stream()
                .filter(wishlist -> wishlist.getUser().getId().equals(user.getId()))
                .map(Wishlist::getProduct)
                .collect(Collectors.toList());
        logger.trace("getWishlistProductsForUser - ProductService -> method finished, WishList = {}", wishList);
        return wishList;
    }
}
