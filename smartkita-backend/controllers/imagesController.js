const prisma = require('../lib/prisma.js');

exports.imagesList = async (req, res) => {
    return res.send('not implemented yet')
}

exports.imagesListById = async (req, res) => {
    let id = req.query.id
    try {
        Number(id)
    } catch (e) {
        console.log("invalid id")
        return res.status(400).send({error: true, msg: "invalid id"})
    }
    try {
        const images = await prisma.bild.findMany({
            where: {
                id_einrichtung: Number(id)
            }
        })
        return res.status(200).json(images)
    } catch (e) {
        console.log(e)
    }
}

exports.getImageById = async (req, res) => {
    let id = req.query.id
    try {
        Number(id)
    } catch (e) {
        console.log("invalid id")
        return res.status(400).send({error: true, msg: "invalid id"})
    }
    try {
        const image = await prisma.bild.findUnique({
            where: {
                id_bild: Number(id)
            }
        })
        return res.sendFile(image.path, { root: "uploads/images" })
    } catch (e) {
        console.log(e)
    }
}

exports.createImage = async (req, res) => {
    let id_einrichtung;
    try { id_einrichtung = Number(req.params.id); } catch (e) {
        console.log("invalid id");
        return res.status(400).json({ message: "invalid id_einrichtung"});
    }
    let images = [];

    for (let i = 0; i < req.files.length; i++) {
        const filename = req.files[i].filename;
        const path = filename;

        try {
            const image = await prisma.bild.create({
                data: {
                    id_einrichtung,
                    path,
                }
            })
            console.log(image);
            images.push(image);
        } catch (e) {
            console.log(e);
        }
    }
    return res.status(200).json(images);
}

exports.patchImage = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteImage = async(req, res) => {
    return res.send('not implemented yet')
}
