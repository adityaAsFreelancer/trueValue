import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // Adjust path if needed

const { width } = Dimensions.get('window');
type MobileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MobileNumber'
>;

const MobileNumberScreen = () => {
  const navigation = useNavigation<MobileScreenNavigationProp>();

  const [mobileNumber, setMobileNumber] = useState('');

  const handleContinue = () => {
    const isValid = /^[6-9]\d{9}$/.test(mobileNumber);
    if (!isValid) {
      alert('Please enter a valid Indian mobile number');
      return;
    }

    navigation.navigate('OTP', { phoneNumber: mobileNumber });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../assets/images/phone.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Enter your mobile number</Text>
      <Text style={styles.subtitle}>
        We need to verify you. We will send you a one time verification code.
      </Text>

      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/images/flag.png')}
          style={styles.flag}
        />
        <Text style={styles.countryCode}>+91</Text>
        <FontAwesome name="phone" size={20} color="#999" style={{ marginRight: 5 }} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="number-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Next</Text>
        <FontAwesome name="arrow-right" size={18} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default MobileNumberScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: width * 0.6,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 30,
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 6,
    borderRadius: 2,
  },
  countryCode: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#1DBF73',
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
