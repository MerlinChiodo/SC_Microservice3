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

exports.createContract = async (req, res) => {
    return res.send('not implemented yet')
}

exports.patchContract = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteContract = async(req, res) => {
    return res.send('not implemented yet')
}
