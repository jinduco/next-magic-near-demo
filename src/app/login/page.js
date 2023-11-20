"use client"

import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserContext } from "@/lib/UserContext"
import { magic } from "@/lib/magic"

export default function Login() {
  const [user, setUser] = useContext(UserContext)
  const [email, setEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    user?.issuer && router.push("/dashboard")
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      })

      // TODO: Work on implementing new NEXT.js api router properly
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${didToken}`,
      //   },
      // })

      // if (res.ok) {
      //   const userInfo = await magic.user.getInfo()
      //   setUser(userInfo)
      //   router.push("/dashboard")
      // }

      if (didToken) {
        const userInfo = await magic.user.getInfo()
        setUser(userInfo)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Magic Link</button>
    </form>
  )
}
