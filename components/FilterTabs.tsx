import { View, TouchableOpacity, Text } from 'react-native';

type FilterType = 'all' | 'active' | 'completed';

interface FilterTabsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
  isDark: boolean;
}

export default function FilterTabs({ currentFilter, onFilterChange, counts, isDark }: FilterTabsProps) {
  const tabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Toutes' },
    { key: 'active', label: 'En cours' },
    { key: 'completed', label: 'Terminées' },
  ];

  return (
    <View className={`flex-row rounded-lg p-1 mb-4 shadow-sm ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {tabs.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          onPress={() => onFilterChange(key)}
          className={`flex-1 py-2 px-4 rounded-md flex-row items-center justify-center space-x-1
            ${currentFilter === key 
              ? 'bg-blue-500' 
              : isDark ? 'bg-gray-800' : 'bg-white'
            }`}
        >
          <Text
            className={`text-base font-medium
              ${currentFilter === key 
                ? 'text-white'
                : isDark ? 'text-gray-300' : 'text-gray-600'
              }`}
          >
            {label}
          </Text>
          <Text
            className={`text-sm
              ${currentFilter === key
                ? 'text-white'
                : isDark ? 'text-gray-400' : 'text-gray-400'
              }`}
          >
            ({counts[key]})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
