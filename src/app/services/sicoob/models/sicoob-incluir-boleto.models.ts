export class IncluirBoleto {
    constructor (){};

    numeroContrato: number;
    modalidade: string;
    numeroContaCorrente: number;
    especieDocumento: string
    dataEmissao: Date;
    nossoNumero: number;
    seuNumero: string;
    identificacaoBoletoEmpresa: string;
    identificacaoEmissaoBoleto: number;
    identificacaoDistribuicaoBoleto: number;
    valor: number;
    dataVencimento: string;
    dataLimitePagamento: string;
    valorAbatimento: number;
    tipoDesconto: number;
    dataPrimeiroDesconto: Date;
    valorPrimeiroDesconto: number;
    dataSegundoDesconto: Date;
    valorSegundoDesconto: number;
    dataTerceiroDesconto: Date;
    valorTerceiroDesconto: number;
    tipoMulta: number;
    dataMulta: Date;
    valorMulta: number;
    tipoJurosMora: number;
    dataJurosMora: Date;
    valorJurosMora: number;
    numeroParcela: number;
    aceite: boolean;
    codigoNegativacao: number;
    numeroDiasNegativacao: number;
    codigoProtesto: number;
    numeroDiasProtesto: number;
    pagador: Pagador;
    beneficiarioFinal: BeneficiarioFinal;
    mensagensInstrucao: MensagensInstrucao;
    gerarPdf: boolean;
    rateioCreditos: RateioCreditosItem[];
    codigoCadastrarPIX: number;
}

export class Pagador {
    numeroCpfCnpj: number;
    nome: string;
    endereco: string;
    bairro: string;
    cidade: string;
    cep: number;
    uf: string
    email: string[];
}

export class BeneficiarioFinal {
    numeroCpfCnpj: string;
    nome: string;
}

export class MensagensInstrucao {
    tipoInstrucao: 1;
    mensagens: string[];
}

export class RateioCreditosItem {
    numeroBanco: number;
    numeroAgencia: number;
    numeroContaCorrente: number;
    contaPrincipal: boolean;
    codigoTipoValorRateio: number;
    valorRateio: number;
    codigoTipoCalculoRateio: number;
    numeroCpfCnpjTitular: number;
    nomeTitular: string;
    codigoFinalidadeTed: number;
    codigoTipoContaDestinoTed: string;
    quantidadeDiasFloat: number;
    dataFloatCredito: string
}

export class ConsultarBoleto {
    constructor(){}
    numeroContrato: number;
    modalidade: number;
    nossoNumero: number;
}