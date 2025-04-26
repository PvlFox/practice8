import { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function LocationsScreen() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/location')
      .then((res) => res.json())
      .then((data) => setLocations(data.results))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={locations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/location/${item.id}`)}>
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Dimension: {item.dimension}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}