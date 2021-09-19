import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import {serverUrl} from '../serverSettings/serverSettings'

function  VoteComponent(props)  {
  const [rated, setRated] = useState(props.israted);
  const [averageMark, setAverageMark] = useState(props.averageMark);
    const handleClick = (rating) => {
        var mark = rating;
        var id = props.id;
        fetch(serverUrl+'/uploadMark', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ props.jwt
        },
        body: JSON.stringify({
          id: 0,
          mark: mark,
          user_id: 0,
          post_id: id,
        }),
      }).then((response) => {
        if (response.status == 200) {
          console.log("200");
          return response.json();
        } else {
          return "fail";
        }
      }).then((response) => {
        if(response != "fail"){
          setRated(true);
          setAverageMark(response);
        }
        
      });

    }

        if(rated){
            return (<Text style= {{height: 50}}>Rating: {averageMark}</Text>);
        }else{
            return (
                <AirbnbRating
                    count={5}
                    reviews={["Bad", "OK", "Good","Very Good", "Wow", "Amazing"]}
                    defaultRating={0}
                    size={15}
                    key = {props.id}
                    onFinishRating={(rating) => handleClick(rating)}
                    style={{  }}
                />
              );
        }
        
}

export default VoteComponent;