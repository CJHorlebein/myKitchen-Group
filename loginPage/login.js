
var ui = new firebaseui.auth.AuthUI(firebase.auth());

//Firebase pre-built ui for authentication.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  //Control-flow for sign in options. We only used Google for simplicity.
  signInFlow: 'popup',
  signInSuccessUrl: '../dashboard/dashboard.html',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
    
};


ui.start('#firebaseui-auth-container', uiConfig);


function signOut(){
  firebase.auth().signOut()
      .then(function(){
          alert("You have signed out.");
          window.location="../";
      }).catch(function(error) {
          alert("Something went Wrong!");
      });
}
  