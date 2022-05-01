const prisma = require('../lib/prisma.js');

exports.kitasList = (req, res) => {
    res.send('NOT IMPLEMENTED: kitas list')
};

exports.getKitaById = (req, res) => {
    res.send('NOT IMPLEMENTED: get a single kita')
};

exports.createKita = async (req, res) => {
    // TODO: error handling
    const { smartcity_teilnehmer, name, traeger, strasse, hausnr, plz, traeger_kategorie, kurzbeschreibung } = req.body
    const post = await prisma.einrichtung.create({
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
    res.json(post)
}
