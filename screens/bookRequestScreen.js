import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import MyHeader from "../components/myHeader";

export default class BookRequestScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      bookName: "",
      reasonForRequest: "",
    };
  }

   createUniqueId(){
       return Math.random().toString(36).substring(7); 
   }

  addRequest = (bookName, reasonForRequest) => {
    var userId = this.state.userId;
    var randomRequestId = this.createUniqueId();
    db.collection("requested_books").add({
      user_id: userId,
      book_name: bookName,
      reason_for_request: reasonForRequest,
      request_id: randomRequestId,
    });
    this.setState({
      bookName: "",
      reasonForRequest: "",
    });
    return Alert.alert('Book Requested Sucessfully.');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Request Book"  navigation = {this.props.navigation}/>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={styles.formTextInput}
            placeholder={"Enter Book Name"}
            onChangeText={(txt) => {
              this.setState({
                bookName: txt,
              });
            }}
            value={this.state.bookName}
          />

          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            placeholder={"Why do you need the book?"}
            multiline={true}
            numberOfLines={8}
            onChangeText={(txt) => {
              this.setState({
                reasonForRequest: txt,
              });
            }}
            value={this.state.reasonForRequest}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.addRequest(this.state.bookName, this.state.reasonForRequest);
            }}
          >
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    width: "75%",
    height: 35,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#956",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
