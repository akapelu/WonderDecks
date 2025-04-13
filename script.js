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
    { id: 11, name: "KROGNAR", decks: [], totalLikes: 0 },
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
    const formattedName = name.toUpperCase().replace(/\s/g, '_'); // Match the case of the filenames (e.g., AVERY.png)
    return `${githubBaseUrl}${type}/${formattedName}.png`;
}

// Data version for migration
const currentDataVersion = "1.3";

// Migration function to handle changes in data structure
function migrateData() {
    const storedVersion = localStorage.getItem('dataVersion') || "1.0";
    users = JSON.parse(localStorage.getItem('users')) || [];
    userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};

    if (storedVersion === currentDataVersion) {
        return; // No migration needed
    }

    // Migration from 1.0 to 1.3
    if (storedVersion === "1.0") {
        // In version 1.0, the heroes might have had different names (e.g., "Hero 1", "Hero 2", etc.)
        // We need to update the decks to use the new hero names based on their IDs
        const oldHeroes = [
            { id: 1, name: "Hero 1" },
            { id: 2, name: "Hero 2" },
            { id: 3, name: "Hero 3" },
            { id: 4, name: "Hero 4" },
            { id: 5, name: "Hero 5" },
            { id: 6, name: "Hero 6" },
            { id: 7, name: "Hero 7" },
            { id: 8, name: "Hero 8" },
            { id: 9, name: "Hero 9" },
            { id: 10, name: "Hero 10" },
            { id: 11, name: "Hero 11" },
            { id: 12, name: "Hero 12" },
            { id: 13, name: "Hero 13" },
            { id: 14, name: "Hero 14" },
            { id: 15, name: "Hero 15" },
            { id: 16, name: "Hero 16" },
            { id: 17, name: "Hero 17" },
            { id: 18, name: "Hero 18" }
        ];

        users.forEach(user => {
            user.decks.forEach(deck => {
                const oldHero = oldHeroes.find(h => h.id === deck.heroId);
                const newHero = heroes.find(h => h.id === deck.heroId);
                if (oldHero && newHero) {
                    // Update the deck to reflect the new hero name (if needed)
                    deck.heroName = newHero.name; // Optional: store hero name for display purposes
                }
            });
        });

        // Update userLikes to use the new format if needed
        const newUserLikes = {};
        for (let key in userLikes) {
            newUserLikes[key] = true; // Structure remains the same, but we ensure compatibility
        }
        userLikes = newUserLikes;

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('userLikes', JSON.stringify(userLikes));
        localStorage.setItem('dataVersion', currentDataVersion);
    }
}

// Run migration on load
migrateData();

// Load current user from localStorage
const savedUser = localStorage.getItem('currentUser');
if (savedUser) {
    const user = users.find(u => u.username === savedUser);
    if (user) {
        currentUser = user;
    }
}

// Load heroes' decks from users' public decks
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
}

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
    localStorage.removeItem('currentUser'); // Remove current user from localStorage
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    userNameDisplay.style.display = 'none';
    logoutBtn.style.display = 'none';
    showSection(welcomeSection);
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        authModal.style.display = 'none';
        deckModal.style.display = 'none';
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

    // Save current user to localStorage
    localStorage.setItem('currentUser', currentUser.username);

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
        deckCard.querySelector('.like-btn').addEventListener('click', () => {
            if (!currentUser) {
                alert('Please log in to like a deck!');
                return;
            }
            const likeKey = `${currentUser.username}:${deck.name}`;
            if (userLikes[likeKey]) {
                alert('You have already liked this deck!');
                return;
            }
            deck.likes++;
            hero.totalLikes++;
            userLikes[likeKey] = true;
            localStorage.setItem('userLikes', JSON.stringify(userLikes));
            // Update the user's deck in localStorage
            const user = users.find(u => u.username === deck.creator);
            const userDeck = user.decks.find(d => d.name === deck.name);
            if (userDeck) {
                userDeck.likes = deck.likes;
                localStorage.setItem('users', JSON.stringify(users));
            }
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
        deckCard.querySelector('.delete-deck-btn').addEventListener('click', () => {
            const hero = heroes.find(h => h.id === deck.heroId);
            if (hero) {
                if (deck.isPublic) {
                    // Subtract the likes from the hero's totalLikes
                    hero.totalLikes -= deck.likes;
                    // Remove likes associated with this deck from userLikes
                    for (let key in userLikes) {
                        if (key.endsWith(`:${deck.name}`)) {
                            delete userLikes[key];
                        }
                    }
                    localStorage.setItem('userLikes', JSON.stringify(userLikes));
                }
                hero.decks = hero.decks.filter(d => d.name !== deck.name);
            }
            currentUser.decks = currentUser.decks.filter(d => d.name !== deck.name);
            // Update localStorage
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            users[userIndex].decks = currentUser.decks;
            localStorage.setItem('users', JSON.stringify(users));
            displayUserDecks();
            displayHeroes(); // Update the Hero Showcase to reflect the new totalLikes
        });
        deckCard.querySelector('.toggle-public-btn').addEventListener('click', () => {
            deck.isPublic = !deck.isPublic;
            const hero = heroes.find(h => h.id === deck.heroId);
            if (hero) {
                if (deck.isPublic) {
                    hero.decks.push(deck);
                } else {
                    // Remove likes when making private
                    hero.decks = hero.decks.filter(d => d.name !== deck.name);
                    hero.totalLikes -= deck.likes;
                    // Remove likes from userLikes
                    for (let key in userLikes) {
                        if (key.endsWith(`:${deck.name}`)) {
                            delete userLikes[key];
                        }
                    }
                    localStorage.setItem('userLikes', JSON.stringify(userLikes));
                    deck.likes = 0; // Reset likes for the deck
                }
            }
            // Update localStorage
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            users[userIndex].decks = currentUser.decks;
            localStorage.setItem('users', JSON.stringify(users));
            displayUserDecks();
            displayHeroes(); // Update the Hero Showcase
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

    // Populate hero dropdown
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

    // Populate troop selectors
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
                select.dispatchEvent(new Event('change')); // Trigger change to update options
            }
        });
        document.getElementById('deck-description-input').value = deck.description;
        document.getElementById('deck-public-input').checked = deck.isPublic;
    }

    deckForm.onsubmit = (e) => {
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
            newDeck.likes = deck.likes; // Preserve likes
            currentUser.decks[deckIndex] = newDeck;
            const hero = heroes.find(h => h.id === deck.heroId);
            if (hero) {
                hero.decks = hero.decks.filter(d => d.name !== deck.name);
                if (isPublic) {
                    hero.decks.push(newDeck);
                }
            }
        }

        // Update localStorage
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        users[userIndex].decks = currentUser.decks;
        localStorage.setItem('users', JSON.stringify(users));

        deckModal.style.display = 'none';
        displayUserDecks();
    };
}

// Add Deck Button
document.getElementById('add-deck-btn').addEventListener('click', () => {
    if (!currentUser) {
        alert('Please log in to add a deck!');
        return;
    }
    showDeckModal('add');
});

// Delete Account Button
document.getElementById('delete-account-btn').addEventListener('click', () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    users = users.filter(u => u.username !== currentUser.username);
    localStorage.setItem('users', JSON.stringify(users));
    // Remove likes associated with this user
    for (let key in userLikes) {
        if (key.startsWith(currentUser.username)) {
            delete userLikes[key];
        }
    }
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
    // Reset heroes' decks
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
    currentUser = null;
    localStorage.removeItem('currentUser'); // Remove current user from localStorage
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    userNameDisplay.style.display = 'none';
    logoutBtn.style.display = 'none';
    showSection(welcomeSection);
});
