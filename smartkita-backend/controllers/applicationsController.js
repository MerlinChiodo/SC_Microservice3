const prisma = require('../lib/prisma.js');

// APPLICATION = Antrag
exports.applicationsList = async (req, res) => {
    try {
        const allApplications = await prisma.antrag.findMany()
        return res.json(allApplications)
    } catch (e) {
        console.log(e)
    }
};

exports.getApplicationById = async (req, res) => {
    return res.send('not implemented yet')
}

exports.createApplication = async (req, res) => {
    return res.send('not implemented yet')
}

exports.patchApplication = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteApplication = async(req, res) => {
    return res.send('not implemented yet')
}
