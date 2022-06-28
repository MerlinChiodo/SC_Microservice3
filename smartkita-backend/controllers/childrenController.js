const prisma = require('../lib/prisma.js');

exports.childrenList = async (req, res) => {
    return res.send('not implemented yet')
}

exports.getChildById = async (req, res) => {
        let id = req.query.id
        try { Number(id)}
        catch (e) {
            return res.status(400).send({error: true, msg: "invalid id"})
        }
        try {
            const child = await prisma.kind.findFirst({
                where: {
                    id_kind: Number(id)
                }
            })
            return res.json(child)
        } catch (e) {
            console.log(e)
        }
    }

exports.createChild = async (req, res) => {
    return res.send('not implemented yet')
}

exports.patchChild = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteChild = async(req, res) => {
    return res.send('not implemented yet')
}
