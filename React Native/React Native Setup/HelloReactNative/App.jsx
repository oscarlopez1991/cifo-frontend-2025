import { Text, View, StyleSheet, ScrollView } from "react-native";
import WelcomeCard from "./WelcomeCard";
import InfoBox from "./InfoBox";

export default function App() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>📱 Mi App React Native</Text>

        <WelcomeCard name="Oscar López" course="Desarrollo Frontend 2025" />

        <View style={styles.infoContainer}>
          <InfoBox icon="🚀" label="Proyectos" value="5" />
          <InfoBox icon="⭐" label="Calificación" value="10/10" />
        </View>

        <View style={styles.infoContainer}>
          <InfoBox icon="📚" label="Módulos" value="12" />
          <InfoBox icon="🎯" label="Progreso" value="85%" />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ✅ Proyecto modificado y personalizado
          </Text>
          <Text style={styles.footerSubtext}>CIFO - React Native Setup</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  footer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#34495E",
    borderRadius: 15,
    width: "85%",
  },
  footerText: {
    fontSize: 16,
    color: "#ECF0F1",
    textAlign: "center",
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 14,
    color: "#95A5A6",
    textAlign: "center",
  },
});
