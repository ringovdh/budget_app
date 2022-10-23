package be.yorian.backend.client;

import be.yorian.backend.controller.CategoryController;
import be.yorian.backend.entity.Category;
import be.yorian.backend.service.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CategoryController.class)
@AutoConfigureDataJpa
public class CategoryControllerBootTest {

    @Autowired
    private MockMvc mock;

    @MockBean
    private CategoryService service;

    @Test
    public void getCategory() throws Exception {
        given(service.getCategoryById(anyLong()))
                .willReturn(java.util.Optional.of(new Category("Voeding")));

        mock.perform(get("/categories/1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("label").value("Voeding"));

        verify(service).getCategoryById(anyLong());
    }

    @Test
    public void getAllCategories() throws Exception {
        List<Category> testCategories = Arrays.asList(new Category("Voeding"));
        given(service.getCategories())
                .willReturn(testCategories);

        mock.perform(get("/categories"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$..label").value("Voeding"));

        verify(service).getCategories();
    }

    @Test
    public void saveCategory() throws Exception {
        Category testCategory = new Category("Voeding");
        testCategory.setId(10L);

        given(service.saveCategory(any(Category.class)))
                .willReturn(testCategory);

        mock.perform(post("/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(testCategory)))
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", "http://localhost/categories/10"));

        verify(service).saveCategory(any(Category.class));
    }

    private String asJsonString(Category testCategory) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String jsonContent = mapper.writeValueAsString(testCategory);
            return jsonContent;
        } catch(Exception ex) {
            throw new RuntimeException(ex);
        }
    }
}
