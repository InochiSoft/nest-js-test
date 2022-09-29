import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClaimDoc } from '../../schema/claim.schema';
import { Model } from "mongoose";
import { IClaimDoc } from '../../interface/claim.interface';
import { CreateClaimDto } from '../../dto/claim/create.dto';
import { UpdateClaimDto } from '../../dto/claim/update.dto';
import { CreateUserDto } from '../../dto/user/create.dto';
import { IProductDoc } from '../../interface/product.interface';
import { CreateProductDto } from '../../dto/product/create.dto';
import { StatusClaimDto } from '../../dto/claim/status.dto';

@Injectable()
export class ClaimService {
  constructor(
    @InjectModel(ClaimDoc.name)
    private claimModel:Model<IClaimDoc>,

    @InjectModel(ClaimDoc.name)
    private productModel:Model<IProductDoc>
  ) {}

  async createClaim(createClaimDto: CreateClaimDto, productDto: CreateProductDto, userDto: CreateUserDto): Promise<IClaimDoc> {
    const data = await new this.claimModel({ ...createClaimDto, product:productDto, customer: userDto })
      .populate('customer');
    return data.save();
  }

  async updateClaim(claimId: string, updateClaimDto: UpdateClaimDto, productDto: CreateProductDto, userDto: CreateUserDto): Promise<IClaimDoc> {
    const data = await this.claimModel.findByIdAndUpdate(claimId, { ...updateClaimDto, product:productDto, customer: userDto }, { new: true })
      .populate('product')
      .populate('customer');
    if (!data) {
      throw new NotFoundException(`Claim #${claimId} not found`);
    }
    return data;
  }

  async updateStatusClaim(claimId: string, statusClaimDto: StatusClaimDto): Promise<IClaimDoc> {
    const data = await this.claimModel.findByIdAndUpdate(claimId, statusClaimDto, { new: false })
        .populate('product')
        .populate('customer');
    if (!data) {
      throw new NotFoundException(`Claim #${claimId} not found`);
    }
    return data;
  }

  async getAllClaims(): Promise<IClaimDoc[]> {
    const data = await this.claimModel.find(  )
      .populate('product')
      .populate('customer')
    ;
    if (!data || data.length == 0) {
      throw new NotFoundException('Claims data not found!');
    }
    return data;
  }

  async getClaim(claimId: string): Promise<IClaimDoc> {
    const data = await this.claimModel.findById(claimId)
      .populate('customer')
      .populate('product');

    if (!data) {
      throw new NotFoundException(`Claim #${claimId} not found`);
    }
    return data;
  }

  async deleteClaim(claimId: string): Promise<IClaimDoc> {
    const data = await this.claimModel.findByIdAndDelete(claimId);
    if (!data) {
      throw new NotFoundException(`Claim #${claimId} not found`);
    }
    return data;
  }
}
