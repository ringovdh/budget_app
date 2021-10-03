package be.yorian.backend.service;

import be.yorian.backend.entity.ImportResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ImportService {

    ImportResponse handleImport(MultipartFile file);
}
