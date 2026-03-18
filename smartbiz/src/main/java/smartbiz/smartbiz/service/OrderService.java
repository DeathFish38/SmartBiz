package smartbiz.smartbiz.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import smartbiz.smartbiz.entity.CartItem;
import smartbiz.smartbiz.entity.Order;
import smartbiz.smartbiz.entity.OrderStatus;
import smartbiz.smartbiz.repository.CartItemRepository;
import smartbiz.smartbiz.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepo;
    private final CartItemRepository cartItemRepo;

    public OrderService(OrderRepository orderRepo, CartItemRepository cartItemRepo) {
        this.orderRepo = orderRepo;
        this.cartItemRepo = cartItemRepo;
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

    // Create a new order with cart items
    public Order createOrder(Order order, List<CartItem> items) {
        // Calculate subtotal for each item automatically
        for (CartItem item : items) {
            if (item.getProduct() == null) {
                throw new RuntimeException("CartItem must have a Product assigned");
            }
            item.setSubtotal(item.getProduct().getPrice()
                    .multiply(BigDecimal.valueOf(item.getQuantity())));
            item.setOrder(order);
        }

        order.setItems(items);
        order.setTotalAmount(items.stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));
        order.setStatus(OrderStatus.PENDING);

        return orderRepo.save(order);
    }

    // Add a cart item to an existing order
    public Order addCartItem(Long orderId, CartItem item) {
        Order order = getOrderById(orderId);

        if (item.getProduct() == null) {
            throw new RuntimeException("CartItem must have a Product assigned");
        }

        item.setSubtotal(item.getProduct().getPrice()
                .multiply(BigDecimal.valueOf(item.getQuantity())));
        item.setOrder(order);

        cartItemRepo.save(item);
        order.getItems().add(item);

        order.setTotalAmount(order.getItems().stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

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
        Order order = getOrderById(orderId);
        cartItemRepo.deleteAll(order.getItems());
        orderRepo.delete(order);
    }
}