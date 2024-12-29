import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useThemeToggle } from '@/hooks/useThemeToggle';
import Animated, { withSpring, useAnimatedStyle } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeToggle();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        rotate: withSpring(`${isDark ? 180 : 0}deg`)
      }]
    };
  });

  return (
    <AnimatedTouchableOpacity
      onPress={toggleTheme}
      className={`absolute top-8 right-4 z-10 w-10 h-10 rounded-full items-center justify-center ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
      style={animatedStyle}
    >
      <Feather
        name={isDark ? 'sun' : 'moon'}
        size={24}
        color={isDark ? '#FFF' : '#1F2937'}
      />
    </AnimatedTouchableOpacity>
  );
}
