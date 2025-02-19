package com.example.Internship.service;

import com.example.Internship.dto.ProductDto;
import com.example.Internship.dto.SearchingProductRequest;
import com.example.Internship.entity.Product;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.ProductMapper;
import com.example.Internship.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<ProductDto> getAllProducts(){
        List<Product> productList = repo.findAll();
        return productList.stream().map((product) -> productMapper.mapToProductDto(product)).collect(Collectors.toList());
    }

    public List<ProductDto> searchProduct(SearchingProductRequest request){
        List<Product> productList = null;
        request.validateRequest();

        if(request.getCategoryId() == 0){
            productList = repo.findByNameContainingIgnoreCaseAndPriceBetween(request.getName(), request.getMinPrice(), request.getMaxPrice());
        }else{
            productList = repo.findByNameContainingIgnoreCaseAndPriceBetweenAndCategoryId(request.getName(), request.getMinPrice(), request.getMaxPrice(), request.getCategoryId());
        }

        return productList.stream().map((product) -> productMapper.mapToProductDto(product)).collect(Collectors.toList());
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


}
