package smartbiz.smartbiz.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import smartbiz.smartbiz.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // find order by id
    List<CartItem> findByOrderId(Long orderId);

}
