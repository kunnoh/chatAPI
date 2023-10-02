import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('health')
@Controller('health')
export class HealthController {

    @ApiOperation({ summary: 'get api health' })
    @ApiResponse({ status: 200, description: 'response to show healthy' })
    @Get('')
    checkHealth(@Res() res: Response): void {
        res.status(HttpStatus.OK).json({ status: 'success', message: 'API healthy' });
    }

}
