import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as SMSRetriever from 'expo-sms-retriever';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Define your stack params
type RootStackParamList = {
    OTP: { phoneNumber: string };
    MobileNumber: undefined;
};

type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTP'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OTP'>;

const OTPScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<OTPScreenRouteProp>();
    const { phoneNumber } = route.params;

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    // Auto-read OTP from SMS (Android only)
    useEffect(() => {
        if (Platform.OS === 'android') {
            const startSmsListener = async () => {
                try {
                    const { sms } = await SMSRetriever.startSmsRetrieverAsync();
                    const otpFromMessage = sms.match(/\d{4}/);
                    if (otpFromMessage) {
                        const otpDigits = otpFromMessage[0].split('');
                        setOtp(otpDigits);
                    }
                } catch (error) {
                    console.log('SMS Listener Error:', error);
                }
            };

            startSmsListener();
        }
    }, []);

    const handleOTPChange = (value: string, index: number) => {
        if (/^\d*$/.test(value)) {
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);

            if (value !== '' && index < otp.length - 1) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleSubmit = () => {
        const fullOTP = otp.join('');
        if (fullOTP.length === 4) {
            alert(`OTP submitted: ${fullOTP}`);
            navigation.navigate("ProfileInfo")
        } else {
            alert('Please enter a valid 4-digit OTP');
        }
    };

    const handleResend = () => {
        alert('OTP resent to your number');
        // Backend resend trigger
    };

    const handleChangeNumber = () => {
        navigation.navigate('MobileNumber');
    };

    // Mask mobile number: +91 98XXXXXX76
    const maskedPhone =
        typeof phoneNumber === 'string'
            ? phoneNumber.replace(/^(\d{2})\d{6}(\d{2})$/, '$1XXXXXX$2')
            : '';

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

            <Text style={styles.title}>Enter Verification Code</Text>
            <Text style={styles.subtitle}>
                We have sent SMS to:{' '}
                <Text style={styles.phone}>+91 {maskedPhone}</Text>
            </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            inputs.current[index] = ref;
                        }}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(value) => handleOTPChange(value, index)}
                    />
                ))}
            </View>

            <View style={styles.links}>
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.linkText}>Resend OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleChangeNumber}>
                    <Text style={styles.linkText}>Change Phone Number</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
                <FontAwesome name="arrow-right" size={18} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default OTPScreen;

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
        marginBottom: 20,
    },
    phone: {
        fontWeight: '700',
        color: '#000',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    otpInput: {
        borderBottomWidth: 2,
        borderColor: '#ccc',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
        width: 50,
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    linkText: {
        color: '#1DBF73',
        fontSize: 14,
        fontWeight: '500',
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
