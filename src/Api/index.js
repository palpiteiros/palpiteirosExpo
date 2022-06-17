import axios from "axios";

const endpoint = `https://v3.football.api-sports.io`;
const apiKey = '0bb0ea5d4ba0c842de77beb39bd1af8c';

let params = {
            league: "71",
            season: "2022",
            round: "Regular Season - 13"
};

const extrairLista = json => {
    let list = [];
    json.forEach(obj => {
        list.push(obj);
    });
    //console.log(list);
    return list;
};

export const getLeagues = (season, country, idLeague, listener) => {

    let objParamns = {};
    if(season !== undefined && season !== null) {
        Object.assign(objParamns, {season: season});
    } 

    if(country != undefined && country !== null) {
        Object.assign(objParamns, {country: country});
    }

    if(idLeague != undefined && idLeague !== null) {
        Object.assign(objParamns, {league: idLeague});
    }
    

    let leagueEndpoint = endpoint + '/leagues';
    let config = {
        method: 'get',
        url: leagueEndpoint,
        headers: {
            'x-apisports-key': apiKey,
            'x-apisports-host': 'v3.football.api-sports.io',
        },
        params: objParamns
    };

    axios(config).then(({data}) => {
        console.log(data.response);
        let lista = extrairLista(data.response);
        return listener(lista);
    }).catch(error => {
        console.log(error);
    });
};

export const getRoundCurrent = (season, idLeague, listener) => {
    let objParamns = {current: true};
    if(season !== undefined && season !== null) {
        Object.assign(objParamns, {season: season});
    } 

    if(idLeague != undefined && idLeague !== null) {
        Object.assign(objParamns, {league: idLeague});
    }
    

    let leagueEndpoint = endpoint + '/fixtures/rounds';
    let config = {
        method: 'get',
        url: leagueEndpoint,
        headers: {
            'x-apisports-key': apiKey,
            'x-apisports-host': 'v3.football.api-sports.io',
        },
        params: objParamns
    };

    axios(config).then(({data}) => {
        console.log(data.response);
        
        return listener(data.response[0]);
    }).catch(error => {
        console.log(error);
    });
};

export const getMatchsRound = (season, idLeague, round, listener) => {
    let objParamns = {};
    if(season !== undefined && season !== null) {
        Object.assign(objParamns, {season: season});
    } 

    if(idLeague != undefined && idLeague !== null) {
        Object.assign(objParamns, {league: idLeague});
    }
    
    if(round != undefined && round !== null) {
        Object.assign(objParamns, {round: round});
    }

    let leagueEndpoint = endpoint + '/fixtures';
    let config = {
        method: 'get',
        url: leagueEndpoint,
        headers: {
            'x-apisports-key': apiKey,
            'x-apisports-host': 'v3.football.api-sports.io',
        },
        params: objParamns
    };

    axios(config).then(({data}) => {
        console.log(data.response);
        let lista = extrairLista(data.response);
        return listener(lista);
    }).catch(error => {
        console.log(error);
    });
}

export const getCampeonatos = (listener) => {
    fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${chaveApi}`,
        }
    }).then(resposta => resposta.json()).then(json => {
        let lista = extrairLista(json);
        return listener(lista);
    });
};

export const getInfoCampeonato = (idCampeonato, listener) => {
    const endpointCampeonato = `https://api.api-futebol.com.br/v1/campeonatos/${idCampeonato}`;
    fetch(endpointCampeonato, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${chaveApi}`,
        }
    }).then(resposta => resposta.json()).then(json => {
        const {rodada_atual} = json;
        //console.log(json);

        getJogosDoCampeonato(rodada_atual.rodada, idCampeonato, listener);
    });
};

export const getJogosDoCampeonato = (rodadaId, campeonatoId, listener) => {
    const endpointPartidas = `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/rodadas/${rodadaId}`;
    
    fetch(endpointPartidas, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${chaveApi}`,
        }
    }).then(resposta => resposta.json()).then(json => {
        let {partidas} = json;
       // console.log(json);
        return listener(partidas);
    });
};