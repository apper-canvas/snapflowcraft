import { motion } from 'framer-motion';
      import Text from '../atoms/Text';
      import StatCard from '../molecules/StatCard';
      
      const QuickStatsSection = () => {
        const stats = [
          { label: "Snaps Created", value: "127", icon: "Camera" },
          { label: "Stories Shared", value: "23", icon: "Share" },
          { label: "Filters Used", value: "45", icon: "Sparkles" }
        ];
      
        return (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 md:mt-12"
          >
            <div className="glass-dark rounded-3xl p-4 md:p-6">
              <Text as="h3" className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-center text-white">Your Creative Journey</Text>
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>
          </motion.section>
        );
      };
      
      export default QuickStatsSection;