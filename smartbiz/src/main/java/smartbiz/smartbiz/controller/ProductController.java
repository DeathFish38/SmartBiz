package smartbiz.smartbiz.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import smartbiz.smartbiz.entity.Product;
import smartbiz.smartbiz.service.ProductService;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    // Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get a product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Create a product (categoryId required)
    @PostMapping
    public Product createProduct(@RequestBody Product product,
            @RequestParam Long categoryId) {
        return productService.createProduct(product, categoryId);
    }

    // Update a product (partial update allowed)
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id,
            @RequestBody Product product,
            @RequestParam(required = false) Long categoryId) {
        return productService.updateProduct(id, product, categoryId);
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}