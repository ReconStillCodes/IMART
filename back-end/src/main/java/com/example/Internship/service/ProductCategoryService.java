package com.example.Internship.service;

import com.example.Internship.dto.ProductCategoryDto;
import com.example.Internship.entity.ProductCategory;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.ProductCategoryMapper;
import com.example.Internship.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductCategoryService {

    @Autowired
    private ProductCategoryRepository repo;

    public ProductCategoryDto createProductCategory(ProductCategoryDto productCategoryDto){
        ProductCategory productCategory = ProductCategoryMapper.mapToProductCategory(productCategoryDto);
        ProductCategory savedProductCategory = repo.save(productCategory);
        return ProductCategoryMapper.mapToProductCategoryDto(savedProductCategory);
    }

    public ProductCategoryDto getProductCategoryById(Integer id){
        ProductCategory productCategory = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Product Catgoery Does not Exist with the given id: " + id));

        return ProductCategoryMapper.mapToProductCategoryDto(productCategory);
    }

    public List<ProductCategoryDto> getAllProductCategories(){
        List<ProductCategory> productCategoryList = repo.findAll();
        return productCategoryList.stream().map((pc) -> ProductCategoryMapper.mapToProductCategoryDto(pc)).collect(Collectors.toList());
    }



}
