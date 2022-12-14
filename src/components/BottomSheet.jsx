// import React, { Component } from 'react';
// import { View, StyleSheet } from 'react-native';

// class BottomSheet extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			panY: new Animated.Value(Dimensions.get('screen').height)
// 		};
// 		this._resetPositionAnim = Animated.timing(this.state.panY, {
// 			toValue: 0,
// 			duration: 300
// 		});
// 		this._closeAnim = Animated.timing(this.state.panY, {
// 			toValue: Dimensions.get('screen').height,
// 			duration: 500
// 		});
// 		this._panResponders = PanResponder.create({
// 			onStartShouldSetPanResponder: () => true,
// 			onMoveShouldSetPanResponder: () => false,
// 			onPanResponderMove: Animated.event([ null, { dy: this.state.panY } ]),
// 			onPanResponderRelease: (e, gs) => {
// 				if (gs.dy > 0 && gs.vy > 2) {
// 					return this._closeAnim.start(() => this.props.onDismiss());
// 				}
// 				return this._resetPositionAnim.start();
// 			}
// 		});
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevProps.visible !== this.props.visible && this.props.visible) {
// 			this._resetPositionAnim.start();
// 		}
// 	}
// 	_handleDismiss() {
// 		this._closeAnim.start(() => this.props.onDismiss());
// 	}

// 	render() {
// 		const top = this.state.panY.interpolate({
// 			inputRange: [ -1, 0, 1 ],
// 			outputRange: [ 0, 0, 1 ]
// 		});
// 		return (
// 			<Modal
// 				animated
// 				animationType="fade"
// 				visible={this.props.visible}
// 				transparent
// 				onRequestClose={() => this._handleDismiss()}
// 			>
// 				<View style={styles.overlay}>
// 					<Animated.View style={[ styles.container, { top } ]}>{this.props.children}</Animated.View>
// 				</View>
// 			</Modal>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	overlay: {
// 		backgroundColor: 'rgba(0,0,0,0.2)',
// 		flex: 1,
// 		justifyContent: 'flex-end'
// 	},
// 	container: {
// 		backgroundColor: 'white',
// 		paddingTop: 12,
// 		borderTopRightRadius: 12,
// 		borderTopLeftRadius: 12
// 	}
// });

// export default BottomSheet;

// original source: https://medium.com/@ndyhrdy/making-the-bottom-sheet-modal-using-react-native-e226a30bed13 ????
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, PanResponder, StyleSheet, View } from 'react-native';

export default (props) => {
	const screenHeight = Dimensions.get('screen').height;
	const panY = useRef(new Animated.Value(screenHeight)).current;

	const resetPositionAnim = Animated.timing(panY, {
		toValue: 0,
		duration: 300,
		useNativeDriver: true
	});

	const closeAnim = Animated.timing(panY, {
		toValue: screenHeight,
		duration: 500,
		useNativeDriver: true
	});

	const translateY = panY.interpolate({
		inputRange: [ -1, 0, 1 ],
		outputRange: [ 0, 0, 1 ]
	});

	const handleDismiss = () => closeAnim.start(props.onDismiss);

	useEffect(
		() => {
			resetPositionAnim.start();
		},
		[ resetPositionAnim ]
	);

	const panResponders = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => false,
			onPanResponderMove: Animated.event([ null, { dy: panY } ], {
				useNativeDriver: false
			}),
			onPanResponderRelease: (_, gs) => {
				if (gs.dy > 0 && gs.vy > 2) {
					return handleDismiss();
				}
				return resetPositionAnim.start();
			}
		})
	).current;

	return (
		<Modal animated animationType="fade" visible={props.visible} transparent onRequestClose={handleDismiss}>
			<View style={styles.overlay}>
				<Animated.View
					style={{
						...styles.container,
						transform: [ { translateY: translateY } ]
					}}
					{...panResponders.panHandlers}
				>
					<View style={styles.sliderIndicatorRow}>
						<View style={styles.sliderIndicator} />
					</View>
					{props.children}
				</Animated.View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		flex: 1,
		justifyContent: 'flex-end'
	},
	container: {
		backgroundColor: 'white',
		paddingTop: 12,
		paddingHorizontal: 12,
		borderTopRightRadius: 12,
		borderTopLeftRadius: 12,
		minHeight: 200
	},
	sliderIndicatorRow: {
		flexDirection: 'row',
		marginBottom: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	sliderIndicator: {
		backgroundColor: '#CECECE',
		height: 4,
		width: 45
	}
});
