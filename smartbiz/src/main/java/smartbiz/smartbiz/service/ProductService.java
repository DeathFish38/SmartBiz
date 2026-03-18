package smartbiz.smartbiz.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import smartbiz.smartbiz.entity.Product;
import smartbiz.smartbiz.entity.ProductCategory;
import smartbiz.smartbiz.repository.ProductCategoryRepository;
import smartbiz.smartbiz.repository.ProductRepository;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by id
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Add new product
    public Product createProduct(Product product, Long categoryId) {
        validateProduct(product);
        // fetch category id
        ProductCategory category = productCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);
        return productRepository.save(product);
    }

    // Update a product
    public Product updateProduct(Long id, Product updatedProduct, Long categoryId) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        // Update fields safely (ignore nulls)
        if (updatedProduct.getName() != null)
            existing.setName(updatedProduct.getName());
        if (updatedProduct.getDescription() != null)
            existing.setDescription(updatedProduct.getDescription());
        if (updatedProduct.getPrice() != null)
            existing.setPrice(updatedProduct.getPrice());
        if (updatedProduct.getStock() != null)
            existing.setStock(updatedProduct.getStock());
        if (updatedProduct.getImageUrl() != null)
            existing.setImageUrl(updatedProduct.getImageUrl());

        // Update category if provided
        if (categoryId != null) {
            ProductCategory category = productCategoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found with id " + categoryId));
            existing.setCategory(category);
        }

        // validation
        validateProduct(existing);
        return productRepository.save(existing);
    }

    // Delete product
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    // validation
    private void validateProduct(Product product) {
        if (product.getName() == null || product.getName().isBlank()) {
            throw new RuntimeException("Product name is required");
        }

        if (product.getPrice() == null || product.getPrice().doubleValue() < 0) {
            throw new RuntimeException("Price must be >= 0");
        }

        if (product.getStock() == null || product.getStock() < 0) {
            throw new RuntimeException("Stock must be >= 0");
        }
    }
}
