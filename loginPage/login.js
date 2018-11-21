
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '../dashboard/dashboard.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    
  };


ui.start('#firebaseui-auth-container', uiConfig);














// function handleSignUp() {

//     var email = document.getElementById('inputEmailA').value;
//     var password = document.getElementById('inputPasswordA').value;

//     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log("hello");
//         if (errorCode == 'auth/weak-password') {
//           alert('The password is too weak.');
//         } else {
//           alert(errorMessage);
//         }
//         console.log(error);
        
//     });
// }

// function handleSignIn() {
    
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;

//     if (email.length < 4) {
//         alert('Please enter an email address.');
//         return;
//     }
//     if (password.length < 4) {
//         alert('Please enter a password.');
//         return;
//     }
    
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
        
//         if (errorCode === 'auth/wrong-password') {
//             alert('Wrong password.');
//         } else {
//             alert(errorMessage);
//         };

//         console.log(error);

//     });

// }
  