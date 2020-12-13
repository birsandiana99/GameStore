package ubb.gamestore.core.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.gamestore.core.domain.Cart;
import ubb.gamestore.core.domain.GSUser;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.core.domain.Wishlist;
import ubb.gamestore.core.repository.CartRepository;
import ubb.gamestore.core.repository.ProductRepository;
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

    @Override
    public List<Product> getProducts() {
        List<Product> products = productRepository.findAll();
        logger.trace("In ProductService - getProducts -> method entered, products = {}", products);
        return products;
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
