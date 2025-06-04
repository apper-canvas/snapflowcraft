import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      
      const SnapCard = ({ snap, onClick }) => {
        const isExpired = snap.expiresAt && new Date(snap.expiresAt) < new Date();
        return (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(snap)}
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
                <Icon 
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
            {isExpired && (
              <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                <div className="text-white text-center">
                  <Icon name="Clock" className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-xs">Expired</p>
                </div>
              </div>
            )}
          </motion.div>
        );
      };
      
      export default SnapCard;