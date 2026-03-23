import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { api } from "../api"
import { User } from "../types"

interface Props {
  selectedUser: User | null
  setSelectedUser: (user: User) => void
}

export const Users: React.FC<Props> = ({ selectedUser, setSelectedUser }) => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    api.get("/auth/users").then(res => setUsers(res.data))
  }, [])

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map(u => (
        <Card
          key={u.id}
          className={`cursor-pointer transition hover:shadow-lg ${
            selectedUser?.id === u.id ? "border-green-500 ring-2 ring-green-200" : ""
          }`}
          onClick={() => setSelectedUser(u)}
        >
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-muted-foreground">{u.email}</p>
            </div>

            <Button variant="secondary" size="sm">
              {selectedUser?.id === u.id ? "Selected" : "Select"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}