import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import COLORS from '../constants/colors';

const Input = ({
	label,
	iconName,
	error,
	password,
	dropdown,
	onFocus = () => {},
	onPress = () => {},
	textarea,
	...props
}) => {
	const [ isFocused, setIsFocused ] = React.useState(false);
	const [ hidePassword, setHidePassword ] = React.useState(password);
	return (
		<View style={{ marginBottom: 10 }}>
			<Text style={styles.label}>{label}</Text>
			<View
				style={[
					styles.inputContainer,
					{
						borderColor: error ? COLORS.red : isFocused ? COLORS.primary : COLORS.light,
						height: textarea ? 90 : 45
					}
				]}
			>
				<TextInput
					secureTextEntry={hidePassword}
					autoCorrect={false}
					onFocus={() => {
						onFocus();
						setIsFocused(true);
					}}
					onPress={() => {
						console.log('asd');
						onPress();
					}}
					onBlur={() => {
						setIsFocused(false);
					}}
					{...props}
					style={[ { color: COLORS.dark, flex: 1 }, textarea ? { textAlignVertical: 'top' } : null ]}
				/>
				{password && (
					<Feather onPress={() => setHidePassword(!hidePassword)} name={hidePassword ? 'eye' : 'eye-off'} />
				)}
				{dropdown && <Icon name="keyboard-arrow-down" style={{ fontSize: 19 }} />}
			</View>
			{error && <Text style={{ color: COLORS.red, marginTop: 7, fontSize: 12 }}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		marginVertical: 5,
		fontSize: 14,
		fontWeight: 'bold',
		color: COLORS.dark
	},
	inputContainer: {
		height: 45,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: COLORS.light,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5
	}
});

export default Input;
