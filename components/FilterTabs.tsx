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
}

export default function FilterTabs({ currentFilter, onFilterChange, counts }: FilterTabsProps) {
  const tabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Toutes' },
    { key: 'active', label: 'En cours' },
    { key: 'completed', label: 'Terminées' },
  ];

  return (
    <View className="flex-row bg-white rounded-lg p-1 mb-4 shadow-sm">
      {tabs.map(({ key, label }) => (
        <TouchableOpacity
          key={key}
          onPress={() => onFilterChange(key)}
          className={`flex-1 py-2 px-4 rounded-md flex-row items-center justify-center space-x-1
            ${currentFilter === key ? 'bg-blue-500' : 'bg-transparent'}`}
        >
          <Text
            className={`text-base font-medium
              ${currentFilter === key ? 'text-white' : 'text-gray-600'}`}
          >
            {label}
          </Text>
          <Text
            className={`text-sm
              ${currentFilter === key ? 'text-white' : 'text-gray-400'}`}
          >
            ({counts[key]})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
