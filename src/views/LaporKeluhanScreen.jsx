import React from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	ScrollView,
	Text,
	StatusBar,
	TouchableOpacity,
	Image,
	Keyboard,
	FlatList,
	Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../components/Input';
import COLORS from '../constants/colors';
import Button from '../components/Button';

import BottomSheet from '../components/BottomSheet';
import { launchImageLibrary } from 'react-native-image-picker';
import category from '../constants/categoy';
import Loader from '../components/Loader';

const LaporKeluhanScreen = ({ navigation }) => {
	const [ isLoading, setIsLoading ] = React.useState(false);
	const [ inputs, setInputs ] = React.useState({
		title: '',
		category: '',
		image: '',
		description: ''
	});
	const handleChoosePhoto = async () => {
		const options = {
			noData: true
		};
		const response = await launchImageLibrary();
		console.log(response);
		if (response.assets) {
			setInputs((prevState) => ({ ...prevState, image: response.assets[0] }));
			console.log(inputs);
		}
	};
	const hanldeOnChange = (text, input) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const [ errors, setErrors ] = React.useState({
		title: '',
		category: '',
		image: '',
		description: ''
	});

	const hanldeOnError = (errorMessage, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
	};

	React.useEffect(() => {
		setInputs(inputs);
	}, []);

	/* ---------------------------- Validation Check ---------------------------- */

	const checkValidate = () => {
		Keyboard.dismiss();

		let valid = true;
		if (!inputs.title) {
			hanldeOnError('Masukan Judul Keluhan', 'title');
			valid = false;
		}

		if (!inputs.category) {
			hanldeOnError('Masukan Kategori Keluhan', 'category');
			valid = false;
		}

		// if (!inputs.image) {
		// 	hanldeOnError('Masukan Foto Keluhan', 'email');
		// 	valid = false;
		// }

		if (!inputs.description) {
			hanldeOnError('Masukan Deskripsi Keluhan', 'description');
			valid = false;
		}
		if (valid) {
			onSave();
		}
	};

	/* -------------------------- Bottom Sheet Category ------------------------- */

	const [ openModal, setOpenModal ] = React.useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	/* ---------------------------- Save ---------------------------- */

	const onSave = async () => {
		setIsLoading(true);
		console.log(inputs);
		try {
			const { token } = JSON.parse(await AsyncStorage.getItem('user'));

			let formData = new FormData();
			formData.append('title', inputs.title);
			formData.append('category', inputs.category);
			formData.append('image', {
				uri: inputs.image['uri'],
				type: inputs.image['type'],
				name: inputs.image['fileName']
			});
			formData.append('description', inputs.description);

			var requestOptions = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'X-API-KEY': 'l!nt@h-B@!k',
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				},
				body: formData,
				redirect: 'follow'
			};

			await (await fetch('http://34.101.70.83:5200/mobile/user/v1/ticket/', requestOptions)).json();
			setIsLoading(false);
			navigation.navigate('SuccessScreen');
		} catch (error) {
			navigation.navigate('FailedScreen');
			setIsLoading(false);
			console.log(error);
		}
	};

	const Categories = ({ category }) => {
		return (
			<TouchableOpacity onPress={() => hanldeOnChange(category.name, 'category')}>
				<View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={{ color: COLORS.dark }}>{category.name}</Text>
					{category.name == inputs.category && <Icon name="check" style={{ fontSize: 20, color: 'green' }} />}
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
			<Loader visible={isLoading} />
			<ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}>
				<View style={{ flex: 1, justifyContent: 'space-between' }}>
					<View style={{ flex: 3, marginBottom: 20 }}>
						<Text
							style={{
								marginVertical: 5,
								fontSize: 14,
								fontWeight: 'bold',
								color: COLORS.dark
							}}
						>
							Foto Keluhan
						</Text>
						<TouchableOpacity
							style={{
								height: 180,
								width: '100%',
								borderWidth: 1.5,
								borderRadius: 5,
								borderColor: COLORS.light,
								borderStyle: 'dashed',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'row',
								marginBottom: 10
							}}
							onPress={() => handleChoosePhoto()}
						>
							{inputs.image ? (
								<Image
									source={{ uri: inputs.image['uri'] }}
									style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
								/>
							) : (
								<React.Fragment>
									<Icon name="add" style={{ fontSize: 19, color: '#bbbbbb' }} />
									<Text style={{ color: '#bbbbbb' }}> Foto Keluhan</Text>
								</React.Fragment>
							)}
						</TouchableOpacity>

						<Input
							label="Apa Keluhanmu?"
							placeholder="Judul Keluhan"
							error={errors.title}
							onFocus={() => {
								hanldeOnError(null, 'title');
							}}
							onChangeText={(text) => hanldeOnChange(text, 'title')}
						/>
						<Input
							label="Kategori Keluhan"
							placeholder="Kategori Keluhan"
							error={errors.category}
							onPress={() => {
								hanldeOnError(null, 'category');
								handleOpenModal();
							}}
							onFocus={() => {
								hanldeOnError(null, 'category');
								handleOpenModal();
							}}
							onChangeText={(text) => hanldeOnChange(text, 'category')}
							showSoftInputOnFocus={false}
							value={inputs.category}
							dropdown
						/>
						<Input
							textarea
							multiline={true}
							numberOfLines={4}
							label="Deskripsikan Keluhanmu"
							placeholder="Deskripsi Keluhan"
							error={errors.description}
							onFocus={() => {
								hanldeOnError(null, 'description');
							}}
							onChangeText={(text) => hanldeOnChange(text, 'description')}
						/>
					</View>
					<View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 20 }}>
						<Button title="KIRIM" onPress={() => checkValidate()} />
					</View>
				</View>

				<BottomSheet onDismiss={handleCloseModal} visible={openModal}>
					<View style={{ position: 'relative', alignItems: 'center', marginVertical: 15 }}>
						<Text style={{ fontWeight: 'bold', fontSize: 16, color: COLORS.dark }}>Pilih Kategori</Text>
						<TouchableOpacity
							onPress={handleCloseModal}
							style={{ position: 'absolute', right: 10, padding: 3, top: -3.5 }}
						>
							<Icon name="close" style={{ fontSize: 18, color: COLORS.light2 }} />
						</TouchableOpacity>
					</View>
					<FlatList
						data={category}
						numColumns={1}
						contentContainerStyle={{ flex: 1 }}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => <Categories category={item} />}
					/>
				</BottomSheet>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default LaporKeluhanScreen;
