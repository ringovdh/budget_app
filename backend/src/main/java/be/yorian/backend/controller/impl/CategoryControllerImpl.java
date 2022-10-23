package be.yorian.backend.controller.impl;

import be.yorian.backend.controller.CategoryController;
import be.yorian.backend.entity.Category;
import be.yorian.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryControllerImpl implements CategoryController{

	
    private CategoryService categoryService;

    public CategoryControllerImpl() {}

    @Autowired
    public CategoryControllerImpl(CategoryService categoryService) { 
    	this.categoryService = categoryService;
    }

    
    @Override
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryService.getCategories();
    }

    @Override
    @GetMapping("/categories/{category_id}")
    public Optional<Category> getCategoryById(@PathVariable("category_id") long category_id) {
        return categoryService.getCategoryById(category_id);
    }

    @Override
    @PostMapping("/categories/")
    public ResponseEntity<Void> saveCategory(@RequestBody Category category) {
        Category new_category = categoryService.saveCategory(category);

        return entityWithLocation(new_category.getId());
    }

    @Override
    @PutMapping("/categories/{category_id}")
    public Category updateCategory(@PathVariable("category_id")Long categoryId, @RequestBody Category category) {
        return categoryService.updateCategory(categoryId, category);
    }
    
    @Override
    @DeleteMapping("categories/{category_id}")
    public void deleteCategory(@PathVariable("category_id") long category_id) {
        categoryService.deleteCategory(category_id);
    }

    private ResponseEntity<Void> entityWithLocation(Object id) {
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{category_id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(location).build();
    }
 }
