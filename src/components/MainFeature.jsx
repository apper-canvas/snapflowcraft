import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import snapService from '../services/api/snapService'
import filterService from '../services/api/filterService'

const MainFeature = () => {
  const [snaps, setSnaps] = useState([])
  const [filters, setFilters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentView, setCurrentView] = useState('camera')
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [captureMode, setCaptureMode] = useState('photo')
  const [timer, setTimer] = useState(3)
  const [showTimerSelect, setShowTimerSelect] = useState(false)
  const [selectedSnap, setSelectedSnap] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [snapsData, filtersData] = await Promise.all([
          snapService.getAll(),
          filterService.getAll()
        ])
        setSnaps(snapsData || [])
        setFilters(filtersData || [])
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load content")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Camera simulation
  const startCamera = async () => {
    try {
      // Simulated camera start
      if (videoRef.current) {
        videoRef.current.style.display = 'block'
      }
    } catch (err) {
      toast.error("Camera access denied")
    }
  }

  const captureContent = async () => {
    setLoading(true)
    try {
      const newSnap = {
        type: captureMode,
        mediaUrl: `https://images.unsplash.com/photo-${Date.now()}?w=400&h=600&fit=crop`,
        thumbnail: `https://images.unsplash.com/photo-${Date.now()}?w=200&h=300&fit=crop`,
        duration: captureMode === 'video' ? Math.floor(Math.random() * 30) + 5 : 0,
        filters: selectedFilter ? [selectedFilter.id] : [],
        edits: { drawings: [], texts: [], stickers: [] },
        location: null,
        isArchived: false
      }

      const savedSnap = await snapService.create(newSnap)
      setSnaps(prev => [savedSnap, ...prev])
      toast.success(`${captureMode === 'photo' ? 'Photo' : 'Video'} captured!`)
      
      // Auto-switch to gallery view
      setTimeout(() => setCurrentView('gallery'), 500)
    } catch (err) {
      setError(err.message)
      toast.error("Failed to capture content")
    } finally {
      setLoading(false)
    }
  }

  const deleteSnap = async (snapId) => {
    try {
      await snapService.delete(snapId)
      setSnaps(prev => prev.filter(snap => snap.id !== snapId))
      setSelectedSnap(null)
      toast.success("Snap deleted")
    } catch (err) {
      toast.error("Failed to delete snap")
    }
  }

  const handleRecord = () => {
    if (captureMode === 'video') {
      setIsRecording(!isRecording)
      if (!isRecording) {
        setTimeout(() => {
          setIsRecording(false)
          captureContent()
        }, 3000)
      }
    } else {
      captureContent()
    }
  }

  if (loading && snaps.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-6 md:mb-8"
      >
        <div className="glass-dark rounded-2xl p-1 flex space-x-1">
          {[
            { id: 'camera', label: 'Camera', icon: 'Camera' },
            { id: 'gallery', label: 'Gallery', icon: 'Grid3x3' },
            { id: 'stories', label: 'Stories', icon: 'BookOpen' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentView(tab.id)}
              className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                currentView === tab.id
                  ? 'bg-gradient-to-r from-primary to-accent text-black shadow-glow'
                  : 'text-white hover:text-primary'
              }`}
            >
              <ApperIcon name={tab.icon} className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Camera View */}
        {currentView === 'camera' && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Camera Interface */}
            <div className="relative bg-black rounded-3xl overflow-hidden aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/10] max-w-md md:max-w-2xl mx-auto">
              {/* Simulated camera feed */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface-800 via-surface-700 to-surface-900 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center"
                >
                  <ApperIcon name="Camera" className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4" />
                  <p className="text-surface-300 text-sm md:text-base">Camera Preview</p>
                </motion.div>
              </div>

              {/* Filter overlay */}
              {selectedFilter && (
                <div className={`absolute inset-0 ${selectedFilter.config?.overlay || 'bg-primary/10'} mix-blend-overlay`} />
              )}

              {/* Recording indicator */}
              {isRecording && (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>REC</span>
                </motion.div>
              )}

              {/* Timer display */}
              <div className="absolute top-4 right-4 glass-dark rounded-xl px-3 py-1">
                <span className="text-white font-semibold text-sm">{timer}s</span>
              </div>
            </div>

            {/* Filter Carousel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white text-center">Filters</h3>
              <div className="flex space-x-3 overflow-x-auto scrollbar-hide px-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(null)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center ${
                    !selectedFilter ? 'border-primary bg-primary/20' : 'border-surface-600 glass-dark'
                  }`}
                >
                  <ApperIcon name="X" className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.button>
                {filters?.map((filter) => (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFilter(filter)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 overflow-hidden ${
                      selectedFilter?.id === filter.id ? 'border-primary' : 'border-surface-600'
                    }`}
                  >
                    <img
                      src={filter.thumbnail}
                      alt={filter.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6 md:space-x-8 px-4">
              {/* Mode toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCaptureMode(captureMode === 'photo' ? 'video' : 'photo')}
                className="w-12 h-12 md:w-14 md:h-14 glass-dark rounded-2xl flex items-center justify-center"
              >
                <ApperIcon 
                  name={captureMode === 'photo' ? 'Video' : 'Camera'} 
                  className="w-6 h-6 md:w-7 md:h-7 text-white" 
                />
              </motion.button>

              {/* Capture button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecord}
                disabled={loading}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white flex items-center justify-center relative ${
                  isRecording ? 'bg-red-500' : 'bg-transparent'
                } ${loading ? 'opacity-50' : ''}`}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : isRecording ? (
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded" />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full" />
                )}
              </motion.button>

              {/* Timer selector */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowTimerSelect(!showTimerSelect)}
                className="w-12 h-12 md:w-14 md:h-14 glass-dark rounded-2xl flex items-center justify-center"
              >
                <ApperIcon name="Timer" className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </motion.button>
            </div>

            {/* Timer Selection */}
            <AnimatePresence>
              {showTimerSelect && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-dark rounded-2xl p-4 mx-4"
                >
                  <h4 className="text-white font-semibold mb-3 text-center">Auto-Delete Timer</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 3, 5, 10, 0].map((time) => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setTimer(time)
                          setShowTimerSelect(false)
                        }}
                        className={`py-2 px-3 rounded-xl text-sm font-semibold ${
                          timer === time
                            ? 'bg-primary text-black'
                            : 'bg-surface-700 text-white hover:bg-surface-600'
                        }`}
                      >
                        {time === 0 ? '∞' : `${time}s`}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Gallery View */}
        {currentView === 'gallery' && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-bold text-white">Your Snaps</h3>
              <div className="text-sm text-surface-400">{snaps?.length || 0} items</div>
            </div>

            {snaps?.length === 0 ? (
              <div className="text-center py-12">
                <ApperIcon name="Camera" className="w-16 h-16 text-surface-500 mx-auto mb-4" />
                <p className="text-surface-400 text-lg">No snaps yet</p>
                <p className="text-surface-500 text-sm">Start capturing moments!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {snaps.map((snap) => (
                  <motion.div
                    key={snap.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSnap(snap)}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={snap.thumbnail || snap.mediaUrl}
                      alt="Snap"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                    
                    {/* Type indicator */}
                    <div className="absolute top-2 left-2">
                      <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                        <ApperIcon 
                          name={snap.type === 'video' ? 'Play' : 'Camera'} 
                          className="w-3 h-3 text-white" 
                        />
                      </div>
                    </div>

                    {/* Duration */}
                    {snap.type === 'video' && (
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {snap.duration}s
                      </div>
                    )}

                    {/* Expired indicator */}
                    {snap.expiresAt && new Date(snap.expiresAt) < new Date() && (
                      <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                        <div className="text-white text-center">
                          <ApperIcon name="Clock" className="w-8 h-8 mx-auto mb-1" />
                          <p className="text-xs">Expired</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Stories View */}
        {currentView === 'stories' && (
          <motion.div
            key="stories"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <ApperIcon name="BookOpen" className="w-16 h-16 text-surface-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Stories Coming Soon</h3>
            <p className="text-surface-400">Create collections of your favorite snaps</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snap Preview Modal */}
      <AnimatePresence>
        {selectedSnap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSnap(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-md w-full aspect-[3/4] rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedSnap.mediaUrl}
                alt="Selected snap"
                className="w-full h-full object-cover"
              />
              
              {/* Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteSnap(selectedSnap.id)}
                  className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <ApperIcon name="Trash2" className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedSnap(null)}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Info */}
              <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-2xl p-4">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>
                    {selectedSnap.type === 'video' ? `Video • ${selectedSnap.duration}s` : 'Photo'}
                  </span>
                  <span>
                    {new Date(selectedSnap.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature