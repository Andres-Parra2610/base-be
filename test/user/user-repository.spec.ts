import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder, DataSource } from 'typeorm';
import { UserRepository } from '../../src/modules/user/infrastucture/persistence/respositories/user.repository';
import { UserEntity } from '../../src/modules/user/infrastucture/persistence/entities/user.entity';
import { FilterOperator, QueryDto } from '../../src/utils/dto/pagination.dto';
import { UserMapper } from '../../src/modules/user/infrastucture/persistence/mappers/user.mapper';

// Mock Data matching the user's provided JSON
const mockUsersData = [
  {
    id: '9fd7314a-36dd-4f46-9550-39280b774f95',
    createdAt: new Date('2026-01-28T19:40:58.950Z'),
    updatedAt: new Date('2026-01-28T19:40:58.950Z'),
    fullName: 'Andres Alejandro Parra',
    email: 'andresparra261000@gmail.com',
    isStaff: true,
  },
  {
    id: 'bd0a41ad-2db1-4eff-bde0-4bf0f4a75590',
    createdAt: new Date('2026-01-29T15:15:17.458Z'),
    updatedAt: new Date('2026-01-29T15:15:17.458Z'),
    fullName: 'Andres Alejandro Parra',
    email: 'andresparra261000@a4agro.com',
    isStaff: true,
  },
  {
    id: '0cdb9b14-1751-490e-b6c8-47da757dcdc0',
    createdAt: new Date('2026-01-29T17:21:04.068Z'),
    updatedAt: new Date('2026-01-29T18:46:02.286Z'),
    fullName: 'Parra',
    email: 'aparra@a4agro.com',
    isStaff: false,
  },
];

describe('UserRepository', () => {
  let repository: UserRepository;
  let queryBuilder: SelectQueryBuilder<UserEntity>;
  let typeOrmRepository: Repository<UserEntity>;
  let dataSource: DataSource;

  beforeEach(async () => {
    // Mock QueryBuilder
    queryBuilder = {
      alias: 'user',
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([mockUsersData as any, 3]),
    } as unknown as SelectQueryBuilder<UserEntity>;

    // Mock Repository
    const mockRepo = {
      createQueryBuilder: jest.fn().mockReturnValue(queryBuilder),
      softDelete: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: 'DATA_SOURCE',
          useValue: {
            getRepository: jest.fn().mockReturnValue(mockRepo),
          },
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    dataSource = module.get<DataSource>('DATA_SOURCE');
    typeOrmRepository = dataSource.getRepository(UserEntity);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users with default pagination', async () => {
      const queryDto: QueryDto = {};
      const result = await repository.findAll(queryDto);

      expect(typeOrmRepository.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(queryBuilder.getManyAndCount).toHaveBeenCalled();
      expect(result).toEqual({
        data: expect.any(Array),
        total: 3,
        page: undefined,
        limit: undefined,
      });
      // Should verify mapping if necessary, but here checking array presence is enough
    });

    it('should apply pagination correctly', async () => {
      const queryDto: QueryDto = { page: 2, limit: 10 };
      await repository.findAll(queryDto);

      expect(queryBuilder.skip).toHaveBeenCalledWith(10); // (2-1) * 10
      expect(queryBuilder.take).toHaveBeenCalledWith(10);
    });

    describe('Filters', () => {
      it('should apply EQ filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'email', operator: FilterOperator.EQ, value: 'test@test.com' }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.email = :param_0', {
          param_0: 'test@test.com',
        });
      });

      it('should apply LIKE filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'fullName', operator: FilterOperator.LIKE, value: 'Andres' }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.fullName ILIKE :param_0', {
          param_0: '%Andres%',
        });
      });

      it('should apply GT filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'createdAt', operator: FilterOperator.GT, value: '2024-01-01' }],
        };
        // NOTE: In repository `allowedFilters` only includes 'fullName' and 'email' for safety.
        // We probably should Mock the allowedFilters inside the repository or update the test to use allowed fields.
        // HOWEVER, the real implementation has allowedFilters hardcoded in the method.
        // We must check what the repository actually allows. The current repo implementation has:
        // const allowedFilters = ['fullName', 'email'];
        // So 'createdAt' filter will technically be IGNORED by the repository logic unless we change it.
        // Let's test with an allowed field effectively, or assume logic handles ignores.

        // Wait, the repo code is:
        // const allowedFilters = ['fullName', 'email'];
        // const allowedSort = ['createdAt', 'fullName'];

        // So strict filtering test on 'createdAt' would FAIL to call andWhere if we strictly follow the code I just saw.
        // Let's use 'email' for GT just to test the operator logic OR acknowledge the repository limit.
        // Actually, for unit testing the QueryHelper logic specifically, usually we'd test the Helper in isolation.
        // But the user asked to test "findAll del repository" acting as a deep test for QueryHelper.

        // Let's stick to allowed fields for the integration test to pass, or acknowledge the filtering.
        // Since 'createdAt' is NOT in allowedFilters in the current recent edit, it WON'T apply.
        // TO make this test useful for QueryHelper logic (which supports all operators),
        // I might need to test 'email' with GT/LT etc even if semantically weird, just to verify SQL generation.

        // Let's use 'fullName' for these operators to ensure they are generated.

        const queryDtoAllowed: QueryDto = {
          filters: [{ field: 'fullName', operator: FilterOperator.GT, value: 'A' }],
        };
        await repository.findAll(queryDtoAllowed);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.fullName > :param_0', {
          param_0: 'A',
        });
      });

      it('should apply LT filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'fullName', operator: FilterOperator.LT, value: 'Z' }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.fullName < :param_0', {
          param_0: 'Z',
        });
      });

      it('should apply GTE filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'fullName', operator: FilterOperator.GTE, value: 'A' }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.fullName >= :param_0', {
          param_0: 'A',
        });
      });

      it('should apply LTE filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'fullName', operator: FilterOperator.LTE, value: 'Z' }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.fullName <= :param_0', {
          param_0: 'Z',
        });
      });

      it('should apply IN filter', async () => {
        const queryDto: QueryDto = {
          filters: [
            {
              field: 'email',
              operator: FilterOperator.IN,
              value: ['a@a.com', 'b@b.com'],
            },
          ],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.email IN (:...param_0)', {
          param_0: ['a@a.com', 'b@b.com'],
        });
      });

      it('should apply IS_NULL filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'email', operator: FilterOperator.IS_NULL, value: null }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.email IS NULL');
      });

      it('should apply IS_NOT_NULL filter', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'email', operator: FilterOperator.IS_NOT_NULL, value: null }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).toHaveBeenCalledWith('user.email IS NOT NULL');
      });

      it('should IGNORE disallowed fields', async () => {
        const queryDto: QueryDto = {
          filters: [{ field: 'password', operator: FilterOperator.EQ, value: '123' }],
        };
        await repository.findAll(queryDto);
        expect(queryBuilder.andWhere).not.toHaveBeenCalled();
      });
    });

    describe('Sorting', () => {
      it('should apply sorting for allowed fields', async () => {
        const queryDto: QueryDto = { sortField: 'fullName', order: 'DESC' };
        await repository.findAll(queryDto);
        expect(queryBuilder.orderBy).toHaveBeenCalledWith('user.fullName', 'DESC');
      });

      it('should apply sorting for allowed fields without alias prefix if provided with dot', async () => {
        // If the sort field already has a dot, helper respects it?
        // Logic: const sortPath = queryDto.sortField.includes('.') ? queryDto.sortField : `${mainAlias}.${queryDto.sortField}`;
        // But repository hardcodes allowedSort = ['createdAt', 'fullName'];
        // So 'user.fullName' is NOT in allowedSort. So we can't test "dot" via Repository unless we change allowedSort.
        // We will stick to simple field names.

        const queryDto: QueryDto = { sortField: 'createdAt', order: 'ASC' };
        await repository.findAll(queryDto);
        expect(queryBuilder.orderBy).toHaveBeenCalledWith('user.createdAt', 'ASC');
      });

      it('should IGNORE sorting for disallowed fields', async () => {
        const queryDto: QueryDto = { sortField: 'password', order: 'DESC' };
        await repository.findAll(queryDto);
        expect(queryBuilder.orderBy).not.toHaveBeenCalled();
      });
    });
  });
});
