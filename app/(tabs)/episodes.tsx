import { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function EpisodesScreen() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then((res) => res.json())
      .then((data) => setEpisodes(data.results))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={episodes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/episode/${item.id}`)}>
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Episode: {item.episode}</Text>
            <Text>Air Date: {item.air_date}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}