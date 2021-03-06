// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button  } from 'react-native';
// import * as Google from 'expo-google-app-auth';
// import * as firebase from "firebase";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-community/google-signin';



// export default class LoginScreen extends Component {
//     state = { user: null };


//     componentDidMount() {
//       this.initAsync();

// GoogleSignin.configure({
//     // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: '5480581104-43v5j8fr7a0qqm5h3k38mqrn1lp9f111.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     // hostedDomain: '', // specifies a hosted domain restriction
//     // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//     // accountName: '', // [Android] specifies an account name on the device that should be used
//     // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   });
//     }

//     signIn = async () => {
//         try {
//           await GoogleSignin.hasPlayServices();
//           const userInfo = await GoogleSignin.signIn();
//         //   this.setState({ userInfo });
//         console.log(userInfo)
//         } catch (error) {
//             console.log(error)
//           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//           } else if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//           } else {
//             // some other error happened
//           }
//         }
//       };

//     initAsync = async () => {
//       await GoogleSignIn.initAsync({
//         // You may ommit the clientId when the firebase `googleServicesFile` is configured
//         clientId: '1:5480581104:android:8f0ffe2aae565d019abf35',
//       });
//       this._syncUserWithStateAsync();
//     };

//     _syncUserWithStateAsync = async () => {
//       const user = await GoogleSignIn.signInSilentlyAsync();
//       this.setState({ user });
//     };

//     signOutAsync = async () => {
//       await GoogleSignIn.signOutAsync();
//       this.setState({ user: null });
//     };

//     signInAsync = async () => {
//       try {
//         await GoogleSignIn.askForPlayServicesAsync();
//         const { type, user } = await GoogleSignIn.signInAsync();
//         if (type === 'success') {
//           this._syncUserWithStateAsync();
//         }
//       } catch ({ message }) {
//         alert('login: Error:' + message);
//       }
//     };

//     onPress = () => {
//       if (this.state.user) {
//         this.signOutAsync();
//       } else {
//         this.signInAsync();
//       }
//     };

//     render() {
//       return 
//       <View style={styles.container}>
//       <Text  onPress={this.onPress}>Toggle Auth</Text>;

// <GoogleSigninButton
//     style={{ width: 192, height: 48 }}
//     size={GoogleSigninButton.Size.Wide}
//     color={GoogleSigninButton.Color.Dark}
//     onPress={this._signIn}
//      />
//       </View>
//     }
// }
//     isUserEqual = (googleUser, firebaseUser) => {
//         if (firebaseUser) {
//             var providerData = firebaseUser.providerData;
//             for (var i = 0; i < providerData.length; i++) {
//                 if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
//                     providerData[i].uid === googleUser.getBasicProfile().getId()) {
//                     // We don't need to reauth the Firebase connection.
//                     return true;
//                 }
//             }
//         }
//         return false;
//     };

//     onSignIn = googleUser => {
//         // We need to register an Observer on Firebase Auth to make sure auth is initialized.
//         var unsubscribe = firebase
//             .auth()
//             .onAuthStateChanged((firebaseUser) => {
//                 unsubscribe();
//                 // Check if we are already signed-in Firebase with the correct user.
//                 if (!this.isUserEqual(googleUser, firebaseUser)) {
//                     // Build Firebase credential with the Google ID token.
//                     var credential = firebase.auth.GoogleAuthProvider.credential(
//                         googleUser.idToken,
//                         googleUser.accessToken
//                     );
//                     // Sign in with credential from the Google user.
//                     firebase
//                         .auth()
//                         .signInWithCredential(credential)
//                         .then(function (result) {
//                             console.log('User Signed In');
//                             if (result.additionalUserInfo.isNewUser) {
//                                 firebase
//                                   .firestore()
//                                   .collection('UserSchedule')
//                                   .doc(result.user.uid)
//                                   .set({
//                                     gmail: result.user.email,
//                                     profile_picture: result.additionalUserInfo.profile.picture,
//                                     first_name: result.additionalUserInfo.profile.given_name,
//                                     last_name: result.additionalUserInfo.profile.family_name,
//                                     created_at: Date.now()
//                                   })
//                                   .then(function(snapshot) {
//                                     // console.log('Snapshot', snapshot);
//                                   });
//                               } else {
//                                 firebase
//                                   .firestore()
//                                   .collection('UserSchedule')
//                                   .doc(result.user.uid)
//                                   .update({
//                                     last_logged_in: Date.now()
//                                   });
//                               }
//                             })
//                         .catch((error) => {
//                             // Handle Errors here.
//                             var errorCode = error.code;
//                             var errorMessage = error.message;
//                             // The email of the user's account used.
//                             var email = error.email;
//                             // The firebase.auth.AuthCredential type that was used.
//                             var credential = error.credential;
//                             // ...
//                         });
//                 } else {
//                     console.log('User already signed-in Firebase.');
//                 }
//             }
//             );
//     };

//     storeData = async (result) => {
//         try {
//           await AsyncStorage.setItem('result', result)
//         } catch (e) {
//           // saving error
//         }
//       }

//     signInWithGoogleAsync = async () => {
//         try {console.log('object1')
//             const result = await Google.logInAsync({
//                 androidClientId: '1:5480581104:android:8f0ffe2aae565d019abf35',
//                 // iosClientId: '147822227184-76da8mmd2ofhblv1mp68ub49pfu38d5g.apps.googleusercontent.com',
//                 // scopes: ['profile', 'email'],

//             });
//             console.log('object2'+result)
//             if (result.type === 'success') {
//                 console.log('object5')
//                 this.onSignIn(result)
//                 console.log('object')
//                 return result.accessToken;
//             } else {
//                 return { cancelled: true };
//             }
//         } catch (e) {
//             return { error: true };
//         }
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Button title='Sign In With Google'
//                     onPress={() => this.signInWithGoogleAsync()} />
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// }
// )

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
  Alert, AsyncStorage
} from 'react-native';
import firebase from "firebase";
import { Input, Button, Icon } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
// import { DrawerActions } from '@react-navigation/native';
// const jumpToAction = DrawerActions.jumpTo('Trang chủ');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

// const BG_IMAGE = require('../../../assets/images/bg_screen4.jpg');


// const   firebaseConfig = {
//   apiKey: "AIzaSyAbahIJoXtcAbDhdVEf2wZed1xCQu-V_aM",
//   authDomain: "todolist-bb687.firebaseapp.com",
//   projectId: "todolist-bb687",
//   storageBucket: "todolist-bb687.appspot.com",
//   messagingSenderId: "5480581104",
//   appId: "1:5480581104:web:9922573abcedfb4f9abf35",
//   measurementId: "G-45HSXVJBM3"
// };


// Enable LayoutAnimation on Android
// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default class LoginScreen3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: true,
      isPasswordValid: true,
      isConfirmationValid: true,
      getProps: []
    };


    this.selectCategory = this.selectCategory.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }


  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }



  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handlePasswordReset = async (values, actions) => {
    // const { email } = this.state

    try {
      console.log('vao day roi')

      var auth = firebase.auth();
      var emailAddress = "trantiendatbk@gmail.com";

      auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        alert('send thanhf cong')

      }).catch(function (error) {
        // An error happened.
      });


      console.log('Password reset email sent successfully')
      Alert.alert(
        "Sending password",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      console.log('da gui den email ' + this.state.email)
    }
    catch (error) {
      actions.setFieldError('general', error.message)
    }
  }


  onLoginSuccess() {
    // const jumpToAction = DrawerActions.jumpTo('Trang chủ');
    this.setState({ loading: false })
    console.log("s")
    Alert.alert(
      "Đăng nhập thành công",
      "Chào mừng " + this.state.email + " đến với trung tâm JavaMaster",
      [
        // {
        //   text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
        //   style: "cancel"
        // }, 
        { text: "OK", }
      ],
      { cancelable: false }
    );

    this.setState({ loading: false })
  }


  onLoginFailure(errorMessage) {
    console.log('loi')
    this.setState({ error: errorMessage, loading: false });
  }
  async signInWithEmail() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          this.onLoginFailure.bind(this)('Weak Password!');
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
  }


  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  login() {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    console.log("vao signi++++++++++++++++++++")
    this.signInWithEmail()
    console.log("vao signi++++++++++++++++++++11")
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 6 || this.passwordInput.shake(),
      });
    }, 1500);
    console.log("object")
  }

  signUp() {
    const { email, password, passwordConfirmation } = this.state;
    this.setState({ isLoading: true });
    // Simulate an API call
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      this.setState({
        isLoading: false,
        isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
        isPasswordValid: password.length >= 6 || this.passwordInput.shake(),
        isConfirmationValid:
          password === passwordConfirmation || this.confirmationInput.shake(),
      });
    }, 1500);
  }

  // componentDidMount(){
  //   const value =  AsyncStorage.getItem('props');
  //   console.log("giá trị là: "+JSON.stringify(value));
  //     if (value !== null) {
  //       this.setState({getProps: JSON.stringify(value)})
  //       console.log("+++"+this.state.getProps);
  //     }
  // }


  // componentDidMount(){
  //   const subscriber = firestore()
  //       .collection('Users')
  //       .doc(userId)
  //       .onSnapshot(documentSnapshot => {
  //         console.log('User data: ', documentSnapshot.data());
  //       });
  //       console.log('asd'+subscriber)
  //     }

  // {
  // const subscriber = firestore()
  // .collection('todo')
  // .doc()
  // .onSnapshot(documentSnapshot => {
  //   console.log('User data: ', documentSnapshot.data());
  // });
  // console.log('objectấd'+subscriber)

  // Stop listening for updates when no longer required
  // return () => subscriber();
  // }, [])
  // }

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;

    return (
      <View style={styles.container}>

        {/* <ImageBackground source={BG_IMAGE} style={styles.bgImage}> */}
        <View>
          <KeyboardAvoidingView
            contentContainerStyle={styles.loginContainer}
            behavior="position"
          >
            <View style={styles.titleContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.titleText}>BEAUX</Text>
              </View>
              <View style={{ marginTop: -10, marginLeft: 10 }}>
                <Text style={styles.titleText}>VOYAGES</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(0)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isLoginPage && styles.selectedCategoryText,
                ]}
                title={'Login'}
              />
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={async () => {
                  // const users = await firestore()
                  //   .collection('Users')
                  //   .get();
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      const userSchedule = firebase
                        .firestore()
                        .collection("todo")
                        .get()
                        .then((querySnapshot) => {
                          querySnapshot.forEach((doc) => {
                            console.log(doc.id, "=>", doc.data().todo);
                          });
                        })
                      // const j = JSON.parse(userSchedule)
                      // firebase.firestore()
                        // .collection('todo')
                        // .doc('ABC')
                        // .get();
                      // console.log('sfas' + j.todo)
                    } else {
                    }
                  });
                }}

                title={'Login'}
              />
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(1)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isSignUpPage && styles.selectedCategoryText,
                ]}
                title={'Sign up'}
              />
            </View>
            <View style={styles.rowSelector}>
              <TabSelector selected={isLoginPage} />
              <TabSelector selected={isSignUpPage} />
            </View>
            <View style={styles.formContainer}>
              <Input
                leftIcon={
                  <Icon
                    name="envelope-o"
                    type="font-awesome"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={{ backgroundColor: 'transparent' }}
                  />
                }
                value={email}
                keyboardAppearance="light"
                autoFocus={false}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                inputStyle={{ marginLeft: 10 }}
                placeholder={'Email'}
                containerStyle={{
                  borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                }}
                ref={(input) => (this.emailInput = input)}
                onSubmitEditing={() => this.passwordInput.focus()}
                onChangeText={(email) => this.setState({ email })}
                errorMessage={
                  isEmailValid ? null : 'Please enter a valid email address'
                }
              />
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="simple-line-icon"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={{ backgroundColor: 'transparent' }}
                  />
                }
                value={password}
                keyboardAppearance="light"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                returnKeyType={isSignUpPage ? 'next' : 'done'}
                blurOnSubmit={true}
                containerStyle={{
                  marginTop: 16,
                  borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                }}
                inputStyle={{ marginLeft: 10 }}
                placeholder={'Password'}
                ref={(input) => (this.passwordInput = input)}
                onSubmitEditing={() =>
                  isSignUpPage ? this.confirmationInput.focus() : this.login()
                }
                onChangeText={(password) => this.setState({ password })}
                errorMessage={
                  isPasswordValid
                    ? null
                    : 'Please enter at least 6 characters'
                }
              />
              {isSignUpPage && (
                <Input
                  icon={
                    <Icon
                      name="lock"
                      type="simple-line-icon"
                      color="rgba(0, 0, 0, 0.38)"
                      size={25}
                      style={{ backgroundColor: 'transparent' }}
                    />
                  }
                  value={passwordConfirmation}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType={'done'}
                  blurOnSubmit={true}
                  containerStyle={{
                    marginTop: 16,
                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                  }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={'Confirm password'}
                  ref={(input) => (this.confirmationInput = input)}
                  onSubmitEditing={this.signUp}
                  onChangeText={(passwordConfirmation) =>
                    this.setState({ passwordConfirmation })
                  }
                  errorMessage={
                    isConfirmationValid
                      ? null
                      : 'Please enter the same password'
                  }
                />
              )}
              <Button
                buttonStyle={styles.loginButton}
                containerStyle={{ marginTop: 32, flex: 0 }}
                activeOpacity={0.8}
                title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                onPress={isLoginPage ? this.login : this.signUp}
                titleStyle={styles.loginTextButton}
                loading={isLoading}
                disabled={isLoading}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={styles.helpContainer}>
            <Button
              title={'Need help ?'}
              titleStyle={{ color: 'white' }}
              buttonStyle={{ backgroundColor: 'transparent' }}
              underlayColor="transparent"
              onPress={() => console.log('Account created')}
            />
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'light',
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
