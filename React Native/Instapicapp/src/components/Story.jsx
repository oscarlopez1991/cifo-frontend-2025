import { View, Text, StyleSheet } from "react-native";
import Picture from "./Picture";
import ListComments from "./ListComments";
import { colors } from "../common/GlobalStyles";

export default function Story({ story }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{story.username}</Text>
      </View>
      <Picture uri={story.picture} />
      <View style={styles.commentsSection}>
        <Text style={styles.postedBy}>Posted today by {story.username}</Text>
        <ListComments comments={story.comments} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  commentsSection: {
    paddingVertical: 10,
  },
  postedBy: {
    fontSize: 12,
    color: colors.textSecondary,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});
