import { View, Text } from "react-native";
import { GlobalStyles } from "../common/GlobalStyles";

export default function AppBar() {
  return (
    <View style={GlobalStyles.appBar}>
      <Text style={GlobalStyles.appBarTitle}>Instapicapp</Text>
    </View>
  );
}
