// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDq8_wQvQzITCNdoGZmxcoC8jOfP2lEN3I",
    authDomain: "wonderdecks-6cadf.firebaseapp.com",
    projectId: "wonderdecks-6cadf",
    storageBucket: "wonderdecks-6cadf.firebasestorage.app",
    messagingSenderId: "715734231945",
    appId: "1:715734231945:web:d74cd383ec031e980ecf58",
    measurementId: "G-Q9DJVZCY6"
};

// Initialize Firebase
let db, auth;
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
    db = firebase.firestore();
    auth = firebase.auth();
    // Configurar persistencia de autenticación
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .catch(error => {
            console.warn("Error setting auth persistence to LOCAL, falling back to SESSION:", error);
            // Si LOCAL falla, intentar con SESSION
            return auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .catch(sessionError => {
                    console.error("Error setting auth persistence to SESSION:", sessionError);
                    // Si SESSION también falla, continuar sin persistencia
                    console.warn("Proceeding without auth persistence.");
                });
        });
} catch (error) {
    console.error("Error initializing Firebase:", error);
    alert("Error initializing Firebase. Please check your Firebase configuration and try again.");
}

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

// Function to get the image URL for a hero or troopítani

function getImageUrl(name, type) {
    if (!name) return ''; // Avoid errors if name is undefined
    const formattedName = name.toUpperCase().replace(/\s/g, '_');
    return `${githubBaseUrl}${type}/${formattedName}.png`;
}

// Retry mechanism for Firestore operations
async function firestoreOperationWithRetry(operation, maxRetries = 3, delay = 2000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await operation();
            console.log(`Firestore operation succeeded on attempt ${attempt}`);
            return result;
        } catch (error) {
            console.warn(`Firestore operation failed, retrying (${attempt}/${maxRetries})...`, error);
            if (attempt === maxRetries) {
                console.error(`Firestore operation failed after ${maxRetries} retries:`, error);
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Load users and userLikes from Firestore
async function loadUsersAndLikes() {
    try {
        // Load users
        const userSnapshot = await firestoreOperationWithRetry(() => db.collection('users').get());
        users = [];
        userSnapshot.forEach(doc => {
            const userData = doc.data();
            userData.uid = doc.id;
            // Normalizar los decks para asegurar que tengan todos los campos esperados
            userData.decks = userData.decks.map(deck => ({
                name: deck.name,
                heroId: deck.heroId,
                troops: deck.troops,
                description: deck.description,
                isPublic: deck.isPublic,
                creator: deck.creator,
                // No seteamos likes aquí, lo calcularemos dinámicamente
            }));
            users.push(userData);
        });
        console.log("Users loaded:", users);

        // Load userLikes
        const likesSnapshot = await firestoreOperationWithRetry(() => db.collection('userLikes').get());
        userLikes = {};
        likesSnapshot.forEach(doc => {
            userLikes[doc.id] = doc.data().value;
        });
        console.log("UserLikes loaded:", userLikes);

        // Calcular los likes para cada deck dinámicamente
        users.forEach(user => {
            user.decks.forEach(deck => {
                const deckLikes = Object.keys(userLikes).filter(key => 
                    key.endsWith(`:${deck.name}`) && userLikes[key] === true
                ).length;
                deck.likes = deckLikes; // Asignamos los likes dinámicamente
            });
        });

        // Update heroes' decks
        loadHeroesDecks();
    } catch (error) {
        console.error("Error loading users and likes:", error);
        alert("Error loading data from Firestore. Some features may not work correctly.");
    }
}

// Authenticate user anonymously on page load
auth.signInAnonymously().catch(error => {
    console.error("Error signing in anonymously:", error);
    alert("Error signing in anonymously. Please try again.");
});

// Listen for auth state changes
auth.onAuthStateChanged(async user => {
    if (user) {
        console.log("User signed in anonymously:", user.uid);
        try {
            // Intentar cargar el documento del usuario desde Firestore
            const userDoc = await firestoreOperationWithRetry(() => db.collection('users').doc(user.uid).get());
            if (userDoc.exists) {
                currentUser = userDoc.data();
                currentUser.uid = user.uid; // Aseguramos que currentUser.uid sea el correcto
                console.log("Current user data loaded:", currentUser);
                // Normalizar los decks de currentUser
                currentUser.decks = currentUser.decks.map(deck => ({
                    name: deck.name,
                    heroId: deck.heroId,
                    troops: deck.troops,
                    description: deck.description,
                    isPublic: deck.isPublic,
                    creator: deck.creator,
                }));
                updateUIForCurrentUser();
            } else {
                console.log("User document not found for UID:", user.uid);
                currentUser = null; // Aseguramos que currentUser sea null si no hay documento
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("Error fetching user data. Proceeding with local data.");
            currentUser = null; // En caso de error, reseteamos currentUser
        }
        await loadUsersAndLikes();
    } else {
        console.log("User signed out");
        currentUser = null;
        updateUIForCurrentUser();
        auth.signInAnonymously().catch(error => {
            console.error("Error signing in anonymously after logout:", error);
            alert("Error signing in anonymously after logout. Please try again.");
        });
    }
});

// Load heroes' decks from users' public decks
function loadHeroesDecks() {
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
        showSection(welcomeSection);
        updateUIForCurrentUser();
        await loadUsersAndLikes();
    } catch (error) {
        console.error("Error signing out:", error);
        alert("Error signing out. Please try again.");
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
        if (!auth.currentUser) {
            alert("Authentication failed. Please try again.");
            return;
        }

        // Check if username already exists
        try {
            const userSnapshot = await firestoreOperationWithRetry(() => db.collection('users').where('username', '==', username).get());
            if (!userSnapshot.empty) {
                alert('Username already exists!');
                return;
            }
        } catch (error) {
            console.error("Error checking username:", error);
            // Proceed with local check if Firestore fails
            if (users.some(user => user.username === username)) {
                alert('Username already exists!');
                return;
            }
        }

        // Create new user
        const userId = auth.currentUser.uid;
        const newUser = { username, password, decks: [] };
        try {
            await firestoreOperationWithRetry(() => db.collection('users').doc(userId).set(newUser));
            console.log("User registered in Firestore:", newUser);
        } catch (error) {
            console.error("Error registering user in Firestore:", error);
            alert("Error saving user to Firestore. Proceeding with local data.");
        }

        // Update local state regardless of Firestore success
        currentUser = { ...newUser, uid: userId };
        users.push(currentUser);
        console.log("User registered locally:", currentUser);

        // Close modal and update UI
        authModal.style.display = 'none';
        updateUIForCurrentUser();
        showSection(userAccountSection);
        displayUserDecks();

        // Reload users and likes
        await loadUsersAndLikes();
    } else {
        // Login
        try {
            const userSnapshot = await firestoreOperationWithRetry(() => 
                db.collection('users').where('username', '==', username).where('password', '==', password).get()
            );
            if (userSnapshot.empty) {
                alert('Invalid credentials!');
                return;
            }

            const userDoc = userSnapshot.docs[0];
            const userData = userDoc.data();
            const userId = userDoc.id;

            // Verificar si el UID coincide con el UID anónimo actual
            if (userId !== auth.currentUser.uid) {
                console.log("UID mismatch during login, updating user document...");
                try {
                    // 1. Verificar si ya existe un documento con el UID actual
                    const existingDoc = await firestoreOperationWithRetry(() => 
                        db.collection('users').doc(auth.currentUser.uid).get()
                    );
                    if (existingDoc.exists) {
                        // Si ya existe un documento con el UID actual, no creamos uno nuevo
                        console.warn("Document with current UID already exists, skipping migration.");
                        currentUser = existingDoc.data();
                        currentUser.uid = auth.currentUser.uid;
                    } else {
                        // 2. Copiar los datos del usuario al nuevo UID anónimo
                        await firestoreOperationWithRetry(() => 
                            db.collection('users').doc(auth.currentUser.uid).set(userData)
                        );

                        // 3. Actualizar los likes para reflejar el nuevo UID
                        const likeKeys = Object.keys(userLikes).filter(key => key.startsWith(`${username}:`));
                        for (const key of likeKeys) {
                            const newKey = `${username}:${key.split(':')[1]}`;
                            await firestoreOperationWithRetry(() => 
                                db.collection('userLikes').doc(newKey).set({ value: userLikes[key] })
                            );
                            await firestoreOperationWithRetry(() => 
                                db.collection('userLikes').doc(key).delete()
                            );
                        }

                        // 4. Eliminar el documento antiguo
                        await firestoreOperationWithRetry(() => 
                            db.collection('users').doc(userId).delete()
                        );

                        currentUser = userData;
                        currentUser.uid = auth.currentUser.uid;
                        console.log("User document migrated successfully to UID:", currentUser.uid);
                    }
                } catch (error) {
                    console.error("Error during UID migration:", error);
                    alert("Error syncing user data with Firestore. Proceeding with local data.");
                    currentUser = userData;
                    currentUser.uid = auth.currentUser.uid;
                }
            } else {
                currentUser = userData;
                currentUser.uid = auth.currentUser.uid;
                console.log("User logged in:", currentUser);
            }

            // Close modal and update UI
            authModal.style.display = 'none';
            updateUIForCurrentUser();
            showSection(userAccountSection);
            displayUserDecks();

            // Reload users and likes
            await loadUsersAndLikes();
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Error logging in. Checking local data.");

            // Fallback: Check local users if Firestore fails
            const localUser = users.find(u => u.username === username && u.password === password);
            if (localUser) {
                currentUser = localUser;
                currentUser.uid = auth.currentUser.uid;
                authModal.style.display = 'none';
                updateUIForCurrentUser();
                showSection(userAccountSection);
                displayUserDecks();
            } else {
                alert("Invalid credentials and unable to verify with Firestore.");
            }
        }
    }
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
                // Incrementar el conteo de likes localmente
                deck.likes = (deck.likes || 0) + 1;
                hero.totalLikes = (hero.totalLikes || 0) + 1;
                userLikes[likeKey] = true;

                // Guardar el like en la colección userLikes
                await firestoreOperationWithRetry(() => 
                    db.collection('userLikes').doc(likeKey).set({ value: true })
                );

                // Recargar los datos para sincronizar
                await loadUsersAndLikes();

                // Actualizar la UI
                deckCard.querySelector('p:nth-child(5)').textContent = `Likes: ${deck.likes}`;
            } catch (error) {
                console.error("Error liking deck:", error);
                alert("Error liking deck. Reverting changes.");

                // Revertir los cambios locales
                deck.likes = (deck.likes || 0) - 1;
                hero.totalLikes = (hero.totalLikes || 0) - 1;
                delete userLikes[likeKey];

                // Actualizar la UI
                deckCard.querySelector('p:nth-child(5)').textContent = `Likes: ${deck.likes}`;
            }
        });
        heroDecksList.appendChild(deckCard);
    });
}

// Display User's Decks
function displayUserDecks() {
    if (!currentUser) return;
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
                if (!auth.currentUser) {
                    throw new Error("User not authenticated");
                }
                currentUser.decks = currentUser.decks.filter(d => d.name !== deck.name);
                await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks }));
                await loadUsersAndLikes();
                displayUserDecks();
            } catch (error) {
                console.error("Error deleting deck:", error);
                alert("Error deleting deck. Reverting changes.");
                currentUser.decks = currentUser.decks.filter(d => d.name !== deck.name);
                displayUserDecks();
            }
        });
        deckCard.querySelector('.toggle-public-btn').addEventListener('click', async () => {
            try {
                if (!auth.currentUser) {
                    throw new Error("User not authenticated");
                }
                deck.isPublic = !deck.isPublic;
                if (!deck.isPublic) {
                    const likeKeys = Object.keys(userLikes).filter(key => key.endsWith(`:${deck.name}`));
                    for (const key of likeKeys) {
                        await firestoreOperationWithRetry(() => db.collection('userLikes').doc(key).delete());
                    }
                }
                await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks }));
                await loadUsersAndLikes();
                displayUserDecks();
            } catch (error) {
                console.error("Error toggling deck visibility:", error);
                alert("Error toggling deck visibility. Reverting changes.");
                deck.isPublic = !deck.isPublic;
                displayUserDecks();
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

    // Clear previous form submissions
    deckForm.onsubmit = null;

    // Reset form fields
    const deckNameInput = document.getElementById('deck-name-input');
    const deckDescriptionInput = document.getElementById('deck-description-input');
    const deckPublicInput = document.getElementById('deck-public-input');
    deckNameInput.value = '';
    heroSelect.innerHTML = '<option value="" disabled selected>Select Hero</option>';
    troopSelectors.innerHTML = '';
    deckDescriptionInput.value = '';
    deckPublicInput.checked = false;

    // Populate hero select
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

    // Populate fields if editing
    if (mode === 'edit' && deck) {
        deckNameInput.value = deck.name;
        heroSelect.value = deck.heroId;
        troopSelects.forEach((select, index) => {
            if (deck.troops[index]) {
                select.value = deck.troops[index];
                select.dispatchEvent(new Event('change'));
            }
        });
        deckDescriptionInput.value = deck.description;
        deckPublicInput.checked = deck.isPublic;
    }

    deckForm.onsubmit = async (e) => {
        e.preventDefault();
        const deckName = deckNameInput.value;
        const heroId = parseInt(heroSelect.value);
        const troops = troopSelects.map(s => parseInt(s.value));
        const description = deckDescriptionInput.value;
        const isPublic = deckPublicInput.checked;

        if (mode === 'add' && currentUser.decks.some(d => d.name === deckName)) {
            alert('A deck with this name already exists!');
            return;
        }

        // Verificar que el usuario esté autenticado
        if (!auth.currentUser) {
            alert("User not authenticated. Please log in again.");
            authModal.style.display = 'none';
            showAuthModal('login');
            return;
        }

        // Verificar que currentUser.uid coincida con auth.currentUser.uid
        if (currentUser.uid !== auth.currentUser.uid) {
            console.error("UID mismatch:", { currentUserUid: currentUser.uid, authUid: auth.currentUser.uid });
            // Actualizar el documento del usuario con el UID anónimo actual
            try {
                console.log("Migrating user document to new UID...");
                await firestoreOperationWithRetry(() => db.collection('users').doc(auth.currentUser.uid).set({
                    username: currentUser.username,
                    password: currentUser.password,
                    decks: currentUser.decks
                }));
                // Eliminar el documento antiguo
                await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).delete());
                // Actualizar currentUser.uid
                currentUser.uid = auth.currentUser.uid;
                console.log("User document migrated successfully to UID:", currentUser.uid);
            } catch (error) {
                console.error("Error migrating user document:", error);
                alert("Error syncing user data. Please log in again.");
                authModal.style.display = 'none';
                showAuthModal('login');
                return;
            }
        }

        const newDeck = {
            name: deckName,
            heroId,
            troops,
            description,
            isPublic,
            creator: currentUser.username,
        };

        try {
            console.log("Attempting to save deck for user:", { username: currentUser.username, uid: currentUser.uid });
            if (mode === 'add') {
                currentUser.decks.push(newDeck);
            } else {
                const deckIndex = currentUser.decks.findIndex(d => d.name === deck.name);
                currentUser.decks[deckIndex] = newDeck;
            }

            await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks }));
            console.log("Deck saved successfully:", newDeck);

            deckModal.style.display = 'none';
            displayUserDecks();
            await loadUsersAndLikes();
        } catch (error) {
            console.error("Error saving deck:", error);
            alert("Error saving deck. Proceeding with local data.");

            deckModal.style.display = 'none';
            displayUserDecks();
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
        if (!auth.currentUser) {
            throw new Error("User not authenticated");
        }
        await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).delete());
        const likeKeys = Object.keys(userLikes).filter(key => key.startsWith(currentUser.username));
        for (const key of likeKeys) {
            await firestoreOperationWithRetry(() => db.collection('userLikes').doc(key).delete());
        }
        await auth.signOut();
        currentUser = null;
        showSection(welcomeSection);
        updateUIForCurrentUser();
        await loadUsersAndLikes();
    } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account. Proceeding with logout.");

        await auth.signOut();
        currentUser = null;
        showSection(welcomeSection);
        updateUIForCurrentUser();
    }
});
