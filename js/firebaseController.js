

var db;

  app.fireConfig = {
    apiKey: "AIzaSyA6ZNEl3KaepALyrN3GxioCNxvUzsDtbYo",
    authDomain: "for-lgd-schedule.firebaseapp.com",
    databaseURL: "https://for-lgd-schedule.firebaseio.com",
    projectId: "for-lgd-schedule",
    storageBucket: "for-lgd-schedule.appspot.com",
    messagingSenderId: "848626933775"
  };


$(".loadingText").text('Initializing...')
firebase.initializeApp(app.fireConfig);
  // db = firebase.firestore(); 

firebase.firestore().enablePersistence()
  .then(function() {
  // db = firebase.firestore(); 
  $(".loadingText").text('All set');
    // callback();
  })  

function Node(resName, duration) {
  this.resName = resName;
  // this.resType = resType;
  this.duration = duration;
  this.next = null;
}

var CircularList = function() {
  this._length = 0;
  this.head = null;
  this.pHead = null;
}

CircularList.prototype.add = function(resName, duration){
  var new_node = new Node(resName, duration);
  if(this.head==null)
  {
    new_node.next = new_node;
    this.head = new_node;
  }
  else
  {
    var currentNode = this.head;
    while(currentNode.next!=this.head)
    {
      currentNode = currentNode.next;
    }
    currentNode.next = new_node;
    new_node.next = this.head;
  }
};

CircularList.prototype.deleteList = function(){
  this.head = null;
  this.pHead = null;
};

CircularList.prototype.getNextNode = function(){
  if(this.head==null)
    return {};
  var nextNode = {};
  if(this.pHead==null)
  {
    this.pHead = this.head;
  }
  nextNode['resName'] = this.pHead.resName;
  // nextNode['resType'] = this.pHead.resType;
  nextNode['duration'] = this.pHead.duration;
  this.pHead = this.pHead.next;
  return nextNode;
};



var firstll = new CircularList();
var secondll = new CircularList();
var secondllSH1 = new CircularList();
var secondllSH2 = new CircularList();
// var thirdllSH1 = new CircularList();
// var thirdllSH2 = new CircularList();
// var thirdll = new CircularList();
var fourthll = new CircularList();

app.checkIfUserIsLoggedIn = function(){
  return app.isuserloggedin;
}


function getFileBasedOnTime(channel,time,callback){
  // console.log(channel + ' is in queue.....')


  var format = 'hh:mm_A'
  var time = moment(new Date(time),format),
  sh1BeforeTime = moment('09:00', format),
  sh1AfterTime = moment('14:00', format);

  sh2BeforeTime = moment('14:00', format),
  sh2AfterTime = moment('18:00', format);
  if (time.isBetween(sh1BeforeTime, sh1AfterTime)) {
    if(channel == "ch2_p") channel = 'ch2_sh1'
    // if(channel == "ch3_p") channel = 'ch3_sh1'
  }
  if (time.isBetween(sh2BeforeTime, sh2AfterTime)) {
    if(channel == "ch2_p") channel = 'ch2_sh2';
    // if(channel == "ch3_p") channel = 'ch3_sh2';
  }  

  time = moment(time).format('DD-MM-YYYY_hh:mm_A')
  // if(!app.checkIfUserIsLoggedIn()){
  //   app.authorizeUser();
  // }
  docRef = firebase.firestore().collection(channel).doc(app.groupName).collection('data').doc(time);

  if(channel == "ch2_p" || channel == "fs")// || channel == "ch3_p")
    docRef = firebase.firestore().collection(channel).doc(app.groupName).collection('data').doc(time.split("_")[1]);

  if(channel == "ch2_sh1" || channel == "ch2_sh2")// || channel == "ch3_sh1" || channel == 'ch3_sh2')
      docRef = firebase.firestore().collection(channel).doc(app.groupName).collection('data');
  


  // if(channel == "ch2_p" || channel == "ch3_p")
  //   docRef = firebase.firestore().collection(channel).doc(app.groupName).collection('data').doc(time);

  if(channel == "ticker")
      docRef = firebase.firestore().collection(channel).doc(app.groupName)

  
  docRef.get().then(function(doc) {
  // console.log(channel + ' processed.....')
      var nextFile = {};
      if (doc.exists) {
          console.log("Got New Planned data for " + channel);
          nextFile = doc.data();

          if(channel == 'ch1_p'){
            $(".ovalWrapper").hide();
          }
          if(channel == 'ch2_sh1'){
            nextFile = secondllSH1.getNextNode();
          }

          if(channel == 'ch2_sh2'){
            nextFile = secondllSH2.getNextNode();
          }

          // if(channel == 'ch3_sh1'){
          //   nextFile = thirdllSH1.getNextNode();
          // }

          // if(channel == 'ch3_sh2'){
          //   nextFile = thirdllSH2.getNextNode();
          // }


      }else if(doc.docs && doc.docs[0]){
        nextFile = doc.docs[0].data();
        if(channel == 'ch2_sh1'){
            nextFile = secondllSH1.getNextNode();
          }

          if(channel == 'ch2_sh2'){
            nextFile = secondllSH2.getNextNode();
          }

          // if(channel == 'ch3_sh1'){
          //   nextFile = thirdllSH1.getNextNode();
          // }

          // if(channel == 'ch3_sh2'){
          //   nextFile = thirdllSH2.getNextNode();
          // }

      } else {
          console.log("Got default planned data for " + channel);
          if(channel == "ch1_p")
          {
            $(".ovalWrapper").show();
            nextFile = firstll.getNextNode();
          }
          else if(channel == "ch2_p")
          {
            nextFile = {resName:"../advt/default.png"};
          }
          // else if(channel == "ch3_p")
          // {
          //   nextFile = {resName:"../advt/default.png"};
          // }
          if(channel == 'ch2_sh1'){
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch2_sh2'){
            nextFile = {resName:"../advt/default.png"};
          }

          // if(channel == 'ch3_sh1'){
          //   nextFile = {resName:"../advt/default.png"};
          // }

          // if(channel == 'ch3_sh2'){
          //   nextFile = {resName:"../advt/default.png"};
          // }
          else if(channel == "ticker")
          {
            nextFile = {startTime : time,text:"WELCOME TO LETSGODIGI"};
          }
      }
      callback(nextFile);
  }).catch(function(error) {
      nextFile = {};
      if(error.message == "Failed to get document because the client is offline."){
          if(channel == "ch1_p")
          {
            nextFile = firstll.getNextNode();
          }
          else if(channel == "ch2_p")
          {
            nextFile = {resName:"../advt/default.png"};
          }
          // else if(channel == "ch3_p")
          // {
          //   nextFile = {resName:"../advt/default.png"};
          // }
          if(channel == 'ch2_sh1'){
            nextFile = {resName:"../advt/default.png"};
          }

          if(channel == 'ch2_sh2'){
            nextFile = {resName:"../advt/default.png"};
          }

          // if(channel == 'ch3_sh1'){
          //   nextFile = {resName:"../advt/default.png"};
          // }

          // if(channel == 'ch3_sh2'){
          //   nextFile = {resName:"../advt/default.png"};
          // }
          else if(channel == "ticker")
          {
            nextFile = {startTime : time,text:"WELCOME TO PRATEEK LAUREL"};
          }
          callback(nextFile);
      }
      console.log("Error getting document:", error);
  });
}

// function checkInternetConnection(callback){
//   $.ajax({
//     url:"https://reqres.in/api/users",
//     complete : function(jqxhr,status) {
//       if(status == "success") callback(true)
//         else callback(false)
//     }
//   })
// }

// function initializeFirebase(){
//   // firebase.initializeApp(app.config);
//   checkInternetConnection(function(ifavailable){
//     // if(ifavailable){
//       $(".loadingText").text('Authorizing...')
//      //  firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){    
//      //      $(".loadingText").text('Authorization success');
//       //    app.isuserloggedin = true;
//      //      firebase.firestore().enablePersistence()
//       //    .then(function() {
//      //      $(".loadingText").text('Setting up data...')
//      //      db = firebase.firestore(); 
//      //      callback();
//       //    })
//       //    .catch(function(err) {
//       //      if (err.code == 'failed-precondition') {
//       //      alert("Cannot open multiple tabs");
//       //      } else if (err.code == 'unimplemented') {
//       //      alert("Browser does not support");
//       //      }
//       //    });
//       // }).catch(function(error){
//       //  var errorCode = error.code;
//       //  var errorMessage = error.message;
//       //  console.log("Error : " + errorCode +  " === Message : " + errorMessage);
//      //    if(errorMessage == "A network error (such as timeout, interrupted connection or unreachable host) has occurred."){
//           // firebase.firestore().enablePersistence()
//           //   .then(function() {
//           //   db = firebase.firestore(); 
//           //     // callback();
//           //   })
//      //    }
//       // });
//     // }else{
//       $(".loadingText").text('Going offline...');
//       // firebase.firestore().enablePersistence()
//       //   .then(function() {
//       //   // db = firebase.firestore(); 
//       //     // callback();
//       //   })
//     // }
//   })
// }

// function ifFirebaseIsEstablished(){
//   if(!firebase.firestore()) return false
//   else{
//     firebase.firestore().collection('campaigns').get().then(function(snapshot){ 
//       console.log("database established");
//     }).catch(function(err){
//       console.log(err);
//     })
//     return true;
//   }
// }

// function getCampaignFromFirebase(time,callback){
//   time = moment(time).format('YYYY-MM-DD')
//   if(!app.checkIfUserIsLoggedIn()){
//     firebase.auth().signInWithEmailAndPassword("lgd.prateeklaurel.slave@gmail.com", "LGDsl@ve").then(function(data){
//       console.log('signed in')
//       app.isuserloggedin = true;
//     }).catch(function(err){
//             console.log(err)
//           })
//   }
//   docRef = db.collection('campaigns').doc(app.groupName).collection('data').doc(time);
//   docRef.get().then(function(doc) {
//       if (doc.exists) {
//           callback(doc.data())
//       } else {
//           callback({})
//       }
//   }).catch(function(error) {
//       if(error.message == "Failed to get document because the client is offline."){
//           callback({})
//       }
//       console.log("Error getting document:", error);
//   });
// }

// function getVideoFromFirebase(time,callback){

//   if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
//     app.ifLoginRequested = true;
//     app.authorizeUser();

//   }
//   callbackData = {};
//   time = moment(time).format('YYYY-MM-DD_HH:mm')
//   docRef = firebase.firestore().collection('fv_p').doc(app.groupName).collection('data').doc(time)

//   docRef.get().then(function(doc) {
//       if (doc.exists) {
//           console.log("Received VIDEO request...=>");
//           callbackData.data = doc.data();
//           callbackData.type = "video"
//           callback(callbackData)
//       } else {
//           callback({})
//       }
//   }).catch(function(error) {
//     if(error.message == "Failed to get document because the client is offline."){
//           callback({})
//       }
//       console.log("Error getting document:", error);
//   });
// }

function getSOSFromFirebase(time,callback){
  if(!app.checkIfUserIsLoggedIn() && !app.ifLoginRequested){
    app.ifLoginRequested = true;
    app.authorizeUser();
  }
  callbackData = {};
  time = moment(time).format('DD-MM-YYYY_hh:mm_A')
  docRef = firebase.firestore().collection('sos').doc(app.groupName).collection('data').doc(time)

  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Received SOS request...=>");
          callbackData.data = doc.data();
          callbackData.type = "sos"
          callback(callbackData)
      } else {
          callback({})
      }
  }).catch(function(error) {
      if(error.message == "Failed to get document because the client is offline."){
          callback({})
      }
      console.log("Error getting document:", error);
  });
}