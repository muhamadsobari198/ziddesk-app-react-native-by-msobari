import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import COLORS from '../constants/colors';

const SuccesScreen = ({ navigation }) => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
			<Image source={require('../assets/images/vector.png')} style={{ resizeMode: 'cover' }} />
			<Text style={{ textAlign: 'center', width: '80%', marginTop: 20, color: COLORS.dark }}>
				Request kamu telah dikirim, harap menunggu balasan dari kami
			</Text>
			<TouchableOpacity
				activeOpacity={0.7}
				style={{ backgroundColor: 'rgba(71, 173, 231, 0.1)', padding: 10, borderRadius: 50, marginTop: 15 }}
				onPress={() => navigation.replace('Home')}
			>
				<Text style={{ color: COLORS.primary }}> Kembali</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SuccesScreen;
