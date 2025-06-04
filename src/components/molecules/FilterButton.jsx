import { motion } from 'framer-motion';
      import Icon from '../atoms/Icon';
      
      const FilterButton = ({ filter, selectedFilter, onClick }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClick(filter)}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 overflow-hidden ${
              selectedFilter?.id === filter?.id ? 'border-primary' : 'border-surface-600'
            }`}
          >
            {filter ? (
              <img
                src={filter.thumbnail}
                alt={filter.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`flex-shrink-0 w-full h-full rounded-2xl border-2 flex items-center justify-center ${
                !selectedFilter ? 'border-primary bg-primary/20' : 'border-surface-600 glass-dark'
              }`}>
                <Icon name="X" className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            )}
          </motion.button>
        );
      };
      
      export default FilterButton;