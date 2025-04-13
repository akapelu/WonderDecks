// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyADg8wvQZiTCNDG2-ExoCcB10fP2lEN3I",
    authDomain: "wonderdecks-6ca4f.firebaseapp.com",
    projectId: "wonderdecks-6ca4f",
    storageBucket: "wonderdecks-6ca4f.appspot.com",
    messagingSenderId: "715734231945",
    appId: "1:715734231945:web:d74cd383ec031e980ecf58",
    measurementId: "G-Q9DJVZCY6"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

const db = firebase.firestore();
const auth = firebase.auth();

// Simulated backend data
let heroes = [
    { id: 1, name: "BLUE", decks: [], totalLikes: 0 },
    { id: 2, name: "BLURP", decks: [], totalLikes: 0 },
    { id: 3, name: "GIDROCK", decks: [], totalLikes: 0 },
    { id: 4, name: "GROTH", decks: [], totalLikes: 0 },
    { id: 5, name: "HARALK", decks: [], totalLikes: 0 },
    { id: 6, name: "HARUAKI", decks: [], totalLikes: 0 },
    { id: 7, name: "HINDAYA", decks: [], totalLikes: 0 },
    { id: 8, name: "JARKOS", decks: [], totalLikes: 0 },
    { id: 9, name: "JIN", decks: [], totalLikes: 0 },
    { id: 10, name: "KADRIA", decks: [], totalLikes: 0 },
    { id: 11, name: "KROGNAAR", decks: [], totalLikes: 0 },
    { id: 12, name: "LUSBAAL", decks: [], totalLikes: 0 },
    { id: 13, name: "LYON", decks: [], totalLikes: 0 },
    { id: 14, name: "PIPER", decks: [], totalLikes: 0 },
    { id: 15, name: "RODERICH", decks: [], totalLikes: 0 },
    { id: 16, name: "SICKSY", decks: [], totalLikes: 0 },
    { id: 17, name: "STINKY", decks: [], totalLikes: 0 },
    { id: 18, name: "WAKAN", decks: [], totalLikes: 0 }
];
let troops = [
    { id: 1, name: "AVERY" },
    { id: 2, name: "BOB MB" },
    { id: 3, name: "BLUVER" },
    { id: 4, name: "BOGGER" },
    { id: 5, name: "BONNIE" },
    { id: 6, name: "BOXTER" },
    { id: 7, name: "BUZZ JK" },
    { id: 8, name: "BUZZ VC" },
    { id: 9, name: "BUZZ VG" },
    { id: 10, name: "CEDRICK" },
    { id: 11, name: "CHOMPER" },
    { id: 12, name: "CLAUDINE" },
    { id: 13, name: "DROGDOR JK" },
    { id: 14, name: "DROGDOR VC" },
    { id: 15, name: "DROGDOR VG" },
    { id: 16, name: "FERGOR" },
    { id: 17, name: "FLITUS JK" },
    { id: 18, name: "FLITUS VC" },
    { id: 19, name: "FLITUS VG" },
    { id: 20, name: "FREDDY" },
    { id: 21, name: "FRIDA" },
    { id: 22, name: "GLOB" },
    { id: 23, name: "GRANTMOR" },
    { id: 24, name: "GRETA" },
    { id: 25, name: "GRIBER" },
    { id: 26, name: "GYZORBOTS" },
    { id: 27, name: "HALLUR" },
    { id: 28, name: "HIKA" },
    { id: 29, name: "HUK" },
    { id: 30, name: "IVUR JK" },
    { id: 31, name: "IVUR VC" },
    { id: 32, name: "IVUR VG" },
    { id: 33, name: "J 4WS" },
    { id: 34, name: "JACK" },
    { id: 35, name: "JEN" },
    { id: 36, name: "KHEELDREN" },
    { id: 37, name: "KOTTON" },
    { id: 38, name: "KULTH" },
    { id: 39, name: "LILY" },
    { id: 40, name: "LUMINA" },
    { id: 41, name: "MAHOMOT" },
    { id: 42, name: "MONJ" },
    { id: 43, name: "MURBY" },
    { id: 44, name: "NEYON JK" },
    { id: 45, name: "NEYON UR" },
    { id: 46, name: "NEYON VC" },
    { id: 47, name: "NORPUR JK" },
    { id: 48, name: "NORPUR VC" },
    { id: 49, name: "NORPUR VG" },
    { id: 50, name: "RAGOR" },
    { id: 51, name: "SCALDRAX" },
    { id: 52, name: "SGRAG" },
    { id: 53, name: "SHAMERA" },
    { id: 54, name: "SHAWMIT" },
    { id: 55, name: "SHYOR" },
    { id: 56, name: "SIRO" },
    { id: 57, name: "SKIVER" },
    { id: 58, name: "SOPHIE" },
    { id: 59, name: "SPYKE" },
    { id: 60, name: "SVEN" },
    { id: 61, name: "THRAGOS" },
    { id: 62, name: "TWEEKS" },
    { id: 63, name: "ULDREN" },
    { id: 64, name: "VINCENT" },
    { id: 65, name: "WARINX" },
    { id: 66, name: "WERTH" },
    { id: 67, name: "WILLIAM" },
    { id: 68, name: "WYN" },
    { id: 69, name: "YOYU" },
    { id: 70, name: "YURKI" }
];
let currentUser = null;
let users = [];
let userLikes = {};

// GitHub repository base URL for images
const githubBaseUrl = "https://raw.githubusercontent.com/akapelu/WonderDecks/main/";

// Function to get the image URL for a hero or troop
function getImageUrl(name, type) {
    const formattedName = name.toUpperCase().replace(/\s/g, '_');
    return `${githubBaseUrl}${type}/${formattedName}.png`;
}

// Authenticate user anonymously on page load
auth.signInAnonymously().catch(error => {
    console.error("Error signing in anonymously:", error);
    alert("Error connecting to Firebase. Please check the console for details.");
});

// Listen for auth state changes
auth.onAuthStateChanged(async user => {
    if (user) {
        console.log("User signed in anonymously:", user.uid);
        let savedUser;
        try {
            savedUser = localStorage.getItem('currentUser');
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            savedUser = null;
        }
        if (savedUser) {
            try {
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    currentUser = userDoc.data();
                    currentUser.uid = user.uid;
                    updateUIForCurrentUser();
                } else {
                    console.log("User document not found for UID:", user.uid);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("Error fetching user data. Please check the console for details.");
            }
        }
        // Load all users and userLikes from Firestore
        await loadUsersAndLikes();
        // Load heroes' decks
        await loadHeroesDecks();
        // Update UI
        displayHeroes();
    } else {
        console.log("User signed out");
        currentUser = null;
        updateUIForCurrentUser();
    }
});

// Load all users and userLikes from Firestore
async function loadUsersAndLikes() {
    try {
        users = [];
        userLikes = {};

        // Load users
        const usersSnapshot = await db.collection('users').get();
        usersSnapshot.forEach(doc => {
            const userData = doc.data();
            userData.uid = doc.id;
            users.push(userData);
        });
        console.log("Users loaded:", users);

        // Load userLikes
        const likesSnapshot = await db.collection('userLikes').get();
        likesSnapshot.forEach(doc => {
            userLikes[doc.id] = doc.data().value;
        });
        console.log("UserLikes loaded:", userLikes);
    } catch (error) {
        console.error("Error loading users and likes:", error);
        alert("Error loading data from Firebase. Please check the console for details.");
    }
}

// Load heroes' decks from users' public decks
async function loadHeroesDecks() {
    heroes.forEach(hero => {
        hero.decks = [];
        hero.totalLikes = 0;
    });

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
}

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
const deckModal = document.getElementById('deck-modal');
const deckModalTitle = document.getElementById('deck-modal-title');
const deckForm = document.getElementById('deck-form');
const deckSubmitBtn = document.getElementById('deck-submit-btn');
const heroSelect = document.getElementById('hero-select');
const troopSelectors = document.getElementById('troop-selectors');
const deckDetailsModal = document.getElementById('deck-details-modal');
const deckDetailsTitle = document.getElementById('deck-details-title');
const deckDetailsCreator = document.getElementById('deck-details-creator');
const deckDetailsDescription = document.getElementById('deck-details-description');
const deckDetailsHero = document.getElementById('deck-details-hero');
const deckDetailsHeroImage = document.getElementById('deck-details-hero-image');
const deckDetailsTroops = document.getElementById('deck-details-troops');

// Update UI based on current user
function updateUIForCurrentUser() {
    if (currentUser) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userNameDisplay.textContent = currentUser.username;
        userNameDisplay.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
        userNameDisplay.addEventListener('click', () => {
            showSection(userAccountSection);
            displayUserDecks();
        });
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        userNameDisplay.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
}

// Show/Hide Sections
function showSection(section) {
    [welcomeSection, heroShowcaseSection, heroDecksSection, userAccountSection].forEach(s => s.style.display = 'none');
    section.style.display = 'block';
}

// Navbar Buttons
document.getElementById('hero-showcase-btn').addEventListener('click', () => {
    console.log("Hero Showcase button clicked");
    showSection(heroShowcaseSection);
    displayHeroes();
});

document.getElementById('get-started-btn').addEventListener('click', () => {
    console.log("Get Started button clicked");
    if (currentUser) {
        showSection(userAccountSection);
        displayUserDecks();
    } else {
        showAuthModal('register');
    }
});

document.getElementById('explore-heroes-btn').addEventListener('click', () => {
    console.log("Explore Heroes button clicked");
    showSection(heroShowcaseSection);
    displayHeroes();
});

// Auth Modal
function showAuthModal(type) {
    authModalTitle.textContent = type === 'register' ? 'Register' : 'Login';
    authSubmitBtn.textContent = type === 'register' ? 'Register' : 'Login';
    authModal.style.display = 'flex';
}

loginBtn.addEventListener('click', () => {
    console.log("Login button clicked");
    showAuthModal('login');
});

registerBtn.addEventListener('click', () => {
    console.log("Register button clicked");
    showAuthModal('register');
});

logoutBtn.addEventListener('click', async () => {
    console.log("Logout button clicked");
    try {
        await auth.signOut();
        currentUser = null;
        try {
            localStorage.removeItem('currentUser');
        } catch (error) {
            console.error("Error removing from localStorage:", error);
        }
        showSection(welcomeSection);
    } catch (error) {
        console.error("Error signing out:", error);
        alert("Error signing out. Please check the console for details.");
    }
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        authModal.style.display = 'none';
        deckModal.style.display = 'none';
        deckDetailsModal.style.display = 'none';
    });
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    if (authSubmitBtn.textContent === 'Register') {
        try {
            // Check if username already exists
            const userSnapshot = await db.collection('users').where('username', '==', username).get();
            if (!userSnapshot.empty) {
                alert('Username already exists!');
                return;
            }

            // Create new user
            const userId = auth.currentUser.uid;
            const newUser = { username, password, decks: [] };
            await db.collection('users').doc(userId).set(newUser);
            currentUser = newUser;
            currentUser.uid = userId;
            users.push(currentUser);
            console.log("User registered:", currentUser);
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Error registering user. Please check the console for details.");
            return;
        }
    } else {
        // Login
        try {
            const userSnapshot = await db.collection('users').where('username', '==', username).where('password', '==', password).get();
            if (userSnapshot.empty) {
                alert('Invalid credentials!');
                return;
            }
            const userDoc = userSnapshot.docs[0];
            currentUser = userDoc.data();
            currentUser.uid = userDoc.id;
            console.log("User logged in:", currentUser);
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Error logging in. Please check the console for details.");
            return;
        }
    }

    try {
        localStorage.setItem('currentUser', currentUser.username);
    } catch (error) {
        console.error("Error setting localStorage:", error);
    }
    authModal.style.display = 'none';
    updateUIForCurrentUser();
});

// Display Heroes in Showcase
function displayHeroes() {
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
            <img src="${getImageUrl(hero.name, 'heroes')}" alt="${hero.name}">
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
        const deckHero = heroes.find(h => h.id === deck.heroId);
        deckCard.innerHTML = `
            <h3>${deck.name}</h3>
            <p>Created by: ${deck.creator}</p>
            <p>${deck.description}</p>
            <p>Hero: ${deckHero ? deckHero.name : 'Unknown'}</p>
            <p>Likes: ${deck.likes}</p>
            <button class="like-btn">Like</button>
        `;
        deckCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-btn')) return;
            showDeckDetails(deck);
        });
        deckCard.querySelector('.like-btn').addEventListener('click', async () => {
            if (!currentUser) {
                alert('Please log in to like a deck!');
                return;
            }
            const likeKey = `${currentUser.username}:${deck.name}`;
            if (userLikes[likeKey]) {
                alert('You have already liked this deck!');
                return;
            }
            try {
                deck.likes++;
                hero.totalLikes++;
                userLikes[likeKey] = true;
                await db.collection('userLikes').doc(likeKey).set({ value: true });
                const user = users.find(u => u.username === deck.creator);
                const userDeck = user.decks.find(d => d.name === deck.name);
                if (userDeck) {
                    userDeck.likes = deck.likes;
                    await db.collection('users').doc(user.uid).update({ decks: user.decks });
                }
                displayHeroDecks(hero);
                displayHeroes();
            } catch (error) {
                console.error("Error liking deck:", error);
                alert("Error liking deck. Please check the console for details.");
            }
        });
        heroDecksList.appendChild(deckCard);
    });
}

// Display User's Decks
function displayUserDecks() {
    document.getElementById('user-account-title').textContent = `${currentUser.username}'s Decks`;
    userDecksList.innerHTML = '';
    currentUser.decks.forEach(deck => {
        const hero = heroes.find(h => h.id === deck.heroId);
        const deckCard = document.createElement('div');
        deckCard.innerHTML = `
            <h3>${deck.name}</h3>
            <p>Hero: ${hero ? hero.name : 'Unknown'}</p>
            <p>${deck.description}</p>
            <p>Public: ${deck.isPublic ? 'Yes' : 'No'}</p>
            <button class="edit-deck-btn">Edit</button>
            <button class="delete-deck-btn">Delete</button>
            <button class="toggle-public-btn">${deck.isPublic ? 'Make Private' : 'Make Public'}</button>
        `;
        deckCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-deck-btn') || e.target.classList.contains('toggle-public-btn') || e.target.classList.contains('edit-deck-btn')) return;
            showDeckDetails(deck);
        });
        deckCard.querySelector('.edit-deck-btn').addEventListener('click', () => {
            showDeckModal('edit', deck);
        });
        deckCard.querySelector('.delete-deck-btn').addEventListener('click', async () => {
            try {
                const hero = heroes.find(h => h.id === deck.heroId);
                if (hero) {
                    if (deck.isPublic) {
                        hero.totalLikes -= deck.likes;
                        for (let key in userLikes) {
                            if (key.endsWith(`:${deck.name}`)) {
                                await db.collection('userLikes').doc(key).delete();
                                delete userLikes[key];
                            }
                        }
                    }
                    hero.decks = hero.decks.filter(d => d.name !== deck.name);
                }
                currentUser.decks = currentUser.decks.filter(d => d.name !== deck.name);
                await db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks });
                displayUserDecks();
                displayHeroes();
            } catch (error) {
                console.error("Error deleting deck:", error);
                alert("Error deleting deck. Please check the console for details.");
            }
        });
        deckCard.querySelector('.toggle-public-btn').addEventListener('click', async () => {
            try {
                deck.isPublic = !deck.isPublic;
                const hero = heroes.find(h => h.id === deck.heroId);
                if (hero) {
                    if (deck.isPublic) {
                        hero.decks.push(deck);
                    } else {
                        hero.decks = hero.decks.filter(d => d.name !== deck.name);
                        hero.totalLikes -= deck.likes;
                        for (let key in userLikes) {
                            if (key.endsWith(`:${deck.name}`)) {
                                await db.collection('userLikes').doc(key).delete();
                                delete userLikes[key];
                            }
                        }
                        deck.likes = 0;
                    }
                }
                await db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks });
                displayUserDecks();
                displayHeroes();
            } catch (error) {
                console.error("Error toggling deck visibility:", error);
                alert("Error toggling deck visibility. Please check the console for details.");
            }
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
    deckDetailsHero.textContent = hero ? hero.name : 'Unknown';
    deckDetailsHeroImage.innerHTML = `<img src="${getImageUrl(hero ? hero.name : 'Unknown', 'heroes')}" alt="${hero ? hero.name : 'Unknown'}">`;

    deckDetailsTroops.innerHTML = '';
    deck.troops.forEach(troopId => {
        const troop = troops.find(t => t.id === troopId);
        const troopCard = document.createElement('div');
        troopCard.innerHTML = `
            <img src="${getImageUrl(troop ? troop.name : 'Unknown', 'troops')}" alt="${troop ? troop.name : 'Unknown'}">
            <p>${troop ? troop.name : 'Unknown'}</p>
        `;
        deckDetailsTroops.appendChild(troopCard);
    });

    deckDetailsModal.style.display = 'flex';
}

// Show Deck Modal (Add or Edit)
function showDeckModal(mode, deck = null) {
    deckModalTitle.textContent = mode === 'add' ? 'Add New Deck' : 'Edit Deck';
    deckSubmitBtn.textContent = mode === 'add' ? 'Add Deck' : 'Save Changes';
    deckModal.style.display = 'flex';

    heroSelect.innerHTML = '<option value="" disabled selected>Select Hero</option>';
    heroes.forEach(hero => {
        const option = document.createElement('option');
        option.value = hero.id;
        option.textContent = hero.name;
        if (deck && deck.heroId === hero.id) {
            option.selected = true;
        }
        heroSelect.appendChild(option);
    });

    troopSelectors.innerHTML = '';
    const troopSelects = [];
    for (let i = 1; i <= 6; i++) {
        const select = document.createElement('select');
        select.required = true;
        select.innerHTML = `<option value="" disabled selected>Select Troop ${i}</option>`;
        troops.forEach(troop => {
            const option = document.createElement('option');
            option.value = troop.id;
            option.textContent = troop.name;
            select.appendChild(option);
        });
        select.addEventListener('change', () => {
            const selectedTroops = troopSelects.map(s => s.value).filter(v => v !== '');
            troopSelects.forEach(s => {
                const currentValue = s.value;
                s.innerHTML = `<option value="" disabled ${!currentValue ? 'selected' : ''}>Select Troop ${troopSelects.indexOf(s) + 1}</option>`;
                troops.forEach(troop => {
                    if (!selectedTroops.includes(String(troop.id)) || String(troop.id) === currentValue) {
                        const option = document.createElement('option');
                        option.value = troop.id;
                        option.textContent = troop.name;
                        if (String(troop.id) === currentValue) option.selected = true;
                        s.appendChild(option);
                    }
                });
            });
        });
        troopSelectors.appendChild(select);
        troopSelects.push(select);
    }

    if (mode === 'edit' && deck) {
        document.getElementById('deck-name-input').value = deck.name;
        heroSelect.value = deck.heroId;
        troopSelects.forEach((select, index) => {
            if (deck.troops[index]) {
                select.value = deck.troops[index];
                select.dispatchEvent(new Event('change'));
            }
        });
        document.getElementById('deck-description-input').value = deck.description;
        document.getElementById('deck-public-input').checked = deck.isPublic;
    }

    deckForm.onsubmit = async (e) => {
        e.preventDefault();
        const deckName = document.getElementById('deck-name-input').value;
        const heroId = parseInt(heroSelect.value);
        const troops = troopSelects.map(s => parseInt(s.value));
        const description = document.getElementById('deck-description-input').value;
        const isPublic = document.getElementById('deck-public-input').checked;

        const newDeck = {
            name: deckName,
            heroId,
            troops,
            description,
            isPublic,
            creator: currentUser.username,
            likes: mode === 'edit' && deck ? deck.likes : 0
        };

        try {
            if (mode === 'add') {
                currentUser.decks.push(newDeck);
                if (isPublic) {
                    const hero = heroes.find(h => h.id === heroId);
                    if (hero) {
                        hero.decks.push(newDeck);
                    }
                }
            } else {
                const deckIndex = currentUser.decks.findIndex(d => d.name === deck.name);
                newDeck.likes = deck.likes;
                currentUser.decks[deckIndex] = newDeck;
                const hero = heroes.find(h => h.id === deck.heroId);
                if (hero) {
                    hero.decks = hero.decks.filter(d => d.name !== deck.name);
                    if (isPublic) {
                        hero.decks.push(newDeck);
                    }
                }
            }

            await db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks });
            deckModal.style.display = 'none';
            displayUserDecks();
        } catch (error) {
            console.error("Error saving deck:", error);
            alert("Error saving deck. Please check the console for details.");
        }
    };
}

// Add Deck Button
document.getElementById('add-deck-btn').addEventListener('click', () => {
    console.log("Add Deck button clicked");
    if (!currentUser) {
        alert('Please log in to add a deck!');
        return;
    }
    showDeckModal('add');
});

// Delete Account Button
document.getElementById('delete-account-btn').addEventListener('click', async () => {
    console.log("Delete Account button clicked");
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
        await db.collection('users').doc(currentUser.uid).delete();
        for (let key in userLikes) {
            if (key.startsWith(currentUser.username)) {
                await db.collection('userLikes').doc(key).delete();
                delete userLikes[key];
            }
        }
        users = users.filter(u => u.username !== currentUser.username);
        heroes.forEach(hero => {
            hero.decks = [];
            hero.totalLikes = 0;
        });
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
        await auth.signOut();
        currentUser = null;
        try {
            localStorage.removeItem('currentUser');
        } catch (error) {
            console.error("Error removing from localStorage:", error);
        }
        showSection(welcomeSection);
    } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account. Please check the console for details.");
    }
});
