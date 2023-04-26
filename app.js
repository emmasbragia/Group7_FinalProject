// global variables
let signupbtn = document.querySelector("#signupbtn");
let signup_modal = document.querySelector("#signup_modal");
let signup_modalbg = document.querySelector("#signup_modalbg");
let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");
let homebtn = document.querySelector("#homebtn");
let home = document.querySelector("#home");
let historybtn = document.querySelector("#historybtn");
let history = document.querySelector("#history");
let eventsbtn = document.querySelector("#eventsbtn");
let events = document.querySelector("#events");
let teambtn = document.querySelector("#teambtn");
let team = document.querySelector("#team");
let contactbtn = document.querySelector("#contactbtn");
let contact = document.querySelector("#contact");
let inventorybtn = document.querySelector("#inventorybtn");
let inventory = document.querySelector("#inventory");
let profilebtn = document.querySelector("#profilebtn");
let profile = document.querySelector("#profile");
let addeventbtn = document.querySelector("#addeventbtn");
let event_modal = document.querySelector("#event_modal");
let event_modalbg = document.querySelector("#event_modalbg");
let addboardbtn = document.querySelector("#addboardbtn");
let board_modal = document.querySelector("#board_modal");
let board_modalbg = document.querySelector("#board_modalbg");
let addinvbtn = document.querySelector("#addinvbtn");
let inv_modal = document.querySelector("#inv_modal");
let inv_modalbg = document.querySelector("#inv_modalbg");

// functions

// return HTML element with a given ID
function r_e(id) {
  return document.querySelector(`#${id}`);
}

// configure the message bar
function configure_message_bar(msg) {
  // enforce message bar being visible
  r_e("message_bar").classList.remove("is-hidden");

  r_e("message_bar").innerHTML = msg;

  // hide the message bar
  setTimeout(() => {
    r_e("message_bar").innerHTML = ""; //clear the text from the message bar
    r_e("message_bar").classList.add("is-hidden");
  }, 2000);
}

// configure the message bar
function configure_message_bar(msg) {
  // enforce message bar being visible
  r_e("message_bar").classList.remove("is-hidden");

  r_e("message_bar").innerHTML = msg;

  // hide the message bar
  setTimeout(() => {
    r_e("message_bar").innerHTML = ""; //clear the text from the message bar
    r_e("message_bar").classList.add("is-hidden");
  }, 2000);
}

// configure navigation bar
function configure_nav_bar(user) {
  let signedin = document.querySelectorAll(".signedin");
  let signedout = document.querySelectorAll(".signedout");
  let admin = document.querySelectorAll(".admin");

  // check if user exists
  if (user) {
    // show inventory tab
    db.collection("admin")
      .get()
      .then((res) => {
        let documents = res.docs;
        documents.forEach((doc) => {
          if (doc.data().email.includes(auth.currentUser.email) == true) {
            admin.forEach((link) => {
              link.classList.remove("is-hidden");
            });
          }
        });
      });

    // show all signed in links
    signedin.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    // hide all signed out links
    signedout.forEach((link) => {
      link.classList.add("is-hidden");
    });
  } else {
    // no user (signed out)
    // show all signed out links
    signedout.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    // hide all signed in links
    signedin.forEach((link) => {
      link.classList.add("is-hidden");
    });
    admin.forEach((link) => {
      link.classList.add("is-hidden");
    });
  }
}

// save new data into a collection
function save_event(coll, obj) {
  db.collection(coll)
    .add(obj)
    .then(() => {
      // show notification message to user
      configure_message_bar(`${obj.name} has been added!`);
    });

  // reset the form
  r_e("eventname").value = "";
  r_e("eventdate").value = "";
  r_e("eventtime").value = "";
  r_e("eventlocation").value = "";
  r_e("eventdesc").value = "";
  r_e("event_image").value = "";

  // load data
  // load_data('event', 'event')

  // show the home tab
  home.classList.remove("is-hidden");

  // // hide the events, team, contact, profile and inventory div
  history.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
  profile.classList.add("is-hidden");
}

// sign up  user
r_e("signup_form").addEventListener("submit", (e) => {
  e.preventDefault(); //prevent default behavior of the browser (no page refresh)
  // grab the email and password combination from the form
  let email = r_e("email").value;
  let password = r_e("password").value;

  // call the firebase function to create the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // console.log(`${user.user.email} is now signed in`);
      // show sign up successful message on message bar
      configure_message_bar(`${user.user.email} is now created!`);

      // reset the form
      r_e("signup_form").reset();

      // close the modal
      r_e("signup_modal").classList.remove("is-active");
    })
    .catch((err) => {
      signup_modal.querySelector(".error").innerHTML = err.message;
    });
});

// sign in user
r_e("signin_form").addEventListener("submit", (e) => {
  e.preventDefault(); //prevent default behavior of the browser (no page refresh)
  // grab the email and password combination from the form
  let email = r_e("email_").value;
  let password = r_e("password_").value;

  // call the firebase function to sign in the user
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // console.log(`${user.user.email} is now signed in`);
      // show sign in successful message on message bar
      configure_message_bar(`${user.user.email} is now signed in!`);

      // reset the form
      r_e("signin_form").reset();

      // close the modal
      r_e("signin_modal").classList.remove("is-active");
    })
    .catch((err) => {
      signin_modal.querySelector(".error").innerHTML = err.message;
    });
});

// sign out user
r_e("signoutbtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    configure_message_bar("You signed out successfully!");
  });
  // show the home tab
  home.classList.remove("is-hidden");

  // hide the events, team, contact, profile and inventory div
  history.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
  profile.classList.add("is-hidden");
});

// Add an event
r_e("sbmt_event").addEventListener("click", () => {
  e.preventDefault();
  // grab event details
  let name = r_e("eventname").value;
  let date = r_e("eventdate").value;
  let time = r_e("eventtime").value;
  let location = r_e("eventlocation").value;
  let desc = r_e("eventdesc").value;

  // getting the image ready
  let file = r_e("event_image").files[0];
  // Get current date and time
  const now = new Date();
  // Format the date and time as a string
  const timestamp = `${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
    .getHours()
    .toString()
    .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
  // Use the timestamp in the file name or metadata
  let image = timestamp + "_" + file.name;
  const task = ref.child(image).put(file);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      // the URL of the image is ready now
      // wrap those in an object
      let event = {
        name: name,
        date: date,
        time: time,
        location: location,
        desc: desc,
        url: url,
      };

      db.collection("events")
        .add(event)
        .then(() => {});
      // show notification message to user
      // configure_message_bar(`${event.name} has been added!`)})

      // send the object to firebase
      //  save_event('event', event)
    });
});

auth.onAuthStateChanged((user) => {
  // check if user signed in or out
  if (user) {
    // show user email in navigation bar
    // r_e('user_email').innerHTML = auth.currentUser.email;

    // configure main content column
    // configure_content(user);

    // configure the navigation bar
    configure_nav_bar(user);
  } else {
    // remove user email in navigation bar
    // r_e('user_email').innerHTML = "";

    // configure main content column
    // configure_content();

    // configure the navigation bar
    configure_nav_bar();
  }
});

// sign - up modal link
signupbtn.addEventListener("click", () => {
  signup_modal.classList.add("is-active");
});

signup_modalbg.addEventListener("click", () => {
  signup_modal.classList.remove("is-active");
});

signup_modalb.addEventListener("click", () => {
  signup_modal.classList.remove("is-active");
});

cancel.addEventListener("click", () => {
  signup_modal.classList.remove("is-active");
});

// sign-in modal link
signinbtn.addEventListener("click", () => {
  signin_modal.classList.add("is-active");
});

signin_modalbg.addEventListener("click", () => {
  signin_modal.classList.remove("is-active");
});

signin_modalb2.addEventListener("click", () => {
  signin_modal.classList.remove("is-active");
});

cancel2.addEventListener("click", () => {
  signin_modal.classList.remove("is-active");
});

// event modal link
addeventbtn.addEventListener("click", () => {
  event_modal.classList.add("is-active");
});

event_modalbg.addEventListener("click", () => {
  event_modal.classList.remove("is-active");
});

// board member modal link
addboardbtn.addEventListener("click", () => {
  board_modal.classList.add("is-active");
});

board_modalbg.addEventListener("click", () => {
  board_modal.classList.remove("is-active");
});

// Inventory modal link
addinvbtn.addEventListener("click", () => {
  inv_modal.classList.add("is-active");
});

inv_modalbg.addEventListener("click", () => {
  inv_modal.classList.remove("is-active");
});

// switching between tabs

// home tab
homebtn.addEventListener("click", () => {
  // show the home tab
  home.classList.remove("is-hidden");

  // hide the events, team, contact, profile and inventory div
  history.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
  profile.classList.add("is-hidden");
});

// events tab
eventsbtn.addEventListener("click", () => {
  // show the events tab
  events.classList.remove("is-hidden");

  // hide the home, team, contact, profile and inventory div
  home.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
  profile.classList.add("is-hidden");
});

// team tab
teambtn.addEventListener("click", () => {
  // show the team tab
  team.classList.remove("is-hidden");

  // hide the home, events, contact, profile and inventory div
  home.classList.add("is-hidden");
  events.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
  profile.classList.add("is-hidden");
});

// contact tab
contactbtn.addEventListener("click", () => {
  // show the contact tab
  contact.classList.remove("is-hidden");

  // hide the home, events, team, profile and inventory div
  home.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
  profile.classList.add("is-hidden");
});

// inventory tab
inventorybtn.addEventListener("click", () => {
  // show the inventory tab
  inventory.classList.remove("is-hidden");

  // hide the home, events, team, profile and contact div
  home.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  profile.classList.add("is-hidden");
});

// Profile Section
profilebtn.addEventListener("click", () => {
  // show the inventory tab
  profile.classList.remove("is-hidden");

  // hide the home, events, team, inventory and contact div
  home.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
});

//Events Page = Might need to make cards smaller
db.collection("events")
  .get()
  .then((response) => {
    let docs = response.docs;
    // need to write the id = events into the index.html page
    var eventCreate = document.getElementById("event");
    html = ``;
    docs.forEach((doc) => {
      html += `<div class="column is-6">
            <div class="card ml-0 mb-6 mt-3 has-background-danger-light">
                <div class="card-content">
                  <div class="content">
                    <figure class="image is-320-320">
                      <img src= "${doc.data().url}">
                    </figure>
                    <div class="title mb-2">
                      ${doc.data().name}
                    </div>
                    <div class="mt-3"><b>Date</b>: ${doc.data().date}</div>
                    <div><b>Time</b>: ${doc.data().time}</div>
                    <div class="mb-4"> <b>Location</b>: ${
                      doc.data().location
                    }</div>
                    <b>Description</b>: ${doc.data().desc}
                  </div>
                </div>
            </div>
        </div>`;
    });
    html += `<div class="column is-2 pl-0"></div>`;
    eventCreate.innerHTML += html;

  });




function r_class(clas){
  return document.querySelector(`.${clas}`);
};




// Inventory Page - need to do javascript for buttons
db.collection("Inventory Data")
  .get()
  .then((response) => {
    let docs = response.docs;
    // need to write the id = events into the index.html page
    var InventoryCreate = document.getElementById("inventoryitem");
    html = "";
    docs.forEach((doc) => {
      // + and - buttons need to be figured out
      html += `
        <tr>
            <td><button class="button is-rounded has-background-danger sub">-</button></td>
            <td>${doc.data().Inventory}</td>
            <td>${doc.data().Description}</td>
            <td>${doc.data().Quantity}</td>
            <td><button class="button is is-rounded has-background-danger white sum">+</button></td>
        </tr>`;

      InventoryCreate.innerHTML += html;

        // r_class('sub').addEventListener('click', () => {
        //   doc.data().Quantity -= 1;
        //   html1 =""
        //   html1 += `
        //     <tr>
        //         <td><button class="button is-rounded has-background-danger sub">-</button></td>
        //         <td>${doc.data().Inventory}</td>
        //         <td>${doc.data().Description}</td>
        //         <td>${doc.data().Quantity}</td>
        //         <td><button class="button is is-rounded has-background-danger white sum">+</button></td>
        //     </tr>`;
        //   console.log('subrta')
        //   InventoryCreate.innerHTML += html1;

        // });
        // r_class('sum').addEventListener('click', () => {
        //   doc.data().Quantity += 1;
        //   html += `
        //     <tr>
        //         <td><button class="button is-rounded has-background-danger sub">-</button></td>
        //         <td>${doc.data().Inventory}</td>
        //         <td>${doc.data().Description}</td>
        //         <td>${doc.data().Quantity}</td>
        //         <td><button class="button is is-rounded has-background-danger white sum">+</button></td>
        //     </tr>`;
        // });
    });
    InventoryCreate.innerHTML += html;

  });







// // Add Event to Firestore - NEEDS TO BE TESTED
// let addEvent = document.querySelector('#event_form');

// addEvent.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // event info
//     let eventTitle = document.querySelector('#eventname').value;
//     let eventDescription = document.querySelector('#eventdesc').value;
//     let eventDate = document.querySelector('#eventdate').value;
//     let eventTime = document.querySelector('#eventtime').value;
//     let eventLocation = document.querySelector('#eventlocation').value;

//     // upload an image
//     let eventImage = document.querySelector('#event_image').files[0];
//     let image_ = new Date()+"_"+ eventImage.name;
//     const task = ref.child(image_).put(eventImage);
//     task
//     .then(snapshot => snapshot.ref.getDownloadURL())
//     .then(url => {
//         let HASAevent = {
//         Date: eventDate,
//         Event: eventTitle,
//         Graphic: eventImage,
//         Location: eventLocation,
//         RSVP: "xxx" ,
//         // didnt know what to put for RSVP. Need to add to Event form I think.
//         Time: eventTime
//         };

//         // add event
//         save_data('Events', HASAevent);
//         // load data from firestore
//         load_data('Events');

//     });
//   });




function load_data(coll) {
  // check if we pass all 4 arguments
  let query = db.collection(coll);
  var eventCreate = document.getElementById("event");

  query.get().then(res => {

    // console.log(res.docs);
    let documents = res.docs;

    // html reference
    html = ``;


    // loop through documents array
    documents.forEach(doc => {
      html += `<div class="column is-6">
            <div class="card ml-0 mb-6 mt-3 has-background-danger-light">
                <div class="card-content">
                  <div class="content">
                    <figure class="image is-320-320">
                      <img src= "${doc.data().url}">
                    </figure>
                    <div class="title mb-2">
                      ${doc.data().name}
                    </div>
                    <div class="mt-3"><b>Date</b>: ${doc.data().date}</div>
                    <div><b>Time</b>: ${doc.data().time}</div>
                    <div class="mb-4"> <b>Location</b>: ${doc.data().location}</div>
                    <b>Description</b>: ${doc.data().desc}
                  </div>
                </div>
            </div>
        </div>`;

    })

    // console.log(html)

    // ensure the div is not hidden
    eventCreate.innerHTML += html;


  })
};

// when events tab is clicked, get data from firestore
r_e('events').addEventListener('click', () => {
  load_data('events')
});




// save data

function save_event(coll, obj) {
  db.collection(coll).add(obj).then(() => {
    // reset form
    r_e('event_form').reset()

    // show notification message to the user
    configure_message_bar(`Event added!`);
  })
};




r_e('sbmt_event').addEventListener('click', () => {

  // grab the value of the name box
  let e_name = r_e('eventname').value;

  // grab the value of the date box
  let e_date = r_e('eventdate').value;

  // grab the value of the time box
  let e_time = r_e('eventtime').value;

  // grab the value of the location box
  let e_location = r_e('eventlocation').value;

  // grab the value of the description
  let e_desc = r_e('eventdesc').value;

  // grab the image
  let e_image = r_e('event_image').value;

  // wrap those in an object
  let event = {
    name: e_name,
    date: e_date,
    time: e_time,
    location: e_location,
    desc: e_desc,
    url: e_image,
  };

  console.log(event)
  // send the object to firebase
  // save_event('events', event)

});





