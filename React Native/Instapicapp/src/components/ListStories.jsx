import { View, Text, StyleSheet } from "react-native";
import Story from "./Story";
import { GlobalStyles, colors } from "../common/GlobalStyles";

export default function ListStories({ stories }) {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.sectionTitle}>LATEST STORIES</Text>
      {stories.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
