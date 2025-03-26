import Chart from 'chart.js/auto';

( () => {

    let intervalId = null;

    const fetchCryptos = async() => {
        try {
            const response = await fetch('/api/crypto-coins');
            const data = await response.json();
            await renderCryptoCoins(data);
        } catch (error) {
            console.log({error});
        }
    }

    const renderCryptoCoins = async ( data = {} ) => {
        try {
            if(Object.keys(data).length == 0) throw new Error('Not found crypto coins, problem with api, contact to administrate');
            const select = document.querySelector("#filter_crypto_coins");
            data.forEach( (el) => {
                const option = document.createElement("option");
                option.value = el.id
                option.textContent = `${el.name}`;
                select.appendChild(option);
            });

            listenCryptoSelection(select);
        } catch (error) {
            return error;
        }
    }

    const listenCryptoSelection = (selectElement) => {
        selectElement.addEventListener('change', async (event) => {

            const selectedId = event.target.value;
            if(selectedId) document.querySelector(".container_details").style.display = "block";

            if(intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }

            const fetchCryptoDetails = async () => {
                try {
                    const response = await fetch(`/api/crypto-coin-details?id=${selectedId}`);
                    const data = await response.json();
                    updateDetails(data);
                } catch (error) {
                    alert(error.message);
                }
            }

            fetchCryptoDetails();
            intervalId = setInterval(fetchCryptoDetails, 30000);
        })
    }

    const updateDetails = (data = []) => {
        if(data.length == 0) document.querySelector(".detail_price").textContent = "No se encontro datos de la bitcoin";
        const priceElement = document.querySelector(".detail_price");
        const percentageChangeElement = document.querySelector(".detail_percentage_change");
        const volumeElement = document.querySelector(".detail_volume");
        const updateTimeElement = document.querySelector(".detail_last_update");

        priceElement.textContent = `Precio: $${data[data.length - 1].price}`;
        percentageChangeElement.textContent = `Percentage Change: ${data[data.length - 1].percentage_change}%`;
        volumeElement.textContent = `Volumen: ${data[data.length - 1].volume}`;
        updateTimeElement.textContent = `Ultima actualización: ${data[data.length - 1].last_update}`;

        clearPreviousCharts();

        //! Creo datos grafica
        const priceData = data.map( el => el.price );
        const percentageData = data.map( el => el.percentage_change );
        const volumeData = data.map( el => el.volume );
        const timeLabels = data.map( el => el.last_update );

        createChart('priceChart', 'line', 'Precio', timeLabels, priceData, 'rgb(75, 192, 192)');
        createChart('percentageChangeChart', 'bar', 'Cambio porcentual', timeLabels, percentageData, 'rgba(255, 99, 132, 1)');
        createChart('volumeChart', 'pie', 'Volumen del mercado', timeLabels, volumeData, 'rgba(54, 162, 235, 0.2)');
    }

    const createChart = (canvasId, type, label, labels, data, borderColor) => {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
            type,
            data: {
                labels,
                datasets: [{
                    label,
                    data,
                    backgroundColor: borderColor,
                    borderColor: borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                resposive: true,
                maintainAspectRatio: false,
            }
        })
    }

    const clearPreviousCharts = () => {
        const canvasElement = document.querySelectorAll("canvas");
        canvasElement.forEach( el => {
            const chart = Chart.getChart(el.id);
            if(chart) chart.destroy();
        })
    }

    //! inicializador de options
    fetchCryptos();
    // Cada 5 minutos ---> ya que tiene un limite de peticiones de 10 mil
    //setInterval(fetchCryptos, 60000);
    // Cada un minuto
    //setInterval(fetchCryptos, 60000);
    // cada 30 seg
    setInterval(fetchCryptos, 30000);

})();
