// global variables
let signupbtn = document.querySelector('#signupbtn');
let signup_modal = document.querySelector('#signup_modal');
let signup_modalbg = document.querySelector('#signup_modalbg');
let signinbtn = document.querySelector('#signinbtn');
let signin_modal = document.querySelector('#signin_modal');
let signin_modalbg = document.querySelector('#signin_modalbg');
let homebtn = document.querySelector('#homebtn');
let home = document.querySelector('#home');
let historybtn = document.querySelector('#historybtn');
let history = document.querySelector('#history');
let eventsbtn = document.querySelector('#eventsbtn');
let events = document.querySelector('#events');
let teambtn = document.querySelector('#teambtn');
let team = document.querySelector('#team');
let contactbtn = document.querySelector('#contactbtn');
let contact = document.querySelector('#contact');
let inventorybtn = document.querySelector('#inventorybtn');
let inventory = document.querySelector('#inventory');


// functions

// return HTML element with a given ID
function r_e(id) {
    return document.querySelector(`#${id}`)
}

// configure the message bar
function configure_message_bar(msg) {
    // enforce message bar being visible
    r_e('message_bar').classList.remove('is-hidden');

    r_e('message_bar').innerHTML = msg;

    // hide the message bar
    setTimeout(() => {
        r_e('message_bar').innerHTML = ""; //clear the text from the message bar
        r_e('message_bar').classList.add('is-hidden');
    }, 2000);
}

// configure the message bar
function configure_message_bar(msg) {
    // enforce message bar being visible
    r_e('message_bar').classList.remove('is-hidden');

    r_e('message_bar').innerHTML = msg;

    // hide the message bar
    setTimeout(() => {
        r_e('message_bar').innerHTML = ""; //clear the text from the message bar
        r_e('message_bar').classList.add('is-hidden');
    }, 2000);
}

// configure navigation bar
function configure_nav_bar(user) {
    let signedin = document.querySelectorAll('.signedin');
    let signedout = document.querySelectorAll('.signedout');

    // check is user exists
    if (user) {
        // show all signed in links 
        signedin.forEach(link => {
            link.classList.remove('is-hidden');
        })

        // hide all signed out links
        signedout.forEach(link => {
            link.classList.add('is-hidden');
        })

    } else {
        // no user (signed out)
        // show all signed out links 
        signedout.forEach(link => {
            link.classList.remove('is-hidden');
        })

        // hide all signed in links
        signedin.forEach(link => {
            link.classList.add('is-hidden');
        })
    }
}

// sign up  user 
r_e('signup_form').addEventListener('submit', (e) => {
    e.preventDefault(); //prevent default behavior of the browser (no page refresh)
    // grab the email and password combination from the form
    let email = r_e('email').value;
    let password = r_e('password').value;

    // call the firebase function to create the user
    auth.createUserWithEmailAndPassword(email, password).then((user) => {
        // console.log(`${user.user.email} is now signed in`);
        // show sign up successful message on message bar
        configure_message_bar(`${user.user.email} is now created!`)

        // reset the form
        r_e('signup_form').reset();

        // close the modal
        r_e('signup_modal').classList.remove('is-active');
    }).catch(err => {
        signup_modal.querySelector('.error').innerHTML = err.message;
    })

})

// sign in user
r_e('signin_form').addEventListener('submit', (e) => {
    e.preventDefault(); //prevent default behavior of the browser (no page refresh)
    // grab the email and password combination from the form
    let email = r_e('email_').value;
    let password = r_e('password_').value;

    // call the firebase function to sign in the user
    auth.signInWithEmailAndPassword(email, password).then((user) => {
        // console.log(`${user.user.email} is now signed in`);
        // show sign in successful message on message bar
        configure_message_bar(`${user.user.email} is now signed in!`)

        // reset the form
        r_e('signin_form').reset();

        // close the modal
        r_e('signin_modal').classList.remove('is-active');
    }).catch(err => {
        signin_modal.querySelector('.error').innerHTML = err.message;
    })

})

// sign out user
r_e('signoutbtn').addEventListener('click', () => {
    auth.signOut().then(() => {
        configure_message_bar("You signed out successfully!")
    })
})

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
})

// sign - up modal link
signupbtn.addEventListener('click', () => {
    signup_modal.classList.add('is-active');
});

signup_modalbg.addEventListener('click', () => {
    signup_modal.classList.remove('is-active');
});

// sign-in modal link
signinbtn.addEventListener('click', () => {
    signin_modal.classList.add('is-active');
})

signin_modalbg.addEventListener('click', () => {
    signin_modal.classList.remove('is-active');
});


// switching between tabs

// home tab
homebtn.addEventListener('click', () => {
    // show the home tab
    home.classList.remove('is-hidden');


    // hide the History, events, team, contact and inventory div
    history.classList.add('is-hidden');
    events.classList.add('is-hidden');
    team.classList.add('is-hidden');
    contact.classList.add('is-hidden');
    inventory.classList.add('is-hidden');

})

// history tab
historybtn.addEventListener('click', () => {
    // show the history tab
    history.classList.remove('is-hidden');

    // hide the home, events, team, contact and inventory div
    home.classList.add('is-hidden');
    events.classList.add('is-hidden');
    team.classList.add('is-hidden');
    contact.classList.add('is-hidden');
    inventory.classList.add('is-hidden');
})

// events tab
eventsbtn.addEventListener('click', () => {
    // show the events tab
    events.classList.remove('is-hidden');

    // hide the home, history, team, contact and inventory div
    home.classList.add('is-hidden');
    history.classList.add('is-hidden');
    team.classList.add('is-hidden');
    contact.classList.add('is-hidden');
    inventory.classList.add('is-hidden');
})

// team tab
teambtn.addEventListener('click', () => {
    // show the team tab
    team.classList.remove('is-hidden');

    // hide the home, events, contact, history and inventory div
    home.classList.add('is-hidden');
    history.classList.add('is-hidden');
    events.classList.add('is-hidden');
    contact.classList.add('is-hidden');
    inventory.classList.add('is-hidden');

})

// contact tab
contactbtn.addEventListener('click', () => {
    // show the contact tab
    contact.classList.remove('is-hidden');

    // hide the home, events, team, history and inventory div
    home.classList.add('is-hidden');
    history.classList.add('is-hidden');
    events.classList.add('is-hidden');
    team.classList.add('is-hidden');
    inventory.classList.add('is-hidden');

})

// inventory tab
inventorybtn.addEventListener('click', () => {
    // show the inventory tab
    inventory.classList.remove('is-hidden');

    // hide the home, events, team, history and contact div
    home.classList.add('is-hidden');
    history.classList.add('is-hidden');
    events.classList.add('is-hidden');
    team.classList.add('is-hidden');
    contact.classList.add('is-hidden');

})