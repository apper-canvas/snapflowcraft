import { motion } from 'framer-motion';
      import Text from '../atoms/Text';
      import FeatureHighlightCard from '../molecules/FeatureHighlightCard';
      
      const WelcomeSection = () => {
        const features = [
          { icon: "Camera", label: "Capture", desc: "Photos & Videos" },
          { icon: "Palette", label: "Edit", desc: "Creative Tools" },
          { icon: "Timer", label: "Timer", desc: "Auto-Delete" },
          { icon: "Grid3x3", label: "Gallery", desc: "Organize" }
        ];
      
        return (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <div className="text-center mb-6 md:mb-8">
              <Text as="h2" className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
                Capture the Moment
              </Text>
              <Text as="p" className="text-surface-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                Create ephemeral visual stories with powerful editing tools, creative filters, and time-limited sharing
              </Text>
            </div>
      
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
              {features.map((feature, index) => (
                <FeatureHighlightCard key={feature.label} {...feature} index={index} />
              ))}
            </div>
          </motion.section>
        );
      };
      
      export default WelcomeSection;