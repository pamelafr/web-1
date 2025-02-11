class ContactsDAO {
    // READ
    static async getUsers(client) {
        const cursor = await client
            .find()
            .sort({ nome: 1 })
            .limit(10);
        try {
            const results = await cursor.toArray();
            return results;
        } catch (err) {
            console.log(err);
        }
    }

    // CREATE
    static async insertUser(client, doc) {
        try {
            const result = await client.insertOne(doc);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    // DELETE
    static async deleteUserByNome(client, nome) {
        try {
            const result = await client.deleteOne({ nome: nome });
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    // UPDATE
    static async updateTelefoneByEmail(client, email, tel) {
        try {
            const result = await client.updateOne(
                { email: email },
                { $set: { telefone: tel } }
            );
            return result;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = ContactsDAO;
