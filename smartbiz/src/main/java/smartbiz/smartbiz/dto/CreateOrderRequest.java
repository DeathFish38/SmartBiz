package smartbiz.smartbiz.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateOrderRequest {
    private Long userId;
    private List<CartItemRequest> items;
}

