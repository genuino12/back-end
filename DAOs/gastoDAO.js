const db = require('../config/db.js');  
class gastoDAO {
    async inserir(gasto) {
        const query = `INSERT INTO despesas (tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao)
                       VALUES (?, ?, ?, ?, ?)`;

       
        const tipo_despesa = gasto.tipo_despesa || null;
        const valor = gasto.valor || null;
        const data_vencimento = gasto.data_vencimento || null;
        const responsavel_nome = gasto.responsavel_nome || null;
        const observacao = gasto.observacao || null;

        try {
            const [result] = await db.execute(query, [
                tipo_despesa, 
                valor, 
                data_vencimento, 
                responsavel_nome, 
                observacao
            ]);

            return result.insertId; 
        } catch (error) {
            console.error('Erro ao inserir gasto:', error);
            throw error;  
        }
    }
}

module.exports = gastoDAO;
