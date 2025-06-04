import { motion } from 'framer-motion';
      
      const Text = ({ 
        children, 
        className, 
        as = 'p', 
        initial, 
        animate, 
        transition, 
        ...props 
      }) => {
        const Component = motion[as];
        return (
          <Component
            className={className}
            initial={initial}
            animate={animate}
            transition={transition}
            {...props}
          >
            {children}
          </Component>
        );
      };
      
      export default Text;