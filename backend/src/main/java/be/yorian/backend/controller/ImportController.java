package be.yorian.backend.controller;

import be.yorian.backend.entity.ImportResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ImportController {

    ImportResponse importTransactions(MultipartFile file);
}
