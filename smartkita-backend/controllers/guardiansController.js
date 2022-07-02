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

exports.getGuardianBySmartcityId = async (req, res) => {
    let id = req.query.id
    try { Number(id)}
    catch (e) {
        console.log("invalid id")
        return res.status(400).send({error: true, msg: "invalid id"})
    }
    try {
        const guardian = await prisma.erziehungsberechtigte.findFirst({
            where: {
                smartcity_id: Number(id)
            }
        })
        if (guardian) {
            return res.status(200).json(guardian)
        }
        else return res.status(400).send({ message: "guardian does not exist in Kita DB yet" })
    } catch (e) {
        console.log(e)
        return res.status(400).send({ message: "guardian does not exist in Kita DB yet" })
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
