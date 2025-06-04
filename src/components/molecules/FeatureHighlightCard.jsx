import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const FeatureHighlightCard = ({ icon, label, desc, index }) => {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-dark rounded-2xl p-3 md:p-4 text-center group hover:shadow-snap"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:shadow-glow">
              <Icon name={icon} className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
            <Text as="h3" className="font-semibold text-xs md:text-sm text-white mb-1">{label}</Text>
            <Text as="p" className="text-xs text-surface-400">{desc}</Text>
          </motion.div>
        );
      };
      
      export default FeatureHighlightCard;