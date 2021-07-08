import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

class VoteComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(rating) {  
        console.log(rating);  
        console.log(this.props);

    }

    render(){
        return (
            <AirbnbRating
                count={5}
                reviews={["Bad", "OK", "Good","Very Good", "Wow", "Amazing"]}
                defaultRating={0}
                size={20}
                key = {this.props}
                onFinishRating={(rating) => this.handleClick(rating)}
            />
          );
    }
}

export default VoteComponent;
const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%'
      }
  }
  );