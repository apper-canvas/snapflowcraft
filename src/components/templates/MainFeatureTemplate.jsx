import { useState, useEffect } from 'react';
      import { AnimatePresence, motion } from 'framer-motion';
      import { toast } from 'react-toastify';
      import snapService from '../../services/api/snapService';
      import filterService from '../../services/api/filterService';
      import CameraPreview from '../organisms/CameraPreview';
      import GalleryGrid from '../organisms/GalleryGrid';
      import StoriesPlaceholder from '../organisms/StoriesPlaceholder';
      import SnapPreviewModal from '../organisms/SnapPreviewModal';
      import FeatureTabs from '../organisms/FeatureTabs';
      
      const MainFeatureTemplate = () => {
        const [snaps, setSnaps] = useState([]);
        const [filters, setFilters] = useState([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [currentView, setCurrentView] = useState('camera');
        const [selectedFilter, setSelectedFilter] = useState(null);
        const [isRecording, setIsRecording] = useState(false);
        const [captureMode, setCaptureMode] = useState('photo');
        const [timer, setTimer] = useState(3);
        const [showTimerSelect, setShowTimerSelect] = useState(false);
        const [selectedSnap, setSelectedSnap] = useState(null);
      
        // Load initial data
        useEffect(() => {
          const loadData = async () => {
            setLoading(true);
            try {
              const [snapsData, filtersData] = await Promise.all([
                snapService.getAll(),
                filterService.getAll()
              ]);
              setSnaps(snapsData || []);
              setFilters(filtersData || []);
            } catch (err) {
              setError(err.message);
              toast.error("Failed to load content");
            } finally {
              setLoading(false);
            }
          };
          loadData();
        }, []);
      
        const captureContent = async () => {
          setLoading(true);
          try {
            const newSnap = {
              type: captureMode,
              mediaUrl: `https://images.unsplash.com/photo-${Date.now()}?w=400&h=600&fit=crop`,
              thumbnail: `https://images.unsplash.com/photo-${Date.now()}?w=200&h=300&fit=crop`,
              duration: captureMode === 'video' ? Math.floor(Math.random() * 30) + 5 : 0,
              filters: selectedFilter ? [selectedFilter.id] : [],
              edits: { drawings: [], texts: [], stickers: [] },
              location: null,
              isArchived: false,
              createdAt: new Date().toISOString(), // Add creation timestamp
            };
      
            const savedSnap = await snapService.create(newSnap);
            setSnaps(prev => [savedSnap, ...prev]);
            toast.success(`${captureMode === 'photo' ? 'Photo' : 'Video'} captured!`);
            
            // Auto-switch to gallery view
            setTimeout(() => setCurrentView('gallery'), 500);
          } catch (err) {
            setError(err.message);
            toast.error("Failed to capture content");
          } finally {
            setLoading(false);
          }
        };
      
        const deleteSnap = async (snapId) => {
          try {
            await snapService.delete(snapId);
            setSnaps(prev => prev.filter(snap => snap.id !== snapId));
            setSelectedSnap(null);
            toast.success("Snap deleted");
          } catch (err) {
            toast.error("Failed to delete snap");
          }
        };
      
        const handleRecord = () => {
          if (captureMode === 'video') {
            setIsRecording(!isRecording);
            if (!isRecording) {
              setTimeout(() => {
                setIsRecording(false);
                captureContent();
              }, 3000); // Simulate 3-second video recording
            }
          } else {
            captureContent();
          }
        };
      
        if (loading && snaps.length === 0) {
          return (
            <div className="flex items-center justify-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
            </div>
          );
        }
      
        return (
          <div className="max-w-6xl mx-auto">
            <FeatureTabs currentView={currentView} onTabChange={setCurrentView} />
      
            <AnimatePresence mode="wait">
              {currentView === 'camera' && (
                <CameraPreview
                  selectedFilter={selectedFilter}
                  isRecording={isRecording}
                  timer={timer}
                  filters={filters}
                  setSelectedFilter={setSelectedFilter}
                  captureMode={captureMode}
                  setCaptureMode={setCaptureMode}
                  handleRecord={handleRecord}
                  loading={loading}
                  showTimerSelect={showTimerSelect}
                  setShowTimerSelect={setShowTimerSelect}
                  setTimer={setTimer}
                />
              )}
      
              {currentView === 'gallery' && (
                <GalleryGrid snaps={snaps} setSelectedSnap={setSelectedSnap} />
              )}
      
              {currentView === 'stories' && (
                <StoriesPlaceholder />
              )}
            </AnimatePresence>
      
            <SnapPreviewModal
              selectedSnap={selectedSnap}
              onClose={() => setSelectedSnap(null)}
              onDelete={deleteSnap}
            />
          </div>
        );
      };
      
      export default MainFeatureTemplate;