import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Request, Res, UseGuards } from '@nestjs/common';
import { ClaimService } from '../../service/claim/service';
import { CustomerGuard } from '../../guard/customer.guard';
import { CreateClaimDto } from '../../dto/claim/create.dto';
import { StaffGuard } from '../../guard/staff.guard';
import { ProductService } from '../../service/product/service';
import { StatusClaimDto } from '../../dto/claim/status.dto';
import { UserService } from '../../service/user/service';

@Controller('claim')
export class ClaimController {
  constructor(
    private readonly claimService: ClaimService,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(CustomerGuard)
  @Post()
  async createClaim(
    @Request() req: any,
    @Res() response: any,
    @Body() createClaimDto: CreateClaimDto
  ) {
    try {
      const product = await this.productService.getProduct(createClaimDto.product_id);
      const data = await this.claimService.createClaim(createClaimDto, product, req.user);
      return response.status(HttpStatus.CREATED).json({
        message: 'Claim has been created successfully',
        data,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Claim not created!',
        error: 'Bad Request'
      });
    }
  }

  // @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getClaim(
    @Res() response: any,
    @Param('id') claimId: string
  ) {
    try {
      const data = await this.claimService.getClaim(claimId);
      return response.status(HttpStatus.OK).json({
        message: 'Claim found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Post(':id')
  async updateClaim(
    @Request() req: any,
    @Res() response: any,
    @Param('id') claimId: string,
    @Body() createClaimDto: CreateClaimDto
  ) {
    try {
      const product = await this.productService.getProduct(createClaimDto.product_id);
      const customer = await this.userService.getUser(createClaimDto.customer_id);
      const data = await this.claimService.updateClaim(claimId, createClaimDto, product, customer);
      return response.status(HttpStatus.CREATED).json({
        message: 'Claim has been updated successfully',
        data,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Claim not updated!',
        error: 'Bad Request'
      });
    }
  }

  @UseGuards(StaffGuard)
  @Put(':id')
  async updateStatusClaim(
    @Req() request : any,
    @Res() response: any,
    @Param('id') claimId: string,
    @Body() statusClaimDto: StatusClaimDto
  ) {
    try {
      const data = await this.claimService.updateStatusClaim(claimId, statusClaimDto);
      return response.status(HttpStatus.OK).json({
        message: 'Claim status has been successfully updated',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(StaffGuard)
  @Post(':id')
  async deleteClaim(
    @Request() req: any,
    @Res() response: any,
    @Param('id') claimId: string
  ) {
    try {
      const data = await this.claimService.deleteClaim(claimId);
      return response.status(HttpStatus.CREATED).json({
        message: 'Claim has been deleted successfully',
        data,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Claim not deleted!',
        error: 'Bad Request'
      });
    }
  }

  @UseGuards(StaffGuard)
  @Get()
  async getClaims(
    @Res() response: any
  ) {
    try {
      const data = await this.claimService.getAllClaims();
      return response.status(HttpStatus.OK).json({
        message: 'All claims data found successfully',
        data,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
