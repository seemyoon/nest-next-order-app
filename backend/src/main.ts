import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig } from './configs/config.type';
import { HTTP } from './constants/common.constants';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('order management')
    .setDescription('order management API')
    .setVersion('1.0')
    .addBearerAuth({
      bearerFormat: 'JWT',
      in: 'header',
      scheme: 'bearer',
      type: 'http',
    })
    .build();

  app.enableCors({
    origin: 'http://localhost:5300',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);

  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 7,
      persistAuthorization: true,
    },
  });
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  await app.listen(appConfig.port, () => {
    console.log(
      `Server is running on ${HTTP}${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger is running  on ${HTTP}${appConfig.host}:${appConfig.port}/docs`,
    );
  });
}

void bootstrap();
