import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('images')
export class ImageController {
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res: Response) {
        return res.sendFile(join(process.cwd(), 'assets/' + image));
    }
}
