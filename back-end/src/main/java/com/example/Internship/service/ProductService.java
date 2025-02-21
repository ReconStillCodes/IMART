package com.example.Internship.service;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.SearchingProductRequest;
import com.example.Internship.entity.Product;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.ProductMapper;
import com.example.Internship.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    @Autowired
    private ProductMapper productMapper;

    public ProductDto createProduct(ProductDto productDto){
        Product product = productMapper.mapToProduct(productDto);
        Product savedProduct = repo.save(product);
        return productMapper.mapToProductDto(savedProduct);
    }

    public ProductDto getProductById(Integer id){
        Product product = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Product does not Exist with id : " + id));
        return productMapper.mapToProductDto(product);
    }

    public List<ProductDto> getAllProducts(int page, int size) {
        Page<Product> productPage = repo.findAll(PageRequest.of(page, size));
        return productPage.getContent()
                .stream()
                .map(productMapper::mapToProductDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> searchProduct(int page, int size, SearchingProductRequest request){
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage;
        request.validateRequest();

        if (request.getCategoryId() == 0) {
            productPage = repo.searchProductsWithoutCategory(
                    request.getName(), request.getMinPrice(), request.getMaxPrice(), pageable
            );
        } else {
            productPage = repo.searchProductsWithCategory(
                    request.getName(), request.getMinPrice(), request.getMaxPrice(), request.getCategoryId(), pageable
            );
        }

        return productPage.getContent()
                .stream()
                .map(productMapper::mapToProductDto)
                .collect(Collectors.toList());
    }

    public int countSerachProduct(SearchingProductRequest request, int size){
        request.validateRequest();
        int count = 0;

        if (request.getCategoryId() == 0) {
            count = repo.countProductsWithoutCategory(request.getName(), request.getMinPrice(), request.getMaxPrice());
        }else{
            count = repo.countProductsWithCategory(request.getName(), request.getMinPrice(), request.getMaxPrice(), request.getCategoryId());
        }

        return (int) Math.ceil((double) count / size) - 1;
    }

    public ProductDto updateProduct(Integer id, ProductDto productDto){
        Product product = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Product does not Exist with id : " + id));
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setCategory(productMapper.mapToProduct(productDto).getCategory());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setImageUrl(productDto.getImageUrl());

        Product savedProduct = repo.save(product);
        return productMapper.mapToProductDto(product);
    }

    public void deleteProduct(Integer id){
        Product product = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Product does not Exist with id : " + id));
        repo.delete(product);
    }

    public int getTotalPage(Integer size){
        int count = (int) repo.count();
        return (int) Math.ceil((double) count / size) - 1;
    }

}
