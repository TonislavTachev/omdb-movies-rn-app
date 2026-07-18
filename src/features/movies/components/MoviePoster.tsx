import { MOVIE_POSTER_ASPECT_RATIO } from '@/features/movies/constants/movieLayout';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, type ImageContentFit, type ImageStyle } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View, type StyleProp } from 'react-native';

interface MoviePosterProps {
  posterUrl: string | null;
  title: string;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
}

export function MoviePoster({
  posterUrl,
  title,
  style,
  contentFit = 'cover',
}: MoviePosterProps) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const hasError = Boolean(posterUrl && failedUrl === posterUrl);

  const showPlaceholder = !posterUrl || hasError;

  if (showPlaceholder) {
    return (
      <View
        accessibilityLabel={`Poster unavailable for ${title}`}
        accessibilityRole="image"
        style={[styles.placeholder, style]}
      >
        <Ionicons color={colors.textSecondary} name="film-outline" size={32} />
        <Text style={styles.placeholderText}>No poster</Text>
      </View>
    );
  }

  return (
    <Image
      accessibilityLabel={`Poster for ${title}`}
      contentFit={contentFit}
      onError={() => {
        setFailedUrl(posterUrl);
      }}
      source={{ uri: posterUrl }}
      style={[styles.poster, style]}
    />
  );
}

const styles = StyleSheet.create({
  poster: {
    aspectRatio: MOVIE_POSTER_ASPECT_RATIO,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    overflow: 'hidden',
    width: '100%',
  },
  placeholder: {
    alignItems: 'center',
    aspectRatio: MOVIE_POSTER_ASPECT_RATIO,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: spacing.sm,
  },
});
