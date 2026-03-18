package smartbiz.smartbiz.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private Long id;
    private String status;
    private BigDecimal totalAmount;
    private List<Item> items;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Item {
        private Long productId;
        private String name;
        private Integer quantity;
        private BigDecimal subtotal;
    }
}