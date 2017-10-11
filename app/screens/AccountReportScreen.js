import React, { Component } from 'react';
import { Button, Linking, Text, View, Picker, TextInput } from 'react-native';
import { phonecall, text } from 'react-native-communications';

import styles from '../styles';

export default class AccountReportScreen extends Component {
  constructor() {
    super();
    this.state = {
      status: 'contacted',
      comments: ''
    };
  }
  static navigationOptions = {
    title: 'Account Report'
  };
  saveData(Accountid) {
    const data = [];
    data.push({
      id: Accountid,
      body: this.state.comments,
      status: this.state.status
    });
    return fetch('http://localhost:3000/comments/1', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          //alert("Updated Sucessfully!!! please visit http://localhost:3000/comments/1 and check "); //http://localhost:3000/comments/1

          this.props.navigation.navigate('accountSaveResult');
        }
      })
      .catch(error => {
        alert(
          error +
            ' ' +
            Accountid +
            this.state.comments +
            ' ' +
            this.state.status
        );
      });
  }
  render() {
    const { account } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={[styles.textAlignCenter, styles.marginTop10]}>
          {account.name}
        </Text>
        <View>
          <Picker
            selectedValue={this.state.status}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ status: itemValue })}
          >
            <Picker.Item label="contacted" value="Contacted" />
            <Picker.Item label="cannot be reached" value="Cannot be reached" />
            <Picker.Item label="Busy" value="Busy" />
          </Picker>
          <Text> Comments: </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              margin: 10,
              padding: 10
            }}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => this.setState({ comments: text })}
            value={this.state.text}
          />
        </View>
        <Button title="Save" onPress={() => this.saveData(account.id)} />
      </View>
    );
  }
}
