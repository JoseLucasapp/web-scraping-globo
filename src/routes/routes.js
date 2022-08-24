import { getDataController } from "../controllers/controller"

export const routes = async (router) => {
    router.get('/', getDataController)
}