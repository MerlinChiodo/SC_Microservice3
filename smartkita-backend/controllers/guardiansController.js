const prisma = require('../lib/prisma.js');

exports.guardiansList = async (req, res) => {
    return res.send('not implemented yet')
}

exports.getGuardianById = async (req, res) => {
    let id = req.query.id
    try { Number(id)}
    catch (e) {
        console.log("invalid id")
        return res.status(400).send({error: true, msg: "invalid id"})
    }
    try {
        const guardian = await prisma.erziehungsberechtigte.findFirst({
            where: {
                id_ezb: Number(id)
            }
        })
        return res.json(guardian)
    } catch (e) {
        console.log(e)
    }
}

exports.createGuardian = async (req, res) => {
    return res.send('not implemented yet')
}

exports.patchGuardian = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteGuardian = async(req, res) => {
    return res.send('not implemented yet')
}
