// const axios = require("axios").default;
/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cards = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/SyriiAdvent")
  .then(res => {
    // console.log(res.data);
    cardMaker(res.data);
  })
  .catch(error => {
    // handle error
    console.error(error);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const followersArray = [];
// followersArray.push(axios.get(''))

const followerCards = () => {
  axios
  .get('https://api.github.com/users/SyriiAdvent/followers')
  .then(res => {
    // console.log(res.data)
    res.data.forEach(ele => {
      // cardMaker(ele);
      followersArray.push(axios
        .get(ele.url)
        .then(res => {
          cardMaker(res.data);
        }))
    })
  })
  .catch(err => console.error(err))
}

followerCards();

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:
*/
// console.log(cards);

function cardMaker(prop) {
  const card = document.createElement("div"); // Card Container
  const profileImg = document.createElement("img"); // users picture
  const infoContainer = document.createElement("div"); // new child container < ---- !!!! ----- >
  const realName = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p"); // profile: <a>link</a>
  const profileLink = document.createElement("a"); // profile: <a>link</a>
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  // Contribution Card Element
  const contribution = document.createElement('div')
  
  card.classList.add('card');
  infoContainer.classList.add('card-info');
  realName.classList.add('name');
  userName.classList.add('username');
  // contribution class
  contribution.classList.add('calendar');

  profileImg.src = prop.avatar_url;
  realName.textContent = prop.name;
  userName.textContent = prop.login;
  location.textContent = `location: ${prop.location}`;
  profile.textContent = `profile: ${profileLink}`;
  profileLink.setAttribute('href', `${prop.html_url}`);
  profileLink.textContent = prop.html_url;
  followers.textContent = `Followers: ${prop.followers}`;
  following.textContent = `Following: ${prop.following}`;
  bio.textContent = `If i had a bio it would be here. ${prop.blog}`;

  GitHubCalendar(contribution, prop.login, { responsive: true });

  cards.appendChild(card);
  card.appendChild(profileImg);
  card.appendChild(infoContainer);
  infoContainer.appendChild(realName);
  infoContainer.appendChild(userName);
  infoContainer.appendChild(location);
  infoContainer.appendChild(profile);
  profile.appendChild(profileLink);
  infoContainer.appendChild(followers);
  infoContainer.appendChild(following);
  infoContainer.appendChild(bio);
  card.appendChild(contribution);

  function noDataHelper() {
    if(prop.location === undefined) {
      location.textContent = '';
    }
    if(prop.followers === undefined && prop.following === undefined) {
      followers.textContent = '';
      following.textContent = '';
    }
    if(prop.blog === undefined || prop.blog === '') {
      bio.textContent = `If i had a bio it would be here.`;
    } else {
      bio.textContent = prop.blog;
    }
  }
}

/*
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
