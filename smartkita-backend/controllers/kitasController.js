const prisma = require('../lib/prisma.js');

exports.kitasList = async (req, res) => {
    const allKitas = await prisma.einrichtung.findMany()
    res.json(allKitas)
};

exports.getKitaById = async (req, res, next) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.status(400).send({ error : true, msg : "invalid id"});
        next();
    }
    const kita = await prisma.einrichtung.findUnique({
        where: {
            id_einrichtung: id,
        },
    })
    res.json(kita)
};

exports.createKita = async (req, res) => {
    const { smartcity_teilnehmer, name, traeger, strasse, hausnr, plz, traeger_kategorie, kurzbeschreibung } = req.body
    // return 400 if required attributes are missing
    if (smartcity_teilnehmer == null || name == null || traeger == null || strasse == null || hausnr == null
    || plz == null || traeger_kategorie == null || kurzbeschreibung == null) {
        return res.status(400).send({ error : true, msg : 'missing Kita data'})
    }
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
    res.json(kita)
}
