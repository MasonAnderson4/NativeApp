import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { API_KEY, NEWS_API_BASE_URL } from '../../config';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export default function Headlines() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeadlines();
  }, []);

  const fetchHeadlines = async () => {
    try {
      const response = await fetch(
        `${NEWS_API_BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching headlines:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.articleCard}
            onPress={() =>
              router.push({
                pathname: '/article',
                params: {
                  title: item.title,
                  description: item.description || 'No description available',
                  source: item.source.name,
                  date: new Date(item.publishedAt).toLocaleDateString(),
                  url: item.url,
                },
              })
            }
          >
            <Text style={styles.source}>{item.source.name}</Text>
            <Text style={styles.title}>{item.title}</Text>
            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
            <Text style={styles.date}>
              {new Date(item.publishedAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleCard: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  source: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
