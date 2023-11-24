/**
 * Objet etat de l'extension
 */
let state = {
    actif: false,
    total: 0
}

/**
 * Stocke les données de l'extension 
 */
const setStorage = async () => {
    await chrome.storage.sync.set({ "popup": state}, () => {
        console.log("Success set storage");
    })
}

