import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
/* -------------------------------------------------------------------------- */
/*                                   Screen                                   */
/* -------------------------------------------------------------------------- */
import LoginScreen from './src/views/LoginScreen';
import FailedScreen from './src/views/FailedScreen';
import SuccesScreen from './src/views/SuccesScreen';
import LaporKeluhanScreen from './src/views/LaporKeluhanScreen';
import KeluhanSayaScreen from './src/views/KeluhanSayaScreen';
import DetailKeluhancreen from './src/views/DetailKeluhancreen';

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './src/components/BottomNavigator';
const Stack = createNativeStackNavigator();

/* -------------------------------------------------------------------------- */
/*                                   Others                                   */
/* -------------------------------------------------------------------------- */
import COLORS from './src/constants/colors';
import Loader from './src/components/Loader';

const App = () => {
	const [ initialRouteName, setInitialRouteName ] = React.useState('');

	React.useEffect(() => {
		authUser();
	}, []);

	const authUser = async () => {
		try {
			let user = await AsyncStorage.getItem('user');
			console.log(user);
			if (user) {
				user = JSON.parse(user);
				if (user.loggedIn) {
					setInitialRouteName('Home');
				} else {
					setInitialRouteName('LoginScreen');
				}
			} else {
				setInitialRouteName('LoginScreen');
			}
		} catch (error) {
			setInitialRouteName('LoginScreen');
		}
	};

	return (
		<NavigationContainer>
			<StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
			{initialRouteName == '' ? (
				<Loader visible={true} />
			) : (
				<Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="LoginScreen" component={LoginScreen} />
					<Stack.Screen name="Home" component={BottomNavigator} />
					<Stack.Screen
						name="LaporKeluhanScreen"
						component={LaporKeluhanScreen}
						options={({ navigation }) => ({
							headerShown: true,
							title: 'Lapor Keluhan',
							headerTitleStyle: {
								fontSize: 18
							}
						})}
					/>
					<Stack.Screen
						name="KeluhanSayaScreen"
						component={KeluhanSayaScreen}
						options={() => ({
							headerShown: true,
							title: 'Keluhan Saya',
							headerTitleStyle: {
								fontSize: 18
							}
						})}
					/>
					<Stack.Screen
						name="DetailKeluhanScreen"
						component={DetailKeluhancreen}
						options={() => ({
							headerShown: true,
							title: 'Detail Keluhan',
							headerTitleStyle: {
								fontSize: 18
							}
						})}
					/>

					<Stack.Screen name="SuccessScreen" component={SuccesScreen} />
					<Stack.Screen name="FailedScreen" component={FailedScreen} />
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});

export default App;
