import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get the API_KEY
        const serverAPIKey = process.env.API_KEY;

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
