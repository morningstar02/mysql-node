module.exports = {
    insert_bikes: `INSERT INTO rentbikes(model, company) VALUES(?, ?)`,
    read_bikes: `SELECT * FROM rentbikes`,
    update_bikes: `UPDATE rentbikes SET rentbikes.model = ?, rentbikes.company = ? WHERE rentbikes.id = ?`,
    delete_bikes: `DELETE FROM rentbikes WHERE rentbikes.id = ?`
}