import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-surface-900 to-surface-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            404
          </div>
        </motion.div>

        {/* Camera icon */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
        >
          <ApperIcon name="CameraOff" className="w-10 h-10 md:w-12 md:h-12 text-black" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Snap Not Found
        </h1>
        
        <p className="text-surface-300 mb-8 leading-relaxed">
          This moment seems to have disappeared! Don't worry, even the best snaps are ephemeral. 
          Let's get you back to creating amazing content.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-black font-semibold px-6 py-3 rounded-2xl shadow-glow hover:shadow-snap transition-all duration-300"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Back to SnapFlow</span>
          </Link>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-8 h-8 bg-primary rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 30, 0],
              rotate: [360, 180, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-3/4 right-1/4 w-6 h-6 bg-accent rounded-full blur-sm"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound