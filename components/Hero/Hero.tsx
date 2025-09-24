"use client";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

function Hero() {
  const { theme, t } = useApp();
  const isDark = theme === "dark";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const floatVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      <motion.div 
        className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-12" variants={itemVariants}>
          <div className="space-y-6">
            <motion.div 
              className={`text-sm font-light tracking-widest uppercase transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              variants={itemVariants}
            >
              {t('hero.tagline')}
            </motion.div>
            <motion.h1 
              className={`text-7xl md:text-8xl font-light tracking-tight leading-none transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-black'
              }`}
              variants={itemVariants}
            >
              Mareta
            </motion.h1>
            <motion.div 
              className={`w-20 h-px transition-colors duration-500 ${
                isDark ? 'bg-white' : 'bg-black'
              }`}
              variants={itemVariants}
            ></motion.div>
          </div>
          
          <motion.p 
            className={`text-xl font-light leading-relaxed max-w-lg transition-colors duration-500 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            variants={itemVariants}
          >
            {t('hero.description')} 
            <span className={`font-normal transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-black'
            }`}>{t('hero.growth')}</span>
          </motion.p>
          
          <motion.div 
            className={`flex space-x-8 text-sm font-light transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
            variants={itemVariants}
          >
            <div>{t('hero.role1')}</div>
            <div>{t('hero.role2')}</div>
            <div>{t('hero.role3')}</div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative"
          variants={floatVariants}
        >
          <div className="w-80 h-80 mx-auto relative">
            <div className={`absolute inset-0 border rounded-full transition-colors duration-500 ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}></div>
            <div className={`absolute inset-8 border rounded-full transition-colors duration-500 ${
              isDark ? 'border-gray-800' : 'border-gray-100'
            }`}></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className={`w-32 h-32 stroke-1 fill-none transition-colors duration-500 ${
                isDark ? 'stroke-white' : 'stroke-black'
              }`}>
                {/* Face */}
                <circle cx="50" cy="25" r="8"/>
                
                {/* Simple bob haircut */}
                <path d="M42,20 Q50,16 58,20 L58,24 Q50,26 42,24 Z" fill="none"/>
                
                {/* Body */}
                <line x1="50" y1="33" x2="50" y2="60"/>
                
                {/* Arms */}
                <line x1="50" y1="42" x2="35" y2="50"/>
                <line x1="50" y1="42" x2="65" y2="50"/>
                
                {/* Legs */}
                <line x1="50" y1="60" x2="40" y2="80"/>
                <line x1="50" y1="60" x2="60" y2="80"/>
                
                {/* Simple triangular dress */}
                <path d="M46,55 L54,55 L58,65 L42,65 Z" fill="none"/>
                
                {/* Connection elements - simplified */}
                <circle cx="25" cy="20" r="2" fill="none"/>
                <circle cx="75" cy="20" r="2" fill="none"/>
                <line x1="25" y1="20" x2="42" y2="22"/>
                <line x1="75" y1="20" x2="58" y2="22"/>
              </svg>
            </div>
            
            <div className={`absolute -top-4 -right-4 w-8 h-8 border rounded-full transition-colors duration-500 ${
              isDark ? 'border-gray-600' : 'border-gray-300'
            }`}></div>
            <div className={`absolute -bottom-8 -left-8 w-12 h-12 border rounded-full transition-colors duration-500 ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export { Hero };
