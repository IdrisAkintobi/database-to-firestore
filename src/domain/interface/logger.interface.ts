export interface LoggerInterface {
    debug(message: any, context?: unknown): void;
    log(message: any, context?: unknown): void;
    error(message: any, stack?: unknown, context?: unknown): void;
    verbose(message: any, context?: unknown): void;
    warn(message: any, context?: unknown): void;
}
