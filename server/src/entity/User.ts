import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { compare, genSalt, hash } from 'bcryptjs';
import { Message } from './Message';

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int, { nullable: false })
    id!: number

    @Column({ nullable: false, type: 'varchar' })
    @Field(() => String, { nullable: false })
    username!: string;

    @Column({ nullable: false, type: 'varchar' })
    @Field(() => String, { nullable: false })
    email!: string;

    @Column({ nullable: false, type: 'text' })
    @Field(() => String, { nullable: true })
    password?: string;

    @Column({ nullable: true, type: 'text' })
    @Field(() => String, { nullable: true })
    imageUrl?: string;

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date | string;

    @Field(() => Message, { nullable: false })
    lastMessage?: Message

    async hashPassword(): Promise<void> {
        if (this.password) {
            const salt = await genSalt(10);
            this.password = await hash(this.password, salt);
        }
    }

    async isPasswordValid(password: string): Promise<boolean> {
        if (this.password) {
            return await compare(password, this.password);
        }
        return false;
    }
}