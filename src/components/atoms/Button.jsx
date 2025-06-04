import { motion } from 'framer-motion';
      import ApperIcon from '../ApperIcon'; // Keep existing ApperIcon import path
      
      const Button = ({ 
        iconName, 
        children, 
        onClick, 
        className, 
        iconClassName, 
        whileHover, 
        whileTap, 
        disabled,
        ...props
      }) => {
        return (
          <motion.button
            whileHover={whileHover}
            whileTap={whileTap}
            onClick={onClick}
            className={className}
            disabled={disabled}
            {...props}
          >
            {iconName && <ApperIcon name={iconName} className={iconClassName} />}
            {children}
          </motion.button>
        );
      };
      
      export default Button;