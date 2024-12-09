import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    images: string[];

    @ApiProperty()
    price: number;

    @ApiProperty()
    count: number;

    @ApiProperty()
    description: string;


    // @ApiPropertyOptional({ description: 'Additional details as JSON object' })
    // other?: Record<string, any>;
}
