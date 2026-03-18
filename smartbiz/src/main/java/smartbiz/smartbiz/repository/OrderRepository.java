package smartbiz.smartbiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import smartbiz.smartbiz.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{

}