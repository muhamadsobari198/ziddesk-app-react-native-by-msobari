import { View } from 'react-native';

/* -------------------------------------------------------------------------- */
/*                                   Screen                                   */
/* -------------------------------------------------------------------------- */
import HomeScreen from '../views/HomeScreen';

/* -------------------------------------------------------------------------- */
/*                                 Navigation                                 */
/* -------------------------------------------------------------------------- */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

/* -------------------------------------------------------------------------- */
/*                                   Others                                   */
/* -------------------------------------------------------------------------- */
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../constants/colors';

const BottomNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: [
					{
						height: 55,
						borderTopWidth: 0
					}
				],
				tabBarShowLabel: true,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.light
			}}
		>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => <Icon name="home-filled" color={color} size={28} />,
					tabBarLabel: 'Beranda'
				}}
			/>
			<Tab.Screen
				name="BranchScreen"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => <Icon name="apartment" color={color} size={28} />,
					tabBarLabel: 'Cabang'
				}}
			/>
			<Tab.Screen
				name="ProfileScreen"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => <Icon name="perm-identity" color={color} size={28} />,
					tabBarLabel: 'Profile'
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomNavigator;
