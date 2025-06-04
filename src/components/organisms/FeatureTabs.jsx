import { motion } from 'framer-motion';
      import NavTab from '../molecules/NavTab';
      
      const FeatureTabs = ({ currentView, onTabChange }) => {
        const tabs = [
          { id: 'camera', label: 'Camera', icon: 'Camera' },
          { id: 'gallery', label: 'Gallery', icon: 'Grid3x3' },
          { id: 'stories', label: 'Stories', icon: 'BookOpen' }
        ];
      
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <div className="glass-dark rounded-2xl p-1 flex space-x-1">
              {tabs.map((tab) => (
                <NavTab
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  currentView={currentView}
                  onClick={onTabChange}
                />
              ))}
            </div>
          </motion.div>
        );
      };
      
      export default FeatureTabs;