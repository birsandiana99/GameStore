package ubb.gamestore.core.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.gamestore.core.domain.Product;
import ubb.gamestore.core.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    public static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepository productRepository;

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
}
