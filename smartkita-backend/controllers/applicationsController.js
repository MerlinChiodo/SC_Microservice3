const prisma = require('../lib/prisma.js');
const {getApplicationById} = require("./applicationsController");

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
    let id = req.query.id
    try {
        Number(id)
    } catch (e) {
        return res.status(400).send({ error : true, msg : "invalid id"});
    }
    try {
        const application = await prisma.antrag.findFirst({
            where: {
                id_antrag: Number(id)
            }
        })
        return res.json(application)
    } catch (e) {
        console.log(e)
    }
}

exports.createApplication = async (req, res) => {
    return res.send('not implemented yet')
}

exports.patchApplication = async (req, res) => {
    const id = req.body.id_antrag
    const newApplication = req.body

    try {
        const updateApplication = await prisma.antrag.update({
            where: {
                id_antrag: id
            },
                data: {
                    id_einrichtung: newApplication.id_einrichtung,
                    id_kind: newApplication.id_kind,
                    id_ezb: newApplication.id_ezb,
                    datum: newApplication.datum,
                    prioritaet: newApplication.prioritaet,
                    status: newApplication.status,
                    betreuungsstunden: newApplication.betreuungsstunden,
                    bemerkung: newApplication.bemerkung
                }
                })
        return res.json(updateApplication)
    } catch (e) {
        console.log(e)
        return res.status(400).send({msg: "invalid application data"})
    }

}

exports.deleteApplication = async(req, res) => {
    return res.send('not implemented yet')
}
