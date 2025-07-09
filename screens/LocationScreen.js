import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const getLocation = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      setLocation(location);
      
      // Get address from coordinates
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      if (addressResponse && addressResponse.length > 0) {
        setAddress(addressResponse[0]);
      }
    } catch (error) {
      setErrorMsg(`Error getting location: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Device Location</Text>
        <Text style={styles.description}>
          Get your current GPS coordinates and address using Expo Location
        </Text>

        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Getting location...</Text>
          </View>
        ) : location ? (
          <View style={styles.resultContainer}>
            <View style={styles.coordsContainer}>
              <Text style={styles.coordsTitle}>Coordinates:</Text>
              <Text style={styles.coordsText}>
                Latitude: {location.coords.latitude.toFixed(6)}
              </Text>
              <Text style={styles.coordsText}>
                Longitude: {location.coords.longitude.toFixed(6)}
              </Text>
              <Text style={styles.coordsText}>
                Altitude: {location.coords.altitude ? `${location.coords.altitude.toFixed(2)} m` : 'N/A'}
              </Text>
              <Text style={styles.coordsText}>
                Accuracy: {location.coords.accuracy ? `${location.coords.accuracy.toFixed(2)} m` : 'N/A'}
              </Text>
            </View>

            {address && (
              <View style={styles.addressContainer}>
                <Text style={styles.coordsTitle}>Address:</Text>
                <Text style={styles.addressText}>
                  {[
                    address.name,
                    address.street,
                    address.district,
                    address.city,
                    address.region,
                    address.postalCode,
                    address.country
                  ].filter(Boolean).join(', ')}
                </Text>
              </View>
            )}
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={getLocation}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {location ? 'Update Location' : 'Get Current Location'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  resultContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  coordsContainer: {
    marginBottom: 15,
  },
  coordsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  coordsText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  addressContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  addressText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
