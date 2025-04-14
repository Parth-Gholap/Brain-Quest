import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "./splash-screen.css" // Make sure to create this CSS file

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Automatically navigate to home page after animation completes
    const timer = setTimeout(() => {
      navigate('/home')
    }, 4500) // 4.5 seconds, matching the animation duration
    
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <AnimatePresence>
      <motion.div
        className="flash-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        <motion.div
          className="flash-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            BrainQuest
          </motion.h1>
          <motion.div
            className="flash-tagline"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Elevate Your Learning Experience
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SplashScreen