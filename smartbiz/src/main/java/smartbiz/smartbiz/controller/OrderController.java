package smartbiz.smartbiz.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import smartbiz.smartbiz.entity.CartItem;
import smartbiz.smartbiz.entity.Order;
import smartbiz.smartbiz.entity.OrderStatus;
import smartbiz.smartbiz.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get a single order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    // Create a new order
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // Expect order.items to be filled with CartItems that have product set
        return orderService.createOrder(order, order.getItems());
    }

    // Add a cart item to an existing order
    @PostMapping("/{id}/items")
    public Order addCartItem(@PathVariable Long id, @RequestBody CartItem item) {
        // item must have product set
        return orderService.addCartItem(id, item);
    }

    // Update order status
    @PatchMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        return orderService.updateStatus(id, status);
    }

    // Delete order
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }
}