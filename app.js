// global variables
let signupbtn = document.querySelector("#signupbtn");
let signup_modal = document.querySelector("#signup_modal");
let signup_modalbg = document.querySelector("#signup_modalbg");
let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");
let homebtn = document.querySelector("#homebtn");
let home = document.querySelector("#home");
let eventsbtn = document.querySelector("#eventsbtn");
let events = document.querySelector("#events");
let teambtn = document.querySelector("#teambtn");
let team = document.querySelector("#team");
let contactbtn = document.querySelector("#contactbtn");
let contact = document.querySelector("#contact");
let inventorybtn = document.querySelector("#inventorybtn");
let inventory = document.querySelector("#inventory");
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

//Load data for events
function load_events() {
  db.collection("events")
    .get()
    .then((response) => {
      let docs = response.docs;
      //
      var eventCreate = document.getElementById("event");
      html = ``;
      docs.forEach((doc) => {
        html += `<div class="column is-6 mb-2">
            <div class="card ml-0 mb-6 mt-3 has-background-warning-light">
                <div class="card-content">
                  <div class="content">
                    <figure class="image is-320-320">
                      <img src= "${doc.data().url}">
                    </figure>`;
        // check if user email for current user matches email stored on the document
        if (auth.currentUser.email == doc.data().user_email) {
          html += `<div class="title mb-2">
                        ${doc.data().name}
                        <button class="is-pulled-right button is-dark ml-1" onclick="del_doc('events',
                        '${
                          doc.id
                        }')"><i class="fa-solid fa-trash-can"></i></button>
                      </div>`;
        } else {
          html += `<div class="title mb-2">
                        ${doc.data().name}
                      </div>`;
        }

        html += `<div class="mt-3"><b>Date</b>: ${doc.data().date}</div>
                    <div><b>Time</b>: ${doc.data().time}</div>
                    <div> <b>Location</b>: ${doc.data().location}</div>
                    <div class="mb-4"><b>Link to RSVP: </b><a href=${
                      doc.data().rsvp
                    }" target="_blank">RSVP</a></div>
                    <b>Description</b>: ${doc.data().desc}
                  </div>
                </div>
            </div>
        </div>`;
      });
      html += `<div class="column is-2 pl-0"></div>`;
      eventCreate.innerHTML += html;
    });
}

// delete document from a collection
function del_doc(coll, id) {
  db.collection(coll)
    .doc(id)
    .delete()
    .then(() => {
      // show a message on the message bar
      configure_message_bar("Deleted!");
      // load all data
      if (coll == "events") {
        load_events();
      } else if (coll == "BoardMembers") {
        load_board();
      }
    });
}

// save new data into a collection
function save_event(coll, obj) {
  db.collection(coll)
    .add(obj)
    .then(() => {
      // show notification message to user
      // configure_message_bar(`${obj.name} has been added!`);
    });

  // reset the form
  r_e("eventname").value = "";
  r_e("eventdate").value = "";
  r_e("eventtime").value = "";
  r_e("eventlocation").value = "";
  r_e("rsvp").value = "";
  r_e("eventdesc").value = "";
  r_e("event_image").value = "";

  //hide the event modal tab
  document.querySelector("#event_modal").classList.add("is-hidden");

  // load data
  load_events();
}

//Load data for board members
function load_board() {
  db.collection("BoardMembers")
    .get()
    .then((response) => {
      let docs = response.docs;
      var internal = document.getElementById("internal");
      var external = document.getElementById("external");
      var finance = document.getElementById("finance");
      var liaison = document.getElementById("liaisons");
      html = ``;
      ehtml = ``;
      fhtml = ``;
      lhtml = ``;
      docs.forEach((doc) => {
        if (doc.data().committee == "Internal Committee") {
          html += `<div class="card ml-0 mb-5 mt-3 mr-5 has-background-success-light">
        <div class="card-content">
          <div class="content">
            <figure class="image is-320-320">
              <img src="${doc.data().url}">
            </figure>`;
          // check if user email for current user matches email stored on the document
          if (auth.currentUser.email == doc.data().user_email) {
            html += `<div class="title mb-2">
                ${doc.data().name}
                <button class="is-pulled-right button is-dark ml-1" onclick="del_doc('BoardMembers',
                '${doc.id}')"><i class="fa-solid fa-trash-can"></i></button>
              </div>`;
          } else {
            html += `<div class="title mb-2">
                ${doc.data().name}
              </div>`;
          }
          html += `<div class="mt-3"><b>Position</b>: ${
            doc.data().position
          }</div>
            <div><b>Major(s)</b>: ${doc.data().major}</div>
            <div><b>Minor(s)</b>: ${doc.data().minor}</div>
            <div><b>Hometown</b>: ${doc.data().town}</div>
            <div><b>Year</b>: ${doc.data().year}</div>
          </div>
        </div>
      </div>`;
          // internal.innerHTML += html;
        } else if (doc.data().committee == "External Committee") {
          ehtml += `<div class="card ml-0 mb-5 mt-3 mr-5 has-background-success-light">
        <div class="card-content">
          <div class="content">
            <figure class="image is-320-320">
              <img src="${doc.data().url}">
            </figure>`;
          // check if user email for current user matches email stored on the document
          if (auth.currentUser.email == doc.data().user_email) {
            ehtml += `<div class="title mb-2">
                        ${doc.data().name}
                        <button class="is-pulled-right button is-dark ml-1" onclick="del_doc('BoardMembers',
                        '${
                          doc.id
                        }')"><i class="fa-solid fa-trash-can"></i></button>
                      </div>`;
          } else {
            ehtml += `<div class="title mb-2">
                        ${doc.data().name}
                      </div>`;
          }
          ehtml += `<div class="mt-3"><b>Position</b>: ${
            doc.data().position
          }</div>
            <div><b>Major(s)</b>: ${doc.data().major}</div>
            <div><b>Minor(s)</b>: ${doc.data().minor}</div>
            <div><b>Hometown</b>: ${doc.data().town}</div>
            <div><b>Year</b>: ${doc.data().year}</div>
          </div>
        </div>
      </div>`;
          // external.innerHTML += ehtml;
        } else if (doc.data().committee == "Finance Committee") {
          fhtml += `<div class="card ml-0 mb-5 mt-3 mr-5 has-background-success-light">
        <div class="card-content">
          <div class="content">
            <figure class="image is-320-320">
              <img src="${doc.data().url}">
            </figure>`;
          // check if user email for current user matches email stored on the document
          if (auth.currentUser.email == doc.data().user_email) {
            fhtml += `<div class="title mb-2">
                        ${doc.data().name}
                        <button class="is-pulled-right button is-dark ml-1" onclick="del_doc('BoardMembers',
                        '${
                          doc.id
                        }')"><i class="fa-solid fa-trash-can"></i></button>
                      </div>`;
          } else {
            fhtml += `<div class="title mb-2">
                        ${doc.data().name}
                      </div>`;
          }
          fhtml += `<div class="mt-3"><b>Position</b>: ${
            doc.data().position
          }</div>
            <div><b>Major(s)</b>: ${doc.data().major}</div>
            <div><b>Minor(s)</b>: ${doc.data().minor}</div>
            <div><b>Hometown</b>: ${doc.data().town}</div>
            <div><b>Year</b>: ${doc.data().year}</div>
          </div>
        </div>
      </div>`;
          // finance.innerHTML += fhtml;
        } else if (doc.data().committee == "Liaisons") {
          lhtml += `<div class="card ml-0 mb-5 mt-3 mr-5 has-background-success-light">
        <div class="card-content">
          <div class="content">
            <figure class="image is-320-320">
              <img src="${doc.data().url}">
            </figure>`;
          // check if user email for current user matches email stored on the document
          if (auth.currentUser.email == doc.data().user_email) {
            lhtml += `<div class="title mb-2">
                        ${doc.data().name}
                        <button class="is-pulled-right button is-dark ml-1" onclick="del_doc('BoardMembers',
                        '${
                          doc.id
                        }')"><i class="fa-solid fa-trash-can"></i></button>
                      </div>`;
          } else {
            lhtml += `<div class="title mb-2">
                        ${doc.data().name}
                      </div>`;
          }
          lhtml += `<div class="mt-3"><b>Position</b>: ${
            doc.data().position
          }</div>
            <div><b>Major(s)</b>: ${doc.data().major}</div>
            <div><b>Minor(s)</b>: ${doc.data().minor}</div>
            <div><b>Hometown</b>: ${doc.data().town}</div>
            <div><b>Year</b>: ${doc.data().year}</div>
          </div>
        </div>
      </div>`;
          // liaison.innerHTML += lhtml;
        }
      });
      internal.innerHTML = html;
      external.innerHTML = ehtml;
      finance.innerHTML = fhtml;
      liaison.innerHTML = lhtml;

      docs = [];
    });
}
// save new member into a collection
function save_board(coll, obj) {
  db.collection(coll)
    .add(obj)
    .then(() => {
      // show notification message to user
      // configure_message_bar(`${obj.name} has been added!`);
    });

  // reset the form
  r_e("boardname").value = "";
  r_e("boardposition").value = "";
  r_e("boardmajor").value = "";
  r_e("boardminor").value = "";
  r_e("boardtown").value = "";
  r_e("boardyear").value = "";
  r_e("board_image").value = "";
  r_e("boardcommittee").value = "";

  //hide the board modal tab
  document.querySelector("#board_modal").classList.add("is-hidden");

  // load data
  load_board();
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

  // hide the events, team, contact and inventory div
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
});

// Add an event
r_e("sbmt_event").addEventListener("click", () => {
  // grab event details
  let name = r_e("eventname").value;
  let date = r_e("eventdate").value;
  let time = r_e("eventtime").value;
  let location = r_e("eventlocation").value;
  let rsvp = r_e("rsvp").value;
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
        rsvp: rsvp,
        desc: desc,
        url: url,
        user_email: auth.currentUser.email,
      };

      // send the object to firebase
      save_event("events", event);
    });
});

// Add a board member
r_e("sbmt_board").addEventListener("click", () => {
  // grab board details
  let name = r_e("boardname").value;
  let position = r_e("boardposition").value;
  let major = r_e("boardmajor").value;
  let minor = r_e("boardminor").value;
  let town = r_e("boardtown").value;
  let year = r_e("boardyear").value;
  let committee = r_e("boardcommittee").value;

  // getting the image ready
  let file = r_e("board_image").files[0];
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
      let member = {
        name: name,
        position: position,
        committee: committee,
        major: major,
        minor: minor,
        town: town,
        year: year,
        url: url,
        user_email: auth.currentUser.email,
      };

      // send the object to firebase
      save_board("BoardMembers", member);
    });
});

auth.onAuthStateChanged((user) => {
  // check if user signed in or out
  if (user) {
    // show user email in navigation bar
    r_e("user_email").innerHTML = auth.currentUser.email;

    // configure the navigation bar
    configure_nav_bar(user);
  } else {
    // remove user email in navigation bar
    r_e("user_email").innerHTML = "";

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

r_e("signup_modalb2").addEventListener("click", () => {
  signup_modal.classList.remove("is-active");
});

r_e("cancel").addEventListener("click", () => {
  signup_modal.classList.remove("is-active");
});

// sign-in modal link
signinbtn.addEventListener("click", () => {
  signin_modal.classList.add("is-active");
});

signin_modalbg.addEventListener("click", () => {
  signin_modal.classList.remove("is-active");
});

r_e("signin_modalb2").addEventListener("click", () => {
  signin_modal.classList.remove("is-active");
});

r_e("cancel2").addEventListener("click", () => {
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

// switching between tabs

// home tab
homebtn.addEventListener("click", () => {
  // show the home tab
  home.classList.remove("is-hidden");

  // hide the events, team, contact and inventory div

  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
});

// events tab
eventsbtn.addEventListener("click", () => {
  // show the events tab
  events.classList.remove("is-hidden");

  // load events
  load_events();

  // hide the home, team, contact and inventory div
  home.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
});

// team tab
teambtn.addEventListener("click", () => {
  // show the team tab
  team.classList.remove("is-hidden");

  load_board();
  // hide the home, events, contact and inventory div
  home.classList.add("is-hidden");
  events.classList.add("is-hidden");
  contact.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
});

// contact tab
contactbtn.addEventListener("click", () => {
  // show the contact tab
  contact.classList.remove("is-hidden");

  // hide the home, events, team and inventory div
  home.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  inventory.classList.add("is-hidden");
});

// inventory tab
inventorybtn.addEventListener("click", () => {
  // show the inventory tab
  inventory.classList.remove("is-hidden");

  // load inventory data
  // load_inventory();

  // hide the home, events, team and contact div
  home.classList.add("is-hidden");
  events.classList.add("is-hidden");
  team.classList.add("is-hidden");
  contact.classList.add("is-hidden");
});



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}