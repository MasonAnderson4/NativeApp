import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useBookmarks } from '../context/BookmarksContext';

export default function ArticleDetail() {
  const params = useLocalSearchParams();
  const { title, description, source, date, url } = params;
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const openArticle = () => {
    if (url && typeof url === 'string') {
      Linking.openURL(url);
    }
  };

  const toggleBookmark = () => {
    const article = {
      title: typeof title === 'string' ? title : '',
      description: typeof description === 'string' ? description : '',
      url: typeof url === 'string' ? url : '',
      source: typeof source === 'string' ? source : '',
      date: typeof date === 'string' ? date : '',
    };

    if (isBookmarked(article.url)) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  const bookmarked = typeof url === 'string' ? isBookmarked(url) : false;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.source}>{source}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity style={styles.bookmarkButton} onPress={toggleBookmark}>
          <Text style={styles.bookmarkButtonText}>
            {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openArticle}>
          <Text style={styles.buttonText}>Read Full Article</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  source: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    lineHeight: 32,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 30,
  },
  bookmarkButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  bookmarkButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
