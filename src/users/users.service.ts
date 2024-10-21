import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async create(user: User): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (foundUser) {
      throw new ConflictException('Username already taken');
    }
    user.password = await this.hashPassword(user.password);
    await this.userRepository.save(user);
    return { id: user.id, username: user.username };
  }

  async login(user: any): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (
      foundUser &&
      foundUser.isActive &&
      (await bcrypt.compare(user.password, foundUser.password))
    ) {
      const payload = { username: foundUser.username, id: foundUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new NotFoundException('Invalid credentials');
  }

  findAll(): Promise<User[]> {
    // return all users but only if they are active
    return this.userRepository.find({ where: { isActive: true } });
  }

  async findOneForAuth(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user || !user.isActive) {
      return null;
    }
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user || !user.isActive) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !user.isActive) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser || !updatedUser.isActive) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user || !user.isActive) {
      throw new NotFoundException('User not found');
    }
    user.isActive = false;
    await this.userRepository.save(user);
  }
}
