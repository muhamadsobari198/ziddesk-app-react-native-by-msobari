import React from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';

const Loader = ({ visible = true }) => {
	const { height, width } = Dimensions.get('screen');
	return (
		visible && (
			<View style={[ styles.container, { height, width } ]}>
				<View style={styles.loader}>
					<ActivityIndicator size="large" color={COLORS.primary} />
					<Text style={{ marginLeft: 10, fontSize: 16 }}>Loading...</Text>
				</View>
			</View>
		)
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		zIndex: 10,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center'
	},
	loader: {
		height: 70,
		backgroundColor: COLORS.white,
		borderRadius: 5,
		marginHorizontal: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20
	}
});

export default Loader;
