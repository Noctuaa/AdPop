window.onload = (event) => {

    const element = document.getElementsByTagName('ytd-popup-container');

    /**
     * L'élément popup est présent alors on le supprime.
     * On met à jour l'objet state et on appel la funtion setStorage pour enregistrer les nouvelles données.
     */
    const checkPopup = async () => {
        try {
            await chrome.storage.sync.get('popup', async (data) => {
                if (element.length > 0) {
                    state.actif = true;
                    state.total = data.popup.total + 1;
                    await setStorage();
                    element[0].remove();
                } else {
                    state.actif = false;
                    state.total = data.popup.total
                    await setStorage() 
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    
checkPopup();

}
