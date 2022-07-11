import { format } from "date-fns";

let palpite = {
    idLiga: '',
    idJogo: '',
    idPalpite: '',
    horaCriacaoPalpite: 0,
    golsMandante: 0,
    golsVisitante: 0,
    resultado: '',
    horaCriacao: 0,
}

export const novoPalpite = (idLiga, idJogo, idPalpite, palpiteGolsMandante, palpiteGolsVisitante, palpiteResultado, idUser, idTimeMandante, idTimeVisitante, timeMandante, timeVisitante  ) => {

    let palpite = {
        idLiga: idLiga,
        idJogo: idJogo,
        idUser: idUser,
        //IdPalpite: idPalpite,
        horaCriacaoPalpite: Date.now(),
        golsMandante: palpiteGolsMandante,
        golsVisitante: palpiteGolsVisitante,
        resultado: palpiteResultado,
        ranking: null,
        idTimeMandante: idTimeMandante,
        idTimeVisitante: idTimeVisitante,
        timeMandante: timeMandante, 
        timeVisitante: timeVisitante 
    } 

    return palpite;
}