const gastoDAO = require('../DAOs/gastoDAO.js');

class gastoModel {
    #id;
    #tipo_despesa_id;
    #valor;
    #data_vencimento;
    #responsavel_nome;
    #observacao;

    constructor(id, tipo_despesa, valor, data_vencimento, responsavel_nome, observacao) {
        this.#id = id;
        this.#tipo_despesa_id = tipo_despesa;
        this.#valor = valor;
        this.#data_vencimento = data_vencimento;
        this.#responsavel_nome = responsavel_nome;
        this.#observacao = observacao;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get tipo_despesa() {
        return this.#tipo_despesa_id;
    }

    get valor() {
        return this.#valor;
    }

    get data_vencimento() {
        return this.#data_vencimento;
    }

    get responsavel_nome() {
        return this.#responsavel_nome;
    }

    get observacao() {
        return this.#observacao;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set tipo_despesa(value) {
        this.#tipo_despesa_id = value;
    }

    set valor(value) {
        this.#valor = value;
    }

    set data_vencimento(value) {
        this.#data_vencimento = value;
    }

    set responsavel_nome(value) {
        this.#responsavel_nome = value;
    }

    set observacao(value) {
        this.#observacao = value;
    }

    toJSON() {
        return {
            id: this.#id,
            tipo: this.#tipo_despesa_id,
            valor: this.#valor,
            vencimento: this.#data_vencimento,
            nome: this.#responsavel_nome,
            observacao: this.#observacao
        };
    }

    static async criar(gastoData) {
        const dao = new gastoDAO();
        const gasto = new gastoModel(
            null, 
            gastoData.tipo_despesa,
            gastoData.valor,
            gastoData.data_vencimento,
            gastoData.responsavel_nome,
            gastoData.observacao
        );

        
        const insertedId = await dao.inserir(gasto);
        gasto.id = insertedId;

        return gasto;
    }
}

module.exports = gastoModel;
