import { motion } from 'framer-motion';
      import CameraFeedSimulation from '../molecules/CameraFeedSimulation';
      import FilterCarousel from './FilterCarousel';
      import MainCameraControls from './MainCameraControls';
      
      const CameraPreview = ({
        selectedFilter,
        isRecording,
        timer,
        filters,
        setSelectedFilter,
        captureMode,
        setCaptureMode,
        handleRecord,
        loading,
        showTimerSelect,
        setShowTimerSelect,
        setTimer
      }) => {
        return (
          <motion.div
            key="camera"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CameraFeedSimulation
              selectedFilter={selectedFilter}
              isRecording={isRecording}
              timer={timer}
            />
            
            <FilterCarousel
              filters={filters}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
      
            <MainCameraControls
              captureMode={captureMode}
              setCaptureMode={setCaptureMode}
              handleRecord={handleRecord}
              loading={loading}
              timer={timer}
              setTimer={setTimer}
              showTimerSelect={showTimerSelect}
              setShowTimerSelect={setShowTimerSelect}
            />
          </motion.div>
        );
      };
      
      export default CameraPreview;