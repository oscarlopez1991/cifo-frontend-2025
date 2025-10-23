import { View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppBar from "./src/components/AppBar";
import SuggestedFollows from "./src/components/SuggestedFollows";
import ListStories from "./src/components/ListStories";
import { data } from "./src/data/data";
import { GlobalStyles } from "./src/common/GlobalStyles";

export default function App() {
  return (
    <View style={GlobalStyles.container}>
      <StatusBar style="light" />
      <AppBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SuggestedFollows users={data.suggestedFollows} />
        <ListStories stories={data.stories} />
      </ScrollView>
    </View>
  );
}
