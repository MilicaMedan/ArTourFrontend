import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import HomeTab from './HomeTab';
import ProfileTab from './ProfileTab';
import AddTab from './AddTab';
import HeaderComponent from '../components/HeaderComponent';

import { connect } from 'react-redux';


class Main extends Component {
  constructor(props) {
    super();
  }
  static navigationOptions = {
    headerShown: false,
  };
    render(){
        return (
          <View style= {{height:'100%',flexDirection: "column"}}>
            <HeaderComponent/>
            <AppTabsScreen/>
          </View>
            
          );
    }
}

const AppTabs = createBottomTabNavigator();
const AppTabsScreen = () => (
  <AppTabs.Navigator 
  
  tabBarOptions={{ showLabel:false, activeBackgroundColor:"#D7DBDD", inactiveBackgroundColor:"#F8C471"}}>
    <AppTabs.Screen
      name="HomeTab"
      component={HomeTab}
      options={{
        tabBarIcon: (props) => (
          <Ionicons name="md-home" size={33} color="#535757" />
        ),
      }}
    />
    <AppTabs.Screen
      name="AddTab"
      component={AddTab}
      options={{
        tabBarIcon: (props) => (
          <Ionicons name="md-add-circle-sharp" size={44} color="#535757" />
        ),
      }}
    />
     <AppTabs.Screen
      name="ProfileTab"
      component={ProfileTab}
      options={{
        tabBarIcon: (props) => (
            <FontAwesome name="user-circle-o" size={33} color="#535757" />
        ),
      }}
    />
  </AppTabs.Navigator>
);


export default connect() (Main);