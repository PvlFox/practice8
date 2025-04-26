import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';

export default function CharacterDetail() {
  const { id } = useLocalSearchParams();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  if (!character) return <Text>Character not found</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: character.image }} style={{ width: 200, height: 200 }} />
      <Text>Name: {character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Origin: {character.origin?.name}</Text>
      <Text>Location: {character.location?.name}</Text>
    </View>
  );
}