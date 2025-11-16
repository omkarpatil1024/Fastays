import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import {useHome} from './useHome';
import THEME from '../../theme/theme';
import type {HomeScreenProps} from '../../types/navigation.types';
import type {Stay} from '../../types/api.types';

export const HomeScreen: React.FC<HomeScreenProps> = props => {
  const {homeData, isLoading, error, handleLogout, handleRefresh} =
    useHome(props);

  if (isLoading && !homeData) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load data</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.welcomeMessage}>
            {homeData?.welcomeMessage || 'Welcome to Fastays'}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={THEME.colors.primary}
          />
        }>
        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {homeData?.stats.totalBookings || 0}
            </Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {homeData?.stats.activeStays || 0}
            </Text>
            <Text style={styles.statLabel}>Active Stays</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {homeData?.stats.completedStays || 0}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Recent Stays Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Stays</Text>
          {homeData?.recentStays.map(stay => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const StayCard: React.FC<{stay: Stay}> = ({stay}) => {
  const getStatusColor = (status: Stay['status']) => {
    switch (status) {
      case 'upcoming':
        return THEME.colors.info;
      case 'active':
        return THEME.colors.success;
      case 'completed':
        return THEME.colors.text.disabled;
      default:
        return THEME.colors.text.secondary;
    }
  };

  const getStatusText = (status: Stay['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <View style={styles.stayCard}>
      {stay.image && (
        <Image source={{uri: stay.image}} style={styles.stayImage} />
      )}
      <View style={styles.stayContent}>
        <View style={styles.stayHeader}>
          <Text style={styles.stayTitle}>{stay.title}</Text>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: getStatusColor(stay.status) + '20'},
            ]}>
            <Text
              style={[styles.statusText, {color: getStatusColor(stay.status)}]}>
              {getStatusText(stay.status)}
            </Text>
          </View>
        </View>
        <Text style={styles.stayLocation}>📍 {stay.location}</Text>
        <View style={styles.stayDetails}>
          <Text style={styles.stayDate}>
            {new Date(stay.checkIn).toLocaleDateString()} -{' '}
            {new Date(stay.checkOut).toLocaleDateString()}
          </Text>
          <Text style={styles.stayPrice}>${stay.price}/night</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: THEME.spacing.medium,
    backgroundColor: THEME.colors.card,
    ...THEME.shadows.small,
  },
  greeting: {
    fontSize: THEME.typography.fontSize.h3,
    fontWeight: THEME.typography.fontWeight.bold as any,
    color: THEME.colors.text.primary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  welcomeMessage: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.secondary,
    marginTop: THEME.spacing.tiny,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  logoutButton: {
    paddingHorizontal: THEME.spacing.regular,
    paddingVertical: THEME.spacing.small,
    backgroundColor: THEME.colors.error,
    borderRadius: THEME.borderRadius.small,
  },
  logoutText: {
    color: THEME.colors.text.light,
    fontSize: THEME.typography.fontSize.caption,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: THEME.spacing.medium,
    gap: THEME.spacing.regular,
  },
  statCard: {
    flex: 1,
    backgroundColor: THEME.colors.card,
    padding: THEME.spacing.regular,
    borderRadius: THEME.borderRadius.regular,
    alignItems: 'center',
    ...THEME.shadows.small,
  },
  statValue: {
    fontSize: THEME.typography.fontSize.h2,
    fontWeight: THEME.typography.fontWeight.bold as any,
    color: THEME.colors.primary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  statLabel: {
    fontSize: THEME.typography.fontSize.caption,
    color: THEME.colors.text.secondary,
    marginTop: THEME.spacing.tiny,
    textAlign: 'center',
    fontFamily: THEME.typography.fontFamily.primary,
  },
  section: {
    padding: THEME.spacing.medium,
  },
  sectionTitle: {
    fontSize: THEME.typography.fontSize.h4,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
    color: THEME.colors.text.primary,
    marginBottom: THEME.spacing.regular,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  stayCard: {
    backgroundColor: THEME.colors.card,
    borderRadius: THEME.borderRadius.regular,
    marginBottom: THEME.spacing.regular,
    overflow: 'hidden',
    ...THEME.shadows.medium,
  },
  stayImage: {
    width: '100%',
    height: 180,
    backgroundColor: THEME.colors.surface,
  },
  stayContent: {
    padding: THEME.spacing.regular,
  },
  stayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.small,
  },
  stayTitle: {
    flex: 1,
    fontSize: THEME.typography.fontSize.h5,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
    color: THEME.colors.text.primary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  statusBadge: {
    paddingHorizontal: THEME.spacing.small,
    paddingVertical: THEME.spacing.tiny,
    borderRadius: THEME.borderRadius.small,
    marginLeft: THEME.spacing.small,
  },
  statusText: {
    fontSize: THEME.typography.fontSize.caption,
    fontWeight: THEME.typography.fontWeight.medium as any,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  stayLocation: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.text.secondary,
    marginBottom: THEME.spacing.small,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  stayDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stayDate: {
    fontSize: THEME.typography.fontSize.caption,
    color: THEME.colors.text.secondary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  stayPrice: {
    fontSize: THEME.typography.fontSize.body,
    fontWeight: THEME.typography.fontWeight.bold as any,
    color: THEME.colors.primary,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  errorText: {
    fontSize: THEME.typography.fontSize.body,
    color: THEME.colors.error,
    marginBottom: THEME.spacing.regular,
    fontFamily: THEME.typography.fontFamily.primary,
  },
  retryButton: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: THEME.spacing.medium,
    paddingVertical: THEME.spacing.regular,
    borderRadius: THEME.borderRadius.regular,
  },
  retryButtonText: {
    color: THEME.colors.text.light,
    fontSize: THEME.typography.fontSize.button,
    fontWeight: THEME.typography.fontWeight.semiBold as any,
    fontFamily: THEME.typography.fontFamily.primary,
  },
});
