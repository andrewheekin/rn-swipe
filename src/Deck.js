import React, { Component } from 'react';
import { View, Animated, PanResponder } from 'react-native';

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

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View {...this.state.panResponder.panHandlers} style={this.state.position.getLayout()}>{this.props.renderCard(item)}</Animated.View>
        )
      }

      return this.props.renderCard(item)
    });
  }

  render() {
    return (
      <View >
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
