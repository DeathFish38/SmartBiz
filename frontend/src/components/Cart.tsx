import { CartItem } from "../types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface Props {
  cart: CartItem[]
  removeFromCart: (productId: number) => void
  createOrder: () => void
}

export const Cart: React.FC<Props> = ({ cart, removeFromCart, createOrder }) => {
  const total = cart.reduce((acc, i) => acc + i.subtotal, 0)

  return (
    <div className="space-y-4">
      {cart.length === 0 && <p className="text-sm">Cart is empty</p>}

      {cart.map(item => (
        <div key={item.product.id} className="flex justify-between items-center border rounded-lg p-3 hover:bg-green-50 transition">
          <div>
            <p className="font-medium">{item.product.name}</p>
            <p className="text-sm text-muted-foreground">{item.quantity} × ${item.product.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium">${item.subtotal.toFixed(2)}</span>
            <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.product.id)}>✕</Button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="w-full" onClick={createOrder}>Checkout</Button>
        </>
      )}
    </div>
  )
}