import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <View className="flex-row items-center mb-4">
      <View className="flex-1 bg-white rounded-lg shadow-sm">
        <TextInput
          className="h-14 px-4 text-lg text-gray-800"
          placeholder="Ajouter une tâche..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
        />
      </View>
      <TouchableOpacity
        onPress={handleAdd}
        className="h-14 border-0 aspect-square bg-blue-500 rounded-lg shadow-sm items-center justify-center ml-3"
      >
        <Feather name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
