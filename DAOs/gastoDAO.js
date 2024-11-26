const db = require('../config/db.js');
class gastoDAO {
    async inserir(gasto) {
        const query = `INSERT INTO despesas (tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao)
                       VALUES (?, ?, ?, ?, ?)`;
        
        const [result] = await db.execute(query, [
            gasto.tipo_despesa, 
            gasto.valor, 
            gasto.data_vencimento, 
            gasto.responsavel_nome, 
            gasto.observacao
        ]);

        return result.insertId;  
    }
}

module.exports = gastoDAO;
