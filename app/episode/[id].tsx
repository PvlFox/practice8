import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function EpisodeDetail() {
  const { id } = useLocalSearchParams();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((res) => res.json())
      .then((data) => setEpisode(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  if (!episode) return <Text>Episode not found</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{episode.name}</Text>
      <Text>Episode: {episode.episode}</Text>
      <Text>Air Date: {episode.air_date}</Text>
      <Text>Number of Characters: {episode.characters.length}</Text>
    </View>
  );
}