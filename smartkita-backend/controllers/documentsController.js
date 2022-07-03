const prisma = require('../lib/prisma.js');

exports.documentsList = async (req, res) => {
    return res.send('not implemented yet')
}

exports.documentsListById = async (req, res) => {
    let id = req.query.id
    try {
        Number(id)
    } catch (e) {
        console.log("invalid id")
        return res.status(400).send({error: true, msg: "invalid id"})
    }
    try {
        const documents = await prisma.dokument.findMany({
                where: {
                    id_ezb: Number(id)
                }
            })
        return res.status(200).json(documents)
    } catch (e) {
        console.log(e)
    }
}

exports.getDocumentById = async (req, res) => {
    let id = req.query.id
    try {
        Number(id)
    } catch (e) {
        console.log("invalid id")
        return res.status(400).send({error: true, msg: "invalid id"})
    }
    try {
        const document = await prisma.dokument.findUnique({
            where: {
                id_dokument: Number(id)
            }
        })
        return res.sendFile(document.path_fileserver, { root: "uploads/documents" })
    } catch (e) {
        console.log(e)
    }
}

exports.getDocumentByScId = async(req, res) => {
    return res.send('not implemented yet')
}

exports.createDocument = async (req, res) => {
    let id_ezb;
    try { id_ezb = Number(req.params.id); } catch (e) {
        console.log("invalid id");
        return res.status(400).json({ message: "invalid id_ezb"});
    }
    let documents = [];

    for (let i = 0; i < req.files.length; i++) {
        const filename = req.files[i].filename;
        const path_fileserver = filename;
        const datum_upload = new Date();
        const dateiformat = "PDF";

        try {
            const document = await prisma.dokument.create({
                data: {
                    id_ezb,
                    path_fileserver,
                    datum_upload,
                    dateiformat
                }
            })
            console.log(document);
            documents.push(document);
        } catch (e) {
            console.log(e);
        }
    }
    return res.status(200).json(documents);
}

exports.patchDocument = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteDocument = async(req, res) => {
    return res.send('not implemented yet')
}
