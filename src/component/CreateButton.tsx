import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface CreateButtonProps {
  title: string;
  onPress: () => void;
  isDarkMode: boolean;
  icon?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  title,
  onPress,
  isDarkMode,
  icon = '+',
}) => {
  return (
    <TouchableOpacity
      style={[styles.addButton, isDarkMode && styles.addButtonDark]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.addButtonIcon}>{icon}</Text>
      <Text style={styles.addButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonDark: {
    backgroundColor: '#60A5FA',
    shadowColor: '#60A5FA',
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateButton;
