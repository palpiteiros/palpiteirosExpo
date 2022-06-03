const endpoint = `https://api.api-futebol.com.br/v1/campeonatos`;

//usar essa chave no teste retorna todos campeonatos disponiveis mas consome a cota de requisiçoes
const LIVE = 'live_c0d23ac538ed108228dfd3c7a60d67';

//essa chave so retorna um campeonato
const TESTE = 'test_4f03280014e0d1e4fd7cd594b0bdac';

const chaveApi = TESTE;

const extrairLista = json => {
    let list = [];
    json.forEach(obj => {
        list.push(obj);
    });
    return list;
};

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
