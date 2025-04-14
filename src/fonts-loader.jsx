"use client"

import { useEffect } from "react"

export default function FontsLoader() {
  useEffect(() => {
    // Load the Poppins font
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Load Three.js font for Text3D component
    const fontLoader = document.createElement("script")
    fontLoader.src = "https://cdn.jsdelivr.net/npm/three@0.137.0/examples/fonts/helvetiker_regular.typeface.json"
    fontLoader.async = true
    document.head.appendChild(fontLoader)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(fontLoader)
    }
  }, [])

  return null
}
