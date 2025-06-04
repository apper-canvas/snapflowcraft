import { motion } from 'framer-motion';
      
      const AnimatedBackground = () => {
        return (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-40 h-40 bg-primary rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent rounded-full blur-3xl"
            />
          </div>
        );
      };
      
      export default AnimatedBackground;