console.log("dcodeIO.bcrypt disponible:", typeof window.dcodeIO?.bcrypt);

function waitForBcrypt() {
    return new Promise((resolve, reject) => {
        const maxAttempts = 50;
        let attempts = 0;

        const checkBcrypt = setInterval(() => {
            attempts++;
            if (typeof window.dcodeIO?.bcrypt !== 'undefined') {
                clearInterval(checkBcrypt);
                resolve(window.dcodeIO.bcrypt);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkBcrypt);
                reject(new Error("bcrypt not available after 5s"));
            }
        }, 100);
    });
}

const firebaseConfig = {
  apiKey: "AIzaSyDq8_wQvQzITCNdoGZmxcoC8jOfP2lEN3I",
  authDomain: "wonderdecks-6cadf.firebaseapp.com",
  projectId: "wonderdecks-6cadf",
  storageBucket: "wonderdecks-6cadf.firebasestorage.app",
  messagingSenderId: "715734231945",
  appId: "1:715734231945:web:035df4243f443add0ecf58",
  measurementId: "G-2Z9MFLHWX8"
};


let db, auth;
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
    db = firebase.firestore();
    auth = firebase.auth();
    
} catch (error) {
    console.error("Error initializing Firebase:", error);
    alert("Error initializing Firebase. Please check your Firebase configuration and try again.");
}


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
    { id: 18, name: "WAKAN", decks: [], totalLikes: 0 },
    { id: 19, name: "SICKSYTD", decks: [], totalLikes: 0 },
    { id: 20, name: "BUKK", decks: [], totalLikes: 0 },
    { id: 21, name: "MIRANDA", decks: [], totalLikes: 0 },
    { id: 22, name: "STINKYTD", decks: [], totalLikes: 0 },
    { id: 23, name: "WAKANDOOMED", decks: [], totalLikes: 0 }
];
let troops = [
    { id: 1, name: "AVERY" },
    { id: 2, name: "BOB_MB" },
    { id: 3, name: "BLUVER" },
    { id: 4, name: "BOGGER" },
    { id: 5, name: "BONNIE" },
    { id: 6, name: "BOXTER" },
    { id: 7, name: "BUZZ_JK" },
    { id: 8, name: "BUZZ_VC" },
    { id: 9, name: "BUZZ_VG" },
    { id: 10, name: "CEDRICK" },
    { id: 11, name: "CHOMPER" },
    { id: 12, name: "CLAUDINE" },
    { id: 13, name: "DROGDOR_JK" },
    { id: 14, name: "DROGDOR_VC" },
    { id: 15, name: "DROGDOR_VG" },
    { id: 16, name: "FERGOR" },
    { id: 17, name: "FLITUS_JK" },
    { id: 18, name: "FLITUS_VC" },
    { id: 19, name: "FLITUS_VG" },
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
    { id: 30, name: "IVUR_JK" },
    { id: 31, name: "IVUR_VC" },
    { id: 32, name: "IVUR_VG" },
    { id: 33, name: "J4WS" },
    { id: 34, name: "JACK" },
    { id: 35, name: "JEN" },
    { id: 36, name: "KHEELDREN" },
    { id: 37, name: "KOTTON" },
    { id: 38, name: "KULTH" },
    { id: 39, name: "LILY" },
    { id: 40, name: "LUMINA" },
    { id: 41, name: "MAHOMOT" },
    { id: 42, name: "MONJ" },
    { id: 43, name: "MURBI" },
    { id: 44, name: "NEYON_JK" },
    { id: 45, name: "NEYON_UR" },
    { id: 46, name: "NEYON_VC" },
    { id: 47, name: "NORPUR_JK" },
    { id: 48, name: "NORPUR_VC" },
    { id: 49, name: "NORPUR_VG" },
    { id: 50, name: "RAGOR" },
    { id: 51, name: "SCALDRAX" },
    { id: 52, name: "SGRAG" },
    { id: 53, name: "SHAMEERA" },
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
    { id: 70, name: "YURKI" },
    { id: 71, name: "VUNAKA" },
    { id: 72, name: "KENBARI" },
    { id: 73, name: "BRUNGILDA" },
    { id: 74, name: "ULGAR" },
    { id: 75, name: "AMBER" },
    { id: 76, name: "LIAM" },
    { id: 77, name: "DYNAMY" },
    { id: 78, name: "PEARL" },
    { id: 79, name: "TASHA" },
    { id: 80, name: "DESHAWN" },
    { id: 81, name: "MAKARU" },
    { id: 82, name: "TORLOKWF" },
    { id: 83, name: "TORLOKVC" },
    { id: 84, name: "TORLOKJK" },
    { id: 85, name: "KARNATH" },
    { id: 86, name: "RAVETH" },
    { id: 87, name: "HELGRITH" },
    { id: 88, name: "DRAETH" },
    { id: 89, name: "VELKRIS" },
    { id: 90, name: "GYZORR" },
    { id: 91, name: "GYZORY" },
    { id: 92, name: "GYZORB" }
];

const heroInfo = {
    LYON: {
        attack: 20,
        health: 280,
        ability: "When an allied troop enters the arena in the middle or right lane, that troop gains 10 shield."
    },
    KROGNAR: {
        attack: 30,
        health: 280,
        ability: "No special ability."
    },
    GROTH: {
        attack: 20,
        health: 300,
        ability: "When an allied troop enters the arena, Groth deals 10 DMG to its enemy troop."
    },
    BLUE: {
        attack: 20,
        health: 300,
        ability: "When an allied troop enters the arena and there are 2 or more allied troops, the enemy troop's ability is blocked by Blue for that round."
    },
    GIDROCK: {
        attack: 0,
        health: 310,
        ability: "Gidrock kills all enemy and allied troops in the arena with 10 HP or less and gains +10 ATK permanently."
    },
    WAKAN: {
        attack: 20,
        health: 300,
        ability: "Start of round: Heals +10 HP to the first damaged troop with the highest attack in the arena. Wakan performs this ability if he took no combat damage in the previous turn."
    },
    PIPER: {
        attack: 20,
        health: 300,
        ability: "End of round: Every 3 rounds, deals +20 DMG to the enemy hero. Starts on round 1."
    },
    HARUAKI: {
        attack: 20,
        health: 280,
        ability: "End of round: Heals 10 HP to units (hero and troops) that haven't been in the arena that round and have less than 50 HP."
    },
    LUSBAAL: {
        attack: 20,
        health: 300,
        ability: "End of round: If the enemy hero has 35% HP or less and Lusbaal hasn't fought them that round, Lusbaal deals 20 DMG to the enemy hero."
    },
    HINDAYA: {
        attack: 20,
        health: 300,
        ability: "Start of round: Casts a charm on the first enemy troop with 20 ATK or less, preventing it from dealing damage that round (abilities still apply)."
    },
    HARALK: {
        attack: 20,
        health: 280,
        ability: "Leaves 2 stacks of Injury. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack. Moving a troop from its lane triggers the Injury stacks, dealing damage."
    },
    JARKOS: {
        attack: 20,
        health: 320,
        ability: "Start of round: Enhances Troops and Creatures in combat (+10 ATK) if Jarkos received at least 20 combat damage (not ability damage) in the previous round."
    },
    KADRIA: {
        attack: 20,
        health: 300,
        ability: "End of round: If Kadria hasn't fought the enemy hero, summons a creature in the right lane. Requires 1 round to charge the summon. The longer Kadria waits, the stronger the summon: 2 rounds (10 ATK/20 HP), 3 rounds (20 ATK/30 HP), 4 rounds (30 ATK/40 HP), 5 rounds (40 ATK/50 HP)."
    },
    BLURP: {
        attack: 20,
        health: 300,
        ability: "Start of round: On rounds 1 and 8, enhances the abilities (+10) of all allied troops. If an ability affects ATK and HP, that troop isn't enhanced. If an ability affects multiple troops, only the first enemy is enhanced."
    },
    RODERICH: {
        attack: 20,
        health: 300,
        ability: "Before combat: When descending to fight, if Roderich has a troop adjacent to his right, gains +10 ATK. If he has a troop adjacent to his left, gains +20 shield. Can gain both."
    },
    STINKY: {
        attack: 20,
        health: 290,
        ability: "End of round: If Stinky hasn't fought that round, deals +10 DMG (stackable up to 20) to the enemy leader. If he fights, the damage resets to 10 DMG."
    },
    SICKSY: {
        attack: 20,
        health: 320,
        ability: "Before combat: Deals +20 DMG if fighting the same enemy twice in a row."
    },
    JIN: {
        attack: 20,
        health: 300,
        ability: "End of the round: If Jin doesn’t fight in a round, he gets +10 ATK per allied troop in the arena until the next time he fights."
    },
    SICKSYTD: {
        attack: 20,
        health: 300,
        ability: "Before combat: If she fights with the enemy only troop 2 times in a row, it triggers various troops."
    },
    BUKK: {
        attack: 20,
        health: 360,
        ability: "No ability."
    },
    MIRANDA: {
        attack: 20,
        health: 300,
        ability: "End of the round: If there are 5 troops in the arena, Miranda will deal 30 to the enemy hero."
    },
    STINKYTD: {
        attack: 40,
        health: 300,
        ability: "End of the round (cumulative): Deals 30 DMG to the strongest enemy troop in the arena if she hasn't fought that round."
    },
    WAKANDOOMED: {
        attack: 20,
        health: 300,
        ability: "Start of the round: Deals 10 DMG to every troop in the arena (ally and enemy)."
    }
};

const heroAbilitiesTranslations = {
    LYON: {
        en: "When an allied troop enters the arena in the middle or right lane, that troop gains 10 shield.",
        es: "Cuando una tropa aliada entra a la arena en la línea del medio o derecha, esa tropa gana 10 de escudo."
    },
    KROGNAR: {
        en: "No special ability.",
        es: "Sin habilidad especial."
    },
    GROTH: {
        en: "When an allied troop enters the arena, Groth deals 10 DMG to its enemy troop.",
        es: "Cuando una tropa aliada entra a la arena, Groth inflige 10 de daño a la tropa enemiga."
    },
    BLUE: {
        en: "When an allied troop enters the arena and there are 2 or more allied troops, the enemy troop's ability is blocked by Blue for that round.",
        es: "Cuando una tropa aliada entra a la arena y hay 2 o más tropas aliadas, la habilidad de la tropa enemiga es bloqueada por Blue durante esa ronda."
    },
    GIDROCK: {
        en: "Gidrock kills all enemy and allied troops in the arena with 10 HP or less and gains +10 ATK permanently.",
        es: "Gidrock mata a todas las tropas enemigas y aliadas en la arena con 10 HP o menos y gana +10 de ataque permanentemente."
    },
    WAKAN: {
        en: "Start of round: Heals +10 HP to the first damaged troop with the highest attack in the arena. Wakan performs this ability if he took no combat damage in the previous turn.",
        es: "Inicio de ronda: Cura +10 HP a la primera tropa dañada con el mayor ataque en la arena. Wakan realiza esta habilidad si no recibió daño de combate en el turno anterior."
    },
    PIPER: {
        en: "End of round: Every 3 rounds, deals +20 DMG to the enemy hero. Starts on round 1.",
        es: "Fin de ronda: Cada 3 rondas, inflige +20 de daño al héroe enemigo. Comienza en la ronda 1."
    },
    HARUAKI: {
        en: "End of round: Heals 10 HP to units (hero and troops) that haven't been in the arena that round and have less than 50 HP.",
        es: "Fin de ronda: Cura 10 HP a las unidades (héroe y tropas) que no han estado en la arena esa ronda y tienen menos de 50 HP."
    },
    LUSBAAL: {
        en: "End of round: If the enemy hero has 35% HP or less and Lusbaal hasn't fought them that round, Lusbaal deals 20 DMG to the enemy hero.",
        es: "Fin de ronda: Si el héroe enemigo tiene 35% de HP o menos y Lusbaal no ha luchado contra él esa ronda, Lusbaal inflige 20 de daño al héroe enemigo."
    },
    HINDAYA: {
        en: "Start of round: Casts a charm on the first enemy troop with 20 ATK or less, preventing it from dealing damage that round (abilities still apply).",
        es: "Inicio de ronda: Lanza un encanto a la primera tropa enemiga con 20 de ataque o menos, impidiéndole infligir daño esa ronda (las habilidades aún se aplican)."
    },
    HARALK: {
        en: "Leaves 2 stacks of Injury. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack. Moving a troop from its lane triggers the Injury stacks, dealing damage.",
        es: "Deja 2 acumulaciones de Herida. Herida: Con 5 o más acumulaciones, explota infligiendo 10 de daño por acumulación. Mover una tropa de su carril activa las acumulaciones de Herida, causando daño."
    },
    JARKOS: {
        en: "Start of round: Enhances Troops and Creatures in combat (+10 ATK) if Jarkos received at least 20 combat damage (not ability damage) in the previous round.",
        es: "Inicio de ronda: Mejora a las tropas y criaturas en combate (+10 de ataque) si Jarkos recibió al menos 20 de daño de combate (no daño por habilidad) en la ronda anterior."
    },
    KADRIA: {
        en: "End of round: If Kadria hasn't fought the enemy hero, summons a creature in the right lane. Requires 1 round to charge the summon. The longer Kadria waits, the stronger the summon: 2 rounds (10 ATK/20 HP), 3 rounds (20 ATK/30 HP), 4 rounds (30 ATK/40 HP), 5 rounds (40 ATK/50 HP).",
        es: "Fin de ronda: Si Kadria no ha luchado contra el héroe enemigo, invoca una criatura en el carril derecho. Requiere 1 ronda para cargar la invocación. Cuanto más espera Kadria, más fuerte es la invocación: 2 rondas (10 ataque/20 HP), 3 rondas (20 ataque/30 HP), 4 rondas (30 ataque/40 HP), 5 rondas (40 ataque/50 HP)."
    },
    BLURP: {
        en: "Start of round: On rounds 1 and 8, enhances the abilities (+10) of all allied troops. If an ability affects ATK and HP, that troop isn't enhanced. If an ability affects multiple troops, only the first enemy is enhanced.",
        es: "Inicio de ronda: En las rondas 1 y 8, mejora las habilidades (+10) de todas las tropas aliadas. Si una habilidad afecta ataque y HP, esa tropa no se mejora. Si una habilidad afecta a múltiples tropas, solo el primer enemigo se mejora."
    },
    RODERICH: {
        en: "Before combat: When descending to fight, if Roderich has a troop adjacent to his right, gains +10 ATK. If he has a troop adjacent to his left, gains +20 shield. Can gain both.",
        es: "Antes del combate: Al descender para luchar, si Roderich tiene una tropa adyacente a su derecha, gana +10 de ataque. Si tiene una tropa adyacente a su izquierda, gana +20 de escudo. Puede ganar ambos."
    },
    STINKY: {
        en: "End of round: If Stinky hasn't fought that round, deals +10 DMG (stackable up to 20) to the enemy leader. If he fights, the damage resets to 10 DMG.",
        es: "Fin de ronda: Si Stinky no ha luchado esa ronda, inflige +10 de daño (acumulable hasta 20) al líder enemigo. Si lucha, el daño se reinicia a 10."
    },
    SICKSY: {
        en: "Before combat: Deals +20 DMG if fighting the same enemy twice in a row.",
        es: "Antes del combate: Inflige +20 de daño si lucha contra el mismo enemigo dos veces seguidas."
    },
    JIN: {
        en: "End of the round: If Jin doesn’t fight in a round, he gets +10 ATK per allied troop in the arena until the next time he fights.",
        es: "Fin de la ronda: Si Jin no lucha en una ronda, gana +10 de ataque por cada tropa aliada en la arena hasta la próxima vez que luche."
    },
    SICKSYTD: {
        en: "Before combat: If she fights with the enemy only troop 2 times in a row, it triggers various troops.",
        es: "Antes del combate: Si lucha con la única tropa enemiga 2 veces seguidas, activa varias tropas."
    },
    BUKK: {
        en: "No ability.",
        es: "Sin habilidad."
    },
    MIRANDA: {
        en: "End of the round: If there are 5 troops in the arena, Miranda will deal 30 to the enemy hero.",
        es: "Fin de la ronda: Si hay 5 tropas en la arena, Miranda inflige 30 de daño al héroe enemigo."
    },
    STINKYTD: {
        en: "End of the round (cumulative): Deals 30 DMG to the strongest enemy troop in the arena if she hasn't fought that round.",
        es: "Fin de la ronda (acumulativo): Inflige 30 de daño a la tropa enemiga más fuerte en la arena si no ha luchado esa ronda."
    },
    WAKANDOOMED: {
        en: "Start of the round: Deals 10 DMG to every troop in the arena (ally and enemy).",
        es: "Inicio de la ronda: Inflige 10 de daño a todas las tropas en la arena (aliadas y enemigas)."
    }
};

const troopInfo = {
    FRIDA: {
        attack: 10,
        health: 40,
        ability: "On entry: Deals +30 DMG to the troop in the farthest lane. Right lane attacks left, and vice versa. Middle lane attacks middle lane."
    },
    LUMINA: {
        attack: 0,
        health: 80,
        ability: "End of round: Heals +30 HP to the allied hero."
    },
    THRAGOS: {
        attack: 10,
        health: 80,
        ability: "After combat: If it hits the enemy hero, deals 30 extra DMG."
    },
    SCALDRAX: {
        attack: 10,
        health: 80,
        ability: "In combat: If Scaldrax kills the enemy troop and survives, Scaldrax deals 50 DMG to the enemy hero."
    },
    GRETA: {
        attack: 10,
        health: 40,
        ability: "When a troop dies (enemy or allied): Greta gains +10 ATK and +10 HP."
    },
    SKIVER: {
        attack: 20,
        health: 80,
        ability: "Start of round: If there are 2 or more allied troops in the arena, gains +20 ATK."
    },
    HIKA: {
        attack: 10,
        health: 50,
        ability: "Start of round: Deals 30 DMG to the enemy troop in the same lane."
    },
    BUZZ_VG: {
        attack: 30,
        health: 30,
        ability: "After combat: Heals +20 HP when it hits an enemy."
    },
    BUZZ_VC: {
        attack: 30,
        health: 50,
        ability: "In combat: Applies 2 stacks of Burn (to heroes only). Burn: At the end of the round, consumes 1 stack and deals 10 DMG."
    },
    BUZZ_JK: {
        attack: 30,
        health: 50,
        ability: "In combat: Each time it attacks, the enemy receives 2 stacks of Injury. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack consumed. Moving a troop also triggers Injury stacks."
    },
    FLITUS: {
        attack: 20,
        health: 50,
        ability: "On entry: Grants +20 ATK to the allied hero until the end of the round."
    },
    FLITUS_VC: {
        attack: 0,
        health: 10,
        ability: "On entry: Deals 40 DMG to the enemy hero."
    },
    FLITUS_JK: {
        attack: 10,
        health: 40,
        ability: "On entry: Applies 3 stacks of Injury to the enemy troop in the opposite lane. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack consumed. Moving a troop also triggers Injury stacks."
    },
    NEYON_UR: {
        attack: 0,
        health: 70,
        ability: "On death: Grants +10 ATK and -20 HP to the allied hero."
    },
    NEYON_VC: {
        attack: 20,
        health: 50,
        ability: "On death: Explodes and deals +30 DMG to the enemy in front."
    },
    NEYON_JK: {
        attack: 20,
        health: 50,
        ability: "On death: Applies 3 stacks of Injury to all enemies in the arena. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack consumed. Moving a troop also triggers Injury stacks."
    },
    DROGDOR_VG: {
        attack: 20,
        health: 60,
        ability: "After combat: Gains +20 ATK each time it attacks the enemy hero."
    },
    DROGDOR_VC: {
        attack: 30,
        health: 60,
        ability: "After combat: If it hits the enemy hero, deals 20 extra DMG."
    },
    DROGDOR_JK: {
        attack: 30,
        health: 60,
        ability: "Before combat: If the enemy has a negative effect, Drogdor JK deals 20 DMG."
    },
    IVUR_VG: {
        attack: 20,
        health: 40,
        ability: "On switch: Gains +20 ATK and +20 HP until the end of the round."
    },
    IVUR_VC: {
        attack: 20,
        health: 50,
        ability: "On switch: Deals 30 DMG to the enemy hero."
    },
    IVUR_JK: {
        attack: 20,
        health: 70,
        ability: "On switch: its enemy (troop) will receive 3 stacks of Injury." 
    },
    NORPUR_VG: {
        attack: 20,
        health: 60,
        ability: "Start of round: If there is an enemy troop in the same lane, heals 20 HP to the hero. Otherwise, deals 20 DMG to the enemy hero."
    },
    NORPUR_VC: {
        attack: 20,
        health: 80,
        ability: "Start of round: Applies 1 stack of Burn to the enemy hero. Burn: At the end of the round, consumes 1 stack and deals 10 DMG."
    },
    MAHOMOT: {
        attack: 10,
        health: 80,
        ability: "After combat: If the enemy has a negative effect, Mahomot deals 30 DMG."
    },
    SVEN: {
        attack: 20,
        health: 50,
        ability: "In combat: If there are 3 or more troops (enemy or allied) in the arena with less than their max HP, Sven gains +20 ATK and +20 HP for that round."
    },
    LILY: {
        attack: 10,
        health: 90,
        ability: "Start of round: Deals 10 DMG to the strongest enemy troop."
    },
    HUK: {
        attack: 20,
        health: 90,
        ability: "On entry: Deals 20 DMG to the troop in the farthest lane."
    },
    BOGGER: {
        attack: 30,
        health: 30,
        ability: "On entry: Consumes an allied troop and Bogger gains +40 ATK and +40 HP until the end of the round."
    },
    BOXTER: {
        attack: 10,
        health: 50,
        ability: "On death: Boxter grants +10 ATK and +10 HP permanently to all allied troops in the arena."
    },
    CHOMPER: {
        attack: 10,
        health: 70,
        ability: "On death: Chomper deals +20 DMG to all enemies in the arena."
    },
    CEDRICK: {
        attack: 10,
        health: 90,
        ability: "End of round: Heals +20 HP to the allied hero."
    },
    AVERY: {
        attack: 60,
        health: 20,
        ability: "No special ability."
    },
    SIRO: {
        attack: 20,
        health: 80,
        ability: "In combat: Each time it attacks, the enemy troop receives 2 stacks of Hunter Mark. Hunter Mark: The next attack (not ability) on a troop with Hunter Mark deals extra damage equal to the number of stacks. 3 stacks: 30 extra damage."
    },
    BLUVER: {
        attack: 20,
        health: 60,
        ability: "In combat: Each time it attacks, the enemy receives 3 stacks of Hunter Mark. Hunter Mark: The next attack (not ability) on a troop with Hunter Mark deals extra damage equal to the number of stacks. 3 stacks: 30 extra damage."
    },
    YOYU: {
        attack: 0,
        health: 70,
        ability: "After combat: Enhances the next troop in the arena with +10 ATK and +10 HP permanently."
    },
    JEN: {
        attack: 20,
        health: 80,
        ability: "End of round: Heals +20 HP to the most damaged allied troop in the arena."
    },
    SHYOR: {
        attack: 0,
        health: 70,
        ability: "Before combat: Protects adjacent allied troops before they enter combat (+30 shield)."
    },
    KULTH: {
        attack: 20,
        health: 60,
        ability: "End of round: Deals +20 DMG to the troop with less HP."
    },
    ULDREN: {
        attack: 20,
        health: 60,
        ability: "When a troop dies (enemy or allied): Uldren gains +20 HP."
    },
    SGRAG: {
        attack: 30,
        health: 60,
        ability: "In combat: If Sgrag kills the enemy troop and survives, Sgrag deals 40 DMG to the enemy hero."
    },
    RAGOR: {
        attack: 10,
        health: 60,
        ability: "Each time it takes damage, gains +20 ATK."
    },
    GYZORBOTS: {
        attack: 10,
        health: 70,
        ability: "Start of the round: If there are 2 more ally troops in the arena, gains +30 ATK."
    },
    WARINX: {
        attack: 20,
        health: 50,
        ability: "In combat: Each time it attacks, the enemy receives 3 stacks of Injury. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack. Moving a troop from its lane triggers the Injury stacks, dealing damage."
    },
    GRIBER: {
        attack: 10,
        health: 60,
        ability: "Start of the round: Deals +20 DMG to the enemy hero."
    },
    FERGOR: {
        attack: 20,
        health: 30,
        ability: "Start of round: Deals +30 DMG to the enemy hero."
    },
    WILLIAM: {
        attack: 20,
        health: 50,
        ability: "Before combat: If there are no allied troops in the arena, gains +30 ATK for that round."
    },
    SHAWMIT: {
        attack: 0,
        health: 40,
        ability: "On entry: Deals +40 DMG to the troop in the farthest lane. Right lane attacks left, and vice versa. Middle lane attacks middle lane."
    },
    TWEEKS: {
        attack: 0,
        health: 60,
        ability: "Start of round: Gains +30 ATK each time an allied troop with higher ATK enters the arena."
    },
    YURKI: {
        attack: 20,
        health: 90,
        ability: "After combat: Gains +10 ATK each time it attacks the enemy hero."
    },
    MONJ: {
        attack: 0,
        health: 80,
        ability: "Each time it takes damage, reflects +30 DMG."
    },
    KHEELDREN: {
        attack: 20,
        health: 40,
        ability: "Start of the round: Deals +20 DMG to the troop in the same lane."
    },
    WERTH: {
        attack: 20,
        health: 70,
        ability: "Start of the round: Lower -20 ATK to the most powerful enemy troop."
    },
    GRANTMOR: {
        attack: 10,
        health: 60,
        ability: "Before combat: Protects itself with +30 shield."
    },
    SHAMEERA: {
        attack: 10,
        health: 80,
        ability: "End of round: Heals +30 HP to the most damaged allied troop in the arena."
    },
    GLOB: {
        attack: 50,
        health: 40,
        ability: "No special ability."
    },
    MURBI: {
        attack: 30,
        health: 80,
        ability: "No special ability."
    },
    BOB_MB: {
        attack: 30,
        health: 30,
        ability: "On death: Explodes and deals +40 DMG to the enemy in front."
    },
    FREDDY: {
        attack: 10,
        health: 50,
        ability: "After combat: Shoots +30 DMG to enemy troops in adjacent lanes."
    },
    SOPHIE: {
        attack: 20,
        health: 50,
        ability: "Before combat: Protects adjacent allied troops before they enter combat (+20 shield)."
    },
    JACK: {
        attack: 20,
        health: 120,
        ability: "No special ability."
    },
    BONNIE: {
        attack: 20,
        health: 60,
        ability: "While Bonnie is in the arena, all allied troops in the arena receive +10 ATK and +10 HP."
    },
    SPYKE: {
        attack: 20,
        health: 50,
        ability: "When any troop dies in the arena, Spyke gains +30 ATK until the end of the turn."
    },
    CLAUDINE: {
        attack: 20,
        health: 50,
        ability: "Before combat: Protects itself with +20 shield."
    },
    WYN: {
        attack: 10,
        health: 170,
        ability: "No special ability."
    },
    KOTTON: {
        attack: 20,
        health: 70,
        ability: "After combat: Deals 10 DMG to all enemy troops in combat."
    },
    HALLUR: {
        attack: 20,
        health: 50,
        ability: "Each time it takes damage, gains +10 ATK and +10 HP."
    },
    J4WS: {
        attack: 20,
        health: 40,
        ability: "On switch: Consumes an allied troop and gains +20 ATK and +20 HP permanently."
    },
    VINCENT: {
        attack: 40,
        health: 50,
        ability: "No special ability."
    },
    VUNAKA: {
        attack: 30,
        health: 50,
        ability: "Every time he receives damage, reflects +10 DMG."
    },
    KENBARI: {
        attack: 30,
        health: 50,
        ability: "In combat: Leaves 1 stack of Hunter Mark."
    },
    BRUNGILDA: {
        attack: 10,
        health: 70,
        ability: "In combat: Deals extra 10 DMG to her enemy and adjacent troops."
    },
    ULGAR: {
        attack: 20,
        health: 80,
        ability: "Before combat: If the enemy has a negative effect, he will deal 20 DMG."
    },
    AMBER: {
        attack: 30,
        health: 50,
        ability: "Before combat: Protects herself with 10 shield."
    },
    LIAM: {
        attack: 10,
        health: 80,
        ability: "On swap: Gains +30 ATK until the end of the round."
    },
    DYNAMY: {
        attack: 40,
        health: 40,
        ability: "After combat: Gains +10 ATK every time he attacks the enemy hero."
    },
    PEARL: {
        attack: 20,
        health: 60,
        ability: "After combat: Deals +30 DMG to the troop in the farthest lane."
    },
    TASHA: {
        attack: 20,
        health: 100,
        ability: "After combat: If she hits the enemy hero, deals extra 10 DMG."
    },
    DESHAWN: {
        attack: 20,
        health: 90,
        ability: "Start of the round: If there are 2 more ally troops in the arena, gains +10 ATK."
    },
    MAKARU: {
        attack: 20,
        health: 100,
        ability: "End of the round: Heals +10 HP to the most injured ally troop in the arena."
    },
    TORLOKWF: {
        attack: 10,
        health: 60,
        ability: "Every time he receives damage, cures himself +20 HP."
    },
    TORLOKVC: {
        attack: 40,
        health: 60,
        ability: "Every time he receives damage, reflects 10 DMG to the enemy hero."
    },
    TORLOKJK: {
        attack: 10,
        health: 80,
        ability: "Every time he receives damage, reflects +20 DMG."
    },
    KARNATH: {
        attack: 20,
        health: 50,
        ability: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena."
    },
    RAVETH: {
        attack: 10,
        health: 60,
        ability: "Horde: Start of the round: Gains +20 HP per ally Horde troop in the arena."
    },
    HELGRITH: {
        attack: 30,
        health: 60,
        ability: "Horde: Start of the round: Gains +10 ATK per ally Horde troop in the arena."
    },
    DRAETH: {
        attack: 10,
        health: 60,
        ability: "Start of the round: Lower -30 ATK to the most powerful enemy troop."
    },
    VELKRIS: {
        attack: 10,
        health: 50,
        ability: "End of the round: Deals +30 DMG to the troop with less HP."
    },
    GYZORR: {
        attack: 20,
        health: 70,
        ability: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena."
    },
    GYZORY: {
        attack: 10,
        health: 80,
        ability: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena."
    },
    GYZORB: {
        attack: 0,
        health: 100,
        ability: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena."
    }
};

const troopAbilitiesTranslations = {
    FRIDA: {
        en: "On entry: Deals +30 DMG to the troop in the farthest lane. Right lane attacks left, and vice versa. Middle lane attacks middle lane.",
        es: "Al entrar: Inflige +30 de daño a la tropa en el carril más lejano. El carril derecho ataca al izquierdo, y viceversa. El carril central ataca al central."
    },
    LUMINA: {
        en: "End of round: Heals +30 HP to the allied hero.",
        es: "Fin de ronda: Cura +30 HP al héroe aliado."
    },
    THRAGOS: {
        en: "After combat: If it hits the enemy hero, deals 30 extra DMG.",
        es: "Después del combate: Si golpea al héroe enemigo, inflige 30 de daño extra."
    },
    SCALDRAX: {
        en: "In combat: If Scaldrax kills the enemy troop and survives, Scaldrax deals 50 DMG to the enemy hero.",
        es: "En combate: Si Scaldrax mata a la tropa enemiga y sobrevive, inflige 50 de daño al héroe enemigo."
    },
    GRETA: {
        en: "When a troop dies (enemy or allied): Greta gains +10 ATK and +10 HP.",
        es: "Cuando una tropa muere (enemiga o aliada): Greta gana +10 de ataque y +10 de HP."
    },
    SKIVER: {
        en: "Start of round: If there are 2 or more allied troops in the arena, gains +20 ATK.",
        es: "Inicio de ronda: Si hay 2 o más tropas aliadas en la arena, gana +20 de ataque."
    },
    HIKA: {
        en: "Start of round: Deals 30 DMG to the enemy troop in the same lane.",
        es: "Inicio de ronda: Inflige 30 de daño a la tropa enemiga en el mismo carril."
    },
    BUZZ_VG: {
        en: "After combat: Heals +20 HP when it hits an enemy.",
        es: "Después del combate: Cura +20 HP cuando golpea a un enemigo."
    },
    BUZZ_VC: {
        en: "In combat: Applies 2 stacks of Burn (to heroes only). Burn: At the end of the round, consumes 1 stack and deals 10 DMG.",
        es: "En combate: Aplica 2 acumulaciones de Quemadura (solo a héroes). Quemadura: Al final de la ronda, consume 1 acumulación e inflige 10 de daño."
    },
    BUZZ_JK: {
        en: "In combat: Each time it attacks, the enemy receives 2 stacks of Injury. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack consumed. Moving a troop also triggers Injury stacks.",
        es: "En combate: Cada vez que ataca, el enemigo recibe 2 acumulaciones de Herida. Herida: Con 5 o más acumulaciones, explota infligiendo 10 de daño por acumulación consumida. Mover una tropa también activa las acumulaciones de Herida."
    },
    FLITUS: {
        en: "On entry: Grants +20 ATK to the allied hero until the end of the round.",
        es: "Al entrar: Otorga +20 de ataque al héroe aliado hasta el final de la ronda."
    },
    FLITUS_VC: {
        en: "On entry: Deals 40 DMG to the enemy hero.",
        es: "Al entrar: Inflige 40 de daño al héroe enemigo."
    },
    FLITUS_JK: {
        en: "On entry: Applies 3 stacks of Injury to the enemy troop in the opposite lane. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack consumed. Moving a troop also triggers Injury stacks.",
        es: "Al entrar: Aplica 3 acumulaciones de Herida a la tropa enemiga en el carril opuesto. Herida: Con 5 o más acumulaciones, explota infligiendo 10 de daño por acumulación consumida. Mover una tropa también activa las acumulaciones de Herida."
    },
    NEYON_UR: {
        en: "On death: Grants +10 ATK and -20 HP to the allied hero.",
        es: "Al morir: Otorga +10 de ataque y -20 de HP al héroe aliado."
    },
    NEYON_VC: {
        en: "On death: Explodes and deals +30 DMG to the enemy in front.",
        es: "Al morir: Explota e inflige +30 de daño al enemigo de enfrente."
    },
    NEYON_JK: {
        en: "On death: Applies 3 stacks of Injury to all enemies in the arena. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack consumed. Moving a troop also triggers Injury stacks.",
        es: "Al morir: Aplica 3 acumulaciones de Herida a todos los enemigos en la arena. Herida: Con 5 o más acumulaciones, explota infligiendo 10 de daño por acumulación consumida. Mover una tropa también activa las acumulaciones de Herida."
    },
    DROGDOR_VG: {
        en: "After combat: Gains +20 ATK each time it attacks the enemy hero.",
        es: "Después del combate: Gana +20 de ataque cada vez que ataca al héroe enemigo."
    },
    DROGDOR_VC: {
        en: "After combat: If it hits the enemy hero, deals 20 extra DMG.",
        es: "Después del combate: Si golpea al héroe enemigo, inflige 20 de daño extra."
    },
    DROGDOR_JK: {
        en: "Before combat: If the enemy has a negative effect, Drogdor JK deals 20 DMG.",
        es: "Antes del combate: Si el enemigo tiene un efecto negativo, Drogdor JK inflige 20 de daño."
    },
    IVUR_VG: {
        en: "On switch: Gains +20 ATK and +20 HP until the end of the round.",
        es: "Al cambiar: Gana +20 de ataque y +20 de HP hasta el final de la ronda."
    },
    IVUR_VC: {
        en: "On switch: Deals 30 DMG to the enemy hero.",
        es: "Al cambiar: Inflige 30 de daño al héroe enemigo."
    },
    IVUR_JK: {
        en: "On switch: its enemy (troop) will receive 3 stacks of Injury.", 
        es: "Al cambiar: Su enemigo (tropa) recibirá 3 acumulaciones de Herida." 
    },
    NORPUR_VG: {
        en: "Start of round: If there is an enemy troop in the same lane, heals 20 HP to the hero. Otherwise, deals 20 DMG to the enemy hero.",
        es: "Inicio de ronda: Si hay una tropa enemiga en el mismo carril, cura 20 HP al héroe. De lo contrario, inflige 20 de daño al héroe enemigo."
    },
    NORPUR_VC: {
        en: "Start of round: Applies 1 stack of Burn to the enemy hero. Burn: At the end of the round, consumes 1 stack and deals 10 DMG.",
        es: "Inicio de ronda: Aplica 1 acumulación de Quemadura al héroe enemigo. Quemadura: Al final de la ronda, consume 1 acumulación e inflige 10 de daño."
    },
    MAHOMOT: {
        en: "After combat: If the enemy has a negative effect, Mahomot deals 30 DMG.",
        es: "Después del combate: Si el enemigo tiene un efecto negativo, Mahomot inflige 30 de daño."
    },
    SVEN: {
        en: "In combat: If there are 3 or more troops (enemy or allied) in the arena with less than their max HP, Sven gains +20 ATK and +20 HP for that round.",
        es: "En combate: Si hay 3 o más tropas (enemigas o aliadas) en la arena con menos de su HP máximo, Sven gana +20 de ataque y +20 de HP por esa ronda."
    },
    LILY: {
        en: "Start of round: Deals 10 DMG to the strongest enemy troop.",
        es: "Inicio de ronda: Inflige 10 de daño a la tropa enemiga más fuerte."
    },
    HUK: {
        en: "On entry: Deals 20 DMG to the troop in the farthest lane.",
        es: "Al entrar: Inflige 20 de daño a la tropa en el carril más lejano."
    },
    BOGGER: {
        en: "On entry: Consumes an allied troop and Bogger gains +40 ATK and +40 HP until the end of the round.",
        es: "Al entrar: Consume una tropa aliada y Bogger gana +40 de ataque y +40 de HP hasta el final de la ronda."
    },
    BOXTER: {
        en: "On death: Boxter grants +10 ATK and +10 HP permanently to all allied troops in the arena.",
        es: "Al morir: Boxter otorga +10 de ataque y +10 de HP permanentemente a todas las tropas aliadas en la arena."
    },
    CHOMPER: {
        en: "On death: Chomper deals +20 DMG to all enemies in the arena.",
        es: "Al morir: Chomper inflige +20 de daño a todos los enemigos en la arena."
    },
    CEDRICK: {
        en: "End of round: Heals +20 HP to the allied hero.",
        es: "Fin de ronda: Cura +20 HP al héroe aliado."
    },
    AVERY: {
        en: "No special ability.",
        es: "Sin habilidad especial."
    },
    SIRO: {
        en: "In combat: Each time it attacks, the enemy troop receives 2 stacks of Hunter Mark. Hunter Mark: The next attack (not ability) on a troop with Hunter Mark deals extra damage equal to the number of stacks. 3 stacks: 30 extra damage.",
        es: "En combate: Cada vez que ataca, la tropa enemiga recibe 2 acumulaciones de Marca de Cazador. Marca de Cazador: El próximo ataque (no habilidad) a una tropa con Marca de Cazador inflige daño extra igual al número de acumulaciones. 3 acumulaciones: 30 de daño extra."
    },
    BLUVER: {
        en: "In combat: Each time it attacks, the enemy receives 3 stacks of Hunter Mark. Hunter Mark: The next attack (not ability) on a troop with Hunter Mark deals extra damage equal to the number of stacks. 3 stacks: 30 extra damage.",
        es: "En combate: Cada vez que ataca, el enemigo recibe 3 acumulaciones de Marca de Cazador. Marca de Cazador: El próximo ataque (no habilidad) a una tropa con Marca de Cazador inflige daño extra igual al número de acumulaciones. 3 acumulaciones: 30 de daño extra."
    },
    YOYU: {
        en: "After combat: Enhances the next troop in the arena with +10 ATK and +10 HP permanently.",
        es: "Después del combate: Mejora a la siguiente tropa en la arena con +10 de ataque y +10 de HP permanentemente."
    },
    JEN: {
        en: "End of round: Heals +20 HP to the most damaged allied troop in the arena.",
        es: "Fin de ronda: Cura +20 HP a la tropa aliada más dañada en la arena."
    },
    SHYOR: {
        en: "Before combat: Protects adjacent allied troops before they enter combat (+30 shield).",
        es: "Antes del combate: Protege a las tropas aliadas adyacentes antes de que entren en combate (+30 de escudo)."
    },
    KULTH: {
        en: "End of round: Deals +20 DMG to the troop with less HP.",
        es: "Fin de ronda: Inflige +20 de daño a la tropa con menos HP."
    },
    ULDREN: {
        en: "When a troop dies (enemy or allied): Uldren gains +20 HP.",
        es: "Cuando una tropa muere (enemiga o aliada): Uldren gana +20 de HP."
    },
    SGRAG: {
        en: "In combat: If Sgrag kills the enemy troop and survives, Sgrag deals 40 DMG to the enemy hero.",
        es: "En combate: Si Sgrag mata a la tropa enemiga y sobrevive, inflige 40 de daño al héroe enemigo."
    },
    RAGOR: {
        en: "Each time it takes damage, gains +20 ATK.",
        es: "Cada vez que recibe daño, gana +20 de ataque."
    },
    GYZORBOTS: {
        en: "Start of the round: If there are 2 more ally troops in the arena, gains +30 ATK.",
        es: "Inicio de ronda: Si hay 2 o más tropas aliadas en la arena, gana +30 de ataque."
    },
    WARINX: {
        en: "In combat: Each time it attacks, the enemy receives 3 stacks of Injury. Injury: At 5 or more stacks, explodes dealing 10 DMG per stack. Moving a troop from its lane triggers the Injury stacks, dealing damage.",
        es: "En combate: Cada vez que ataca, el enemigo recibe 3 acumulaciones de Herida. Herida: Con 5 o más acumulaciones, explota infligiendo 10 de daño por acumulación. Mover una tropa de su carril activa las acumulaciones de Herida, causando daño."
    },
    GRIBER: {
        en: "Start of the round: Deals +20 DMG to the enemy hero.",
        es: "Inicio de ronda: Inflige +20 de daño al héroe enemigo."
    },
    FERGOR: {
        en: "Start of round: Deals +30 DMG to the enemy hero.",
        es: "Inicio de ronda: Inflige +30 de daño al héroe enemigo."
    },
    WILLIAM: {
        en: "Before combat: If there are no allied troops in the arena, gains +30 ATK for that round.",
        es: "Antes del combate: Si no hay tropas aliadas en la arena, gana +30 de ataque por esa ronda."
    },
    SHAWMIT: {
        en: "On entry: Deals +40 DMG to the troop in the farthest lane. Right lane attacks left, and vice versa. Middle lane attacks middle lane.",
        es: "Al entrar: Inflige +40 de daño a la tropa en el carril más lejano. El carril derecho ataca al izquierdo, y viceversa. El carril central ataca al central."
    },
    TWEEKS: {
        en: "Start of round: Gains +30 ATK each time an allied troop with higher ATK enters the arena.",
        es: "Inicio de ronda: Gana +30 de ataque cada vez que una tropa aliada con mayor ataque entra en la arena."
    },
    YURKI: {
        en: "After combat: Gains +10 ATK each time it attacks the enemy hero.",
        es: "Después del combate: Gana +10 de ataque cada vez que ataca al héroe enemigo."
    },
    MONJ: {
        en: "Each time it takes damage, reflects +30 DMG.",
        es: "Cada vez que recibe daño, refleja +30 de daño."
    },
    KHEELDREN: {
        en: "Start of the round: Deals +20 DMG to the troop in the same lane.",
        es: "Inicio de ronda: Inflige +20 de daño a la tropa en el mismo carril."
    },
    WERTH: {
        en: "Start of the round: Lower -20 ATK to the most powerful enemy troop.",
        es: "Inicio de ronda: Reduce en -20 el ataque de la tropa enemiga más poderosa."
    },
    GRANTMOR: {
        en: "Before combat: Protects itself with +30 shield.",
        es: "Antes del combate: Se protege con +30 de escudo."
    },
    SHAMEERA: {
        en: "End of round: Heals +30 HP to the most damaged allied troop in the arena.",
        es: "Fin de ronda: Cura +30 HP a la tropa aliada más dañada en la arena."
    },
    GLOB: {
        en: "No special ability.",
        es: "Sin habilidad especial."
    },
    MURBI: {
        en: "No special ability.",
        es: "Sin habilidad especial."
    },
    BOB_MB: {
        en: "On death: Explodes and deals +40 DMG to the enemy in front.",
        es: "Al morir: Explota e inflige +40 de daño al enemigo de enfrente."
    },
    FREDDY: {
        en: "After combat: Shoots +30 DMG to enemy troops in adjacent lanes.",
        es: "Después del combate: Dispara +30 de daño a tropas enemigas en carriles adyacentes."
    },
    SOPHIE: {
        en: "Before combat: Protects adjacent allied troops before they enter combat (+20 shield).",
        es: "Antes del combate: Protege a las tropas aliadas adyacentes antes de que entren en combate (+20 de escudo)."
    },
    JACK: {
        en: "No special ability.",
        es: "Sin habilidad especial."
    },
    BONNIE: {
        en: "While Bonnie is in the arena, all allied troops in the arena receive +10 ATK and +10 HP.",
        es: "Mientras Bonnie está en la arena, todas las tropas aliadas en la arena reciben +10 de ataque y +10 de HP."
    },
    SPYKE: {
        en: "When any troop dies in the arena, Spyke gains +30 ATK until the end of the turn.",
        es: "Cuando cualquier tropa muere en la arena, Spyke gana +30 de ataque hasta el final del turno."
    },
    CLAUDINE: {
        en: "Before combat: Protects itself with +20 shield.",
        es: "Antes del combate: Se protege con +20 de escudo."
    },
    WYN: {
        en: "No special ability.",
        es: "Sin habilidad especial."
    },
    KOTTON: {
        en: "After combat: Deals 10 DMG to all enemy troops in combat.",
        es: "Después del combate: Inflige 10 de daño a todas las tropas enemigas en combate."
    },
    HALLUR: {
        en: "Each time it takes damage, gains +10 ATK and +10 HP.",
        es: "Cada vez que recibe daño, gana +10 de ataque y +10 de HP."
    },
    J4WS: {
        en: "On switch: Consumes an allied troop and gains +20 ATK and +20 HP permanently.",
        es: "Al cambiar: Consume una tropa aliada y gana +20 de ataque y +20 de HP permanentemente."
    },
    VINCENT: {
        en: "No special ability.",
        es: "Sin habilidad especial."
    },
    VUNAKA: {
        en: "Every time he receives damage, reflects +10 DMG.",
        es: "Cada vez que recibe daño, refleja +10 de daño."
    },
    KENBARI: {
        en: "In combat: Leaves 1 stack of Hunter Mark.",
        es: "En combate: Deja 1 acumulación de Marca de Cazador."
    },
    BRUNGILDA: {
        en: "In combat: Deals extra 10 DMG to her enemy and adjacent troops.",
        es: "En combate: Inflige 10 de daño extra a su enemigo y a las tropas adyacentes."
    },
    ULGAR: {
        en: "Before combat: If the enemy has a negative effect, he will deal 20 DMG.",
        es: "Antes del combate: Si el enemigo tiene un efecto negativo, inflige 20 de daño."
    },
    AMBER: {
        en: "Before combat: Protects herself with 10 shield.",
        es: "Antes del combate: Se protege con 10 de escudo."
    },
    LIAM: {
        en: "On swap: Gains +30 ATK until the end of the round.",
        es: "Al cambiar: Gana +30 de ataque hasta el final de la ronda."
    },
    DYNAMY: {
        en: "After combat: Gains +10 ATK every time he attacks the enemy hero.",
        es: "Después del combate: Gana +10 de ataque cada vez que ataca al héroe enemigo."
    },
    PEARL: {
        en: "After combat: Deals +30 DMG to the troop in the farthest lane.",
        es: "Después del combate: Inflige +30 de daño a la tropa en el carril más lejano."
    },
    TASHA: {
        en: "After combat: If she hits the enemy hero, deals extra 10 DMG.",
        es: "Después del combate: Si golpea al héroe enemigo, inflige 10 de daño extra."
    },
    DESHAWN: {
        en: "Start of the round: If there are 2 more ally troops in the arena, gains +10 ATK.",
        es: "Inicio de ronda: Si hay 2 o más tropas aliadas en la arena, gana +10 de ataque."
    },
    MAKARU: {
        en: "End of the round: Heals +10 HP to the most injured ally troop in the arena.",
        es: "Fin de la ronda: Cura +10 HP a la tropa aliada más herida en la arena."
    },
    TORLOKWF: {
        en: "Every time he receives damage, cures himself +20 HP.",
        es: "Cada vez que recibe daño, se cura +20 HP."
    },
    TORLOKVC: {
        en: "Every time he receives damage, reflects 10 DMG to the enemy hero.",
        es: "Cada vez que recibe daño, refleja 10 de daño al héroe enemigo."
    },
    TORLOKJK: {
        en: "Every time he receives damage, reflects +20 DMG.",
        es: "Cada vez que recibe daño, refleja +20 de daño."
    },
    KARNATH: {
        en: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena.",
        es: "Horda: Inicio de ronda: Gana +20 de ataque por cada tropa aliada de Horda en la arena."
    },
    RAVETH: {
        en: "Horde: Start of the round: Gains +20 HP per ally Horde troop in the arena.",
        es: "Horda: Inicio de ronda: Gana +20 HP por cada tropa aliada de Horda en la arena."
    },
    HELGRITH: {
        en: "Horde: Start of the round: Gains +10 ATK per ally Horde troop in the arena.",
        es: "Horda: Inicio de ronda: Gana +10 de ataque por cada tropa aliada de Horda en la arena."
    },
    DRAETH: {
        en: "Start of the round: Lower -30 ATK to the most powerful enemy troop.",
        es: "Inicio de ronda: Reduce en -30 el ataque de la tropa enemiga más poderosa."
    },
    VELKRIS: {
        en: "End of the round: Deals +30 DMG to the troop with less HP.",
        es: "Fin de la ronda: Inflige +30 de daño a la tropa con menos HP."
    },
    GYZORR: {
        en: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena.",
        es: "Horda: Inicio de ronda: Gana +20 de ataque por cada tropa aliada de Horda en la arena."
    },
    GYZORY: {
        en: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena.",
        es: "Horda: Inicio de ronda: Gana +20 de ataque por cada tropa aliada de Horda en la arena."
    },
    GYZORB: {
        en: "Horde: Start of the round: Gains +20 ATK per ally Horde troop in the arena.",
        es: "Horda: Inicio de ronda: Gana +20 de ataque por cada tropa aliada de Horda en la arena."
    }
};


function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


function isRunningStandalone() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       ('standalone' in navigator && navigator.standalone === true) || 
                       (window.navigator.standalone === true);
  console.log("Is running in standalone mode:", isStandalone);
  return isStandalone;
}


function showInstallPrompt() {
  console.log("Showing install prompt...");
  
  const modal = document.createElement('div');
  modal.id = 'install-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Enhance Your Experience</h2>
      <p>We recommend adding Wonder Decks to your home screen for a better experience:</p>
      <div class="install-instructions">
        <div class="instruction">
          <i class="fas fa-mobile-alt"></i>
          <p><strong>Android:</strong> Tap the menu (⋮) in Chrome and select "Add to Home screen".</p>
        </div>
        <div class="instruction">
          <i class="fab fa-apple"></i>
          <p><strong>iOS:</strong> Tap the share button (⬆) in Safari and select "Add to Home Screen".</p>
        </div>
      </div>
      <button id="close-install-modal" class="modal-button">Continue Without Installing</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.style.display = 'flex';

  
  document.getElementById('close-install-modal').addEventListener('click', () => {
    modal.remove();
    console.log("Install prompt closed");
  });
}


document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded event fired");
  
  showSection(welcomeSection);

  
  console.log("Is mobile device:", isMobileDevice());
  console.log("Is running standalone:", isRunningStandalone());

  if (isMobileDevice() && !isRunningStandalone()) {
    showInstallPrompt();
  } else {
    
    document.querySelector('nav').style.display = 'flex';
    document.body.style.overflow = 'auto';
    console.log("Modal not shown due to: ", {
      isMobile: isMobileDevice(),
      isStandalone: isRunningStandalone()
    });
  }
});

let currentUser = null;
let users = [];
let userLikes = {};


const githubBaseUrl = "https://raw.githubusercontent.com/akapelu/WonderDecks/main/";


function getImageUrl(name, type) {
    if (!name) return '';
    const formattedName = name.toUpperCase().replace(/\s/g, '_');
    return `${githubBaseUrl}${type}/${formattedName}.png`;
}


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


let isLoadingUsersAndLikes = false;

async function loadUsersAndLikes() {
    if (isLoadingUsersAndLikes) {
        console.log("loadUsersAndLikes already in progress, skipping...");
        return;
    }
    isLoadingUsersAndLikes = true;
    try {
        const userSnapshot = await firestoreOperationWithRetry(() => db.collection('users').get());
        users = [];
        userSnapshot.forEach(doc => {
            const userData = doc.data();
            userData.uid = doc.id;
            userData.decks = userData.decks.map(deck => ({
                name: deck.name,
                heroId: deck.heroId,
                troops: deck.troops,
                description: deck.description,
                isPublic: deck.isPublic,
                creator: deck.creator,
            }));
            if (!users.some(u => u.uid === userData.uid)) {
                users.push(userData);
            }
        });

        const likesSnapshot = await firestoreOperationWithRetry(() => db.collection('userLikes').get());
        userLikes = {};
        likesSnapshot.forEach(doc => {
            userLikes[doc.id] = doc.data().value;
        });

        users.forEach(user => {
            user.decks.forEach(deck => {
                const deckLikes = Object.keys(userLikes).filter(key => 
                    key.endsWith(`:${deck.name}`) && userLikes[key] === true
                ).length;
                deck.likes = deckLikes;
            });
        });

        loadHeroesDecks();
    } catch (error) {
        console.error("Error loading users and likes:", error);
        alert("Error loading data from Firestore. Some features may not work correctly.");
    } finally {
        isLoadingUsersAndLikes = false;
    }
}


auth.signInAnonymously().catch(error => {
    console.error("Error signing in anonymously:", error);
    alert("Error signing in anonymously. Please try again.");
});


auth.onAuthStateChanged(async user => {
    if (user) {
        console.log("User signed in anonymously:", user.uid);
        try {
            const userDoc = await firestoreOperationWithRetry(() => db.collection('users').doc(user.uid).get());
            if (userDoc.exists) {
                currentUser = userDoc.data();
                currentUser.uid = user.uid;
                console.log("Current user data loaded.");
                currentUser.decks = currentUser.decks.map(deck => ({
                    name: deck.name,
                    heroId: deck.heroId,
                    troops: deck.troops,
                    description: deck.description,
                    isPublic: deck.isPublic,
                    creator: deck.creator,
                }));
            } else {
                console.log("No user document found for UID:", user.uid);
            }
            await loadUsersAndLikes();
            updateUIForCurrentUser();
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("Error fetching user data. Proceeding with local data.");
            await loadUsersAndLikes();
            updateUIForCurrentUser();
        }
    } else {
        console.log("User signed out");
        currentUser = null;
        await loadUsersAndLikes();
        updateUIForCurrentUser();
        auth.signInAnonymously().catch(error => {
            console.error("Error signing in anonymously after logout:", error);
            alert("Error signing in anonymously after logout. Please try again.");
        });
    }
});


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
const troopInfoModal = document.getElementById('troop-info-modal');
const troopInfoTitle = document.getElementById('troop-info-title');
const troopInfoImage = document.getElementById('troop-info-image');
const troopInfoStats = document.getElementById('troop-info-stats');
const troopInfoAbility = document.getElementById('troop-info-ability');


document.getElementById('logo-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection(welcomeSection);
});


const langEnFlag = document.getElementById('lang-en');
const langEsFlag = document.getElementById('lang-es');

const translations = {
    en: {
        'Public Decks': 'Public Decks',
        'Login': 'Login',
        'Register': 'Register',
        'Logout': 'Logout',
        'Welcome to Wonder Decks!': 'Welcome to Wonder Decks!',
        'Create, save and share your decks with the community.': 'Create, save and share your decks with the community.',
        'Get Started': 'Get Started',
        'Add Deck': 'Add Deck',
        'Delete Account': 'Delete Account',
        'Created by': 'Created by',
        'Likes': 'Likes',
        'Public': 'Public',
        'Yes': 'Yes',
        'No': 'No',
        'Edit': 'Edit',
        'Delete': 'Delete',
        'Make Public': 'Make Public',
        'Make Private': 'Make Private',
        'Description': 'Description',
        'Hero': 'Hero',
        'Troops': 'Troops',
        'Add New Deck': 'Add New Deck',
        'Save Changes': 'Save Changes',
        'Select Hero': 'Select Hero',
        'Deck Name': 'Deck Name',
        'Select Troop': 'Select Troop',
        'Make Public': 'Make Public',
        // Nuevas traducciones para información de héroes
        'Attack': 'Attack',
        'Health': 'Health',
        'Ability': 'Ability'
    },
    es: {
        'Public Decks': 'Mazos Públicos',
        'Login': 'Iniciar Sesión',
        'Register': 'Registrarse',
        'Logout': 'Cerrar Sesión',
        'Welcome to Wonder Decks!': '¡Bienvenido a Wonder Decks!',
        'Create, save and share your decks with the community.': 'Crea, guarda y comparte tus mazos con la comunidad.',
        'Get Started': 'Comenzar',
        'Add Deck': 'Agregar Mazo',
        'Delete Account': 'Eliminar Cuenta',
        'Created by': 'Creado por',
        'Likes': 'Me gusta',
        'Public': 'Público',
        'Yes': 'Sí',
        'No': 'No',
        'Edit': 'Editar',
        'Delete': 'Eliminar',
        'Make Public': 'Hacer Público',
        'Make Private': 'Hacer Privado',
        'Description': 'Descripción',
        'Hero': 'Héroe',
        'Troops': 'Tropas',
        'Add New Deck': 'Agregar Nuevo Mazo',
        'Save Changes': 'Guardar Cambios',
        'Select Hero': 'Seleccionar Héroe',
        'Deck Name': 'Nombre del Mazo',
        'Select Troop': 'Seleccionar Tropa',
        'Make Public': 'Hacer Público',
        // Nuevas traducciones para información de héroes
        'Attack': 'Ataque',
        'Health': 'Salud',
        'Ability': 'Habilidad'
    }
};

let currentLang = 'en';

function updateLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key] || key;
    });

    
    document.getElementById('hero-showcase-btn').textContent = translations[lang]['Public Decks'];
    document.getElementById('login-btn').textContent = translations[lang]['Login'];
    document.getElementById('register-btn').textContent = translations[lang]['Register'];
    document.getElementById('logout-btn').textContent = translations[lang]['Logout'];
    document.getElementById('get-started-btn').textContent = translations[lang]['Get Started'];
    document.getElementById('explore-heroes-btn').textContent = translations[lang]['Public Decks'];
    document.getElementById('add-deck-btn').textContent = translations[lang]['Add Deck'];
    document.getElementById('delete-account-btn').textContent = translations[lang]['Delete Account'];

    
    document.querySelector('#welcome-section h2').textContent = translations[lang]['Welcome to Wonder Decks!'];
    document.querySelector('#welcome-section p').textContent = translations[lang]['Create, save and share your decks with the community.'];
    document.querySelector('#hero-showcase-section h2').textContent = translations[lang]['Public Decks'];

    
    if (authModal.style.display === 'flex') {
        authModalTitle.textContent = translations[lang][authSubmitBtn.textContent];
        authSubmitBtn.textContent = translations[lang][authSubmitBtn.textContent];
    }
    if (deckModal.style.display === 'flex') {
        deckModalTitle.textContent = translations[lang][deckModalTitle.textContent];
        deckSubmitBtn.textContent = translations[lang][deckSubmitBtn.textContent];
        document.getElementById('deck-name-input').placeholder = translations[lang]['Deck Name'];
        document.getElementById('deck-description-input').placeholder = translations[lang]['Description'];
        document.querySelector('#deck-form label').textContent = translations[lang]['Make Public'];
        const heroSelectFirstOption = heroSelect.querySelector('option:first-child');
        heroSelectFirstOption.textContent = translations[lang]['Select Hero'];
        const troopSelects = troopSelectors.querySelectorAll('select');
        troopSelects.forEach((select, index) => {
            const selectedValue = select.value;
            select.innerHTML = `<option value="" disabled ${!selectedValue ? 'selected' : ''}>${translations[lang]['Select Troop']} ${index + 1}</option>`;
            troops.forEach(troop => {
                const option = document.createElement('option');
                option.value = troop.id;
                option.textContent = troop.name;
                if (String(troop.id) === selectedValue) option.selected = true;
                select.appendChild(option);
            });
        });
    }

    
    if (heroDecksSection.style.display === 'block') {
        const heroName = document.getElementById('hero-decks-title').textContent.split(' ')[0]; 
        const hero = heroes.find(h => h.name === heroName);
        if (hero) {
            displayHeroDecks(hero, true); 
        }
    }
}

langEnFlag.addEventListener('click', () => updateLanguage('en'));
langEsFlag.addEventListener('click', () => updateLanguage('es'));


updateLanguage('en');


function showTroopInfo(troopName) {
    const info = troopInfo[troopName];
    if (info) {
        troopInfoTitle.textContent = troopName;
        troopInfoImage.innerHTML = `<img src="${getImageUrl(troopName, 'troops')}" alt="${troopName}">`;
        const attackLabel = translations[currentLang]['Attack'];
        const healthLabel = translations[currentLang]['Health'];
        const abilityLabel = translations[currentLang]['Ability'];
        const abilityText = troopAbilitiesTranslations[troopName]?.[currentLang] || info.ability; 
        troopInfoStats.textContent = `${attackLabel}: ${info.attack} | ${healthLabel}: ${info.health}`;
        troopInfoAbility.textContent = `${abilityLabel}: ${abilityText}`;
    } else {
        troopInfoTitle.textContent = troopName;
        troopInfoImage.innerHTML = `<img src="${getImageUrl(troopName, 'troops')}" alt="${troopName}">`;
        troopInfoStats.textContent = "Stats not available.";
        troopInfoAbility.textContent = "Ability: Unknown.";
    }
    troopInfoModal.style.display = 'flex';
}


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


function showSection(section) {
    [welcomeSection, heroShowcaseSection, heroDecksSection, userAccountSection].forEach(s => s.style.display = 'none');
    section.style.display = 'block';
}


document.getElementById('hero-showcase-btn').addEventListener('click', () => {
    console.log("Public Decks button clicked");
    if (!currentUser) {
        alert('Please log in to view Public Decks.');
        showAuthModal('login');
        return;
    }
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
    if (!currentUser) {
        alert('Please log in to view Public Decks.');
        showAuthModal('login');
        return;
    }
    showSection(heroShowcaseSection);
    displayHeroes();
});


function showAuthModal(type) {
    authModalTitle.textContent = translations[currentLang][type === 'register' ? 'Register' : 'Login'];
    authSubmitBtn.textContent = translations[currentLang][type === 'register' ? 'Register' : 'Login'];
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
        // Do not set currentUser to null here; let onAuthStateChanged handle it
        showSection(welcomeSection);
        // Update UI and reload data
        await loadUsersAndLikes();
        updateUIForCurrentUser();
    } catch (error) {
        console.error("Error signing out:", error);
        alert("Error signing out. Please try again.");
    }
});


document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        const modal = btn.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

troopInfoModal.addEventListener('click', (e) => {
    if (e.target === troopInfoModal || e.target.classList.contains('close-modal')) {
        e.stopPropagation(); 
        troopInfoModal.style.display = 'none';
    }
});

deckDetailsModal.addEventListener('click', (e) => {
   
    if (e.target === deckDetailsModal || e.target.classList.contains('close-modal')) {
        deckDetailsModal.style.display = 'none';
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    let bcryptLib;
    try {
        bcryptLib = await waitForBcrypt();
    } catch (error) {
        console.error(error.message);
        alert("Error: Unable to load bcrypt library. Please check your connection and try again later.");
        return;
    }

    if (authSubmitBtn.textContent === translations[currentLang]['Register']) {
        if (!auth.currentUser) {
            alert("Authentication failed. Please try again.");
            return;
        }

        let userSnapshot;
        try {
            userSnapshot = await firestoreOperationWithRetry(() =>
                db.collection('users').where('username', '==', username).get()
            );
        } catch (error) {
            console.error("Error checking for existing username:", error);
            alert("Error checking username availability. Please try again.");
            return;
        }
        if (!userSnapshot.empty) {
            alert('Username already exists!');
            return;
        }

        const hashedPassword = await bcryptLib.hash(password, 10);
        const userId = auth.currentUser.uid;
        const newUser = { username, password: hashedPassword, decks: [] };
        try {
            await firestoreOperationWithRetry(() =>
                db.collection('users').doc(userId).set(newUser)
            );
            await auth.currentUser.getIdToken(true);
            currentUser = { ...newUser, uid: userId };
            users.push(currentUser);

            authModal.style.display = 'none';
            updateUIForCurrentUser();
            showSection(userAccountSection);
            displayUserDecks();
            await loadUsersAndLikes();
        } catch (error) {
            console.error("Error creating new user:", error);
            alert("Error registering user. Please try again.");
            return;
        }
    } else {
        let userSnapshot;
        try {
            userSnapshot = await firestoreOperationWithRetry(() =>
                db.collection('users').where('username', '==', username).get()
            );
        } catch (error) {
            console.error("Error checking user credentials:", error);
            alert("Error verifying credentials. Please try again.");
            return;
        }
        if (userSnapshot.empty) {
            alert('Invalid credentials!');
            return;
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const storedUid = userDoc.id;
        const currentUid = auth.currentUser.uid;

        let passwordMatch = false;
        const storedPassword = userData.password;

        // Verificar si la contraseña almacenada está hasheada (comienza con $2a$ o $2b$)
        if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$')) {
            // Contraseña hasheada: usar bcrypt.compare
            passwordMatch = await bcryptLib.compare(password, storedPassword);
        } else {
            // Contraseña en texto plano: comparar directamente
            passwordMatch = password === storedPassword;

            // Si la contraseña coincide, migrar a formato hasheado
            if (passwordMatch) {
                try {
                    const hashedPassword = await bcryptLib.hash(password, 10);
                    userData.password = hashedPassword;
                    await firestoreOperationWithRetry(() =>
                        db.collection('users').doc(storedUid).update({ password: hashedPassword })
                    );
                    console.log(`Password for user ${username} has been migrated to hashed format.`);
                } catch (error) {
                    console.error("Error migrating password to hashed format:", error);
                    alert("Login successful, but failed to update password format. Please try logging in again.");
                }
            }
        }

        if (!passwordMatch) {
            alert('Invalid credentials!');
            return;
        }

        if (storedUid !== currentUid) {
            console.log("UID mismatch during login, migrating user data...");
            try {
                await firestoreOperationWithRetry(() =>
                    db.collection('users').doc(currentUid).set(userData)
                );
                await firestoreOperationWithRetry(() =>
                    db.collection('users').doc(storedUid).delete()
                );
                console.log("User document migrated successfully to UID:", currentUid);
                users = users.filter(user => user.uid !== storedUid);
                userData.uid = currentUid;
                users.push(userData);
            } catch (error) {
                console.error("Error during UID migration:", error);
                alert("Error syncing user data with Firestore. Please try again.");
                try {
                    await firestoreOperationWithRetry(() =>
                        db.collection('users').doc(currentUid).delete()
                    );
                } catch (cleanupError) {
                    console.warn("Failed to clean up new document after migration error:", cleanupError);
                }
                return;
            }
        }

        currentUser = userData;
        currentUser.uid = currentUid;
        await auth.currentUser.getIdToken(true);
        authModal.style.display = 'none';
        updateUIForCurrentUser();
        showSection(userAccountSection);
        displayUserDecks();
        await loadUsersAndLikes();
    }
});

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
            <p><span data-translate="Public Decks">Public Decks</span>: <span class="public-decks-count">${hero.decks.filter(d => d.isPublic).length}</span></p>
            <p><span data-translate="Likes">Likes</span>: <span class="total-likes-count">${hero.totalLikes}</span></p>
        `;
        heroCard.addEventListener('click', () => {
            showSection(heroDecksSection);
            displayHeroDecks(hero);
        });
        heroList.appendChild(heroCard);
    });
    updateLanguage(currentLang); 
}


function displayHeroDecks(hero, updateInfoOnly = false) {
    document.getElementById('hero-decks-title').textContent = `${hero.name} Decks`;

   
    const heroInfoContainer = document.getElementById('hero-info');
    const info = heroInfo[hero.name];
    if (info) {
        const attackLabel = translations[currentLang]['Attack'];
        const healthLabel = translations[currentLang]['Health'];
        const abilityLabel = translations[currentLang]['Ability'];
        const abilityText = heroAbilitiesTranslations[hero.name]?.[currentLang] || info.ability;

        heroInfoContainer.innerHTML = `
            <h3>${hero.name}</h3>
            <p class="stats">${attackLabel}: ${info.attack} | ${healthLabel}: ${info.health}</p>
            <p class="ability">${abilityLabel}: ${abilityText}</p>
        `;
    } else {
        heroInfoContainer.innerHTML = `<p>Information for ${hero.name} is not available.</p>`;
    }


    if (!updateInfoOnly) {
        const publicDecks = hero.decks.filter(d => d.isPublic);
        publicDecks.sort((a, b) => b.likes - a.likes);

        heroDecksList.innerHTML = ''; 
        publicDecks.forEach(deck => {
            const deckCard = document.createElement('div');
            const deckHero = heroes.find(h => h.id === deck.heroId);

         
            const heroImage = document.createElement('img');
            heroImage.src = getImageUrl(deckHero ? deckHero.name : 'Unknown', 'heroes');
            heroImage.alt = deckHero ? deckHero.name : 'Unknown';
            heroImage.classList.add('deck-hero-image');

          
            const troopsContainer = document.createElement('div');
            troopsContainer.classList.add('deck-troops');
            deck.troops.forEach(troopId => {
                const troop = troops.find(t => t.id === troopId);
                const troopImage = document.createElement('img');
                troopImage.src = getImageUrl(troop ? troop.name : 'Unknown', 'troops');
                troopImage.alt = troop ? troop.name : 'Unknown';
                troopImage.classList.add('deck-troop-image');
                troopImage.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showTroopInfo(troop ? troop.name : 'Unknown');
                });
                troopsContainer.appendChild(troopImage);
            });

         
            const likeKey = currentUser ? `${currentUser.username}:${deck.name}` : '';
            const hasLiked = likeKey && userLikes[likeKey];

  
            deckCard.innerHTML = `
                <h3>${deck.name}</h3>
                <p><span data-translate="Created by">Created by</span>: ${deck.creator}</p>
                <p><span data-translate="Likes">Likes</span>: <span class="like-count">${deck.likes}</span></p>
                <i class="${hasLiked ? 'fas' : 'far'} fa-heart like-heart ${hasLiked ? 'liked' : ''}"></i>
            `;
            deckCard.insertBefore(troopsContainer, deckCard.querySelector('p:nth-child(3)')); 
            deckCard.insertBefore(heroImage, deckCard.querySelector('p')); 

            deckCard.addEventListener('click', (e) => {
                if (e.target.classList.contains('like-heart')) return;
                showDeckDetails(deck);
            });

            const likeHeart = deckCard.querySelector('.like-heart');
            likeHeart.addEventListener('click', async () => {
                if (!currentUser) {
                    alert(translations[currentLang]['Please log in to like or unlike a deck!'] || 'Please log in to like or unlike a deck!');
                    return;
                }
                const likeKey = `${currentUser.username}:${deck.name}`;
            
                if (userLikes[likeKey]) {
                    try {
                        deck.likes = (deck.likes || 0) - 1;
                        hero.totalLikes = (hero.totalLikes || 0) - 1;
                        delete userLikes[likeKey];
            
                        likeHeart.classList.remove('fas', 'liked');
                        likeHeart.classList.add('far');
            
                        await firestoreOperationWithRetry(() => 
                            db.collection('userLikes').doc(likeKey).delete()
                        );
            
                        await loadUsersAndLikes();
            
                        deckCard.querySelector('.like-count').textContent = deck.likes;
                    } catch (error) {
                        console.error("Error removing like from deck:", error);
                        alert(translations[currentLang]['Error removing like from deck. Reverting changes.'] || "Error removing like from deck. Reverting changes.");
            
                        deck.likes = (deck.likes || 0) + 1;
                        hero.totalLikes = (hero.totalLikes || 0) + 1;
                        userLikes[likeKey] = true;
            
                        likeHeart.classList.remove('far');
                        likeHeart.classList.add('fas', 'liked');
            
                        deckCard.querySelector('.like-count').textContent = deck.likes;
                    }
                } else {
                    try {
                        deck.likes = (deck.likes || 0) + 1;
                        hero.totalLikes = (hero.totalLikes || 0) + 1;
                        userLikes[likeKey] = true;
            
                        likeHeart.classList.remove('far');
                        likeHeart.classList.add('fas', 'liked');
            
                        await firestoreOperationWithRetry(() => 
                            db.collection('userLikes').doc(likeKey).set({ value: true })
                        );
            
                        await loadUsersAndLikes();
            
                        deckCard.querySelector('.like-count').textContent = deck.likes;
                    } catch (error) {
                        console.error("Error liking deck:", error);
                        alert(translations[currentLang]['Error liking deck. Reverting changes.'] || "Error liking deck. Reverting changes.");
            
                        deck.likes = (deck.likes || 0) - 1;
                        hero.totalLikes = (hero.totalLikes || 0) - 1;
                        delete userLikes[likeKey];
            
                        likeHeart.classList.remove('fas', 'liked');
                        likeHeart.classList.add('far');
            
                        deckCard.querySelector('.like-count').textContent = deck.likes;
                    }
                }
            });
            heroDecksList.appendChild(deckCard);
        });
    }
    updateLanguage(currentLang); 
}


function displayUserDecks() {
    if (!currentUser) return;
    document.getElementById('user-account-title').textContent = `${currentUser.username}'s Decks`;
    userDecksList.innerHTML = '';
    currentUser.decks.forEach(deck => {
        const hero = heroes.find(h => h.id === deck.heroId);
        const deckCard = document.createElement('div');

        
        const heroImage = document.createElement('img');
        heroImage.src = getImageUrl(hero ? hero.name : 'Unknown', 'heroes');
        heroImage.alt = hero ? hero.name : 'Unknown';
        heroImage.classList.add('deck-hero-image');

      
        const troopsContainer = document.createElement('div');
        troopsContainer.classList.add('deck-troops');
        deck.troops.forEach(troopId => {
            const troop = troops.find(t => t.id === troopId);
            const troopImage = document.createElement('img');
            troopImage.src = getImageUrl(troop ? troop.name : 'Unknown', 'troops');
            troopImage.alt = troop ? troop.name : 'Unknown';
            troopImage.classList.add('deck-troop-image');
            troopImage.addEventListener('click', (e) => {
                e.stopPropagation();
                showTroopInfo(troop ? troop.name : 'Unknown');
            });
            troopsContainer.appendChild(troopImage);
        });

      
        deckCard.innerHTML = `
            <h3>${deck.name}</h3>
            <p><span data-translate="Hero">Hero</span>: ${hero ? hero.name : 'Unknown'}</p>
            <p><span data-translate="Public">Public</span>: <span class="public-status" data-translate="${deck.isPublic ? 'Yes' : 'No'}">${deck.isPublic ? 'Yes' : 'No'}</span></p>
            <button class="edit-deck-btn" data-translate="Edit">Edit</button>
            <button class="delete-deck-btn" data-translate="Delete">Delete</button>
            <button class="toggle-public-btn" data-translate="${deck.isPublic ? 'Make Private' : 'Make Public'}">${deck.isPublic ? 'Make Private' : 'Make Public'}</button>
        `;
        deckCard.insertBefore(troopsContainer, deckCard.querySelector('p:nth-child(3)')); 
        deckCard.insertBefore(heroImage, deckCard.querySelector('p'));

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
                alert(translations[currentLang]['Error deleting deck. Reverting changes.'] || "Error deleting deck. Reverting changes.");
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
                alert(translations[currentLang]['Error toggling deck visibility. Reverting changes.'] || "Error toggling deck visibility. Reverting changes.");
                deck.isPublic = !deck.isPublic;
                displayUserDecks();
            }
        });
        userDecksList.appendChild(deckCard);
    });
    updateLanguage(currentLang); 
}


function showDeckDetails(deck) {
    deckDetailsTitle.textContent = deck.name;
    deckDetailsCreator.textContent = deck.creator || currentUser.username;
    deckDetailsDescription.textContent = deck.description || 'No description provided.';
    const hero = heroes.find(h => h.id === deck.heroId);
    deckDetailsHero.textContent = hero ? hero.name : 'Unknown';
    deckDetailsHeroImage.innerHTML = `<img src="${getImageUrl(hero ? hero.name : 'Unknown', 'heroes')}" alt="${hero ? hero.name : 'Unknown'}" onerror="this.src='https://via.placeholder.com/100?text=Hero+Image+Not+Found';">`;

    deckDetailsTroops.innerHTML = ''; 
    deck.troops.forEach(troopId => {
        const troop = troops.find(t => t.id === troopId);
        const troopName = troop ? troop.name : 'Unknown';
        const troopCard = document.createElement('div');
        const troopImage = document.createElement('img');
        const imageUrl = getImageUrl(troopName, 'troops');
        
        
        troopImage.src = imageUrl;
        troopImage.alt = troopName;
        troopImage.classList.add('deck-troop-image');
        troopImage.onerror = () => {
            troopImage.src = 'https://via.placeholder.com/50?text=Troop+Image+Not+Found';
        };
        
        
        troopImage.addEventListener('click', (e) => {
            e.stopPropagation();
            showTroopInfo(troopName);
        });
        
        
        troopCard.appendChild(troopImage);
        const troopNameElement = document.createElement('p');
        troopNameElement.textContent = troopName;
        troopCard.appendChild(troopNameElement);
        
        deckDetailsTroops.appendChild(troopCard);
    });

    deckDetailsModal.style.display = 'flex';
    updateLanguage(currentLang); 
}


function showDeckModal(mode, deck = null) {
    deckModalTitle.textContent = translations[currentLang][mode === 'add' ? 'Add New Deck' : 'Edit Deck'];
    deckSubmitBtn.textContent = translations[currentLang][mode === 'add' ? 'Add Deck' : 'Save Changes'];
    deckModal.style.display = 'flex';

    
    deckForm.onsubmit = null;

    
    const deckNameInput = document.getElementById('deck-name-input');
    const deckDescriptionInput = document.getElementById('deck-description-input');
    const deckPublicInput = document.getElementById('deck-public-input');
    deckNameInput.value = '';
    heroSelect.innerHTML = `<option value="" disabled selected>${translations[currentLang]['Select Hero']}</option>`;
    troopSelectors.innerHTML = '';
    deckDescriptionInput.value = '';
    deckPublicInput.checked = false;

    
    heroes.forEach(hero => {
        const option = document.createElement('option');
        option.value = hero.id;
        option.textContent = hero.name;
        if (deck && deck.heroId === hero.id) {
            option.selected = true;
        }
        heroSelect.appendChild(option);
    });

    
    const troopSelects = [];
    for (let i = 1; i <= 6; i++) {
        const select = document.createElement('select');
        select.required = true;
        select.innerHTML = `<option value="" disabled selected>${translations[currentLang]['Select Troop']} ${i}</option>`;
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
                s.innerHTML = `<option value="" disabled ${!currentValue ? 'selected' : ''}>${translations[currentLang]['Select Troop']} ${troopSelects.indexOf(s) + 1}</option>`;
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
            alert(translations[currentLang]['A deck with this name already exists!'] || 'A deck with this name already exists!');
            return;
        }

       
        if (!auth.currentUser) {
            alert(translations[currentLang]['User not authenticated. Please log in again.'] || "User not authenticated. Please log in again.");
            authModal.style.display = 'none';
            showAuthModal('login');
            return;
        }

        
        if (currentUser.uid !== auth.currentUser.uid) {
            console.error("UID mismatch:", { currentUserUid: currentUser.uid, authUid: auth.currentUser.uid });
            
            try {
                console.log("Migrating user document to new UID...");
                await firestoreOperationWithRetry(() => db.collection('users').doc(auth.currentUser.uid).set({
                    username: currentUser.username,
                    password: currentUser.password,
                    decks: currentUser.decks
                }));
                
                await firestoreOperationWithRetry(() => db.collection('users').doc(currentUser.uid).delete());
                
                currentUser.uid = auth.currentUser.uid;
                console.log("User document migrated successfully to UID:", currentUser.uid);
            } catch (error) {
                console.error("Error migrating user document:", error);
                alert(translations[currentLang]['Error syncing user data. Please log in again.'] || "Error syncing user data. Please log in again.");
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
            alert(translations[currentLang]['Error saving deck. Proceeding with local data.'] || "Error saving deck. Proceeding with local data.");

            deckModal.style.display = 'none';
            displayUserDecks();
        }
    };
    updateLanguage(currentLang); 
}


document.getElementById('add-deck-btn').addEventListener('click', () => {
    console.log("Add Deck button clicked");
    if (!currentUser) {
        alert(translations[currentLang]['Please log in to add a deck!'] || 'Please log in to add a deck!');
        return;
    }
    showDeckModal('add');
});


document.getElementById('delete-account-btn').addEventListener('click', async () => {
    console.log("Delete Account button clicked");
    if (!confirm(translations[currentLang]['Are you sure you want to delete your account? This action cannot be undone.'] || 'Are you sure you want to delete your account? This action cannot be undone.')) return;
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
        alert(translations[currentLang]['Error deleting account. Proceeding with logout.'] || "Error deleting account. Proceeding with logout.");

        await auth.signOut();
        currentUser = null;
        showSection(welcomeSection);
        updateUIForCurrentUser();
    }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log("Attempting to register Service Worker...");
    navigator.serviceWorker.register('/WonderDecks/sw.js', { scope: '/WonderDecks/' }) 
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
        console.log('Service Worker scope:', registration.scope);
        if (registration.active) {
          console.log('Service Worker is active');
        } else {
          console.log('Service Worker is not active yet, waiting for activation...');
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                console.log('Service Worker activated');
              }
            });
          });
        }
      })
      .catch(error => {
        console.error('Error registering Service Worker:', error);
      });
  });
} else {
  console.log('Service Workers are not supported in this browser');
}

