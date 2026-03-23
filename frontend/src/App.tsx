import React, { useState } from "react"
import { Products } from "./components/Products"
import { Cart } from "./components/Cart"
import { Orders } from "./components/Orders"
import { Users } from "./components/Users"
import type { CartItem, Product, User } from "./types"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

type Page = "products" | "orders" | "users"

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("products")
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Add product to cart
  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * product.price }
            : i
        )
      }
      return [...prev, { product, quantity, subtotal: product.price * quantity }]
    })
  }

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(i => i.product.id !== productId))
  }

  // Create order
  const createOrder = async () => {
    if (!selectedUser) return alert("Select a customer first")
    if (!cart.length) return alert("Cart is empty")
    try {
      await fetch("/orders", {
        method: "POST",
        body: JSON.stringify({
          userId: selectedUser.id,
          items: cart.map(i => ({ productId: i.product.id, quantity: i.quantity })),
        }),
      })
      setCart([])
      alert("Order created!")
    } catch (err) {
      console.error(err)
      alert("Failed to create order")
    }
  }

  // Render main content based on selected page
  const renderPage = () => {
    switch (page) {
      case "products":
        return <Products addToCart={addToCart} />
      case "orders":
        return <Orders />
      case "users":
        return <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      default:
        return null
    }
  }

  // Cart total
  const total = cart.reduce((acc, i) => acc + i.subtotal, 0)

  return (
    <div className="flex min-h-screen bg-green-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-green-700 mb-4">POS System</h1>

          <Separator className="mb-4" />

          <nav className="space-y-2">
            <Button variant={page === "products" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setPage("products")}>Products</Button>
            <Button variant={page === "orders" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setPage("orders")}>Orders</Button>
            <Button variant={page === "users" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setPage("users")}>Customers</Button>
          </nav>
        </div>

        {/* Selected Customer */}
        <div className="pt-4">
          <Separator className="mb-3" />
          <Card className="p-2">
            <CardContent>
              {selectedUser ? (
                <>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedUser.name}</p>
                  <Badge variant="secondary">{selectedUser.email}</Badge>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No customer selected</p>
              )}
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">{page}</h2>
          <div className="text-sm font-medium">
            🛒 <Badge variant="secondary">{cart.length}</Badge> items | Total: ${total.toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main page content */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="capitalize">{page}</CardTitle>
              </CardHeader>
              <CardContent>{renderPage()}</CardContent>
            </Card>
          </div>

          {/* Cart */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Cart</CardTitle>
              </CardHeader>
              <CardContent>
                <Cart cart={cart} removeFromCart={removeFromCart} createOrder={createOrder} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App