export const metadata = {
  title: 'Fitness Dashboard',
  description: 'Track your workouts and body metrics',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
