import Chart from 'chart.js/auto';

( () => {

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
        selectElement.addEventListener('change', (event) => {
            const selectedId = event.target.value;
            //! simulo la peticion
            let data = [
                {
                  price: 212.33,
                  percentage_change: 1.022,
                  volume: 17322154,
                  last_update: "2021-11-25 22:39:00"
                },
                {
                  price: 200.33,
                  percentage_change: 0.22,
                  volume: 173223334,
                  last_update: "2021-11-25 24:39:00"
                },
                {
                  price: 242.33,
                  percentage_change: 1.322,
                  volume: 1732215334,
                  last_update: "2021-11-25 22:45:00"
                },
            ]
            let dataDos = [
                {
                  price: 12.33,
                  percentage_change: 1.22,
                  volume: 322154,
                  last_update: "2021-11-25 22:39:00"
                },
                {
                  price: 20.33,
                  percentage_change: 0.22,
                  volume: 173223334,
                  last_update: "2021-11-25 24:39:00"
                },
                {
                  price: 22.33,
                  percentage_change: 1.322,
                  volume: 17215334,
                  last_update: "2021-11-25 22:45:00"
                },
            ]

            //! llamo a la función que hará el render
            updateDetails((selectedId == 256) ? data : dataDos);
        })
    }

    const updateDetails = (data = []) => {
        const priceElement = document.querySelector(".detail_price");
        const percentageChangeElement = document.querySelector(".detail_percentage_change");
        const volumeElement = document.querySelector(".detail_volume");

        priceElement.textContent = `Price: ${data[data.length - 1].price}`;
        percentageChangeElement.textContent = `Percentage Change: ${data[data.length - 1].percentage_change}`;
        volumeElement.textContent = `Volumen: ${data[data.length - 1].volume}`;

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
        console.log({canvasId}, {type}, {label}, {labels}, {data}, {borderColor});
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

})();
