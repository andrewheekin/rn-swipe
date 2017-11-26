import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    // panResponder is its own object, never updated via setState
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true, // executed whenever user taps on the screen
      onPanResponderMove: (event, gesture) => {
        // when a user drags their finger on the screen
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {}, // when a lifts finger off screen
    });
    this.state = { panResponder, position };
  }

  getCardStyle = () => {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }]  // how to rotate a card
    };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View key={item.id} {...this.state.panResponder.panHandlers} style={this.getCardStyle()}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return this.props.renderCard(item);
    });
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

export default Deck;
