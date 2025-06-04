import { motion, AnimatePresence } from 'framer-motion';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const MainCameraControls = ({
        captureMode,
        setCaptureMode,
        handleRecord,
        loading,
        timer,
        setTimer,
        showTimerSelect,
        setShowTimerSelect
      }) => {
        return (
          &lt;&gt;
            <div className="flex items-center justify-center space-x-6 md:space-x-8 px-4">
              {/* Mode toggle */}
              <Button
                iconName={captureMode === 'photo' ? 'Video' : 'Camera'}
                className="w-12 h-12 md:w-14 md:h-14 glass-dark rounded-2xl flex items-center justify-center"
                iconClassName="w-6 h-6 md:w-7 md:h-7 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCaptureMode(captureMode === 'photo' ? 'video' : 'photo')}
              />
      
              {/* Capture button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecord}
                disabled={loading}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white flex items-center justify-center relative ${
                  captureMode === 'video' ? 'bg-red-500' : 'bg-transparent'
                } ${loading ? 'opacity-50' : ''}`}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : captureMode === 'video' ? (
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded" />
                ) : (
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full" />
                )}
              </motion.button>
      
              {/* Timer selector */}
              <Button
                iconName="Timer"
                className="w-12 h-12 md:w-14 md:h-14 glass-dark rounded-2xl flex items-center justify-center"
                iconClassName="w-6 h-6 md:w-7 md:h-7 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowTimerSelect(!showTimerSelect)}
              />
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
                  <Text as="h4" className="text-white font-semibold mb-3 text-center">Auto-Delete Timer</Text>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 3, 5, 10, 0].map((time) => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setTimer(time);
                          setShowTimerSelect(false);
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
          </>
        );
      };
      
      export default MainCameraControls;