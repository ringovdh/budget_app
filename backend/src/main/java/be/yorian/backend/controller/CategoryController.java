package be.yorian.backend.controller;

import java.util.List;
import java.util.Optional;

import be.yorian.backend.entity.Category;
import org.springframework.http.ResponseEntity;

public interface CategoryController {

    List<Category> getCategories();
    Optional<Category> getCategory(long id);
    ResponseEntity<Void> saveCategory(Category category);
    Category updateCategory(Category category);
    void deleteCategory(long category_id);
        
    
}
