import { format } from "date-fns";

let palpite = {
    IdLiga: '',
    IdJogo: '',
    IdPalpite: '',
    HoraCriacaoPalpite: 0,
    golsMandante: 0,
    golsVisitante: 0,
    resultado: '',
    horaCriacao: 0,
}

export const novoPalpite = (idLiga, idJogo, idPalpite, palpiteGolsMandante, palpiteGolsVisitante, palpiteResultado, idUser, idTimeMandante, idTimeVisitante, timeMandante, timeVisitante  ) => {

    let palpite = {
        IdLiga: idLiga,
        IdJogo: idJogo,
        IdUser: idUser,
        //IdPalpite: idPalpite,
        HoraCriacaoPalpite: Date.now(),
        golsMandante: palpiteGolsMandante,
        golsVisitante: palpiteGolsVisitante,
        resultado: palpiteResultado,
        ranking: null,
        IdTimeMandante: idTimeMandante,
        IdTimeVisitante: idTimeVisitante,
        TimeMandante: timeMandante, 
        TimeVisitante: timeVisitante 
    } 

    return palpite;
}