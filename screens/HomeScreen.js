import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const features = [
    {
      name: "Camera",
      description: "Access device camera to take photos and videos",
      screen: "Camera",
    },
    {
      name: "Location",
      description: "Get current location coordinates and address",
      screen: "Location",
    },
    {
      name: "Device Sensors",
      description: "Access accelerometer, gyroscope and other device sensors",
      screen: "Sensors",
    },
    {
      name: "Image Picker",
      description: "Select images from device gallery",
      screen: "ImagePicker",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Expo 53 Demo</Text>
        <Text style={styles.subtitle}>Explore key features of Expo SDK 53</Text>
      </View>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.featureCard}
            onPress={() => navigation.navigate(feature.screen)}
          >
            <Text style={styles.featureName}>{feature.name}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Explore →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Built with Expo SDK 53</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7",
  },
  header: {
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  featuresContainer: {
    padding: 15,
  },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
});
