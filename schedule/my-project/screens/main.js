import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import firebase from "firebase";
import Note from './note';

export default class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            noteArray: [],
            noteText: ''
        }
    }
componentDidMount(){
    var date = new Date();

    // this.state.noteArray.push({
    //    'date' : date.getFullYear()+
    //    '/' +(date.getMonth() + 1)+
    //    '/' + date.getDate(),
    //    'note':this.state.noteText
    // });

    this.setState({noteArray: this.state.noteArray});
    // this.setState({noteText:this.state.noteText});

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userSchedule = firebase
            .firestore()
            .collection("todo")
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data().todo);
                this.setState({
                    noteText:doc.data().todo
                })
                this.state.noteArray.push({
                    'date' : date.getFullYear()+
                    '/' +(date.getMonth() + 1)+
                    '/' + date.getDate(),
                    'note':this.state.noteText
                 });
             
                // this.state.noteArray.push({todo:doc.data().todo})
                console.log('object')
              });
            //   console.log('object+'+JSON.stringify(this.state.noteArray[0]))
            })
          // const j = JSON.parse(userSchedule)
          // firebase.firestore()
            // .collection('todo')
            // .doc('ABC')
            // .get();
          console.log('sfas' )
        } else {
        }
      });
}
    render() {

        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                deleteMethod={() => this.deleteNote(key)}
            />
        })


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>ToDo</Text>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({ noteText })}
                        value={this.state.noteText}
                        placeholder='Task'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>
                </View>

                <TouchableOpacity onPress={this.addTask.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>

            </View>
        );
    }
    addTask() {
        if (this.state.noteText) {
            var date = new Date();

            this.state.noteArray.push({
               'date' : date.getFullYear()+
               '/' +(date.getMonth() + 1)+
               '/' + date.getDate(),
               'note':this.state.noteText
            });

            this.setState({noteArray: this.state.noteArray});
            this.setState({noteText:this.state.noteText});
            firebase.firestore()
  .collection('todo')
  .add({
    todo: this.state.noteText,
    // age: 30,
  })
  .then(() => {
      alert('user added')
    // console.log('User added!');
  });
        }

    }

    deleteNote(key){
        this.state.noteArray.splice(key,1);
        this.setState({noteArray:this.state.noteArray});
        firebase.firestore()
  .collection('todo')
  .delete()
  .then(() => {
    alert('User deleted!');
  });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#3933FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#3933FF',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    },
});
