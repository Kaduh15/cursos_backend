import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('API de Cursos Backend')
    .setDescription('A documentação da API de Cursos Backend')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  )

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
