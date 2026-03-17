package smartbiz.smartbiz.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import smartbiz.smartbiz.entity.ProductCategory;
import smartbiz.smartbiz.service.ProductCategoryService;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    // Product category controller
    @GetMapping
    public List<ProductCategory> getAllCategories() {
        return productCategoryService.getAllCategories();
    }

    @PostMapping
    public ProductCategory createCategory(@RequestBody ProductCategory c) {
        return productCategoryService.createCategory(c);
    }

    @DeleteMapping 
    public void deleteCategory(@PathVariable Long id){
        productCategoryService.deleteCategory(id);
    }

}
