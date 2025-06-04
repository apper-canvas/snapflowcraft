import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      import Text from '../atoms/Text';
      
      const HeaderLogo = ({ currentTime }) => {
        return (
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-glow">
              <Icon name="Camera" className="w-6 h-6 md:w-7 md:h-7 text-black" />
            </div>
            <div>
              <Text as="h1" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
                SnapFlow
              </Text>
              <Text as="p" className="text-xs md:text-sm text-surface-400">
                {currentTime.toLocaleTimeString()}
              </Text>
            </div>
          </motion.div>
        );
      };
      
      export default HeaderLogo;