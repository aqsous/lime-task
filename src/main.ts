import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidateInputPipe} from "./core/pipes/validate.pipe";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const appVersion = require('../package.json').version;
    const options = new DocumentBuilder()
        .setTitle('Lime Home Task API')
        .setDescription('')
        .setVersion(appVersion)
        .addTag('Properties', '')
        .addTag('Bookings', '')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
        },
    });

    // app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidateInputPipe());
    await app.listen(process.env.PORT || 1337);
}

bootstrap();
