package ubb.gamestore.core.service;

import ubb.gamestore.core.domain.*;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getProducts();

    List<Review> getReviewsForProduct(Long productID);

    Product addProduct(Product product);

    void updateProduct(Product updatedProduct);

    void deleteProduct(Long productID);

    Review addReview(Review review);

    void updateReview(Review updatedReview);

    void deleteReview(Long reviewID);

    Optional<Product> getProductByName(String name);

    Optional<Product> getProductByDescription(String name);

    Optional<Product> getProductByID(Long ID);

    Cart addToCart(Cart cart);

    void deleteCart(Long productID, Long userID);

    List<Product> getCartProductsForUser(GSUser user);

    Wishlist addToWishlist(Wishlist wishlist);

    void deleteWishlist(Long productID, Long userID);

    List<Product> getWishlistProductsForUser(GSUser user);
}
