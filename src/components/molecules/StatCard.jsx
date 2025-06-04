import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const StatCard = ({ label, value, icon }) => {
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3">
              <Icon name={icon} className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <Text as="div" className="text-xl md:text-2xl font-bold text-white mb-1">{value}</Text>
            <Text as="div" className="text-xs md:text-sm text-surface-400">{label}</Text>
          </motion.div>
        );
      };
      
      export default StatCard;