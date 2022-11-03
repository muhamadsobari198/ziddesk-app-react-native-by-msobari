import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, StatusBar } from 'react-native';
import COLORS from '../constants/colors';

const DetailKeluhancreen = ({ navigation, route }) => {
	const ticket = route.params;
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
			<View style={styles.cardKeluhan}>
				<Image
					source={{ uri: ticket.image_url }}
					style={{ width: '100%', height: 180, marginBottom: 5, borderRadius: 5 }}
				/>
				<Text style={styles.title}>Keluhan</Text>
				<Text style={styles.desc}>{ticket.title}</Text>
				<View style={styles.divider} />
				<Text style={styles.title}>Deskripsi</Text>
				<Text style={styles.desc}>{ticket.description}</Text>
				<View style={styles.divider} />
				<Text style={styles.title}>Kategori</Text>
				<Text style={styles.desc}>{ticket.category}</Text>
				<View style={styles.divider} />
				<Text style={styles.title}>Status</Text>
				<View style={{ flexDirection: 'row' }}>
					<View
						style={{
							backgroundColor: '#fbf8e6',
							paddingHorizontal: 5,
							height: 20,
							borderRadius: 2,
							fontSize: 12
						}}
					>
						<Text style={{ color: '#ead571' }}>
							{ticket.status == 'waiting' ? 'Menuggu' : 'Dalam Konsultasi'}
						</Text>
					</View>
				</View>
				<View style={styles.divider} />
				<Text style={styles.title}>Konsultasi Via</Text>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View
						style={{
							padding: 8,
							backgroundColor: COLORS.light3,
							width: '48%',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<Image source={require('../assets/images/phone.png')} style={{ marginRight: 5 }} />
						<Text>Panggil</Text>
					</View>
					<View
						style={{
							padding: 8,
							backgroundColor: COLORS.light3,
							width: '48%',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row'
						}}
					>
						<Image source={require('../assets/images/wa.png')} style={{ marginRight: 5 }} />
						<Text>Whatsapp</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	cardKeluhan: {
		padding: 10,
		margin: 20,
		backgroundColor: COLORS.white,
		borderRadius: 5,
		marginBottom: 25,
		borderWidth: 1,
		borderColor: COLORS.light
	},
	title: { color: COLORS.dark, fontWeight: '500', marginVertical: 5 },
	divider: { height: 1, width: '100%', backgroundColor: COLORS.light, marginVertical: 10 },
	desc: { fontSize: 12, color: COLORS.dark }
});

export default DetailKeluhancreen;
