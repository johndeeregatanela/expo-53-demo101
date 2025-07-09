import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);

  const pickImage = async (sourceType) => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow access to your photo library to use this feature.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: true,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        
        // Extract and format image info
        const asset = result.assets[0];
        setImageInfo({
          width: asset.width,
          height: asset.height,
          type: asset.type,
          fileSize: asset.fileSize ? `${(asset.fileSize / 1024 / 1024).toFixed(2)} MB` : 'Unknown',
          fileName: asset.fileName || 'Unknown',
          exif: asset.exif || null,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image: ' + error.message);
    }
  };

  const takePhoto = async () => {
    try {
      // Request camera permission
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow camera access to use this feature.');
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: true,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        
        // Extract and format image info
        const asset = result.assets[0];
        setImageInfo({
          width: asset.width,
          height: asset.height,
          type: asset.type,
          fileSize: asset.fileSize ? `${(asset.fileSize / 1024 / 1024).toFixed(2)} MB` : 'Unknown',
          fileName: asset.fileName || 'Unknown',
          exif: asset.exif || null,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Image Picker</Text>
        <Text style={styles.subtitle}>
          Select images from your gallery or take a new photo
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          
          {imageInfo && (
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Image Information</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Dimensions:</Text>
                <Text style={styles.infoValue}>{imageInfo.width} × {imageInfo.height}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>File Size:</Text>
                <Text style={styles.infoValue}>{imageInfo.fileSize}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>File Name:</Text>
                <Text style={styles.infoValue}>{imageInfo.fileName}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Type:</Text>
                <Text style={styles.infoValue}>{imageInfo.type || 'Unknown'}</Text>
              </View>

              {imageInfo.exif && (
                <>
                  <Text style={[styles.infoTitle, {marginTop: 15}]}>EXIF Data</Text>
                  {Object.entries(imageInfo.exif)
                    .filter(([key, value]) => 
                      value !== undefined && 
                      value !== null && 
                      key !== 'Orientation' && 
                      typeof value !== 'object')
                    .slice(0, 5)
                    .map(([key, value], index) => (
                      <View style={styles.infoRow} key={index}>
                        <Text style={styles.infoLabel}>{key}:</Text>
                        <Text style={styles.infoValue}>{value.toString()}</Text>
                      </View>
                    ))
                  }
                </>
              )}
            </View>
          )}
        </View>
      )}

      {!selectedImage && (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            No image selected. Pick an image or take a photo to see it here.
          </Text>
        </View>
      )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#5856D6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    maxWidth: '60%',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e1e1e1',
    borderStyle: 'dashed',
    height: 200,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
