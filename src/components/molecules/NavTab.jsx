import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      
      const NavTab = ({ id, label, icon, currentView, onClick }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(id)}
            className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
              currentView === id
                ? 'bg-gradient-to-r from-primary to-accent text-black shadow-glow'
                : 'text-white hover:text-primary'
            }`}
          >
            <Icon name={icon} className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">{label}</span>
          </motion.button>
        );
      };
      
      export default NavTab;