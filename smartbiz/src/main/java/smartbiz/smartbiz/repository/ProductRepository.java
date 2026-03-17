package smartbiz.smartbiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import smartbiz.smartbiz.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
