import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import { Accelerometer, Gyroscope, Magnetometer, Barometer } from 'expo-sensors';

export default function SensorsScreen() {
  // Accelerometer state
  const [accelerometerData, setAccelerometerData] = useState({ x: 0, y: 0, z: 0 });
  const [accelerometerEnabled, setAccelerometerEnabled] = useState(false);

  // Gyroscope state
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [gyroscopeEnabled, setGyroscopeEnabled] = useState(false);

  // Magnetometer state
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [magnetometerEnabled, setMagnetometerEnabled] = useState(false);

  // Barometer state
  const [barometerData, setBarometerData] = useState({ pressure: 0, relativeAltitude: null });
  const [barometerEnabled, setBarometerEnabled] = useState(false);

  // Accelerometer subscription
  useEffect(() => {
    let subscription;
    if (accelerometerEnabled) {
      Accelerometer.setUpdateInterval(500);
      subscription = Accelerometer.addListener(data => {
        setAccelerometerData(data);
      });
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [accelerometerEnabled]);

  // Gyroscope subscription
  useEffect(() => {
    let subscription;
    if (gyroscopeEnabled) {
      Gyroscope.setUpdateInterval(500);
      subscription = Gyroscope.addListener(data => {
        setGyroscopeData(data);
      });
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [gyroscopeEnabled]);

  // Magnetometer subscription
  useEffect(() => {
    let subscription;
    if (magnetometerEnabled) {
      Magnetometer.setUpdateInterval(500);
      subscription = Magnetometer.addListener(data => {
        setMagnetometerData(data);
      });
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [magnetometerEnabled]);

  // Barometer subscription
  useEffect(() => {
    let subscription;
    if (barometerEnabled) {
      subscription = Barometer.addListener(data => {
        setBarometerData({
          pressure: data.pressure,
          relativeAltitude: data.relativeAltitude
        });
      });
    }
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [barometerEnabled]);

  const round = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return Math.round(value * 100) / 100;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Device Sensors</Text>
        <Text style={styles.subHeaderText}>
          Toggle sensors to see real-time data from your device
        </Text>
      </View>

      {/* Accelerometer */}
      <View style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <Text style={styles.sensorTitle}>Accelerometer</Text>
          <Switch
            value={accelerometerEnabled}
            onValueChange={setAccelerometerEnabled}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={accelerometerEnabled ? "#007AFF" : "#f4f3f4"}
          />
        </View>
        <Text style={styles.sensorDescription}>
          Measures the acceleration force applied to the device
        </Text>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>X-axis:</Text>
            <Text style={styles.dataValue}>{round(accelerometerData.x)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Y-axis:</Text>
            <Text style={styles.dataValue}>{round(accelerometerData.y)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Z-axis:</Text>
            <Text style={styles.dataValue}>{round(accelerometerData.z)}</Text>
          </View>
        </View>
      </View>

      {/* Gyroscope */}
      <View style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <Text style={styles.sensorTitle}>Gyroscope</Text>
          <Switch
            value={gyroscopeEnabled}
            onValueChange={setGyroscopeEnabled}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={gyroscopeEnabled ? "#007AFF" : "#f4f3f4"}
          />
        </View>
        <Text style={styles.sensorDescription}>
          Measures the rate of rotation around the device's axes
        </Text>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>X-axis:</Text>
            <Text style={styles.dataValue}>{round(gyroscopeData.x)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Y-axis:</Text>
            <Text style={styles.dataValue}>{round(gyroscopeData.y)}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Z-axis:</Text>
            <Text style={styles.dataValue}>{round(gyroscopeData.z)}</Text>
          </View>
        </View>
      </View>

      {/* Magnetometer */}
      <View style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <Text style={styles.sensorTitle}>Magnetometer</Text>
          <Switch
            value={magnetometerEnabled}
            onValueChange={setMagnetometerEnabled}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={magnetometerEnabled ? "#007AFF" : "#f4f3f4"}
          />
        </View>
        <Text style={styles.sensorDescription}>
          Measures the ambient magnetic field around the device
        </Text>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>X-axis:</Text>
            <Text style={styles.dataValue}>{round(magnetometerData.x)} μT</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Y-axis:</Text>
            <Text style={styles.dataValue}>{round(magnetometerData.y)} μT</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Z-axis:</Text>
            <Text style={styles.dataValue}>{round(magnetometerData.z)} μT</Text>
          </View>
        </View>
      </View>

      {/* Barometer */}
      <View style={styles.sensorCard}>
        <View style={styles.sensorHeader}>
          <Text style={styles.sensorTitle}>Barometer</Text>
          <Switch
            value={barometerEnabled}
            onValueChange={setBarometerEnabled}
            trackColor={{ false: "#d1d1d6", true: "#81b0ff" }}
            thumbColor={barometerEnabled ? "#007AFF" : "#f4f3f4"}
          />
        </View>
        <Text style={styles.sensorDescription}>
          Measures atmospheric pressure and relative altitude
        </Text>
        <View style={styles.dataContainer}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Pressure:</Text>
            <Text style={styles.dataValue}>{round(barometerData.pressure)} hPa</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Relative Altitude:</Text>
            <Text style={styles.dataValue}>
              {barometerData.relativeAltitude !== null 
                ? `${round(barometerData.relativeAltitude)} m` 
                : 'N/A'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  sensorCard: {
    margin: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sensorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sensorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sensorDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  dataContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  dataLabel: {
    fontSize: 16,
    color: '#444',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
});
