import React, { Component } from 'react';
import { Button, Linking, Text, View, Picker, TextInput } from 'react-native';
import { phonecall, text } from 'react-native-communications';

import styles from '../styles';

export default class AccountSaveResult extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      comment: '',
      status: ''
    };
  }
  static navigationOptions = {
    title: 'Saved results'
  };
  componentWillMount() {
    fetch('http://localhost:3000/comments/1')
      .then(results => {
        return results.json();
      })
      .then(data => {
        //console.log(data[0].body);
        this.setState({
          id: data[0].id,
          comment: data[0].body,
          status: data[0].status
        });
      });
  }
  render() {
    // const { account } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>Saved Result is: </Text>
        <Text>Id: {this.state.id}</Text>
        <Text>Status: {this.state.status}</Text>
        <Text>Comment: {this.state.comment}</Text>
      </View>
    );
  }
}
