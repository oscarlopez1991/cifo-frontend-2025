import { View, Text, StyleSheet } from "react-native";

export default function WelcomeCard({ name, course }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>¡Bienvenido/a!</Text>
      <Text style={styles.subtitle}>{name}</Text>
      <Text style={styles.courseText}>Curso: {course}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✨ Estudiante Activo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    padding: 25,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    width: "85%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    color: "#E8F4FD",
    marginBottom: 8,
    textAlign: "center",
  },
  courseText: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
    fontStyle: "italic",
  },
  badge: {
    backgroundColor: "#FFD700",
    borderRadius: 15,
    padding: 8,
    alignSelf: "center",
    marginTop: 5,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
