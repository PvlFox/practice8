import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function LocationDetail() {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/location/${id}`)
      .then((res) => res.json())
      .then((data) => setLocation(data))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  if (!location) return <Text>Location not found</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{location.name}</Text>
      <Text>Type: {location.type}</Text>
      <Text>Dimension: {location.dimension}</Text>
      <Text>Number of Residents: {location.residents.length}</Text>
    </View>
  );
}