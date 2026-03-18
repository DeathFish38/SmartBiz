package smartbiz.smartbiz.service;

import java.util.List;

import org.springframework.stereotype.Service;

import smartbiz.smartbiz.entity.CartItem;
import smartbiz.smartbiz.entity.Order;
import smartbiz.smartbiz.entity.OrderStatus;
import smartbiz.smartbiz.entity.Product;
import smartbiz.smartbiz.entity.User;
import smartbiz.smartbiz.repository.OrderRepository;
import smartbiz.smartbiz.repository.ProductRepository;
import smartbiz.smartbiz.repository.UserRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final ProductRepository productRepo;
    private final UserRepository userRepo;

    public OrderService(OrderRepository orderRepo, ProductRepository productRepo, UserRepository userRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    // Get order by ID
    public Order getOrderById(Long id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id " + id));
    }

    // Create a new order
    public Order createOrder(Long userId, List<CartItem> items) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);

        for (CartItem item : items) {
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new RuntimeException("Invalid quantity");
            }
            // get the existing product 
            Product product = productRepo.findById(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            // stock check 
            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("Not enough stock for " + product.getName());
            }
            // deduct stock
            product.setStock(product.getStock() - item.getQuantity());
            item.setProduct(product);
            item.setOrder(order);
        }
        order.setItems(items);
        return orderRepo.save(order);
    }

    // Update order status
    public Order updateStatus(Long orderId, OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return orderRepo.save(order);
    }

    // Delete order
    public void deleteOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }
}