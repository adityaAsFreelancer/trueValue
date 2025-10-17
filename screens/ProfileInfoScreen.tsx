// screens/ProfileInfoScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProfileInfoScreen = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }

    alert(`Name: ${fullName}, Email: ${email}`);
    navigation.navigate("LandingPage")
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Your Information</Text>
      <Text style={styles.subText}>
        It looks like you don’t have account in this number. Please let us know
        some information for a secure service
      </Text>

      {/* Profile Photo */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        ) : (
          <Image
            source={require('../assets/images/camera.png')}
            style={styles.uploadedImage}
          />
        )}
      </TouchableOpacity>

      {/* Full Name */}
      <View style={styles.inputBox}>
        <FontAwesome name="user" size={18} color="#888" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#999"
        />
      </View>

      {/* Email */}
      <View style={styles.inputBox}>
        <FontAwesome name="envelope" size={18} color="#888" style={{ marginRight: 6 }} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
        <FontAwesome name="arrow-right" size={18} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ProfileInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins-Bold',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  uploadedImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2, // makes it circular
    borderWidth: 2,
    borderColor: '#1DBF73',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  button: {
    backgroundColor: '#1DBF73',
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Bold',
  },
});
