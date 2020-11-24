package ubb.gamestore.core.service;

import ubb.gamestore.core.domain.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> getProducts();

    Optional<Product> getProductByName(String name);

    Optional<Product> getProductByDescription(String name);

    Optional<Product> getProductByID(Long ID);
}
