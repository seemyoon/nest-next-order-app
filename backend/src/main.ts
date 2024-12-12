import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig } from './configs/config.type';
import { HTTP } from './constants/common.constants';

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
    // console.log(
    //   `Minio Object Store is running on http://${appConfig.host}:8001/browser`,
    // );
  });
}

void bootstrap();
