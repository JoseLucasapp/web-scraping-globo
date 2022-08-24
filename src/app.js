import express from 'express'
import cors from 'cors'

import { routes } from './routes/routes'

const app = express()

app.use(express.json())
app.use(cors())

const router = express.Router()

app.use(router)

routes(router)

app.listen(3000)