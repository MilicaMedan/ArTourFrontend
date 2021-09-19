import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

class VoteComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(rating) {
        var mark = rating;
        var id = this.props.id;
        fetch('http://192.168.100.14:8080/uploadMark', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ this.props.jwt
        },
        body: JSON.stringify({
          id: 0,
          mark: mark,
          user_id: 0,
          post_id: id,
        }),
      }).then((response) => {
          console.log(response.status);
        if (response.status == 200) {
        } 
      });

    }

    render(){
        if(this.props.israted){
            return (<Text style= {{height: 50}}>Rating: {this.props.averageMark}</Text>);
        }else{
            return (
                <AirbnbRating
                    count={5}
                    reviews={["Bad", "OK", "Good","Very Good", "Wow", "Amazing"]}
                    defaultRating={0}
                    size={15}
                    key = {this.props}
                    onFinishRating={(rating) => this.handleClick(rating)}
                    style={{  }}
                />
              );
        }
        
    }
}

export default VoteComponent;
const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%'
      }
  }
  );