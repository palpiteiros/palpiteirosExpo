
export const getCampeonatos = (listener) => {

    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/fixtures/',
        headers: {
            'x-rapidapi-key': 'e62ce513ce08bbce91393cff29faa9ab',
            'x-rapidapi-host': 'v3.football.api-sports.io',
        },

    };

    axios(config, {
        params: {
            league: "71",
            season: "2022",
            round: "Round season - 13"
        }
    }).then(function (response) {
        //console.log(JSON.stringify(response.data));

        console.log(response.data)



    })
        .catch(function (error) {
            //console.log(error);
        });


}

