import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { forgetPassword, resetPassword } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const navigation = useNavigation();

  const handleVerify = async () => {
    const response = await forgetPassword(email, securityAnswer);
    console.log('Verify response:', response); // Add this line for debugging
    if (response.success) {
      setMessage('Verification successful. Enter your new password.');
      setResetMode(true);
    } else {
      setMessage('Error: Email or security answer is incorrect.');
    }
  };

  const handleResetPassword = async () => {
    const response = await resetPassword(email, newPassword);
    console.log('Reset Password response:', response); // Add this line for debugging
    if (response.success) {
      setMessage('Password reset successfully.');
      navigation.navigate('Login');
    } else {
      setMessage('Error resetting password.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Forgot Password" />
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Security Answer"
        value={securityAnswer}
        onChangeText={setSecurityAnswer}
      />
      {resetMode && (
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      )}
      <TouchableOpacity style={styles.button} onPress={resetMode ? handleResetPassword : handleVerify}>
        <Text style={styles.buttonText}>{resetMode ? 'Reset Password' : 'Verify'}</Text>
      </TouchableOpacity>
      {message ? <Text style={{ color: 'green', marginTop: 10 }}>{message}</Text> : null}
      <Footer />
    </View>
  );
};

export default ForgetPasswordPage;