import { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Image, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function CharactersScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => setCharacters(data.results))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={characters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/character/${item.id}`)}>
          <View style={{ padding: 10 }}>
            <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
            <Text>{item.name}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Species: {item.species}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}