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
        return res.status(200).json(guardian)
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
        if (guardian !== null) {
            return res.status(200).json(guardian)
        }
        else return res.status(204).send({ message: "guardian does not exist in Kita DB yet"})
    } catch (e) {
        console.log(e)
        return res.status(400).send({ message: "prisma error", error: e })
    }
}

exports.createGuardian = async (req, res) => {
    let id = req.query.id
    try { Number(id)}
    catch (e) {
        console.log("invalid id")
        return res.status(400).send({error: e, msg: "invalid id", id})
    }
    try {
        const guardian = await prisma.erziehungsberechtigte.create({
            data: {
                smartcity_id: Number(id)
            }
        })
        return res.status(200).json(guardian);
    } catch (e) {
        console.log(e)
        return res.status(400).send({message: "guardian could not be created", error: e});
    }
}

exports.patchGuardian = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteGuardian = async(req, res) => {
    return res.send('not implemented yet')
}
