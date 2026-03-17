package smartbiz.smartbiz.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import smartbiz.smartbiz.entity.ProductCategory;
import smartbiz.smartbiz.repository.ProductCategoryRepository;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;

    // Add new product category
    public ProductCategory createCategory(ProductCategory category) {
        return productCategoryRepository.save(category);
    }

    // Get all category
    public List<ProductCategory> getAllCategories() {
        return productCategoryRepository.findAll();
    }

    // Get a category
    public ProductCategory getCategoryById(Long id) {
        return productCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    // Delete a category
    public void deleteCategory(Long id) {
        productCategoryRepository.deleteById(id);
    }

}
