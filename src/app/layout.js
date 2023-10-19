export const metadata = {
  title: "NEXT + Magic + NEAR",
  description: "Magic.Link demo built on NEXT.js with NEAR extension",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
