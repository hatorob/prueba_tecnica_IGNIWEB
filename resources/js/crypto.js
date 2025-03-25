( () => {

    async function fetchCryptos() {
        try {
            const response = await fetch('/api/crypto-coins');
            const data = await response.json();
            await renderCryptoCoins(data);
        } catch (error) {
            console.log({error});
        }
    }

    async function renderCryptoCoins( data = {} ) {
        try {
            if(Object.keys(data).length == 0) throw new Error('Not found crypto coins, problem with api, contact to administrate');
            const list = document.querySelector("#filter_crypto_coins");
            data.forEach( (el) => {
                const li = document.createElement("li");
                li.textContent = `${el.name}`;
                list.appendChild(li);
            });
        } catch (error) {
            return error;
        }
    }

    fetchCryptos();

})();
