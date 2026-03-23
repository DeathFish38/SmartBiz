import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "../api"
import { Order } from "../types"

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data))
  }, [])

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <Card key={order.id} className="hover:shadow-lg transition">
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Order #{order.id}</p>
              <Badge>{order.status}</Badge>
            </div>

            {order.items.map(i => (
              <div key={i.productId} className="flex justify-between text-sm">
                <span>{i.name} × {i.quantity}</span>
                <span>${i.subtotal.toFixed(2)}</span>
              </div>
            ))}

            <div className="flex justify-between font-semibold pt-2">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}