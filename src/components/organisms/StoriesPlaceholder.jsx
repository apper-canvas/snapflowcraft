import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const StoriesPlaceholder = () => {
        return (
          <motion.div
            key="stories"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <Icon name="BookOpen" className="w-16 h-16 text-surface-500 mx-auto mb-4" />
            <Text as="h3" className="text-xl font-bold text-white mb-2">Stories Coming Soon</Text>
            <Text as="p" className="text-surface-400">Create collections of your favorite snaps</Text>
          </motion.div>
        );
      };
      
      export default StoriesPlaceholder;