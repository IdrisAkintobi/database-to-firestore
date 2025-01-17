import { ZodError } from 'zod';

export function ZodErrorParser(error) {
    if (error instanceof ZodError) {
        throw new Error(`Missing or invalid ${error.errors.length} environment variable${
            error.errors.length > 1 ? 's' : ''
        }:
         ${error.errors.map(error => `${error.path}: ${error.message}`).join('\n')}
        `);
    } else {
        throw error;
    }
}
