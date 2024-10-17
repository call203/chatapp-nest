import { Test, TestingModule } from '@nestjs/testing';
import { LastreadMessageService } from './lastread-message.service';

describe('LastreadMessageService', () => {
  let service: LastreadMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LastreadMessageService],
    }).compile();

    service = module.get<LastreadMessageService>(LastreadMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
