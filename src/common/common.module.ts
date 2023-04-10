import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:[ConfigModule],// to use import { ConfigService } from '@nestjs/config';

    providers:[
        {
            provide: APP_GUARD, useClass: ApiKeyGuard // comentado   app.useGlobalGuards(new ApiKeyGuard())
        }
    ]
})
export class CommonModule {}
