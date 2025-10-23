import { Image, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Picture({ uri }) {
  return <Image source={{ uri }} style={styles.image} resizeMode="cover" />;
}

const styles = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenWidth,
  },
});
