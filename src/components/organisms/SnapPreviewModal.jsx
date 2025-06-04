import { motion, AnimatePresence } from 'framer-motion';
      import Button from '../atoms/Button';
      import Icon from '../atoms/Icon';
      
      const SnapPreviewModal = ({ selectedSnap, onClose, onDelete }) => {
        if (!selectedSnap) return null;
      
        return (
          <AnimatePresence>
            {selectedSnap && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={onClose}
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
                    <Button
                      iconName="Trash2"
                      onClick={() => onDelete(selectedSnap.id)}
                      className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center"
                      iconClassName="w-5 h-5 text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <Button
                      iconName="X"
                      onClick={onClose}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                      iconClassName="w-5 h-5 text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
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
        );
      };
      
      export default SnapPreviewModal;