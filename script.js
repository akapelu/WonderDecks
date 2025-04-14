// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDq8_wQvQzITCNdoGZmxcoC8jOfP2lEN3I", 
    authDomain: "wonderdecks-6ca4f.firebaseapp.com",
    projectId: "wonderdecks-6ca4f",
    storageBucket: "wonderdecks-6ca4f.appspot.com",
    messagingSenderId: "715734231945",
    appId: "1:715734231945:web:d74cd383ec031e980ecf58",
    measurementId: "G-Q9DJVZCY6"
};
// Initialize Firebase
let db, auth;
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase inicializado correctamente");
    db = firebase.firestore();
    auth = firebase.auth();

    // Habilitar persistencia offline
    db.enablePersistence()
        .then(() => {
            console.log("Persistencia offline de Firestore habilitada");
        })
        .catch(error => {
            if (error.code === 'failed-precondition') {
                console.warn("La persistencia offline solo puede habilitarse en una pestaña a la vez.");
            } else if (error.code === 'unimplemented') {
                console.warn("La persistencia offline no es compatible con este navegador.");
            }
        });

    // Configurar persistencia de autenticación en LOCAL
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            console.log("Persistencia de autenticación configurada en LOCAL");
        })
        .catch(error => {
            console.error("Error al configurar la persistencia de autenticación:", error);
            alert("Error al configurar la persistencia de autenticación. Revisa la consola para más detalles.");
        });
} catch (error) {
    console.error("Error al inicializar Firebase:", error);
    alert("Error al inicializar Firebase. Verifica tu configuración de Firebase (por ejemplo, la API key) y asegúrate de tener una conexión a internet estable.");
}

// Datos simulados del backend
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

// URL base del repositorio de GitHub para las imágenes
const githubBaseUrl = "https://raw.githubusercontent.com/akapelu/WonderDecks/main/";

// Función para obtener la URL de la imagen de un héroe o tropa
function getImageUrl(name, type) {
    if (!name) return ''; // Evitar errores si name es undefined
    const formattedName = name.toUpperCase().replace(/\s/g, '_');
    return `${githubBaseUrl}${type}/${formattedName}.png`;
}

// Mecanismo de reintento para operaciones de Firestore con más intentos y retrasos
async function firestoreOperationWithRetry(operation, maxRetries = 10, delay = 3000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await operation();
            console.log(`Operación de Firestore exitosa en el intento ${attempt}`);
            return result;
        } catch (error) {
            if (attempt === maxRetries) {
                console.error(`Operación de Firestore falló después de ${maxRetries} intentos:`, error);
                throw error;
            }
            console.warn(`Operación de Firestore falló, reintentando (${attempt}/${maxRetries})...`, error);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Autenticar usuario anónimamente al cargar la página
auth.signInAnonymously().catch(error => {
    console.error("Error al iniciar sesión anónima:", error);
    alert("Error al iniciar sesión anónima. Asegúrate de que la autenticación anónima de Firebase esté habilitada y revisa tu conexión a internet.");
});

// Escuchar cambios en el estado de autenticación
auth.onAuthStateChanged(async user => {
    if (user) {
        console.log("Usuario conectado anónimamente:", user.uid);
        try {
            const userDoc = await firestoreOperationWithRetry(() => db.collection('users').doc(user.uid).get());
            if (userDoc.exists) {
                currentUser = userDoc.data();
                currentUser.uid = user.uid;
                updateUIForCurrentUser();
            } else {
                console.log("No se encontró documento de usuario para UID:", user.uid);
            }
        } catch (error) {
            console.error("Error al obtener datos del usuario:", error);
            alert("Error al obtener datos del usuario. Revisa tu conexión a internet e intenta de nuevo.");
        }
        // Configurar listeners en tiempo real
        setupRealtimeListeners();
    } else {
        console.log("Usuario desconectado");
        currentUser = null;
        updateUIForCurrentUser();
        // Re-autenticar anónimamente después de cerrar sesión
        auth.signInAnonymously().catch(error => {
            console.error("Error al iniciar sesión anónima después de cerrar sesión:", error);
            alert("Error al iniciar sesión anónima después de cerrar sesión. Revisa tu conexión a internet.");
        });
    }
});

// Configurar listeners en tiempo real para users y userLikes
function setupRealtimeListeners() {
    // Escuchar cambios en la colección users
    db.collection('users').onSnapshot(snapshot => {
        users = [];
        snapshot.forEach(doc => {
            const userData = doc.data();
            userData.uid = doc.id;
            users.push(userData);
            if (currentUser && currentUser.uid === doc.id) {
                currentUser = userData;
                currentUser.uid = doc.id;
                updateUIForCurrentUser();
                if (userAccountSection.style.display === 'block') {
                    displayUserDecks();
                }
            }
        });
        console.log("Usuarios actualizados en tiempo real:", users);
        // Actualizar los decks de los héroes y la UI
        loadHeroesDecks();
        if (heroShowcaseSection.style.display === 'block') {
            displayHeroes();
        }
        if (heroDecksSection.style.display === 'block') {
            const currentHero = heroes.find(h => h.name === document.getElementById('hero-decks-title').textContent.split(' ')[0]);
            if (currentHero) {
                displayHeroDecks(currentHero);
            }
        }
    }, error => {
        console.error("Error al escuchar la colección users:", error);
        alert("Error al sincronizar usuarios en tiempo real. Revisa tu conexión a internet.");
    });

    // Escuchar cambios en la colección userLikes
    db.collection('userLikes').onSnapshot(snapshot => {
        userLikes = {};
        snapshot.forEach(doc => {
            userLikes[doc.id] = doc.data().value;
        });
        console.log("UserLikes actualizados en tiempo real:", userLikes);
        // Actualizar los decks de los héroes y la UI
        loadHeroesDecks();
        if (heroShowcaseSection.style.display === 'block') {
            displayHeroes();
        }
        if (heroDecksSection.style.display === 'block') {
            const currentHero = heroes.find(h => h.name === document.getElementById('hero-decks-title').textContent.split(' ')[0]);
            if (currentHero) {
                displayHeroDecks(currentHero);
            }
        }
    }, error => {
        console.error("Error al escuchar la colección userLikes:", error);
        alert("Error al sincronizar likes de usuarios en tiempo real. Revisa tu conexión a internet.");
    });
}

// Cargar los decks de los héroes desde los decks públicos de los usuarios
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

// Elementos del DOM
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

// Actualizar la UI según el usuario actual
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

// Mostrar/Ocultar secciones
function showSection(section) {
    [welcomeSection, heroShowcaseSection, heroDecksSection, userAccountSection].forEach(s => s.style.display = 'none');
    section.style.display = 'block';
}

// Botones de la barra de navegación
document.getElementById('hero-showcase-btn').addEventListener('click', () => {
    console.log("Botón Hero Showcase clickeado");
    showSection(heroShowcaseSection);
    displayHeroes();
});

document.getElementById('get-started-btn').addEventListener('click', () => {
    console.log("Botón Get Started clickeado");
    if (currentUser) {
        showSection(userAccountSection);
        displayUserDecks();
    } else {
        showAuthModal('register');
    }
});

document.getElementById('explore-heroes-btn').addEventListener('click', () => {
    console.log("Botón Explore Heroes clickeado");
    showSection(heroShowcaseSection);
    displayHeroes();
});

// Modal de autenticación
function showAuthModal(type) {
    authModalTitle.textContent = type === 'register' ? 'Registrarse' : 'Iniciar Sesión';
    authSubmitBtn.textContent = type === 'register' ? 'Registrarse' : 'Iniciar Sesión';
    authModal.style.display = 'flex';
}

loginBtn.addEventListener('click', () => {
    console.log("Botón Login clickeado");
    showAuthModal('login');
});

registerBtn.addEventListener('click', () => {
    console.log("Botón Register clickeado");
    showAuthModal('register');
});

logoutBtn.addEventListener('click', async () => {
    console.log("Botón Logout clickeado");
    try {
        await auth.signOut();
        currentUser = null;
        showSection(welcomeSection);
        updateUIForCurrentUser();
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Error al cerrar sesión. Revisa tu conexión a internet e intenta de nuevo.");
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

    if (authSubmitBtn.textContent === 'Registrarse') {
        if (!auth.currentUser) {
            alert("Autenticación fallida. Asegúrate de que Firebase esté configurado correctamente e intenta de nuevo.");
            return;
        }
        try {
            // Verificar si el nombre de usuario ya existe
            const userSnapshot = await firestoreOperationWithRetry(() => db.collection('users').where('username', '==', username).get());
            if (!userSnapshot.empty) {
                alert('¡El nombre de usuario ya existe!');
                return;
            }

            // Crear nuevo usuario
            const userId = auth.currentUser.uid;
            const newUser = { username, password, decks: [] };
            await firestoreOperationWithRetry(() => db.collection('users').doc(userId).set(newUser));
            currentUser = { ...newUser, uid: userId };
            users.push(currentUser);
            console.log("Usuario registrado:", currentUser);

            // Cerrar modal y actualizar UI
            authModal.style.display = 'none';
            updateUIForCurrentUser();
            showSection(userAccountSection);
            displayUserDecks();
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Error al registrar usuario. Revisa tu conexión a internet y la configuración de Firebase.");
        }
    } else {
        // Iniciar sesión
        try {
            const userSnapshot = await firestoreOperationWithRetry(() => db.collection('users').where('username', '==', username).where('password', '==', password).get());
            if (userSnapshot.empty) {
                alert('¡Credenciales inválidas!');
                return;
            }
            const userDoc = userSnapshot.docs[0];
            currentUser = userDoc.data();
            currentUser.uid = userDoc.id;
            console.log("Usuario conectado:", currentUser);

            // Cerrar modal y actualizar UI
            authModal.style.display = 'none';
            updateUIForCurrentUser();
            showSection(userAccountSection);
            displayUserDecks();
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error al iniciar sesión. Revisa tu conexión a internet e intenta de nuevo.");
        }
    }
});

// Mostrar héroes en el Showcase
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
            <p>Decks Públicos: ${hero.decks.filter(d => d.isPublic).length}</p>
            <p>Likes Totales: ${hero.totalLikes}</p>
        `;
        heroCard.addEventListener('click', () => {
            showSection(heroDecksSection);
            displayHeroDecks(hero);
        });
        heroList.appendChild(heroCard);
    });
}

// Mostrar decks de un héroe específico
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
            <p>Creado por: ${deck.creator}</p>
            <p>${deck.description}</p>
            <p>Héroe: ${deckHero ? deckHero.name : 'Desconocido'}</p>
            <p>Likes: ${deck.likes}</p>
            <button class="like-btn">Like</button>
        `;
        deckCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-btn')) return;
            showDeckDetails(deck);
        });
        deckCard.querySelector('.like-btn').addEventListener('click', async () => {
            if (!currentUser) {
                alert('¡Por favor inicia sesión para dar like a un deck!');
                return;
            }
            const likeKey = `${currentUser.username}:${deck.name}`;
            if (userLikes[likeKey]) {
                alert('¡Ya has dado like a este deck!');
                return;
            }
            try {
                deck.likes++;
                hero.totalLikes++;
                userLikes[likeKey] = true;
                await firestoreOperationWithRetry(() => db.collection('userLikes').doc(likeKey).set({ value: true }));
                const user = users.find(u => u.username === deck.creator);
                const userDeck = user.decks.find(d => d.name === deck.name);
                if (userDeck) {
                    userDeck.likes = deck.likes;
                    await firestoreOperationWithRetry(() => db.collection('users').doc(user.uid).update({ decks: user.decks }));
                }
            } catch (error) {
                console.error("Error al dar like al deck:", error);
                alert("Error al dar like al deck. Revisa tu conexión a internet e intenta de nuevo.");
            }
        });
        heroDecksList.appendChild(deckCard);
    });
}

// Mostrar los decks del usuario
function displayUserDecks() {
    if (!currentUser) return;
    document.getElementById('user-account-title').textContent = `Decks de ${currentUser.username}`;
    userDecksList.innerHTML = '';
    currentUser.decks.forEach(deck => {
        const hero = heroes.find(h => h.id === deck.heroId);
        const deckCard = document.createElement('div');
        deckCard.innerHTML = `
            <h3>${deck.name}</h3>
            <p>Héroe: ${hero ? hero.name : 'Desconocido'}</p>
            <p>${deck.description}</p>
            <p>Público: ${deck.isPublic ? 'Sí' : 'No'}</p>
            <button class="edit-deck-btn">Editar</button>
            <button class="delete-deck-btn">Eliminar</button>
            <button class="toggle-public-btn">${deck.isPublic ? 'Hacer Privado' : 'Hacer Público'}</button>
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
                currentUser.decks = currentUser.decks.filter(d => d.name !== deck.name);
                await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks }));
            } catch (error) {
                console.error("Error al eliminar el deck:", error);
                alert("Error al eliminar el deck. Revisa tu conexión a internet e intenta de nuevo.");
            }
        });
        deckCard.querySelector('.toggle-public-btn').addEventListener('click', async () => {
            try {
                deck.isPublic = !deck.isPublic;
                if (!deck.isPublic) {
                    deck.likes = 0;
                    for (let key in userLikes) {
                        if (key.endsWith(`:${deck.name}`)) {
                            await firestoreOperationWithRetry(() => db.collection('userLikes').doc(key).delete());
                        }
                    }
                }
                await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks }));
            } catch (error) {
                console.error("Error al cambiar la visibilidad del deck:", error);
                alert("Error al cambiar la visibilidad del deck. Revisa tu conexión a internet e intenta de nuevo.");
            }
        });
        userDecksList.appendChild(deckCard);
    });
}

// Mostrar detalles del deck
function showDeckDetails(deck) {
    deckDetailsTitle.textContent = deck.name;
    deckDetailsCreator.textContent = deck.creator || currentUser.username;
    deckDetailsDescription.textContent = deck.description;
    const hero = heroes.find(h => h.id === deck.heroId);
    deckDetailsHero.textContent = hero ? hero.name : 'Desconocido';
    deckDetailsHeroImage.innerHTML = `<img src="${getImageUrl(hero ? hero.name : 'Desconocido', 'heroes')}" alt="${hero ? hero.name : 'Desconocido'}">`;

    deckDetailsTroops.innerHTML = '';
    deck.troops.forEach(troopId => {
        const troop = troops.find(t => t.id === troopId);
        const troopCard = document.createElement('div');
        troopCard.innerHTML = `
            <img src="${getImageUrl(troop ? troop.name : 'Desconocido', 'troops')}" alt="${troop ? troop.name : 'Desconocido'}">
            <p>${troop ? troop.name : 'Desconocido'}</p>
        `;
        deckDetailsTroops.appendChild(troopCard);
    });

    deckDetailsModal.style.display = 'flex';
}

// Mostrar modal de deck (Agregar o Editar)
function showDeckModal(mode, deck = null) {
    deckModalTitle.textContent = mode === 'add' ? 'Agregar Nuevo Deck' : 'Editar Deck';
    deckSubmitBtn.textContent = mode === 'add' ? 'Agregar Deck' : 'Guardar Cambios';
    deckModal.style.display = 'flex';

    // Limpiar envíos anteriores del formulario
    deckForm.onsubmit = null;

    // Resetear campos del formulario
    const deckNameInput = document.getElementById('deck-name-input');
    const deckDescriptionInput = document.getElementById('deck-description-input');
    const deckPublicInput = document.getElementById('deck-public-input');
    deckNameInput.value = '';
    heroSelect.innerHTML = '<option value="" disabled selected>Seleccionar Héroe</option>';
    troopSelectors.innerHTML = '';
    deckDescriptionInput.value = '';
    deckPublicInput.checked = false;

    // Poblar el selector de héroes
    heroes.forEach(hero => {
        const option = document.createElement('option');
        option.value = hero.id;
        option.textContent = hero.name;
        if (deck && deck.heroId === hero.id) {
            option.selected = true;
        }
        heroSelect.appendChild(option);
    });

    // Poblar los selectores de tropas
    const troopSelects = [];
    for (let i = 1; i <= 6; i++) {
        const select = document.createElement('select');
        select.required = true;
        select.innerHTML = `<option value="" disabled selected>Seleccionar Tropa ${i}</option>`;
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
                s.innerHTML = `<option value="" disabled ${!currentValue ? 'selected' : ''}>Seleccionar Tropa ${troopSelects.indexOf(s) + 1}</option>`;
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

    // Poblar campos si se está editando
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

        // Verificar nombres de deck duplicados
        if (mode === 'add' && currentUser.decks.some(d => d.name === deckName)) {
            alert('¡Ya existe un deck con este nombre!');
            return;
        }

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
            } else {
                const deckIndex = currentUser.decks.findIndex(d => d.name === deck.name);
                newDeck.likes = deck.likes;
                currentUser.decks[deckIndex] = newDeck;
            }

            await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).update({ decks: currentUser.decks }));
            console.log("Deck guardado exitosamente:", newDeck);

            // Cerrar modal y actualizar UI
            deckModal.style.display = 'none';
            displayUserDecks();
        } catch (error) {
            console.error("Error al guardar el deck:", error);
            alert("Error al guardar el deck. Revisa tu conexión a internet y la configuración de Firebase.");
            deckModal.style.display = 'none';
        }
    };
}

// Botón de agregar deck
document.getElementById('add-deck-btn').addEventListener('click', () => {
    console.log("Botón Add Deck clickeado");
    if (!currentUser) {
        alert('¡Por favor inicia sesión para agregar un deck!');
        return;
    }
    showDeckModal('add');
});

// Botón de eliminar cuenta
document.getElementById('delete-account-btn').addEventListener('click', async () => {
    console.log("Botón Delete Account clickeado");
    if (!confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    try {
        // Eliminar documento del usuario
        await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).delete());

        // Eliminar likes asociados
        const likeKeys = Object.keys(userLikes).filter(key => key.startsWith(currentUser.username));
        for (const key of likeKeys) {
            await firestoreOperationWithRetry(() => db.collection('userLikes').doc(key).delete());
        }

        // Cerrar sesión y resetear estado
        await auth.signOut();
        setTimeout(() => {
            currentUser = null;
            showSection(welcomeSection);
            updateUIForCurrentUser();
        }, 500);
    } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
        alert("Error al eliminar la cuenta. Revisa tu conexión a internet e intenta de nuevo.");
        await auth.signOut();
        setTimeout(() => {
            currentUser = null;
            showSection(welcomeSection);
            updateUIForCurrentUser();
        }, 500);
    }
});
