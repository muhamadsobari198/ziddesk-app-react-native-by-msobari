import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import COLORS from '../constants/colors';

const FailedScreen = ({ navigation }) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Image source={require('../assets/images/vector2.png')} style={{ resizeMode: 'cover' }} />
			<Text style={{ textAlign: 'center', width: '80%', marginTop: 20, color: COLORS.dark }}>
				Request tidak terkirim karena terjadi kesalahan. Silakan hubungi kami.
			</Text>
			<TouchableOpacity
				activeOpacity={0.7}
				style={{ backgroundColor: 'rgba(71, 173, 231, 0.1)', padding: 10, borderRadius: 50, marginTop: 15 }}
			>
				<Text style={{ color: COLORS.primary }}> Hubungi Kami</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({});

export default FailedScreen;
