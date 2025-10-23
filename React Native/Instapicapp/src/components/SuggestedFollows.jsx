import { View, Text, ScrollView, StyleSheet } from "react-native";
import User from "./User";
import { GlobalStyles, colors } from "../common/GlobalStyles";

export default function SuggestedFollows({ users }) {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.sectionTitle}>WHO TO FOLLOW</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {users.map((user, index) => (
          <User
            key={index}
            username={user.username}
            avatar={user.avatar}
            premium={user.premium}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
});
