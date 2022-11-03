import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import COLORS from '../constants/colors';

const Button = ({ title, onPress = () => {} }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={onPress}
			style={{
				borderRadius: 5,
				height: 45,
				width: '100%',
				backgroundColor: COLORS.primary,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text style={{ color: COLORS.white }}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({});

export default Button;
