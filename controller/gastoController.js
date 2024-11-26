const gastoModel = require('../model/gastoModel.js');

class gastoController{
    async inserir(req,res){
        try {
            const{tipo_despesa, valor, data_vencimento, responsavel_nome, observacao} = req.body;
            const gastoData ={tipo_despesa, valor, data_vencimento, responsavel_nome, observacao};
            const gasto = await gastoModel.criar(gastoData);
            res.status(201).json({
                message:'Despesa inserida com Sucesso',
                data: gasto.json()
            });
        } catch (error) {
            res.status(500).json({
                message:'Não Foi Possivel inserir despesa',
                error: error.message
            });
        }
    }
}

module.exports = new gastoController()