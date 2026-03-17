package smartbiz.smartbiz.controller;

import java.util.List;

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
public class ProductController {

    private final ProductService productService;

    // get all
    @GetMapping
    public List<Product> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return products;
    }

    // get by id
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // create product
    @PostMapping
    public Product createProduct(@RequestBody Product product,
            @RequestParam Long categoryId) {
        return productService.createProduct(product, categoryId);
    }

    // update product
    @PutMapping("{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product,
            @RequestParam(required = false) Long categoryId) {
        return productService.updateProduct(id, product, categoryId);
    }

    // delete product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
