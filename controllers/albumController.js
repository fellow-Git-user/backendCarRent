const Album = require("../models/albumModel")

const createAlbum = async (req, res) => {
    try {
        console.log(req.body)
        const album = new Album(req.body)
        await album.save()

        res.send(album)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAlbum = async (req, res) => {
    console.log(req.user) // cia gaunam userio informacija pvz surasti masina kuria nuomavosi sitas userris
    try {
        const albums = await Album.find()

        res.send(albums)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAlbumByID = async (req, res) => {
    try {
        const { id } = req.params
        const album = await Album.findById(id)

        if(!album){
            return res.status(404).send({ error: 'Album not found' })
        }

        res.send(album)
    } catch (error) {
        console.error('Error fetching album:', error)
        res.status(500).send(error)
    }
}

const updateAlbum = async (req, res) => {
    try {
        const { id } = req.params
        const updatedAlbum = await Album.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )

        if(!updatedAlbum){
            return res.status(404).send({ error: 'album not found' })
        }

        res.send(updatedAlbum)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params
        const deletedAlbum = await Album.findByIdAndDelete(id)

        if(!deletedAlbum) {
            return res.status(404).send({ error: 'album not found' })
        }

        res.send({ message: 'Album was successfully deleted', data: deletedAlbum })
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createAlbum,
    getAlbum,
    getAlbumByID,
    updateAlbum,
    deleteAlbum
}