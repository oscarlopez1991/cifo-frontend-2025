import { View, Image, Text, StyleSheet } from "react-native";
import { colors } from "../common/GlobalStyles";

export default function User({ username, avatar, premium }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        {premium && (
          <View style={styles.heartContainer}>
            <Text style={styles.heart}>❤️</Text>
          </View>
        )}
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {username}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 15,
    width: 80,
  },
  avatarContainer: {
    position: "relative",
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.border,
  },
  heartContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: colors.white,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    fontSize: 16,
  },
  username: {
    fontSize: 12,
    color: colors.textPrimary,
    textAlign: "center",
  },
});
