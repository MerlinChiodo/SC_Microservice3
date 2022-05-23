const prisma = require('../lib/prisma.js');

exports.kitasList = async (req, res) => {
    const allKitas = await prisma.einrichtung.findMany()
    return res.json(allKitas)
};

exports.getKitaById = async (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {    // check for float
        return res.status(400).send({ error : true, msg : "invalid id"});
    }
    const kita = await prisma.einrichtung.findUnique({
        where: {
            id_einrichtung: id,
        },
    })
    return res.json(kita)
};

exports.createKita = async (req, res) => {
    const {smartcity_teilnehmer, name, traeger, strasse, hausnr, plz, traeger_kategorie, kurzbeschreibung} = req.body
    // return 400 if required attributes are missing
    if (smartcity_teilnehmer == null || name == null || traeger == null || strasse == null || hausnr == null
        || plz == null || traeger_kategorie == null || kurzbeschreibung == null) {
        return res.status(400).send({error: true, msg: 'missing Kita data'})
    }
    // promise oder try catch um prisma-Block
    const kita = await prisma.einrichtung.create({
        data: {
            smartcity_teilnehmer,
            name,
            traeger,
            strasse,
            hausnr,
            plz,
            traeger_kategorie,
            kurzbeschreibung
        },
    })
    return res.json(kita)
};

exports.patchKita = async (req, res) => {
    return res.send('not implemented yet')
}

exports.deleteKita = async(req, res) => {
    return res.send('not implemented yet')
}



