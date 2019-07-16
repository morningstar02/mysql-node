const dbConnection = require('../dbConnection');
const queries = require('../queries/queries');

module.exports = class bikesDao {
    async saveEntity(entity) {
        let con =  await dbConnection();
        try{
            await con.query("START TRANSACTION");
            let savedBike = await con.query(
                queries.insert_bikes,
                [entity.model, entity.company]
            );
            await con.query("COMMIT");
            entity.id = savedBike.insertId;
            return entity;
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    async deleteEntity(id) {
        let con = await dbConnection();
        try{
            await con.query("START TRANSACTION");
            await con.query(queries.delete_bikes, [id]);
            await con.query("COMMIT");
            return true;
        } catch (ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    async updateEntity(entity) {
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            await con.query(queries.update_bikes, [
                entity.model,
                entity.company,
                entity.id
            ]);
            await con.query("COMMIT");
            return true;
        } catch(ex) {
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }

    async readEntities(entity) {
        let con = await dbConnection();
        try{
            await con.query("START TRANSACTION");
            let bikes = await con.query(queries.read_bikes);
            await con.query("COMMIT");
            bikes = JSON.parse(JSON.stringify(bikes));
            return bikes;
        } catch(ex) {
            console.log(ex);
            throw ex;
        } finally {
            await con.release();
            await con.destroy();
        }
    }
}