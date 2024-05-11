import {
  Controller,
  Post,
  Param,
  Body,
  Patch,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './tickets.service';
import { SelfGuard } from '../guards/self.guard';
import { SelfOrAdminGuard } from '../guards/selforadmin.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() body: { userId: number; sessionId: number }) {
    return this.ticketService.createTicket(body.userId, body.sessionId);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/use')
  use(@Param('id') ticketId: number) {
    return this.ticketService.useTicket(ticketId);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('/super')
  createSuperTicket(@Body() body: { userId: number }) {
    return this.ticketService.createSuperTicket(body.userId);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/super/:id/use')
  useSuperTicket(
    @Param('id') superTicketId: number,
    @Body() body: { sessionId: number },
  ) {
    return this.ticketService.useSuperTicket(superTicketId, body.sessionId);
  }

  @Post('/purchase/:userId')
  @UseGuards(SelfGuard)
  purchase(
    @Param('userId') userId: number,
    @Body() body: { sessionId: number },
  ) {
    return this.ticketService.purchaseTicket(userId, body.sessionId);
  }

  @UseGuards(SelfGuard)
  @Post('/purchase/super/:userId')
  purchaseSuper(@Param('userId') userId: number) {
    return this.ticketService.purchaseSuperTicket(userId);
  }

  @UseGuards(SelfOrAdminGuard)
  @Get('/all-used/user/:userId')
  getAllUsedTicketsByUser(@Param('userId') userId: number) {
    return this.ticketService.findAllUsedTicketsByUser(userId);
  }
}
