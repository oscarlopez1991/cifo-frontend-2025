import { View, Text, StyleSheet } from "react-native";
import { colors } from "../common/GlobalStyles";

export default function Comment({ username, comment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.comment}> {comment}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 18,
  },
  username: {
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  comment: {
    color: colors.textPrimary,
  },
});
