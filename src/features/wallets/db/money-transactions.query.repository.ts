import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryRepository } from '../../../core/db/base.query.repository';
import { MoneyTransaction } from '../domain/entities/money-transaction.entity';

@Injectable()
export class MoneyTransactionsQueryRepository
  implements BaseQueryRepository<MoneyTransactionsViewModel>
{
  constructor(
    @InjectRepository(MoneyTransaction)
    private ormRepo: Repository<MoneyTransaction>,
  ) {}

  async getAll(): Promise<MoneyTransactionsViewModel[]> {
    const clients = await this.ormRepo.find({});
    return clients.map(MoneyTransactionsQueryRepository.mapEntityToViewModel);
  }

  async getById(id: string): Promise<MoneyTransactionsViewModel> {
    const entity = await this.ormRepo.findOneBy({
      id: id,
    });
    return MoneyTransactionsQueryRepository.mapEntityToViewModel(entity);
  }

  static mapEntityToViewModel(
    entity: MoneyTransaction,
  ): MoneyTransactionsViewModel {
    if (!entity) return null;

    const viewModel: MoneyTransactionsViewModel = {
      id: entity.id,
      fromWalletId: entity.fromWalletId,
      toWalletId: entity.toWalletId,
      withdrawalAmount: entity.withdrawalAmount,
      depositedAmount: entity.depositedAmount,
    };
    return viewModel;
  }
}

export class MoneyTransactionsViewModel {
  @ApiProperty()
  id: string;
  @ApiProperty()
  fromWalletId: string;
  @ApiProperty()
  toWalletId: string;
  @ApiProperty()
  withdrawalAmount: number;
  @ApiProperty()
  depositedAmount: number;
}