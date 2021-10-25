let first_name = '';
let last_name = '';
let email = '';

async function fetchData() {
  await fetch('https://randomuser.me/api/?results=25')
    .then(response => response.json())
    .then(data => dataOperations(data.results))
}

function dataOperations(dataset) {
  loadingAnimation();
  createUsers(dataset);
}

function loadingAnimation() {
  document.getElementById('loading_bar').classList.add("animate__animated");
  document.getElementById('loading_bar').classList.add("animate__fadeOut");
  document.getElementById('loading_bar').style.display = 'none';
  document.getElementById('data_container').style.display = 'block';
  document.getElementById('data_container').classList.add("animate__animated");
  document.getElementById('data_container').classList.add("animate__fadeIn");
}

function createUsers(dataset) {
  console.log(dataset);
  let parentNode = document.getElementById('left');
  for (let i = 0; i < dataset.length; i++) {
    let person_container = document.createElement("div");
    person_container.classList.add('person_container');
    parentNode.appendChild(person_container);

    /* image Section below */
    let image_container = document.createElement("div");
    image_container.classList.add('image_container');
    person_container.appendChild(image_container);

    /* Set image and its source */
    let image = document.createElement("img");
    image.src = dataset[i].picture.large;
    image.classList.add('person_image');
    image_container.appendChild(image);

    /* buttons section below */
    let two_buttons_container = document.createElement("div");
    two_buttons_container.classList.add('two_buttons_container');
    person_container.appendChild(two_buttons_container);

    /* Creating Contact Buttons */
    let bio_button = document.createElement("div");
    bio_button.classList.add('bio_button');
    let contact_button = document.createElement("div");
    contact_button.classList.add('contact_button');
    let bio_button_text = document.createElement("p");
    bio_button_text.classList.add('button_text');
    let contact_button_text = document.createElement("p");
    contact_button_text.classList.add('button_text');
    bio_button_text.textContent = 'Bio';
    contact_button_text.textContent = 'Contact';

    two_buttons_container.appendChild(bio_button);
    bio_button.appendChild(bio_button_text);
    bio_button.addEventListener("click", (e) => changeRenderState(e, i, 'Bio', dataset));

    two_buttons_container.appendChild(contact_button);
    contact_button.appendChild(contact_button_text);
    contact_button.addEventListener("click", (e) => changeRenderState(e, i, 'Contact', dataset));

    /* Information Session Below */
    let information_container = document.createElement("div");
    information_container.classList.add('information_container');
    person_container.appendChild(information_container);

    let row_one_text = document.createElement("p");
    row_one_text.id = 'box' + i + 'row1';
    row_one_text.textContent = 'First Name: ' + dataset[i].name.first;
    information_container.appendChild(row_one_text);

    let row_two_text = document.createElement("p");
    row_two_text.id = 'box' + i + 'row2';
    row_two_text.textContent = 'Last Name: ' + dataset[i].name.last;
    information_container.appendChild(row_two_text);

    let row_three_text = document.createElement("p");
    row_three_text.id = 'box' + i + 'row3';
    row_three_text.textContent = 'Gender: ' + dataset[i].gender.charAt(0).toUpperCase() + dataset[i].gender.slice(1);
    information_container.appendChild(row_three_text);

  }
}

function changeRenderState(event, index, state, dataset) {
  let row_one = document.getElementById('box' + index + 'row1');
  let row_two = document.getElementById('box' + index + 'row2');
  let row_three = document.getElementById('box' + index + 'row3');

  if (state === 'Bio') {
    row_one.textContent = 'First Name: ' + dataset[index].name.first;
    row_two.textContent = 'Last Name: ' + dataset[index].name.last;
    row_three.textContent = 'Gender: ' + dataset[index].gender.charAt(0).toUpperCase() + dataset[index].gender.slice(1);
  }
  else {
    row_one.textContent = 'Country: ' + dataset[index].location.country;
    row_two.textContent = 'Phone: ' + dataset[index].phone;
    row_three.textContent = 'Email: ' + dataset[index].email;
  }
}

document.getElementById('first_name').addEventListener('input', (event) => {
  first_name = event.target.value;
});

document.getElementById('last_name').addEventListener('input', (event) => {
  last_name = event.target.value;
});

document.getElementById('email').addEventListener('input', (event) => {
  email = event.target.value;
});

document.getElementById('submit').addEventListener("click", function(e) {
  e.preventDefault();

  var templateParams = {
      first_name: first_name,
      last_name: last_name,
      email: email
  };

  if (!(first_name.length === 0 || last_name.length === 0 || email.length === 0)) {
    if (ValidateEmail(email)) {
      emailjs.send('service_xgr9p96', 'template_d2joddi', templateParams)
          .then(function(response) {
             console.log('SUCCESS!', response.status, response.text);
          }, function(error) {
             console.log('FAILED...', error);
        });
    }
    else {
      alert("You have entered an invalid email address!");
    }
  }
  else {
    alert("Incomplete Form. Please fill all values");
  }


});

function ValidateEmail(mail)
{
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  else {
    return (false)
  }
}


fetchData();


/*
<div class="person_container">
  <div class="image_container">
    <img class="person_image" src="https://via.placeholder.com/150"></img>
  </div>
  <div class ="two_buttons_container">
    <div class ="bio_button" id="bio_button">
      <p class="button_text">Bio</p>
    </div>
    <div class ="contact_button" id="contact_button">
      <p class="button_text">Contact Info</p>
    </div>
  </div>

  <div class ="information_container">
    <p class = "row1">  ipsum  </p>
    <p class ="row2">  ipsum </p>
    <p class ="row3">  ipsum </p>
  </div>
</div>

*/
