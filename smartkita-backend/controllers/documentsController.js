const prisma = require('../lib/prisma.js');



exports.documentsList = async (req, res) => {
    return res.send('not implemented yet')
}

exports.getDocumentById = async (req, res) => {
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
        const path_fileserver = "./upload/documents/" + filename;
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
