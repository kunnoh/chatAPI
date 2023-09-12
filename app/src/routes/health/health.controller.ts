import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {

    @ApiOperation({ summary: 'get api health' })
    @ApiResponse({ status: 200, description: 'response to show healthy' })
    @Get('')
    health(@Req() request) {
        console.log(request.headers['user-agent'])
        return { status: 'success', message: 'api healthy' }
    }

}
