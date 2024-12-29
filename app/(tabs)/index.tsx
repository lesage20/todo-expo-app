import { useState, useMemo } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';
import AddTodo from '@/components/AddTodo';
import TodoItem from '@/components/TodoItem';
import FilterTabs from '@/components/FilterTabs';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  }), [todos]);

  const addTodo = (text: string) => {
    setTodos([
      {
        id: Math.random().toString(),
        text,
        completed: false,
      },
      ...todos,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4 pt-8">
        <Text className="text-3xl font-bold text-gray-800 mb-6">
          Mes tâches
        </Text>
        
        <AddTodo onAdd={addTodo} />
        
        <FilterTabs
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          counts={counts}
        />
        
        <Animated.ScrollView 
          showsVerticalScrollIndicator={false}
          layout={Layout.springify()}
        >
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
          {filteredTodos.length === 0 && (
            <View className="items-center py-8">
              <Text className="text-gray-500 text-lg">
                {currentFilter === 'all' 
                  ? 'Aucune tâche pour le moment'
                  : currentFilter === 'active'
                  ? 'Aucune tâche en cours'
                  : 'Aucune tâche terminée'}
              </Text>
            </View>
          )}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}
