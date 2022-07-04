const prisma = require('../lib/prisma.js');

exports.contractsList = async (req, res) => {
    try {
        const allContracts = await prisma.vertrag.findMany(
        { include: {
            einrichtung: true
        },
        })

        allContracts
        return res.json(allContracts)
    } catch (e) {
        console.log(e)
    }
}

exports.getContractById = async (req, res) => {
    return res.send('not implemented yet')
}

exports.contractsListByInternalId = async (req, res) => {
    const id = req.query.id
    try { Number(id) } catch (e) {
        return res.status(400).send({message: "invalid user id"})
    }
    try {
        const userApplications = await prisma.vertrag.findMany({
            where: {
                id_ezb: Number(id)
            },
            include: {
                einrichtung: true,
                kind: true
            }
        })
        return res.status(200).json(userApplications)
    } catch (e) {
        console.log(e)
        return res.status(400)
    }
}

exports.createContract = async (req, res) => {

    const id_einrichtung = req.body.id_einrichtung;
    const id_kind = req.body.id_kind;
    const id_ezb = req.body.id_ezb;
    const beginn = req.body.beginn;
    const ende = req.body.ende;
    const betreuungsstunden = req.body.betreuungsstunden;
    const bemerkung = req.body.bemerkung;

    // PRISMA WRITE
    try {
        const createContract = await prisma.vertrag.create({
            data: {
                id_einrichtung,
                id_kind,
                id_ezb,
                beginn,
                ende,
                betreuungsstunden,
                bemerkung
            }
        })
        return res.status(200).json(createContract);
    } catch (e) {
        console.log(e)
        return res.status(400).send({msg: "invalid contract data"});
    }

}

exports.patchContract = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteContract = async(req, res) => {
    return res.send('not implemented yet')
}
