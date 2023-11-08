import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigurationService } from '../infrastructure/utils/config.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject('ConfigurationService') private readonly configService: ConfigurationService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get the API_KEY
        const serverAPIKey = this.configService.getApiKey()?.apiKey;

        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        // Check for API_KEY in the header
        const { headers } = request;
        const apiKey = headers['x-api-key'];

        if (apiKey === serverAPIKey) {
            return true;
        } else {
            await response.status(401).send('UNAUTHORIZED');
            return false;
        }
    }
}
