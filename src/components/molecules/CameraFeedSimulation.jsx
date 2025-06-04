import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const CameraFeedSimulation = ({ selectedFilter, isRecording, timer }) => {
        return (
          <div className="relative bg-black rounded-3xl overflow-hidden aspect-[3/4] md:aspect-[4/3] lg:aspect-[16/10] max-w-md md:max-w-2xl mx-auto">
            {/* Simulated camera feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-800 via-surface-700 to-surface-900 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
              >
                <Icon name="Camera" className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4" />
                <Text as="p" className="text-surface-300 text-sm md:text-base">Camera Preview</Text>
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
        );
      };
      
      export default CameraFeedSimulation;