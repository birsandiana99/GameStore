package ubb.gamestore.core.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.gamestore.core.domain.Cart;
import ubb.gamestore.core.domain.GSUser;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.core.repository.CartRepository;
import ubb.gamestore.core.repository.ProductRepository;

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
    public void deleteCart(Long cartId) {
        logger.trace("deleteCart - ProductService -> method entered, CartID = {}", cartId);
        cartRepository.deleteById(cartId);
        //logger.trace("deleteCart - ProductService -> method finished, CartID = {}", cartId);
    }

    @Override
    public List<Product> getCartProductsForUser(GSUser user) {
        logger.trace("getCartProductsForUser - ProductService -> method entered, GSUser = {}", user);
        List<Product> shoppingCart = cartRepository.findAll().stream()
                .filter(cart -> cart.getGSUser_id().equals(user))
                .map(Cart::getProduct_id)
                .collect(Collectors.toList());
        logger.trace("getCartProductsForUser - ProductService -> method finished, GSUser = {}", user);
        return shoppingCart;
    }
}
