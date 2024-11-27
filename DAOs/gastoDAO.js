const pool = require('../config/db.js');  
class gastoDAO {
    async inserir(gasto) {
        const query = `INSERT INTO despesas (tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao)
                       VALUES (?, ?, ?, ?, ?)`;

       
        const tipo_despesa_id = gasto.tipo_despesa_id || null;
        const valor = gasto.valor || null;
        const data_vencimento = gasto.data_vencimento || null;
        const responsavel_nome = gasto.responsavel_nome || null;
        const observacao = gasto.observacao || null;

        try {
            const [result] = await pool.execute(query, [
                tipo_despesa_id, 
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
    async BuscarPorTermo(termo){

        if (!termo || termo.trim()===""){
            const query = `SELECT * FROM despesas`;
            const [rows] = await pool.execute(query);
            return rows;

        }else {
            const query = `SELECT * FROM despesas WHERE id LIKE ?`;
            const  [rows] = await pool.execute(query, [`%${termo}%`]);
            return rows;
        }
    }
    async BuscaPorID(id){
        const query = `SELECT * FROM despesas WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    async Deletar(id){
        const query = `DELETE FROM despesas WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return result;
    }

    async Atualizar(id, gasto){
        const [tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao] = gasto;
        const quary = `UPDATE despesas SET tipo_despesa_id = ?, valor = ?, data_vencimento = ?, responsavel_nome = ?, observacao = ? WHERE id = ?`;
        const [result] = await pool.execute(quary, [tipo_despesa_id, valor, data_vencimento, responsavel_nome, observacao, id]);
        return result;
    }
}

module.exports = gastoDAO;
