import React, { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { api } from "../api"
import type { Product } from "../types"

interface Props {
  addToCart: (product: Product, quantity: number) => void
}

export const Products: React.FC<Props> = ({ addToCart }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [qty, setQty] = useState<Record<number, number>>({})

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data))
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <Card
          key={product.id}
          className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
        >
          <CardContent className="p-4 space-y-3">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-36 w-full object-cover rounded-md"
            />

            <div>
              <p className="font-semibold text-lg">{product.name}</p>
              <p className="text-green-700 font-medium">${product.price}</p>
            </div>

            <Badge variant="secondary">Stock: {product.stock}</Badge>
          </CardContent>

          <CardFooter className="flex gap-2 mt-auto">
            <Input
              type="number"
              min={1}
              value={qty[product.id] || 1}
              onChange={e => setQty({ ...qty, [product.id]: Number(e.target.value) })}
              className="w-16"
            />
            <Button
              className="flex-1"
              onClick={() => addToCart(product, qty[product.id] || 1)}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}