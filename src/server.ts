import 'dotenv/config'

import { App } from '@/app'
import { env } from '@/env'

const PORT = env.PORT

new App().start(PORT)
