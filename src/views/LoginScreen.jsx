import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Keyboard, Alert, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../constants/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';

const LoginScreen = ({ navigation }) => {
	const { height, width } = useWindowDimensions();

	const [ isLoading, setIsLoading ] = React.useState(false);
	const [ inputs, setInputs ] = React.useState({
		email: '',
		password: ''
	});

	const hanldeOnChange = (text, input) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const [ errors, setErrors ] = React.useState({
		username: '',
		password: '',
		authenticate: ''
	});

	const hanldeOnError = (errorMessage, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
	};

	/* ---------------------------- Validation Check ---------------------------- */

	const checkValidate = () => {
		Keyboard.dismiss();

		let valid = true;

		if (!inputs.username) {
			hanldeOnError('Please input username', 'username');
			valid = false;
		}

		if (!inputs.password) {
			hanldeOnError('Please input password', 'password');
			valid = false;
		} else if (inputs.password.length < 5) {
			hanldeOnError('Min password length of 5', 'password');
			valid = false;
		}

		// console.log(valid, 'valid');
		if (valid) {
			onLogin();
		}
	};

	/* ---------------------------- Login Account ---------------------------- */

	const onLogin = async () => {
		setIsLoading(true);

		try {
			let requestOptions = {
				method: 'POST',
				headers: {
					'X-API-KEY': 'l!nt@h-B@!k',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: inputs.username,
					password: inputs.password
				}),
				redirect: 'follow'
			};

			const { status, message, data } = await (await fetch(
				'http://34.101.70.83:5200/mobile/user/v1/auth/signin',
				requestOptions
			)).json();

			if (status) {
				AsyncStorage.setItem('user', JSON.stringify({ ...data, loggedIn: true }));
				console.log(await AsyncStorage.getItem('user'));
				hanldeOnError(null, 'authenticate');
				navigation.replace('Home');
			} else {
				hanldeOnError(message, 'authenticate');
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			Alert.alert('Error', 'something went wrong!');
			setIsLoading(false);
		}
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
				justifyContent: 'space-between',
				paddingHorizontal: 20,
				paddingVertical: 30
			}}
		>
			<Loader visible={isLoading} />
			<View style={{ flex: 1.5 }}>
				<Text style={{ color: COLORS.primary, fontSize: 40, fontWeight: 'bold' }}>ZidDesk </Text>
				<Text style={{ color: COLORS.dark, fontSize: 18 }}>Masuk ke ZidDesk</Text>
			</View>

			<Text
				style={{
					textTransform: 'capitalize',
					textAlign: 'center',
					color: COLORS.red,
					fontWeight: 'bold',
					flex: 0.5
				}}
			>
				{errors.authenticate}
			</Text>
			<View style={{ flex: 2 }}>
				<Input
					label="Username"
					placeholder="Username"
					error={errors.username}
					onFocus={() => {
						hanldeOnError(null, 'username');
					}}
					onChangeText={(text) => hanldeOnChange(text, 'username')}
				/>
				<Input
					label="Password"
					placeholder=" Password"
					password
					error={errors.password}
					onFocus={() => {
						hanldeOnError(null, 'password');
					}}
					onChangeText={(text) => hanldeOnChange(text, 'password')}
				/>
				<View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
					<Text style={{ color: COLORS.primary, fontWeight: '500', fontSize: 12 }}>Lupa kata sandi?</Text>
				</View>
			</View>
			<View style={{ flex: 1, justifyContent: 'flex-end' }}>
				<Button title="MASUK" onPress={checkValidate} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default LoginScreen;
