const gastoModel = require('../model/gastoModel.js');

class gastoController{
    async inserir(req,res){
        try {
            const{tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao} = req.body;
            const gastoData ={tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao};
            const gasto = await gastoModel.criar(gastoData);
            res.status(201).json({
                message:'Despesa inserida com Sucesso',
                data: gasto
            });
        } catch (error) {
            res.status(500).json({
                message:'Não Foi Possivel inserir despesa',
                error: error.message
            });
        }
    }
    async Deletar(req, res){
        try {
            const {id} = req.params;
            const gasto = await gastoModel.BuscaPorID(id);
            if (!gasto){
                return res.status(404).json({
                    message: 'Despesa Não encontrado',
                });
            }
            await gasto.Deletar();
            res.status(200).json({
                message: 'Despesa Excluido com Sucesso',
            });

        } catch (error) {
            console.error('erro ao excluir Despesa', error),
            res.status(500).json({
                message: 'erro ao excluir Despesa',
                error: error.message
            });
        }
    }
    async BuscaPorID(req, res){
        try {
            const {id} = req.params;
            const gasto = await gastoModel.BuscaPorID(id);
            if (!gasto){
                return res.status(404).json({
                    message: 'Despesa Não encontrado',
                });
            }
            res.status(200).json({
                message: 'Despesa Encontrada com Sucesso',
                data: gasto.toJSON(),
            });

        } catch (error) {
            console.error('erro ao Buscar Por ID', error),
            res.status(500).json({
                message: 'erro ao Buscar Por ID',
                error: error.message
            });
        }
    }
    async BuscarPorFiltro(req,res){
        try {
            const {termo} = req.query;
            const gasto = await gastoModel.BuscarPorFiltro(termo);

            if (gasto.length === 0){
                return res.status(404).json({
                    message: 'Nenhuma Despessa Encrontrado',
                });
            }
            req.status(200).json({
                message: 'Despesa Encontrado com Sucesso',
                data: gasto.map(gasto => gasto.toJSON()),
            });

        } catch (error) {
            console.error('erro ao buscar Despesa por filtro', error);
            res.status(500).json({
                message: 'erro ao busca por Despesa por filtro',
                erro: error.message,
            });
            
        }
    }
    async Atualizar(req,res){
        try {
            const {id} = req.params;
            const {tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao} = req.body;

            const gasto = await gastoModel.BuscaPorID(id);

            if (!gasto){
                return res.status(404).json({
                    message: 'Despesa Não encontrada',
                });
            }
            console.log('Tipo de Despesas:', gasto.tipo_despesa)
            gasto.tipo_despesa = tipo_despesa_id;
            gasto.valor = valor;
            gasto.data_vencimento = data_vencimento;
            gasto.responsavel_nome = responsavel_nome;
            gasto.observacao = observacao;

            await gasto.Atualizar();
            
            res.status(200).json({
                message: 'Despesa Atualizada Com Sucesso',
                data: gasto.toJSON(),
            });
        } catch (error) {
            console.error('erro ao atualizar Despesa', error);
            res.status(500).json({
                message: 'erro ai atualizar despesa',
                erro: error.message
            })

        }
    }
}

module.exports = new gastoController()