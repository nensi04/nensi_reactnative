import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  isDarkMode: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  isDarkMode,
}) => {
  return (
    <View style={[styles.emptyState, isDarkMode && styles.emptyStateDark]}>
      <Text style={[styles.emptyStateIcon, isDarkMode && styles.emptyStateIconDark]}>
        {icon}
      </Text>
      <Text style={[styles.emptyStateTitle, isDarkMode && styles.emptyStateTitleDark]}>
        {title}
      </Text>
      <Text style={[styles.emptyStateText, isDarkMode && styles.emptyStateTextDark]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
    flex: 1,
    justifyContent: 'center',
  },
  emptyStateDark: {},
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateIconDark: {},
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateTitleDark: {
    color: '#F9FAFB',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyStateTextDark: {
    color: '#9CA3AF',
  },
});

export default EmptyState;
