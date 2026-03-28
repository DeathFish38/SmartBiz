import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "../api"
import { User } from "../types"

interface Props {
  selectedUser: User | null
  setSelectedUser: (user: User) => void
}

export const Users: React.FC<Props> = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState<User[]>([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users")
      setUsers(res.data)
    } catch (err) {
      console.error("Failed to fetch users", err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // ➕ Create user
  const handleCreate = async () => {
    if (!name || !email) return

    try {
      await api.post("/users", { name, email, phone })
      setName("")
      setEmail("")
      setPhone("")
      fetchUsers()
    } catch (err) {
      console.error("Create failed", err)
    }
  }

  // Delete user
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/users/${id}`)
      fetchUsers()
      if (selectedUser?.id === id) {
        setSelectedUser(null as any)
      }
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  return (
    <div className="space-y-6">
      {/* ➕ Create User Form */}
      <div className="flex gap-2">
        <Input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Button onClick={handleCreate}>Add</Button>
      </div>

      {/* Users List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map(u => (
          <Card
            key={u.id}
            className={`cursor-pointer transition hover:shadow-lg ${
              selectedUser?.id === u.id
                ? "border-green-500 ring-2 ring-green-200"
                : ""
            }`}
            onClick={() => setSelectedUser(u)}
          >
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-muted-foreground">{u.email}</p>
                <p className="text-xs text-muted-foreground">{u.phone}</p>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="sm">
                  {selectedUser?.id === u.id ? "Selected" : "Select"}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(u.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}