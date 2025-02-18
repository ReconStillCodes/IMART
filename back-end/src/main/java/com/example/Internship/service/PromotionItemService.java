package com.example.Internship.service;

import com.example.Internship.dto.PromotionItemDto;
import com.example.Internship.entity.PromotionCategory;
import com.example.Internship.entity.PromotionItem;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.mapper.PromotionItemMapper;
import com.example.Internship.repository.PromotionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionItemService {

    @Autowired
    private PromotionItemRepository repo;

    @Autowired
    private PromotionItemMapper promotionItemMapper;

    public PromotionItemDto createdPromotionItem(PromotionItemDto promotionItemDto){
        PromotionItem promotionItem = promotionItemMapper.mapToPromotionItem(promotionItemDto);
        PromotionItem savedPromotionItem = repo.save(promotionItem);
        return promotionItemMapper.mapToPromotionItemDto(savedPromotionItem);
    }

    public PromotionItemDto getPromotionItemById(Integer id){
        PromotionItem promotionItem = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Promotion Item does not exist with id: " + id));
        return promotionItemMapper.mapToPromotionItemDto(promotionItem);
    }

    public List<PromotionItemDto> getAllPromotionItems(){
        List<PromotionItem> promotionItemDtoList = repo.findAll();
        return promotionItemDtoList.stream().map((promotionItem) -> promotionItemMapper.mapToPromotionItemDto(promotionItem)).collect(Collectors.toList());
    }

    public List<PromotionItemDto> getPromotionItemsByPromotionId(Integer id){
        List<PromotionItem> promotionItemDtoList = repo.findByPromotionId(id);
        return promotionItemDtoList.stream().map((promotionItem) -> promotionItemMapper.mapToPromotionItemDto(promotionItem)).collect(Collectors.toList());
    }

    public PromotionItemDto getPromotionItemsByProductId(Integer id){
        PromotionItem promotionItem = repo.findFirstByProductId(id);
        if(promotionItem == null)
            return null;
        return promotionItemMapper.mapToPromotionItemDto(promotionItem);
    }

}
