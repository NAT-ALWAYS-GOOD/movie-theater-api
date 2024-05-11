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
import { ApiResponse } from '@nestjs/swagger';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiResponse({
    status: 200,
    description: 'Ticket has been created for this user and this sessions',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() body: { userId: number; sessionId: number }) {
    return this.ticketService.createTicket(body.userId, body.sessionId);
  }

  @ApiResponse({
    status: 200,
    description: 'Ticket has been marked as used',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch(':id/use')
  use(@Param('id') ticketId: number) {
    return this.ticketService.useTicket(ticketId);
  }

  @ApiResponse({
    status: 200,
    description: 'Super Ticket has been created for this user',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('/super')
  createSuperTicket(@Body() body: { userId: number }) {
    return this.ticketService.createSuperTicket(body.userId);
  }

  @ApiResponse({
    status: 200,
    description: 'SuperTicket has been used for this session',
  })
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/super/:id/use')
  useSuperTicket(
    @Param('id') superTicketId: number,
    @Body() body: { sessionId: number },
  ) {
    return this.ticketService.useSuperTicket(superTicketId, body.sessionId);
  }

  @ApiResponse({
    status: 200,
    description: 'User has purchased a ticket for this session',
  })
  @Post('/purchase/:userId')
  @UseGuards(SelfGuard)
  purchase(
    @Param('userId') userId: number,
    @Body() body: { sessionId: number },
  ) {
    return this.ticketService.purchaseTicket(userId, body.sessionId);
  }

  @ApiResponse({
    status: 200,
    description: 'User has purchased a super ticket',
  })
  @UseGuards(SelfGuard)
  @Post('/purchase/super/:userId')
  purchaseSuper(@Param('userId') userId: number) {
    return this.ticketService.purchaseSuperTicket(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'All tickets used by this user',
  })
  @UseGuards(SelfOrAdminGuard)
  @Get('/all-used/user/:userId')
  getAllUsedTicketsByUser(@Param('userId') userId: number) {
    return this.ticketService.findAllUsedTicketsByUser(userId);
  }

  @ApiResponse({
    status: 200,
    description: 'Count of all persons registered for this session',
  })
  @Get('/for-session/all/:sessionId')
  getCountRegisteredForSession(@Param('sessionId') sessionId: number) {
    return this.ticketService.countPersonsRegisteredForSession(sessionId);
  }

  @ApiResponse({
    status: 200,
    description:
      'Count of all persons registered for this session and where tickets has been marked as used',
  })
  @Get('/for-session/present/:sessionId')
  getCountPresentForSession(
    @Param('sessionId') sessionId: number,
  ): Promise<number> {
    return this.ticketService.countPersonsPresentForSession(sessionId);
  }

  @ApiResponse({
    status: 200,
    description: 'All tickets for this session',
  })
  @Get('/for-session/:sessionId')
  getTicketsForSession(@Param('sessionId') sessionId: number) {
    return this.ticketService.getTicketsForSession(sessionId);
  }
}
