let Liga = {
    id: '',
    horaCriacao: 0,
    titulo: '',
    descricao: '',
    banner: '',
    tipo: 1,
    status: 1,
    horaFechamento: 0,
    horaResultado: 0,
    jogosPorMesa: 0,
    palpiteirosPorMesa: 0,
    listaDeJogos: [],
    regras: [],
    valorEntrada: 0,
    valorPremio: 0,
    campeonatoId: '',//id do campeonato retornado pelo api
    //v--- serao atualizados no fechamento da rodada
    topClubes: [], //clubes teve mais palpite de vitoria
    topJogadores: [], //jogadores mais palpitados a marcar gol
    numMesas: 0,
    numPalpiteiros: 0,
    numPalpites: 0,
    //v--- serao atualizados no resultado da rodada
    topPalpiteiros: [],
    rankingMedia: [],
    rankingPonto: [],
    vencedores: [],
    theBest: {}, //jogador que mais pontuou
    theChampion: {}, //clube que mais pontuou
};

export const novaLiga = () => {
    return Liga;
};
 
export const newMatch = (date, timestamp, id, golHome, golAway, stts, stadio, home, fotoHome, idHome, away, fotoAway, idAway) => {
    return {
        dateRealizacao: date,
        timestampRealizacao: timestamp,
        idPartida: id,
        golsMandante: golHome,
        golsVisitante: golAway,
        status: stts,
        nomeEstadio: stadio, 

        nomeMandante: home,
        escudoTimeMandante: fotoHome,
        idMandante: idHome,

        nomeVisitante: away,
        escudoTimeVisitante: fotoAway,
        idVisitante: idAway
    };
};