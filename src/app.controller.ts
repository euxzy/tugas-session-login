import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter'
import { AuthenticatedGuard } from './common/guards/authenticated.guard'
import { LoginGuard } from './common/guards/login.guard'

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  @Get('/')
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') }
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response): void {
    res.redirect('/home')
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return { user: req.user }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return { user: req.user }
  }

  @Get('/logout')
  logout(@Res() res: Response): void {
    res.redirect('/')
  }
}
