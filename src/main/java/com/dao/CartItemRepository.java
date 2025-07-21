package com.dao;

import com.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // Find all cart items by cart id
    List<CartItem> findByCartId(Long cartId);

}
