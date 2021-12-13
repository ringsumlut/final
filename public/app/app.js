// Open Login Form
function openForm() {
  document.getElementById("myForm").style.display = "block";
}
// Close Login Form
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
// Open Cart
function openCart() {
  document.getElementById("myCart").style.display = "block";
}
// Close Cart
function closeCart() {
  document.getElementById("myCart").style.display = "none";
}



var _db = "";
var userExists = false;
var userFullName = "";
var _userProfileInfo = {};


function initFirebase() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      _db = firebase.firestore();
      console.log("Auth Change: Logged In");
      userExists = true;
      userFullName = user.displayName;
      $("#loginBtn").addClass("hidden");
      $("#logoutBtn").removeClass("hidden");
    } else {
      _db = "";
      _userProfileInfo = {};
      console.log("Auth Change: Logged out");
      userExists = false;
      userFullName = "";
      $("#loginBtn").removeClass("hidden");
      $("#logoutBtn").addClass("hidden");

    }
  })
}


function signOut() {
  firebase.auth().signOut()
    .then(() => {
      console.log("signed out");
      location.hash = "home";
      Swal.fire(
        'You are Logged Out',
        'Come back soon!',
        'success'
      );
    })
    .catch((error) => {
      console.log("error signing out");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error Signing Out'
      });
    });
}


function createAccount() {
  console.log('Create');
  let fName = $("#signUpFName").val();
  let lName = $("#signUpLName").val();
  let email = $("#signUpEmail").val();
  let pass = $("#signUpPass").val();
  let fullName = fName + " " + lName;
  let userObj = {
    firstName: fName,
    lastName: lName,
    email: email,
    recipes: [],
  };

  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("Usesr Created");


      firebase.auth().currentUser.updateProfile({
        displayName: fullName,
      });

      _db.collection("Users").doc(user.uid).set(userObj).then((doc) => {
        console.log('doc added');
        _userProfileInfo = userObj;
        console.log("create userinfo ", _userProfileInfo);
      })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("error adding doc " + errorMessage);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error! Try again.'
          });
        });

      $("#signUpFName").val("");
      $("#signUpLName").val("");
      $("#signUpEmail").val("");
      $("#signUpPass").val("");
      userFullName = fullName;


      Swal.fire(
        'Welcome!'
      );
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("create error " + errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error! Try Again.'
      });
    });
}

function login() {
  let email = $("#loginEmail").val();
  let pass = $("#loginPass").val();
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      var user = userCredential.user;
      console.log("Successfully Signed In");
      $("#loginEmail").val("");
      $("#loginPass").val("");
      Swal.fire(
        "Successfully Signed In"
      );

      _db.collection("Users").doc(user.uid).get().then((doc) => {
        console.log(doc.data());
        _userProfileInfo = doc.data();
        console.log("login userinfo ", _userProfileInfo);
      })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("error retrieving user data " + errorMessage);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Data'
          });
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("login error " + errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error logging in, Try again.'
      });
    });
}

