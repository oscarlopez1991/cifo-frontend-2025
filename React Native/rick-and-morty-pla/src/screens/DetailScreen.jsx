import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const DetailScreen = ({ route }) => {
  const [data, setData] = useState({});

  // Data -- Using real API.
  const api = "https://rickandmortyapi.com/api/character";
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api}/${route.params.id}`);
      // TODO #6
      // Afegeix el codi que manca en aquesta funció en aquest punt (Pista: 2 línies de sobres conegudes).
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  return (
    // TODO #7
    // Afegeix els estils corresponents a cadascun dels quatre components del següent subarbre de components.
    <View>
      <Text style={styles.name}>{data.name}</Text>
      <Image
        source={{ uri: data.image }}
        accessibilityLabel={data.name}
        style={styles.image}
      />
      {/* TODO #8
      /// Afegeix el contingut que ha de mostrar aquest component Text. */}
      <Text style={styles.episodes}>
        Episodes: {Array.isArray(data.episode) ? data.episode.length : 0}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  image: {
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
  },
  name: {
    fontSize: 38,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  episodes: {
    fontSize: 22,
    fontWeight: "700",
    color: "#888",
    textAlign: "center",
    marginTop: 24,
  },
});

export default DetailScreen;
