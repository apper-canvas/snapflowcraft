import { motion } from 'framer-motion';
      import Button from '../atoms/Button';
      import HeaderLogo from '../molecules/HeaderLogo';
      
      const AppHeader = ({ currentTime }) => {
        return (
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 p-4 md:p-6"
          >
            <div className="flex items-center justify-between">
              <HeaderLogo currentTime={currentTime} />
              
              <Button
                iconName="Settings"
                className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-xl flex items-center justify-center"
                iconClassName="w-5 h-5 md:w-6 md:h-6 text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
          </motion.header>
        );
      };
      
      export default AppHeader;