/**
 * Met à jour l'affichage des données de l'extension (total bloqué et son état)
 */
const popupUpdate = async () => {
    chrome.storage.sync.get('popup', async (data) => {
        try {
            let result;
            const total = document.getElementById('total');
            Object.keys(data).length === 0 ? result = 0 : result = data.popup.total;
            total.innerHTML =  result;
        } catch (error) {
            console.log(error)
        }
    });
}


/**
 * Permet de mettre à jour l'affichage automatiquement avec la function popupUdate quand le storage est modifié.
 */
chrome.storage.onChanged.addListener((changes, storageName) => {
    popupUpdate();
})



/**
 * Bouton clear qui efface le storage.
 * Utilisé seulement pour aider au développement.
 */
/*const buttonClear = async () => {
    const clear = document.getElementById('clear');
    clear.addEventListener('click', async () => {
        await chrome.storage.sync.remove('popup');
        document.getElementById('total').innerHTML =  0;
    })
}
buttonClear();*/


popupUpdate();
