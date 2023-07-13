import { IsNotEmpty } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

class RefreshTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  refreshToken: string;
}

export default RefreshTokenDto;