import { getData } from "../scrapers/getData"

export const getDataController = async (req, res) => {
    try {

        const data = await getData()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}