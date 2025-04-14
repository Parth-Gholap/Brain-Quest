"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Link } from "react-router-dom"
import "./home.css"
import {
  BookOpen,
  Brain,
  Calculator,
  ChevronRight,
  Code,
  Gamepad2,
  Lightbulb,
  X,
  Microscope,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float, OrbitControls, PerspectiveCamera, Sparkles as DreiSparkles } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import * as THREE from "three"

// Floating 3D brain model component
const FloatingBrain = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={[0.6, 0.6, 0.6]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#8a2be2"
          emissive="#4b0082"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
        />
        <mesh position={[0, 0.2, 0.8]} scale={[0.4, 0.5, 0.4]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#9370db" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.7, 0.3, 0.4]} scale={[0.3, 0.3, 0.3]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#9370db" transparent opacity={0.7} />
        </mesh>
        <mesh position={[-0.6, 0.4, 0.3]} scale={[0.25, 0.25, 0.25]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#9370db" transparent opacity={0.7} />
        </mesh>
      </mesh>
    </Float>
  )
}

// Neural Network Component
const NeuralNetwork = () => {
  const group = useRef()
  const nodes = useRef([])
  const connections = useRef([])
  const nodesCount = 15
  const connectionCount = 20

  useEffect(() => {
    // Create nodes
    nodes.current = Array(nodesCount)
      .fill()
      .map(() => ({
        position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
        scale: Math.random() * 0.3 + 0.2,
        speed: Math.random() * 0.01,
      }))

    // Create connections between random nodes
    connections.current = Array(connectionCount)
      .fill()
      .map(() => {
        const startIndex = Math.floor(Math.random() * nodesCount)
        let endIndex
        do {
          endIndex = Math.floor(Math.random() * nodesCount)
        } while (endIndex === startIndex)

        return { start: startIndex, end: endIndex }
      })
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    // Animate nodes
    nodes.current.forEach((node, i) => {
      const mesh = group.current?.children[i]
      if (mesh) {
        mesh.position.y += Math.sin(time * node.speed + i) * 0.01
        mesh.rotation.y = time * 0.1
      }
    })
  })

  return (
    <group ref={group}>
      {/* Nodes */}
      {nodes.current.map((node, i) => (
        <mesh key={`node-${i}`} position={node.position} scale={[node.scale, node.scale, node.scale]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#88ccff"
            emissive="#4488ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Connections */}
      {connections.current.map((connection, i) => {
        if (!nodes.current[connection.start] || !nodes.current[connection.end]) return null

        const start = new THREE.Vector3(...nodes.current[connection.start].position)
        const end = new THREE.Vector3(...nodes.current[connection.end].position)
        const direction = end.clone().sub(start)
        const length = direction.length()

        // Calculate midpoint
        const midPoint = start.clone().add(direction.clone().multiplyScalar(0.5))

        // Calculate rotation to point cylinder from start to end
        const arrow = new THREE.ArrowHelper(direction.clone().normalize(), start)
        const rotation = arrow.rotation.clone()

        return (
          <mesh key={`connection-${i}`} position={midPoint} rotation={rotation}>
            <cylinderGeometry args={[0.02, 0.02, length, 8]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial
              color="#4488ff"
              transparent
              opacity={0.6}
              emissive="#4488ff"
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Floating Book Component
const FloatingBook = ({ position, rotation, scale }) => {
  const book = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    book.current.rotation.y = rotation[1] + Math.sin(t * 0.3) * 0.1
    book.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2
  })

  return (
    <group ref={book} position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[1.5, 0.2, 2]} />
        <meshStandardMaterial color="#335599" metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[1.4, 0.1, 1.9]} />
        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.5, 0.05, 2]} />
        <meshStandardMaterial color="#335599" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Glowing Orb Component
const GlowingOrb = ({ position, color, size, speed }) => {
  const orb = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    orb.current.position.y = position[1] + Math.sin(t * speed) * 0.3
    orb.current.rotation.y = t * 0.2
    orb.current.rotation.z = t * 0.1
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={orb} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.7} />
        <DreiSparkles count={20} scale={[2, 2, 2]} size={6} speed={0.3} color={color} />
      </mesh>
    </Float>
  )
}

// 3D Scene Component
const Scene = () => {
  return (
    <>
      <color attach="background" args={["#050816"]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#88ccff" />

      <Suspense fallback={null}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          <NeuralNetwork />
        </Float>

        <FloatingBook position={[-5, 0, -2]} rotation={[0.2, 0.5, 0.1]} scale={[0.8, 0.8, 0.8]} />
        <FloatingBook position={[5, -1, -3]} rotation={[-0.1, -0.3, 0.1]} scale={[0.7, 0.7, 0.7]} />

        <GlowingOrb position={[-3, 2, -1]} color="#ff88aa" size={0.7} speed={0.5} />
        <GlowingOrb position={[3, -2, -2]} color="#88ffaa" size={0.5} speed={0.7} />
        <GlowingOrb position={[0, 3, -3]} color="#88aaff" size={0.6} speed={0.6} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <group position={[3, 1, 0]}>
          <FloatingBrain />
        </group>

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <ChromaticAberration offset={[0.0005, 0.0005]} />
        </EffectComposer>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </>
  )
}

// Animated card component
const GameCard = ({ title, description, icon, href, active, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`game-card ${isHovered ? "hovered" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="game-card-content">
        <motion.div
          className="game-card-header"
          animate={{
            backgroundColor: isHovered ? "rgba(138, 43, 226, 0.2)" : "rgba(138, 43, 226, 0.1)",
          }}
        >
          <motion.div
            animate={{
              rotate: isHovered ? [0, 15, -15, 0] : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          <h3>{title}</h3>
        </motion.div>
        <p>{description}</p>
        <div className="game-card-buttons">
          {active ? (
            <Link to={href} className="play-button">
              Play <ChevronRight className="chevron-icon" />
            </Link>
          ) : (
            <button disabled>Coming Soon</button>
          )}
          <Link to={active ? `${href}-info` : "#"} className={`preview-button ${!active ? "disabled" : ""}`}>
            Preview
          </Link>
        </div>
        {isHovered && (
          <motion.div
            className="card-particles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: Math.random() * 1 + 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// Knowledge burst component
const KnowledgeBurst = ({ concept, visible, onClose }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hidden-game"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <motion.div
            className="hidden-game-content"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, type: "spring" }}
          >
            <div className="hidden-game-header">
              <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Sparkles className="sparkle-icon" /> Quick Knowledge Burst!
              </motion.h3>
              <motion.button onClick={onClose} whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                <X className="close-icon" />
              </motion.button>
            </div>
            <motion.div
              className="hidden-game-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h4
                animate={{
                  color: ["#9c88ff", "#8c7ae6", "#9c88ff"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                {concept.term}
              </motion.h4>
              <p>{concept.definition}</p>
            </motion.div>
            <motion.div
              className="hidden-game-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                This knowledge burst will disappear in a few seconds!
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Main component
const HomePage = () => {
  const [showHiddenGame, setShowHiddenGame] = useState(false)
  const [hiddenGameConcept, setHiddenGameConcept] = useState(null)
  const [hiddenGameVisible, setHiddenGameVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const educationalConcepts = [
    { term: "Algorithm", definition: "A step-by-step procedure for solving a problem or accomplishing a task." },
    { term: "Photosynthesis", definition: "The process by which green plants convert sunlight into energy." },
    {
      term: "Pythagorean Theorem",
      definition:
        "In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.",
    },
    { term: "Mitochondria", definition: "The powerhouse of the cell, responsible for producing energy." },
    { term: "Newton's Third Law", definition: "For every action, there is an equal and opposite reaction." },
    { term: "Osmosis", definition: "The movement of water molecules across a semipermeable membrane." },
  ]

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const randomChance = Math.random()
    if (randomChance < 0.2) {
      const randomConcept = educationalConcepts[Math.floor(Math.random() * educationalConcepts.length)]
      setHiddenGameConcept(randomConcept)
      setShowHiddenGame(true)
      setHiddenGameVisible(true)

      const timer = setTimeout(() => {
        setHiddenGameVisible(false)
        setTimeout(() => setShowHiddenGame(false), 500)
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleCloseKnowledgeBurst = () => {
    setHiddenGameVisible(false)
    setTimeout(() => setShowHiddenGame(false), 500)
  }

  return (
    <div className="homepage">
      <div className="three-background">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
          <Scene />
        </Canvas>
      </div>

      <div className="container">
        <motion.header
          className="header"
          style={{
            transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`,
          }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1>BrainQuest Academy</h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Explore interactive educational games designed to make learning engaging and fun
          </motion.p>
        </motion.header>

        <motion.div
          className="game-grid"
          style={{
            transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)`,
          }}
        >
          <GameCard
            title="Knowledge Ladder"
            description="Climb the ladder by answering questions correctly, but watch out for wrong answers!"
            icon={<Gamepad2 className="icon" />}
            href="/quiz-ladder"
            active={true}
            index={0}
          />
          <GameCard
            title="Brain Teasers"
            description="Solve challenging riddles and puzzles before time runs out"
            icon={<Lightbulb className="icon" />}
            href="/riddles"
            active={true}
            index={1}
          />
          <GameCard
            title="Concept Match"
            description="Match definitions with terms and shortcuts across different subjects"
            icon={<Brain className="icon" />}
            href="/memory-match"
            active={true}
            index={2}
          />
          <GameCard
            title="Logic Grid"
            description="Test your logical thinking with different difficulty levels of Sudoku puzzles"
            icon={<BookOpen className="icon" />}
            href="/sudoku"
            active={true}
            index={3}
          />
          <GameCard
            title="Code Breaker"
            description="Solve computer science puzzles and learn programming concepts"
            icon={<Code className="icon" />}
            href="/code-breaker"
            active={true}
            index={4}
          />
          <GameCard
            title="Math Mastery"
            description="Solve math problems including calculus concepts like integration and differentiation"
            icon={<Calculator className="icon" />}
            href="/math-ninja"
            active={true}
            index={5}
          />
          <GameCard
            title="Biology Quest"
            description="Explore biological concepts through case studies and knowledge challenges"
            icon={<Microscope className="icon" />}
            href="/biology-quest"
            active={true}
            index={6}
          />
          <GameCard
            title="⌚ Attack Simulator"
            description="React to threats in real-time."
            href="/AttackSimulator"
            active={true}
            index={7}
          />
          <GameCard title="😉 More games coming soon!!! " description="Stay tuned for more games!"active={false} index={8}/>
        </motion.div>

        {showHiddenGame && hiddenGameConcept && (
          <KnowledgeBurst concept={hiddenGameConcept} visible={hiddenGameVisible} onClose={handleCloseKnowledgeBurst} />
        )}
      </div>
    </div>
  )
}

export default HomePage