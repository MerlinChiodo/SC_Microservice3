const prisma = require('../lib/prisma.js');

// APPLICATION = Antrag
exports.applicationsList = async (req, res) => {
    try {
        const allApplications = await prisma.antrag.findMany({
            include: {
                einrichtung: true,
                dokument: true
            }
        })
        return res.json(allApplications)
    } catch (e) {
        console.log(e)
    }
};

exports.applicationsListByInternalId = async (req, res) => {
    const id = req.query.id
    try { Number(id) } catch (e) {
        return res.status(400).send({message: "invalid user id"})
    }
    try {
        const userApplications = await prisma.antrag.findMany({
            where: {
                id_ezb: Number(id)
            },
            include: {
                dokument: true,
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
            },
            include: {
                einrichtung: true,
                dokument: true
            }
        })
        return res.json(application)
    } catch (e) {
        console.log(e)
    }
}

exports.createApplication = async (req, res) => {

    const id_einrichtung = req.body.id_einrichtung;
    const status = "EINGEGANGEN"
    const prioritaet = 1
    const bemerkung = req.body.bemerkung
    const datum = new Date()
    const id_kind = req.body.id_kind
    const id_ezb = req.body.id_ezb
    const betreuungsstunden = req.body.betreuungsstunden
    const dokumente = req.body.dokumente

    // PRISMA WRITE
    // using connect/connectOrCreate to ensure relational integrity
    let createApplication;
    try {
        createApplication = await prisma.antrag.create({
            data: {
                einrichtung: {
                    connect: {
                        id_einrichtung: id_einrichtung
                    }
                },
                status,
                prioritaet,
                bemerkung,
                datum,
                kind: {
                    connectOrCreate: {
                        where: {
                            smartcity_id: id_kind
                        },
                        create: {
                            smartcity_id: id_kind
                            }
                        }
                    },
                erziehungsberechtigte: {
                        connectOrCreate: {
                            where: {
                                smartcity_id: id_ezb
                            },
                            create: {
                                smartcity_id: id_ezb
                            }
                        }
                    },
                    betreuungsstunden,
                },
            include: {
                kind: true,
                erziehungsberechtigte: true,
                einrichtung: true
            },
        })
    } catch (e) {
        console.log(e)
        return res.status(400).send({msg: "invalid application data"})
    }
    const connectedDocuments = []
    if (dokumente && dokumente[0]) {
        for (let i = 0; i < dokumente.length; i++) {
            console.log(dokumente[i])
            try {
                connectedDoc = await prisma.antrag.update({
                    where: {
                        id_antrag: createApplication.id_antrag
                    },
                    data: {
                        dokument: {
                            connect: {id_dokument: dokumente[i]}
                        }
                    }

                })
                connectedDocuments.push(connectedDoc)
            } catch (e) {
                console.log(e)
                return res.status(400).send({msg: "invalid document data"})
            }
        }
        return res.status(200).json(createApplication);
    } else {
        return res.status(200).json(createApplication);
    }
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
