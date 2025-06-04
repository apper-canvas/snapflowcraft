import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      import SnapCard from '../molecules/SnapCard';
      
      const GalleryGrid = ({ snaps, setSelectedSnap }) => {
        return (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <Text as="h3" className="text-xl md:text-2xl font-bold text-white">Your Snaps</Text>
              <Text as="div" className="text-sm text-surface-400">{snaps?.length || 0} items</Text>
            </div>
      
            {snaps?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Camera" className="w-16 h-16 text-surface-500 mx-auto mb-4" />
                <Text as="p" className="text-surface-400 text-lg">No snaps yet</Text>
                <Text as="p" className="text-surface-500 text-sm">Start capturing moments!</Text>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {snaps.map((snap) => (
                  <SnapCard key={snap.id} snap={snap} onClick={setSelectedSnap} />
                ))}
              </div>
            )}
          </motion.div>
        );
      };
      
      export default GalleryGrid;