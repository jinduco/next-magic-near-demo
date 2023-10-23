"use client"

import { useState, useEffect } from "react"
import { UserContext } from "@/lib/UserContext"
import { useRouter } from "next/navigation"
import { magic } from "@/lib/magic"

// export const metadata = {
//   title: "NEXT + Magic + NEAR",
//   description: "Magic.Link demo built on NEXT.js with NEAR extension",
// }

export default function RootLayout({ children }) {
  const [user, setUser] = useState()
  const router = useRouter()

  useEffect(() => {
    setUser({ loading: true })
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getInfo().then((userData) => setUser(userData))
        router.push("/dashboard")
      } else {
        router.push("/login")
        setUser({ user: null })
      }
    })
  }, [])

  return (
    <html lang="en">
      <body>
        <UserContext.Provider value={[user, setUser]}>
          {children}
        </UserContext.Provider>
      </body>
    </html>
  )
}
