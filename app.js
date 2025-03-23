const firebaseConfig = {
  apiKey: "AIzaSyBWREQxXLOsjsA-dsDphtRaVCXRh4rzs64",
  authDomain: "hamama2.firebaseapp.com",
  projectId: "hamama2",
  storageBucket: "hamama2.firebasestorage.app",
  messagingSenderId: "416551484899",
  appId: "1:416551484899:web:31be7a1064079f1e79f4d6"
};
  const app = firebase.initializeApp(firebaseConfig);
//יצירת אובייקט למשתמש בית יצירת משתמש
  function createuser(uid,email,name,age){
    this.uid = uid
    this.email = email
    this.name = name
    this.age = age
  }



//-------------------------------------פונקציית הרשמות משתמש----------------------------------------------------
function signup(){

    email = document.getElementById("emailsignup").value
    password = document.getElementById("passwordsignup").value
    name = document.getElementById("name").value
    age = document.getElementById("agesignup").value
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user.uid);
    tempuser = new createuser(user.uid,email,name,age)
    console.log(tempuser)
    firebase.database().ref("users/"+user.uid).set(tempuser)
    email = document.getElementById("emailsignup").value = ''
    password = document.getElementById("passwordsignup").value = ''
    name = document.getElementById("name").value = ''
    age = document.getElementById("agesignup").value = ''
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}
//---------------------------------------------פונקציית התחברות משתמש------------------------------------------
function login() {
  email = document.getElementById("emailsignin").value;
  password = document.getElementById("passwordsignin").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
     
      var user = userCredential.user;
      console.log(user.uid);
      document.getElementById("datapage").innerHTML = `<a class="nav-link" href="data.html">שליטה בחממה</a>`;


      
      firebase.database().ref("users/" + user.uid).once("value")
        .then((snapshot) => {
          const userData = snapshot.val();
          const userName = userData.name;

          document.getElementById("nounce").textContent = "signed in";
          document.getElementById("nounce").style.display = "block";
          email = document.getElementById("emailsignin").value = '';
          password = document.getElementById("passwordsignin").value = '';
          
          
          document.getElementById("hellouser").innerHTML = `

              <p class="text-center fw-bold fs-3">HELLO ${userName}!</p>`;
            document.getElementById("userPanel").style.display = "block";

        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("nounce").textContent = "wrong password";
      document.getElementById("nounce").style.display = "block";
    });
  }



  //---------------------------------------הצגת שם המשתמש במסך-----------------------------------
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      firebase.database().ref("users/" + user.uid).once("value")
      .then((snapshot) => {
        const userData = snapshot.val();
        const userName = userData.name;
        document.getElementById("hellouser").innerHTML = `
    
        <p class="text-center fw-bold fs-3">HELLO ${userName}!</p>`;
      document.getElementById("userPanel").style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });


//-------------------------פונקציה להתנתקות של משתמש-------------------------------------------------
function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("User signed out");

      // Update UI to hide user panel and show login/signup forms
      document.getElementById("nounce").textContent = "You have logged out.";
      document.getElementById("nounce").style.display = "block";
      document.getElementById("userPanel").style.display = "none";
      document.getElementById("hellouser").innerHTML = ` `
      document.getElementById("datapage").innerHTML = ` `;

    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}





//--------------------------databaseשמירת ערכי טמפ׳ לחות ואור ב ----------------------------------------------

function tempsave(){
  tempTX= useSliderValuetemp()
  tempTX=parseInt(tempTX,10)
  toTX=tempTX.toString(2).split('').map(digit => parseInt(digit, 10));
  toTX.unshift(0,0);
  toTX=parseInt(toTX.join(''), 2);
  console.log(toTX)
  firebase.database().ref("RX/RX").set(toTX)

}
function datasave(){
  let humidTX = useSliderValuehumid()
  humidTX = parseInt(humidTX, 10);
  let binaryString = humidTX.toString(2).padStart(6, '0');
  let finalBinary = "01" + binaryString;
  let toTX = parseInt(finalBinary, 2);
  console.log(toTX);
  firebase.database().ref("RX/RX").set(toTX);
}
function lightsave(){
  let lightTX = useSliderValuelight()
  lightTX = parseInt(lightTX, 10);
  let binaryString = lightTX.toString(2).padStart(6, '0');
  let finalBinary = "10" + binaryString;
  let toTX = parseInt(finalBinary, 2);
  console.log(toTX);
  firebase.database().ref("RX/RX").set(toTX);
}







var starCountRef = firebase.database().ref('RX/TX/A');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  //updateStarCount(postElement, data);
  document.getElementById("lightreal").textContent = data
});

var starCountRef = firebase.database().ref('RX/data/temp');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  //updateStarCount(postElement, data);
  document.getElementById("tempreal").textContent = data
});

var starCountRef = firebase.database().ref('RX/TX/C');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  //updateStarCount(postElement, data);
  document.getElementById("humidreal").textContent = data
});




//--------------------------------בדיקה האם המשתמש מחובר אם לא מעבר לדף בית-----------------------------------
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      // If the user is not signed in, redirect to the login page
      window.location.href = "index.html";
    } else {
      console.log("User signed in:", user.email);
    }
  });




let imagetemp = document.getElementById("tempimage")

var starCountRef = firebase.database().ref('RX/TX/A');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  //updateStarCount(postElement, data);
  document.getElementById("lightreal").textContent = data
  addlight(data)
});

var starCountRef = firebase.database().ref('RX/data/temp');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  //updateStarCount(postElement, data);
  document.getElementById("tempreal").textContent = data
  addTemperature(data)
  if (data<10)
    imagetemp.src = "https://media.istockphoto.com/id/868098786/photo/thermometer-on-snow-shows-low-temperatures-zero-low-temperatures-in-degrees-celsius-and.jpg?s=612x612&w=0&k=20&c=jOZH4RSlX29thO6GNlvTUlYKUo_DK4xVxvXUTK7Jw5s="
  else
  if(data>=10 && data<30)
    imagetemp.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9JVDQs141j2sE7dFCYfLFMyuVAPcuQIMMw&s"
  else
  imagetemp.src = "https://t4.ftcdn.net/jpg/05/18/43/73/360_F_518437397_j4c3cOSYK54AjCis5muIjPaHw2KBTCeH.jpg"
});

var starCountRef = firebase.database().ref('RX/TX/C');
starCountRef.on('value', (snapshot) => {
  const data = snapshot.val();
  //updateStarCount(postElement, data);
  document.getElementById("humidreal").textContent = data
  addhumid(data)
});




const ctx = document.getElementById('tempChart').getContext('2d');
const tempData = [];
const labels = [];

const tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperature (°C)',
            data: tempData,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Temperature (°C)' } }
        }
    }
});


const ctx1 = document.getElementById('lightChart').getContext('2d');
const lightData = [];
const labels1 = [];

const lightChart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: labels1,
        datasets: [{
            label: 'light',
            data: lightData,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'light' } }
        }
    }
});


const ctx2 = document.getElementById('humidChart').getContext('2d');
const humidData = [];
const labels2 = [];

const humidChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: labels2,
        datasets: [{
            label: 'light',
            data: humidData,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'light' } }
        }
    }
});




function addTemperature(temp) {
    const now = new Date().toLocaleTimeString();
    labels.push(now);
    tempData.push(temp);
    if (labels.length > 10) { labels.shift(); tempData.shift(); }
    tempChart.update();
}


function addlight(light) {
  const now = new Date().toLocaleTimeString();
  labels1.push(now);
  lightData.push(light);
  if (labels1.length > 10) { labels1.shift(); lightData.shift(); }
  lightChart.update();
}

function addhumid(humid) {
  const now = new Date().toLocaleTimeString();
  labels2.push(now);
  humidData.push(humid);
  if (labels2.length > 10) { labels2.shift(); humidData.shift(); }
  humidChart.update();
}




const slider = document.getElementById("slider");
const thumb = document.getElementById("thumb");
const valueDisplay = document.getElementById("humidTX");

const minVal = 0;
const maxVal = 63;
let isDragging = false;
let sliderValue = 0;

function updateSlider(positionX) {
    let rect = slider.getBoundingClientRect();
    let offsetX = positionX - rect.left;
    let sliderWidth = rect.width; // Get actual width

    // Clamp position within bounds
    offsetX = Math.max(0, Math.min(offsetX, sliderWidth));

    // Convert position to value
    sliderValue = Math.round((offsetX / sliderWidth) * (maxVal - minVal));
    valueDisplay.textContent = sliderValue; // Display value

    // Move the thumb
    thumb.style.left = `${(sliderValue / maxVal) * 100}%`;
}

function startDrag(event) {
    isDragging = true;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider(positionX);

    // Prevent scrolling on touch
    if (event.touches) event.preventDefault();
}

function moveDrag(event) {
    if (!isDragging) return;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider(positionX);
}

function stopDrag() {
    isDragging = false;
}

// Mouse Events
thumb.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", moveDrag);
document.addEventListener("mouseup", stopDrag);

// Touch Events (for mobile)
thumb.addEventListener("touchstart", startDrag);
document.addEventListener("touchmove", moveDrag, { passive: false }); // Prevent scrolling
document.addEventListener("touchend", stopDrag);

// Example function to get the value
function useSliderValuehumid() {
    return sliderValue;
}




const slider1 = document.getElementById("slider1");
const thumb1 = document.getElementById("thumb1");
const valueDisplay1 = document.getElementById("tempTX");

const minVal1 = 0;
const maxVal1 = 63;
let isDragging1 = false;
let sliderValue1 = 0;

function updateSlider1(positionX) {
    let rect1 = slider1.getBoundingClientRect();
    let offsetX1 = positionX - rect1.left;
    let sliderWidth1 = rect1.width; // Get actual width

    // Clamp position within bounds
    offsetX1 = Math.max(0, Math.min(offsetX1, sliderWidth1));

    // Convert position to value
    sliderValue1 = Math.round((offsetX1 / sliderWidth1) * (maxVal1 - minVal1));
    valueDisplay1.textContent = sliderValue1; // Display value

    // Move the thumb
    thumb1.style.left = `${(sliderValue1 / maxVal1) * 100}%`;
}

function startDrag1(event) {
    isDragging1 = true;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider1(positionX);

    // Prevent scrolling on touch
    if (event.touches) event.preventDefault();
}

function moveDrag1(event) {
    if (!isDragging1) return;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider1(positionX);
}

function stopDrag1() {
    isDragging1 = false;
}

// Mouse Events
thumb1.addEventListener("mousedown", startDrag1);
document.addEventListener("mousemove", moveDrag1);
document.addEventListener("mouseup", stopDrag1);

// Touch Events (for mobile)
thumb1.addEventListener("touchstart", startDrag1);
document.addEventListener("touchmove", moveDrag1, { passive: false }); // Prevent scrolling
document.addEventListener("touchend", stopDrag1);

// Example function to get the value
function useSliderValuetemp() {
    return sliderValue1;
}



const slider2 = document.getElementById("slider2");
const thumb2 = document.getElementById("thumb2");
const valueDisplay2 = document.getElementById("lightTX");

const minVal2 = 0;
const maxVal2 = 63;
let isDragging2 = false;
let sliderValue2 = 0;

function updateSlider2(positionX) {
    let rect2 = slider2.getBoundingClientRect();
    let offsetX2 = positionX - rect2.left;
    let sliderWidth2 = rect2.width; // Get actual width

    // Clamp position within bounds
    offsetX2 = Math.max(0, Math.min(offsetX2, sliderWidth2));

    // Convert position to value
    sliderValue2 = Math.round((offsetX2 / sliderWidth2) * (maxVal2 - minVal2));
    valueDisplay2.textContent = sliderValue2; // Display value

    // Move the thumb
    thumb2.style.left = `${(sliderValue2 / maxVal2) * 100}%`;
}

function startDrag2(event) {
    isDragging2 = true;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider2(positionX);

    // Prevent scrolling on touch
    if (event.touches) event.preventDefault();
}

function moveDrag2(event) {
    if (!isDragging2) return;
    let positionX = event.touches ? event.touches[0].clientX : event.clientX;
    updateSlider2(positionX);

    // Prevent scrolling
    if (event.touches) event.preventDefault();
}

function stopDrag2() {
    isDragging2 = false;
}

// Mouse Events
thumb2.addEventListener("mousedown", startDrag2);
document.addEventListener("mousemove", moveDrag2);
document.addEventListener("mouseup", stopDrag2);

// Touch Events (for mobile)
thumb2.addEventListener("touchstart", startDrag2);
document.addEventListener("touchmove", moveDrag2, { passive: false }); // Prevent scrolling
document.addEventListener("touchend", stopDrag2);

// Allow dragging by touching anywhere on the slider
slider2.addEventListener("touchstart", startDrag2);
slider2.addEventListener("mousedown", startDrag2);

// Example function to get the value
function useSliderValuelight() {
    return sliderValue2;
}










  
