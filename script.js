// Simulated backend data
let users = JSON.parse(localStorage.getItem('users')) || [];
let heroes = Array.from({ length: 18 }, (_, i) => ({ id: i + 1, name: `Hero ${i + 1}`, decks: [], totalLikes: 0 }));
let troops = Array.from({ length: 70 }, (_, i) => ({ id: i + 1, name: `Troop ${i + 1}` }));
let currentUser = null;

// Load heroes' decks from users' public decks
users.forEach(user => {
    user.decks.forEach(deck => {
        if (deck.isPublic) {
            const hero = heroes.find(h => h.id === deck.heroId);
            if (hero) {
                hero.decks.push(deck);
                hero.totalLikes += deck.likes || 0;
            }
        }
    });
});

// DOM Elements
const welcomeSection = document.getElementById('welcome-section');
const heroShowcaseSection = document.getElementById('hero-showcase-section');
const heroDecksSection = document.getElementById('hero-decks-section');
const userAccountSection = document.getElementById('user-account-section');
const heroList = document.getElementById('hero-list');
const heroDecksList = document.getElementById('hero-decks-list');
const userDecksList = document.getElementById('user-decks-list');
const userNameDisplay = document.getElementById('user-name');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const authModal = document.getElementById('auth-modal');
const authModalTitle = document.getElementById('auth-modal-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authForm = document.getElementById('auth-form');
const addDeckModal = document.getElementById('add-deck-modal');
const addDeckForm = document.getElementById('add-deck-form');
const heroSelect = document.getElementById('hero-select');
const troopSelectors = document.getElementById('troop-selectors');
const deckDetailsModal = document.getElementById('deck-details-modal');
const deckDetailsTitle = document.getElementById('deck-details-title');
const deckDetailsCreator = document.getElementById('deck-details-creator');
const deckDetailsDescription = document.getElementById('deck-details-description');
const deckDetailsHero = document.getElementById('deck-details-hero');
const deckDetailsHeroImage = document.getElementById('deck-details-hero-image');
const deckDetailsTroops = document.getElementById('deck-details-troops');

// Show/Hide Sections
function showSection(section) {
    [welcomeSection, heroShowcaseSection, heroDecksSection, userAccountSection].forEach(s => s.style.display = 'none');
    section.style.display = 'block';
}

// Navbar Buttons
document.getElementById('hero-showcase-btn').addEventListener('click', () => {
    showSection(heroShowcaseSection);
    displayHeroes();
});

document.getElementById('get-started-btn').addEventListener('click', () => showAuthModal('register'));
document.getElementById('explore-heroes-btn').addEventListener('click', () => {
    showSection(heroShowcaseSection);
    displayHeroes();
});

// Auth Modal
function showAuthModal(type) {
    authModalTitle.textContent = type === 'register' ? 'Register' : 'Login';
    authSubmitBtn.textContent = type === 'register' ? 'Register' : 'Login';
    authModal.style.display = 'flex';
}

loginBtn.addEventListener('click', () => showAuthModal('login'));
registerBtn.addEventListener('click', () => showAuthModal('register'));

logoutBtn.addEventListener('click', () => {
    currentUser = null;
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    userNameDisplay.style.display = 'none';
    logoutBtn.style.display = 'none';
    showSection(welcomeSection);
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        authModal.style.display = 'none';
        addDeckModal.style.display = 'none';
        deckDetailsModal.style.display = 'none';
    });
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    if (authSubmitBtn.textContent === 'Register') {
        if (users.find(u => u.username === username)) {
            alert('Username already exists!');
            return;
        }
        const newUser = { username, password, decks: [] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = newUser;
    } else {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            alert('Invalid credentials!');
            return;
        }
        currentUser = user;
    }

    authModal.style.display = 'none';
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    userNameDisplay.textContent = currentUser.username;
    userNameDisplay.style.display = 'inline-block';
    logoutBtn.style.display = 'inline-block';
    userNameDisplay.addEventListener('click', () => {
        showSection(userAccountSection);
        displayUserDecks();
    });
});

// Display Heroes in Showcase
function displayHeroes() {
    // Sort heroes by number of public decks and total likes
    heroes.sort((a, b) => {
        const aPublicDecks = a.decks.filter(d => d.isPublic).length;
        const bPublicDecks = b.decks.filter(d => d.isPublic).length;
        if (aPublicDecks === bPublicDecks) return b.totalLikes - a.totalLikes;
        return bPublicDecks - aPublicDecks;
    });

    heroList.innerHTML = '';
    heroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.innerHTML = `
            <img src="https://via.placeholder.com/250x150" alt="${hero.name}">
            <h3>${hero.name}</h3>
            <p>Public Decks: ${hero.decks.filter(d => d.isPublic).length}</p>
            <p>Total Likes: ${hero.totalLikes}</p>
        `;
        heroCard.addEventListener('click', () => {
            showSection(heroDecksSection);
            displayHeroDecks(hero);
        });
        heroList.appendChild(heroCard);
    });
}

// Display Decks for a Specific Hero
function displayHeroDecks(hero) {
    document.getElementById('hero-decks-title').textContent = `${hero.name} Decks`;
    const publicDecks = hero.decks.filter(d => d.isPublic);
    publicDecks.sort((a, b) => b.likes - a.likes);
    
    heroDecksList.innerHTML = '';
    publicDecks.forEach(deck => {
        const deckCard = document.createElement('div');
        deckCard.innerHTML = `
            <h3>${deck.name}</h3>
            <p>Created by: ${deck.creator}</p>
            <p>${deck.description}</p>
            <p>Likes: ${deck.likes}</p>
            <button class="like-btn">Like</button>
        `;
        deckCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-btn')) return;
            showDeckDetails(deck);
        });
        deckCard.querySelector('.like-btn').addEventListener('click', () => {
            if (!currentUser) {
                alert('Please log in to like a deck!');
                return;
            }
            deck.likes++;
            hero.totalLikes++;
            // Update the user's deck in localStorage
            const user = users.find(u => u.username === deck.creator);
            const userDeck = user.decks.find(d => d.name === deck.name);
            userDeck.likes = deck.likes;
            localStorage.setItem('users', JSON.stringify(users));
            displayHeroDecks(hero);
            displayHeroes();
        });
        heroDecksList.appendChild(deckCard);
    });
}

// Display User's Decks
function displayUserDecks() {
    document.getElementById('user-account-title').textContent = `${currentUser.username}'s Decks`;
    userDecksList.innerHTML = '';
    currentUser.decks.forEach(deck => {
        const deckCard = document.createElement('div');
        deckCard.innerHTML = `
            <h3>${deck.name}</h3>
            <p>Hero: ${heroes.find(h => h.id === deck.heroId).name}</p>
            <p>${deck.description}</p>
            <p>Public: ${deck.isPublic ? 'Yes' : 'No'}</p>
            <button class="delete-deck-btn">Delete</button>
            <button class="toggle-public-btn">${deck.isPublic ? 'Make Private' : 'Make Public'}</button>
        `;
        deckCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-deck-btn') || e.target.classList.contains('toggle-public-btn')) return;
            showDeckDetails(deck);
        });
        deckCard.querySelector('.delete-deck-btn').addEventListener('click', () => {
            currentUser.decks = currentUser.decks.filter(d => d.name !== deck.name);
            const hero = heroes.find(h => h.id === deck.heroId);
            hero.decks = hero.decks.filter(d => d.name !== deck.name);
            // Update localStorage
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            users[userIndex].decks = currentUser.decks;
            localStorage.setItem('users', JSON.stringify(users));
            displayUserDecks();
        });
        deckCard.querySelector('.toggle-public-btn').addEventListener('click', () => {
            deck.isPublic = !deck.isPublic;
            const hero = heroes.find(h => h.id === deck.heroId);
            if (deck.isPublic) {
                hero.decks.push(deck);
            } else {
                hero.decks = hero.decks.filter(d => d.name !== deck.name);
            }
            // Update localStorage
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            users[userIndex].decks = currentUser.decks;
            localStorage.setItem('users', JSON.stringify(users));
            displayUserDecks();
        });
        userDecksList.appendChild(deckCard);
    });
}

// Show Deck Details
function showDeckDetails(deck) {
    deckDetailsTitle.textContent = deck.name;
    deckDetailsCreator.textContent = deck.creator || currentUser.username;
    deckDetailsDescription.textContent = deck.description;
    const hero = heroes.find(h => h.id === deck.heroId);
    deckDetailsHero.textContent = hero.name;
    deckDetailsHeroImage.innerHTML = `<img src="https://via.placeholder.com/200x200" alt="${hero.name}">`;
    
    deckDetailsTroops.innerHTML = '';
    deck.troops.forEach(troopId => {
        const troop = troops.find(t => t.id === troopId);
        const troopCard = document.createElement('div');
        troopCard.innerHTML = `
            <img src="https://via.placeholder.com/100x80" alt="${troop.name}">
            <p>${troop.name}</p>
        `;
        deckDetailsTroops.appendChild(troopCard);
    });

    deckDetailsModal.style.display = 'flex';
}

// Add Deck Modal
document.getElementById('add-deck-btn').addEventListener('click', () => {
    if (!currentUser) {
        alert('Please log in to add a deck!');
        return;
    }
    addDeckModal.style.display = 'flex';

    // Populate hero dropdown
    heroSelect.innerHTML = '<option value="" disabled selected>Select Hero</option>';
    heroes.forEach(hero => {
        const option = document.createElement('option');
        option.value = hero.id;
        option.textContent = hero.name;
        heroSelect.appendChild(option);
    });

    // Populate troop selectors
    troopSelectors.innerHTML = '';
    for (let i = 1; i <= 6; i++) {
        const select = document.createElement('select');
        select.required = true;
        select.innerHTML = `<option value="" disabled selected>Troop ${i}</option>`;
        troops.forEach(troop => {
            const option = document.createElement('option');
            option.value = troop.id;
            option.textContent = troop.name;
            select.appendChild(option);
        });
        troopSelectors.appendChild(select);
    }
});

addDeckForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const deckName = document.getElementById('deck-name-input').value;
    const heroId = parseInt(document.getElementById('hero-select').value);
    const troops = Array.from(troopSelectors.querySelectorAll('select')).map(s => parseInt(s.value));
    const description = document.getElementById('deck-description-input').value;
    const isPublic = document.getElementById('deck-public-input').checked;

    const deck = {
        name: deckName,
        heroId,
        troops,
        description,
        isPublic,
        creator: currentUser.username,
        likes: 0
    };

    currentUser.decks.push(deck);
    if (isPublic) {
        const hero = heroes.find(h => h.id === heroId);
        hero.decks.push(deck);
    }

    // Update localStorage
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    users[userIndex].decks = currentUser.decks;
    localStorage.setItem('users', JSON.stringify(users));

    addDeckModal.style.display = 'none';
    displayUserDecks();
});
