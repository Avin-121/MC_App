import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Users } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface PeopleCountBadgeProps {
  count: number;
}

export const PeopleCountBadge: React.FC<PeopleCountBadgeProps> = ({ count }) => {
  // Determine badge color based on crowd density
  const getBadgeColor = (count: number) => {
    if (count <= 5) return Colors.success[500];
    if (count <= 20) return Colors.warning[500];
    return Colors.danger[500];
  };

  const badgeColor = getBadgeColor(count);

  return (
    <View style={[styles.badge, { backgroundColor: badgeColor }]}>
      <Users size={18} color={Colors.white} />
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  count: {
    marginLeft: 6,
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});