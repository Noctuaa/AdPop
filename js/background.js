try {
    importScripts("./global.js");
} catch (e) {
    console.log(e);
}

/**
 * Initialise le storage.
 * On check si il y a déjà le storage popup
 * Si il y a rien alors on enregistre l'objet popup dans le stockage.
 */
const initStorage = async () => {
    await chrome.storage.sync.get('popup', async (data) => {
        if (Object.keys(data).length === 0) {
            await setStorage();
        }
    });
}

/**
 * Affiche un badge si l'extension a été actif pour avertir l'utilisateur.
 * Pour cela on récupère le state et on vérifie avec le lien de l'onglet actif.
 */
const setBadge = async () => {
    await chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {

        const url = tabs[0].url
        const regUrl = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const matches = url.match(regUrl);

        await chrome.storage.sync.get('popup', async (data) => {
            let message = String;
            if (matches && data.popup.actif === true) message = "on"
            else message = ""
            chrome.action.setBadgeText({ "text": message})
        });
    });
}

/**
 * Installation de l'extension.
 * On initialise le storage
 */
chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
        initStorage();
    }
});


/**
 * Pour chaque reload d'un onglet, on check si le storage popup est présent sinon on l'installe et
 * on lui affiche un badge si besoin.
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    initStorage();
    setBadge();
});

/**
 * Quand nous somme sur un onglet actif, on check si le storage popup est présent sinon on l'installe et
 * on lui affiche un badge si besoin.
 */
chrome.tabs.onActivated.addListener( () => {
    initStorage();
    setBadge();
});



initStorage();