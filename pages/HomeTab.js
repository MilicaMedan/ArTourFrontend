import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView , Button } from 'react-native';
import VoteComponent from '../components/CardComponent';
import { Rating, AirbnbRating } from 'react-native-elements';

import { connect } from 'react-redux';

function  HomeTab(props)  {
    const [images, setImages] = useState(null);



    const loadImages = async () => {
        var imagess = await fetch(
            'http://192.168.100.14:8080/getPosts',
            {
                method: 'GET',
                headers: {
                'Authorization': 'Bearer '+ props.jwt
                }
            }
        ).then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        }).then((response) => {
            return response;
        });
        if(images == null){
            setImages(imagess);
        }
    }
    
    loadImages();

    if(images != null){
       var elements = [];
       for (var i = 0; i < images.length; i++) {
            elements.push(
                //<View style={styles.card}  key = {images[i].name+'imgg'}>
                    <Image key = {images[i].name+'img'} source={{ uri: 'data:image/png;base64,'+images[i].base64}} style={{width: 200, height: 200 }} />,
                    <VoteComponent key = {images[i].name} props = {images[i].name} style={{width: 50, height: 10 }}></VoteComponent>
               // </View>
            );
        }

        return (
            <ScrollView  style={styles.container}>
                {elements}
            </ScrollView >
        );
    }else {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    
}
const mapStateToProps = (state) => {
    return  { jwt: state.userData.jwt}
  };
  
export default connect(mapStateToProps)(HomeTab)

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#D7DBDD",
    },
    card: {
        backgroundColor: "#FDFEFE",
        height : 300,
        width : "100%"
        },
    loginBtn:{
        width: "100%",
        height:50,
        marginTop: 50,
        alignSelf: "center",
        backgroundColor: "#535757",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
  }
  );