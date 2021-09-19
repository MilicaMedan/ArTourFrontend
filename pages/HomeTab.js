import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView , Button } from 'react-native';
import VoteComponent from '../components/CardComponent';
import { Rating, AirbnbRating } from 'react-native-elements';

import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import { Buffer } from "buffer";
import { useIsFocused } from "@react-navigation/core";


import { connect } from 'react-redux';


function  HomeTab(props)  {
    const [images, setImages] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
        }else {
            return () => {
                setImages(null);
              };
        }
        
    }, [isFocused]);

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
                return response.json();
            }
        }).then((response) => {
            return response;
        });
        
        if(images == null || (images != null && imagess != null && images.length != imagess.length)){
           
            setImages(imagess);
        }
    }

    loadImages();
    

    if(images != null){
       var elements = [];
       for (var i = 0; i < images.length; i++) {
            var nameArray = images[i].name.split(".");
            var dataType = nameArray[nameArray.length - 1];
            if(dataType == "jpg" || dataType == "png" || dataType == "webp"){
                elements.push(
                    <Text key= {images[i].username+''+images[i].id} style={{height: 30, marginTop: 50, marginBottom:5, fontSize: 20, fontWeight: 'bold', color: '#7B7D7D'}}>{images[i].username}</Text>,
                    <Image 
                    key = {images[i].name} 
                    source={{ uri: 'http://192.168.100.14:8080/image/?name='+images[i].name}} 
                    style={{width: 300, height: 300, marginBottom: 0 }} 
                    />,
                    <VoteComponent key = {images[i].id} id = {images[i].id} jwt={props.jwt} israted={images[i].ratedByYou} averageMark = {images[i].averageMark} ></VoteComponent>,

                );
            }else if (dataType == "mp3" || dataType == "ogg" || dataType == "m4a"){
                elements.push(
                    <Text key= {images[i].username+''+images[i].id} style={{height: 30, marginTop: 50, marginBottom:5, fontSize: 20, fontWeight: 'bold', color: '#7B7D7D'}}>{images[i].username}</Text>,
                    <VideoPlayer
                    key = {images[i].name}
                    style={{width: 300, height: 300, marginBottom: 0 }}
                    videoProps={{
                        dataType: "audio/mp3",
                        shouldPlay: false,
                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                        source: {uri: 'http://192.168.100.14:8080/audio/?name='+images[i].name},
                        posterSource: require('../pictures/suncokreti.jpg'),
                        posterStyle: {width: 400, height: 400 }
                    }}
                    />,
                    <VoteComponent key = {images[i].id} id = {images[i].id} jwt={props.jwt} israted={images[i].ratedByYou} averageMark = {images[i].averageMark}></VoteComponent>
                );
            }else if(dataType == "mp4"){
                <Text key= {images[i].username+''+images[i].id} style={{height: 30, marginTop: 50, marginBottom:5, fontSize: 20, fontWeight: 'bold', color: '#7B7D7D'}}>{images[i].username}</Text>,
                elements.push(
                    <VideoPlayer
                    key = {images[i].name}
                    style={{width: 300, height: 300, marginBottom: 0 }}
                    videoProps={{
                        shouldPlay: false,
                        resizeMode: Video.RESIZE_MODE_CONTAIN,
                        source: {uri: 'http://192.168.100.14:8080/video/?name='+images[i].name},
                    }}
                    />,
                    <VoteComponent key = {images[i].id} id = {images[i].id} jwt={props.jwt} israted={images[i].ratedByYou} averageMark = {images[i].averageMark}></VoteComponent>
                );
            }
            
        }
        return (
            <ScrollView  style={styles.container}>
                <View style = {styles.container1}>
                    {elements}
                </View>
            </ScrollView >
        );
    }else {
        return(
            <ScrollView  contentContainerStyle={styles.container}>
                <Text>Loading...</Text>
            </ScrollView >
        );
    }
    
}
const mapStateToProps = (state) => {
    return  { jwt: state.userData.jwt, settings: state.userSettings.settings}
  };
  
export default connect(mapStateToProps)(HomeTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#D7DBDD",
    },
    container1: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#D7DBDD",
        alignItems: 'flex-start',
        marginLeft: 50,
        marginTop: 20
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