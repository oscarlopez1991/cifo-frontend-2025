import { StyleSheet } from "react-native";

export const colors = {
  primary: "#4A90E2",
  background: "#FAFAFA",
  white: "#FFFFFF",
  textPrimary: "#262626",
  textSecondary: "#8E8E8E",
  border: "#DBDBDB",
  heart: "#ED4956",
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  appBar: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appBarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textPrimary,
    letterSpacing: 0.5,
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
  },
});
