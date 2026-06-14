import React, { useState } from "react"
import chatapp from "../assets/speech-bubble.png"
import toast from "react-hot-toast"
import { createroomapi, joinroomapi } from "../services/Roomservice"
import useChatcontext from "../context/Chatcontext"
import { useNavigate } from "react-router"
import {
  useUser,
  useAuth,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { MessageCircle } from "lucide-react"

const JoinCreateChat = () => {
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  const { setRoomid, setcurrentUser, setConnected, setRoomname } = useChatcontext()

  const [detail, setDetail] = useState({
    roomid: "",
    roomname: "",
    userName: "",
  })

  function handleChange(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value })
  }

  function validateform() {
    if (!detail.userName || !detail.roomid) {
      toast.error("Invalid Inputs")
      return false
    }
    return true
  }

  async function joinChat() {
    if (!isSignedIn) return toast.error("Please login first")
    if (!validateform()) return

    try {
      const response = await joinroomapi(detail.roomid)
      toast.success("Room Joined Successfully")
      setcurrentUser(detail.userName)
      setRoomid(response.roomId)        // Fix: was response.roomid (missing capital I)
      setRoomname(response.roomname)
      setConnected(true)
      navigate("/chat")
    } catch {
      toast.error("Error joining room")
    }
  }

  async function createroom() {
    if (!isSignedIn) return toast.error("Please login first")

    const roomname = window.prompt("Enter Room Name")
    if (!roomname) return

    try {
      const response = await createroomapi(detail.roomid, roomname)
      toast.success("Room Created Successfully")
      setcurrentUser(detail.userName)
      setRoomid(response.roomId)        // Fix: was response.roomid (missing capital I)
      setRoomname(roomname)
      setConnected(true)
      navigate("/chat")
    } catch {
      toast.error("Room already exists")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6">
        

        <CardHeader className="text-center space-y-2">
          <img src={chatapp} alt="chat" className="w-20 mx-auto" />
          <CardTitle className="text-lg font-semibold">Join or Create Chat Room</CardTitle>

          <SignedIn>
            <p className="text-sm text-muted-foreground">
              Welcome, {user?.fullName}
            </p>
          </SignedIn>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* AUTH BUTTONS */}
          <div className="flex justify-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Login</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <SignOutButton>
                <Button variant="destructive">Logout</Button>
              </SignOutButton>
            </SignedIn>
          </div>

          <Separator />

          {/* USERNAME */}
          <div className="space-y-2">
            <Label>Your Name</Label>
            <Input
              name="userName"
              placeholder="Enter your nickname"
              value={detail.userName}
              onChange={handleChange}
            />
          </div>

          {/* ROOM ID */}
          <div className="space-y-2">
            <Label>Room ID</Label>
            <Input
              name="roomid"
              placeholder="Enter room ID"
              value={detail.roomid}
              onChange={handleChange}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 pt-2">
            <Button className="flex-1" onClick={joinChat}>
              Join Room
            </Button>
            <Button  className="flex-1" onClick={createroom}>
              Create Room
            </Button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-2">
            🔒 Secure • ⚡ Real-time • 🌐 WebSocket Powered
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default JoinCreateChat;
