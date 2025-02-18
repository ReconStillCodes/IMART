package com.example.Internship.service;

import com.example.Internship.dto.*;
import com.example.Internship.dto.PromotionProductRequest.PromotionProductRequest;
import com.example.Internship.entity.Cart;
import com.example.Internship.entity.CartItem;
import com.example.Internship.entity.Promotion;
import com.example.Internship.entity.PromotionItem;
import com.example.Internship.exception.ResourceNotFoundException;
import com.example.Internship.factory.PromotionProductFactory.PromotionProductFactory;
import com.example.Internship.mapper.CartItemMapper;
import com.example.Internship.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartItemService {
    @Autowired
    private CartItemRepository repo;

    @Autowired
    private CartItemMapper cartItemMapper;

    @Autowired
    private PromotionItemService promotionItemService;

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private ProductService productService;

    public CartItemDto createCartItem(CartItemDto cartItemDto){
        Double totalPrice = calculateTotalPrice(cartItemDto);
        CartItemDto existingCartItem = getCartItemByCartIdAndProductId(cartItemDto.getCartId(), cartItemDto.getProductId());

        if(existingCartItem == null){
            CartItem cartItem = cartItemMapper.mapToCartItem(cartItemDto);
            cartItem.setTotalPrice(totalPrice);
            CartItem savedCartItem = repo.save(cartItem);
            return cartItemMapper.mapToCartItemDto(savedCartItem);
        }

        existingCartItem.setQuantity(existingCartItem.getQuantity() + cartItemDto.getQuantity());
        existingCartItem.setTotalPrice(existingCartItem.getTotalPrice() + totalPrice);
        CartItem savedCartItem = repo.save(cartItemMapper.mapToCartItem(existingCartItem));
        return cartItemMapper.mapToCartItemDto(savedCartItem);
    }

    public Double calculateTotalPrice(CartItemDto cartItemDto){
        PromotionItemDto promotionItemDto = null;
        ProductDto productDto = productService.getProductById(cartItemDto.getProductId());

        try{
            promotionItemDto = (PromotionItemDto) promotionItemService.getPromotionItemsByProductId(productDto.getId());
        }catch (ResourceNotFoundException ignored){}

        if(promotionItemDto != null){
            PromotionDto promotionDto = promotionService.getPromotionById(promotionItemDto.getPromotionId());
            PromotionProductFactory factory = PromotionProductFactory.getFactory(promotionDto.getCategoryId());

            PromotionProductRequest promotionProductRequest = null;

            if(factory != null){
                promotionProductRequest = factory.createProduct(productDto, promotionDto);
            }

            return cartItemDto.getQuantity() * promotionProductRequest.getDiscountPrice();
        }
        else{
            return cartItemDto.getQuantity() * productDto.getPrice();
        }
    }

    public CartItemDto getCartItemById(Integer id){
        CartItem cartItem = repo.findById(id).orElseThrow(()->new ResourceNotFoundException("Cart item does not Exist with id : " + id));
        return cartItemMapper.mapToCartItemDto(cartItem);
    }

    public List<CartItemDto> getAllCartItems(){
        List<CartItem> cartItemList = repo.findAll();
        return cartItemList.stream().map((cartItem) -> cartItemMapper.mapToCartItemDto(cartItem)).collect(Collectors.toList());
    }

    public CartItemDto getCartItemByCartIdAndProductId(Integer cartId, Integer productId){
        CartItem cartItem = repo.findByCartIdAndProductId(cartId, productId);
        if(cartItem == null)return null;
        return cartItemMapper.mapToCartItemDto(cartItem);
    }

    public List<CartItemDto> getCartItemByCartId(Integer cartId){
        List<CartItem> cartItemList = repo.findByCartId(cartId);
        return cartItemList.stream().map((cartItem) -> cartItemMapper.mapToCartItemDto(cartItem)).collect(Collectors.toList());
    }


}
