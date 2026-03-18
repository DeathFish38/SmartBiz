package smartbiz.smartbiz.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import smartbiz.smartbiz.dto.CartItemRequest;
import smartbiz.smartbiz.dto.CreateOrderRequest;
import smartbiz.smartbiz.dto.OrderResponse;
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
    public Order createOrder(CreateOrderRequest request) {

        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);

        List<CartItem> items = new ArrayList<>();

        for (CartItemRequest req : request.getItems()) {

            if (req.getQuantity() == null || req.getQuantity() <= 0) {
                throw new RuntimeException("Quantity must be > 0");
            }

            Product product = productRepo.findById(req.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < req.getQuantity()) {
                throw new RuntimeException("Not enough stock for " + product.getName());
            }

            // deduct stock and save
            product.setStock(product.getStock() - req.getQuantity());
            productRepo.save(product);

            CartItem item = new CartItem();
            item.setProduct(product);
            item.setQuantity(req.getQuantity());
            item.setOrder(order);

            items.add(item);

        }
        order.setItems(items);
        Order savedOrder = orderRepo.save(order);
        BigDecimal total = savedOrder.getTotalAmount();
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

    // dto order response
    public OrderResponse mapToResponse(Order order) {
        List<OrderResponse.Item> items = order.getItems().stream()
                .map(i -> new OrderResponse.Item(
                        i.getProduct().getId(),
                        i.getProduct().getName(),
                        i.getQuantity(),
                        i.getSubtotal()))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getStatus().name(),
                order.getTotalAmount(),
                items);
    }
}