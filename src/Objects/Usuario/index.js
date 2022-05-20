let Usuario = {

    //dados padroes
    uid: 'string',
    nome: 'string',
    userName: 'string',
    dataCadastro: 'timestamp',
    phone: 'string',
    email: 'string',
    cpf: 'string',
    foto: 'string',

    //quando futuramente a plataforma abri shop para produtos do setor esportivo
    enderecoPrincipal: {
        cep: 'string',
        pais: 'string',
        estado: 'string',
        cidade: 'string',
        bairro: 'string',
        rua: 'string',
        numero: 'string',
        complemento: 'string'
    },

    //caso user quebre regra, o app adm muda o status desse atributo para restringir acoes
    restricoes: [
        {id: 'num', obs: 'string'}
    ],

    //caso a plataforma precise de anexos como copia de rg, cpf, provas, documentos privados
    anexos: [
        {title: 'string', foto: 'string'}
    ],

    //experiencia personalizada
    timesFavoritos: [
        {nome: 'string', id: 'string', path: 'string',}
    ],
    selecoesFavoritas: [
        {nome: 'string', id: 'string', path: 'string',}
    ],
    jogadoresFavoritos: [
        {nome: 'string', id: 'string', path: 'string',}
    ],

    premios: [],
    medalhas: [],
    nivel: 1,
    pontos: 0,
    media: 0,
    cash: 0,
    cripto: 0
};

//tipos de restricoes que o app adm pode da a um user
let restricoes = [
    {id: 1, title: 'Bloqueio de Conta'},
    {id: 2, title: 'Bloqueio de Paltites'},
    {id: 3, title: 'Bloqueio de Carteira'},
];

export const novoUsuario = (uid, nome, phone, email) => {

    let user = {
        uid: uid,
        nome: nome,
        phone: phone,
        email: email,
        userName: '',
        dataCadastro: Date.now(),
        cpf: '',
        foto: '',
        enderecoPrincipal: null,
        restricoes: [],
        anexos: [],
        timesFavoritos: [],
        selecoesFavoritas: [],
        jogadoresFavoritos: [],
        premios: [],
        medalhas: [],
        nivel: 1,
        pontos: 0,
        media: 0,
        cash: 0,
        cripto: 0
    }

    return user;
}