import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api } from "../api"

interface LoginProps {
  setUser: (user: any) => void
}

export const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      setUser(res.data.user)
    } catch {
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">POS Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}