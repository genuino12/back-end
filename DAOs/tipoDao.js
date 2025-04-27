const pool = require('../config/db.js');  

class tipoDespesaDAO {
    async inserir(tipoDespesa) {
        const query = `INSERT INTO tipo_despesa (nome) VALUES (?)`;
    
        // Verifique se o campo nome é fornecido
        const nome = tipoDespesa.nome;

        console.log('Dados recebidos para inserção:', { nome });
    
        // Validação: campo obrigatório
        if (!nome || nome.trim() === "") {
            throw new Error('O campo "nome" é obrigatório.');
        }
    
        try {
            // Execute a query para inserir os dados no banco de dados
            const [result] = await pool.execute(query, [nome]);
    
            console.log('Tipo de despesa inserido com sucesso:', {
                id: result.insertId,
                nome,
            });
    
            // Retorna o ID gerado e o nome
            return {
                id: result.insertId,
                nome,
            };
        } catch (error) {
            console.error('Erro ao inserir tipo de despesa:', {
                mensagem: error.message,
                stack: error.stack,
                dados: { nome },
            });
    
            throw error;
        }
    }

    async buscarPorTermo(termo) {
        console.log('Buscando tipo de despesa com o termo:', termo);

        if (!termo || termo.trim() === "") {
            const query = `SELECT * FROM tipo_despesa`;
            console.log('Executando a query de busca sem filtro:', query);
            const [rows] = await pool.execute(query);
            console.log('Dados encontrados (sem filtro):', rows);
            return rows;
        } else {
            const query = `SELECT * FROM tipo_despesa WHERE nome LIKE ?`;
            console.log('Executando a query de busca com filtro:', query, 'Com os parâmetros:', [`%${termo}%`]);
            const [rows] = await pool.execute(query, [`%${termo}%`]);
            console.log('Dados encontrados (com filtro):', rows);
            return rows;
        }
    }

    async buscaPorID(id) {
        console.log('Buscando tipo de despesa com ID:', id);

        const query = `SELECT * FROM tipo_despesa WHERE id = ?`;
        console.log('Executando a query de busca por ID:', query, 'Com o parâmetro:', [id]);

        const [rows] = await pool.execute(query, [id]);

        console.log('Dados encontrados para o ID:', id, rows);

        return rows[0];
    }

    async deletar(id) {
        console.log('Deletando tipo de despesa com ID:', id);

        const query = `DELETE FROM tipo_despesa WHERE id = ?`;
        console.log('Executando a query de exclusão:', query, 'Com o parâmetro:', [id]);

        const [result] = await pool.execute(query, [id]);

        if (result.affectedRows === 0) {
            throw new Error('Tipo de despesa não encontrado ou não foi possível deletar');
        }

        console.log('Tipo de despesa deletado com sucesso:', { id });

        return result;
    }

    async atualizar(id, tipoDespesa) {
        const { nome } = tipoDespesa;

        console.log('Atualizando tipo de despesa com ID:', id);

        // Verifique se o campo nome é fornecido
        if (!nome || nome.trim() === "") {
            throw new Error('O campo nome é obrigatório.');
        }

        const query = `UPDATE tipo_despesa SET nome = ? WHERE id = ?`;

        console.log('Executando a query de atualização:', query, 'Com os parâmetros:', [nome, id]);

        const [result] = await pool.execute(query, [nome, id]);

        if (result.affectedRows === 0) {
            throw new Error('Tipo de despesa não encontrado ou não foi possível atualizar');
        }

        console.log('Tipo de despesa atualizado com sucesso:', {
            id,
            nome
        });

        return result;
    }
}

module.exports = tipoDespesaDAO;
