import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
    const navigation:any= useNavigation();

      useEffect(() => {
        const timeout = setTimeout(() => {
          navigation.navigate('MobileNumber');
        }, 2000);

        return () => clearTimeout(timeout);
      }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Animatable.Text
        animation="zoomInDown"
        duration={1500}
        style={styles.title}
      >
        trueValue
      </Animatable.Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: 'PermanentMarker',
    color: '#1A1A1A',
  },
});
