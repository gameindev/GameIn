import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/providers/users.service';
import { CreateUserDto } from '../src/users/dtos/post-create-user.dto';
import { UserType } from 'src/users/enums/user-type.enums';

// Mock UsersService
const mockUsersService = {
    createUser: jest.fn(),
};

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: typeof mockUsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get(UsersService) as typeof mockUsersService;
    });

    describe('createUser', () => {
        it('should create a new user and return the result', async () => {
            const createUserDto: CreateUserDto = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'Test@1234',
                user_type: UserType.COMMUNITY,
                date_of_birth: '01-01-1990',
            };

            const result = { id: 1, ...createUserDto };
            usersService.createUser.mockResolvedValue(result);

            expect(await usersController.createUser(createUserDto)).toEqual(result);
            expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
        });
    });
});