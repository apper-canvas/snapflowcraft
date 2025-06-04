import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-surface-900 to-surface-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-4 md:p-6"
      >
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-glow">
              <ApperIcon name="Camera" className="w-6 h-6 md:w-7 md:h-7 text-black" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
                SnapFlow
              </h1>
              <p className="text-xs md:text-sm text-surface-400">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-xl flex items-center justify-center"
          >
            <ApperIcon name="Settings" className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-6 pb-6">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
              Capture the Moment
            </h2>
            <p className="text-surface-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              Create ephemeral visual stories with powerful editing tools, creative filters, and time-limited sharing
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {[
              { icon: "Camera", label: "Capture", desc: "Photos & Videos" },
              { icon: "Palette", label: "Edit", desc: "Creative Tools" },
              { icon: "Timer", label: "Timer", desc: "Auto-Delete" },
              { icon: "Grid3x3", label: "Gallery", desc: "Organize" }
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-dark rounded-2xl p-3 md:p-4 text-center group hover:shadow-snap"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:shadow-glow">
                  <ApperIcon name={feature.icon} className="w-4 h-4 md:w-5 md:h-5 text-black" />
                </div>
                <h3 className="font-semibold text-xs md:text-sm text-white mb-1">{feature.label}</h3>
                <p className="text-xs text-surface-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Interactive Feature */}
        <MainFeature />

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-12"
        >
          <div className="glass-dark rounded-3xl p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-center text-white">Your Creative Journey</h3>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { label: "Snaps Created", value: "127", icon: "Camera" },
                { label: "Stories Shared", value: "23", icon: "Share" },
                { label: "Filters Used", value: "45", icon: "Sparkles" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <ApperIcon name={stat.icon} className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-surface-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default Home