package com.example.Internship.dto;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class SchemaFile {

    private String filename;
    private String text;


    public SchemaFile() throws IOException {
        this.filename = "schema.txt";
        this.text = Files.readString(Paths.get(filename));
        System.out.println(text);
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
