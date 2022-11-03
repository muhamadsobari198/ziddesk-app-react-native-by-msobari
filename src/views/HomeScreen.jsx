import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Text,
	Image,
	ImageBackground,
	FlatList,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';

const { width } = Dimensions.get('screen');

const Activities = ({ navigation }) => {
	return (
		<View style={{ marginHorizontal: 20, marginVertical: 20 }}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Text style={{ color: COLORS.dark, fontWeight: 'bold', fontSize: 15 }}>Aktivitas Terbaru</Text>
				<Text style={{ color: COLORS.primary }}>Lihat Semua</Text>
			</View>
			<View>
				{/* --------------------------------- Keluhan -------------------------------- */}
				<View
					style={{
						backgroundColor: COLORS.white,
						elevation: 5,
						padding: 10,
						borderRadius: 5,
						marginTop: 20
					}}
				>
					<Text style={{ fontWeight: '500', fontSize: 14, color: COLORS.dark, marginBottom: 5 }}>
						Keluhan
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<Text style={{ color: COLORS.dark }}>Laptop Rusak</Text>
						<Text
							style={{
								backgroundColor: 'rgba(250, 210, 77, 0.15)',
								paddingHorizontal: 10,
								height: 20,
								color: '#FAD24D',
								borderRadius: 2,
								fontSize: 12
							}}
						>
							Menunggu
						</Text>
						<Image source={require('../assets/images/action.png')} style={{ resizeMode: 'cover' }} />
					</View>
				</View>
				{/*  ---------------------------------- Visit --------------------------------- */}
				<View
					style={{
						backgroundColor: COLORS.white,
						elevation: 5,
						padding: 10,
						borderRadius: 5,
						marginTop: 20
					}}
				>
					<Text style={{ fontWeight: '500', fontSize: 14, color: COLORS.dark, marginBottom: 5 }}>Visit</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<Text style={{ color: COLORS.dark }}>Teknisi Budi</Text>
						<Text
							style={{
								fontWeight: 'lighter',
								color: COLORS.dark
							}}
						>
							31 Agustus 2021
						</Text>
						<Image source={require('../assets/images/action.png')} style={{ resizeMode: 'cover' }} />
					</View>
				</View>
			</View>
		</View>
	);
};

/* ------------------------------- HomeScreen ------------------------------- */

const HomeScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<StatusBar translucent={false} backgroundColor={COLORS.primary} />

			{/* --------------------------------- Header --------------------------------- */}

			<View style={styles.header}>
				<Text style={{ fontSize: 25, fontWeight: '500', color: COLORS.white }}>ZidDesk</Text>
				<Icon name="notifications-none" size={24} color={COLORS.white} />
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* ------------------------------- Main Header ------------------------------ */}

				<View
					style={{
						backgroundColor: COLORS.primary,
						height: 117,
						paddingHorizontal: 20
					}}
				>
					<View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={styles.headerTitle}>PT. BESTADA </Text>
							<Text style={{ color: COLORS.white }}>(Pusat)</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name="place" color={COLORS.white} />
							<Text style={{ fontSize: 13, color: COLORS.white, marginLeft: 5 }}>Jakarta</Text>
						</View>
						<View style={styles.boxWrapper}>
							<View style={{ width: '100%' }}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										flex: 1,
										paddingVertical: 10,
										height: 50
									}}
								>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Image
											source={require('../assets/images/ticket.png')}
											style={{ resizeMode: 'cover' }}
										/>
										<Text
											style={{
												marginHorizontal: 10,
												fontWeight: 'bold',
												fontSize: 16,
												color: COLORS.secondary
											}}
										>
											5 Tiket
										</Text>
										<Image
											source={require('../assets/images/info.png')}
											style={{ resizeMode: 'cover' }}
										/>
									</View>
									<View style={{ width: 1, backgroundColor: COLORS.light3 }} />
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Image
											source={require('../assets/images/bag.png')}
											style={{ resizeMode: 'cover' }}
										/>
										<Text
											style={{
												marginHorizontal: 10,
												fontWeight: 'bold',
												fontSize: 16,
												color: COLORS.grey
											}}
										>
											3 Visit
										</Text>
										<Image
											source={require('../assets/images/info.png')}
											style={{ resizeMode: 'cover' }}
										/>
									</View>
								</View>
								<View style={{ height: 1, width: '100%', backgroundColor: COLORS.light3 }} />
								<View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 10 }}>
									<Text
										style={{
											fontWeight: 'lighter',
											fontSize: 12,
											color: COLORS.light2,
											marginRight: 3
										}}
									>
										Akan berakhir pada:
									</Text>
									<Text style={{ fontWeight: 'bold', fontSize: 12, color: COLORS.dark }}>
										17 Agustus 2022
									</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				{/* ------------------------------- Keluhan ------------------------------- */}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginHorizontal: 20,
						marginTop: 60,
						justifyContent: 'space-between'
					}}
				>
					<TouchableOpacity
						activeOpacity={0.7}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: COLORS.white,
							elevation: 8,
							borderRadius: 5,
							width: '48%',
							paddingVertical: 20
						}}
						onPress={() => navigation.navigate('LaporKeluhanScreen')}
					>
						<Image source={require('../assets/images/keluhan1.png')} style={{ resizeMode: 'cover' }} />
						<Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.dark }}>Lapor Keluhan</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: COLORS.white,
							elevation: 8,
							borderRadius: 5,
							width: '48%',
							paddingVertical: 20
						}}
						onPress={() => navigation.navigate('KeluhanSayaScreen')}
					>
						<Image source={require('../assets/images/keluhan2.png')} style={{ resizeMode: 'cover' }} />
						<Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.dark }}>Keluhan Saya</Text>
					</TouchableOpacity>
				</View>
				{/* --------------------------------- Aktivitas --------------------------------- */}
				<Activities />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	header: {
		paddingVertical: 20,
		paddingHorizontal: 20,
		backgroundColor: COLORS.primary,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerTitle: { fontWeight: 'bolder', fontSize: 18, color: COLORS.white },
	boxWrapper: {
		// height: 90,
		width: '100%',
		backgroundColor: COLORS.white,
		borderRadius: 5,
		elevation: 7,
		position: 'absolute',
		top: 55,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10
	},
	categoriesWrapper: {
		marginTop: 45,
		marginHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	categoriesItemWrapper: {
		padding: 15,
		backgroundColor: COLORS.secondary,
		borderRadius: 5
	}
});

export default HomeScreen;
