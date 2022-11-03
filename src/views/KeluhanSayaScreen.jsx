import React from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	FlatList,
	StatusBar,
	Image,
	SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../constants/colors';

const categories = [ { id: '1', name: 'Semua' }, { id: '2', name: 'Dalam Konsultasi' }, { id: '3', name: 'Menunggu' } ];

const KeluhanSayaScreen = ({ navigation }) => {
	const [ ticket, setTicket ] = React.useState([]);

	const getTicket = async () => {
		try {
			const { token } = JSON.parse(await AsyncStorage.getItem('user'));

			let requestOptions = {
				method: 'GET',
				headers: {
					'X-API-KEY': 'l!nt@h-B@!k',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				redirect: 'follow'
			};

			const { status, message, data } = await (await fetch(
				'http://34.101.70.83:5200/mobile/user/v1/ticket/',
				requestOptions
			)).json();

			console.log(status, data);

			if (status) {
				setTicket(data);
				console.log(ticket);
			}
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		getTicket();
	}, []);

	const Categories = () => {
		const [ categoryIdx, setCategoryIdx ] = React.useState(0);
		return (
			<View style={{ marginTop: 20 }}>
				<ScrollView
					horizontal
					contentContainerStyle={{ marginLeft: 20 }}
					showsHorizontalScrollIndicator={false}
				>
					<View
						style={{
							paddingRight: 20,
							flexDirection: 'row',
							justifyContent: 'center'
						}}
					>
						{categories.map((category, idx) => (
							<TouchableOpacity
								activeOpacity={0.7}
								key={idx}
								style={{
									backgroundColor: categoryIdx === idx ? '#f0f6fc' : COLORS.white,
									color: categoryIdx === idx ? COLORS.primary : COLORS.light,
									borderColor: categoryIdx === idx ? COLORS.primary : COLORS.light,
									...styles.categoryBtn
								}}
								onPress={() => setCategoryIdx(idx)}
							>
								<Text
									style={{
										color: categoryIdx === idx ? COLORS.primary : COLORS.light,
										...styles.categoryText
									}}
								>
									{category.name}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</ScrollView>
			</View>
		);
	};

	const Ticket = () => {
		return (
			<FlatList
				data={ticket}
				numColumns={1}
				contentContainerStyle={{ paddingVertical: 25, paddingHorizontal: 20 }}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => <CardKeluhan data={item} />}
			/>
		);
	};

	const CardKeluhan = ({ data }) => {
		return (
			<TouchableOpacity
				underlayColor={COLORS.white}
				activeOpacity={0.9}
				onPress={() => navigation.navigate('DetailKeluhanScreen', data)}
			>
				<View style={styles.cardTicket}>
					<Image
						source={{ uri: data.image_url }}
						style={{ width: '100%', height: 130, resizeMode: 'cover', borderRadius: 5 }}
					/>
					<View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
						<Text
							style={{
								backgroundColor: 'rgba(250, 210, 77, 0.15)',
								paddingHorizontal: 5,
								height: 20,
								color: '#FAD24D',
								borderRadius: 2,
								fontSize: 12
							}}
						>
							{data.status == 'waiting' ? 'Menuggu' : 'Dalam Konsultasi'}
						</Text>
						<View style={styles.dots} />
						<Text
							style={{
								backgroundColor: '#f9f9f9',
								paddingHorizontal: 5,
								height: 20,
								color: COLORS.light2,
								borderRadius: 2,
								fontSize: 12
							}}
						>
							{data.category}
						</Text>
						<View style={styles.dots} />
						<Text style={{ fontSize: 12 }}>{new Date().toGMTString().slice(0, 16)}</Text>
					</View>
					<Text style={{ color: COLORS.dark, fontWeight: '500', marginVertical: 5 }}>{data.title}</Text>
					<Text style={{ fontSize: 12, color: COLORS.dark }}>{data.description}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
			<Categories />
			<Ticket />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	categoryBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 20,
		paddingHorizontal: 2,
		paddingVertical: 2,
		paddingRight: 10,
		marginRight: 7,
		height: 25,
		borderWidth: 1
	},
	categoryText: { fontWeight: 'lighter', marginLeft: 5, textTransform: 'capitalize' },
	cardTicket: {
		padding: 10,
		backgroundColor: COLORS.white,
		borderRadius: 5,
		elevation: 3,
		marginBottom: 25
	},
	dots: {
		width: 4,
		height: 4,
		borderRadius: 50,
		backgroundColor: COLORS.light,
		marginHorizontal: 10
	}
});

export default KeluhanSayaScreen;
