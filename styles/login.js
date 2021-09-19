import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
       // flexDirection: "column",
        backgroundColor: "#D7DBDD",
        alignItems: "center",
        justifyContent: "center"
      },
    image: {
        width: 140,
        height: 140,
        borderRadius: 140/2,
        marginTop: -70,
        alignSelf: "center"
        
    },
    login:{
        width: 400,
        height: 600,
        alignItems: "center",
        backgroundColor : "#424949",
        justifyContent: "center"
      },
    login2:{
        width: 380,
        height: 580,
        backgroundColor : "#D7DBDD"
      },
    loginBtn:{
        width: '100%',
        height:50,
        marginTop: 50,
        alignSelf: "center",
        backgroundColor: '#535757',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center"
    },
    
    
  }
  );