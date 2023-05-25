import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.error('Unhandled Promise Rejection:', exception);
        // Realize outras ações, como registrar o erro ou retornar uma resposta adequada

        const response = host.switchToHttp().getResponse();
        response.status(500).json({
            message: 'Internal Server Error',
        });
    }
}
