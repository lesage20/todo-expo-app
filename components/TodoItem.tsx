import { Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { 
  FadeInRight, 
  FadeOutLeft,
  Layout,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  const checkboxAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(completed ? 1 : 0.8)
        }
      ]
    };
  });

  return (
    <Animated.View 
      className="flex-row items-center p-4 bg-white rounded-lg mb-2 shadow-sm"
      entering={FadeInRight}
      exiting={FadeOutLeft}
      layout={Layout.springify()}
    >
      <AnimatedTouchableOpacity
        onPress={() => onToggle(id)}
        className="mr-3"
        style={checkboxAnimatedStyle}
      >
        <Animated.View 
          className={`w-6 h-6 rounded-full border-2 ${
            completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
          } justify-center items-center`}
        >
          {completed && <Feather name="check" size={16} color="white" />}
        </Animated.View>
      </AnimatedTouchableOpacity>
      
      <Text 
        className={`flex-1 text-lg ${
          completed ? 'text-gray-400 line-through' : 'text-gray-800'
        }`}
      >
        {text}
      </Text>

      <TouchableOpacity
        onPress={() => onDelete(id)}
        className="p-2"
      >
        <Feather name="trash-2" size={20} color="#EF4444" />
      </TouchableOpacity>
    </Animated.View>
  );
}
