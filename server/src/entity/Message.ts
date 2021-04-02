import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
@ObjectType()
export class Message extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String, { nullable: false })
    @Column({ nullable: false, type: 'text' })
    content!: string;

    @Column()
    senderId: number;

    @Field(() => User, { nullable: false })
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'senderId' })
    sender!: User;

    @Column()
    receiverId: number;

    @Field(() => User)
    @ManyToOne(() => User, { nullable: false, eager: true })
    @JoinColumn({ name: 'receiverId' })
    receiver!: User

    @Field(() => Date, { nullable: true })
    @CreateDateColumn()
    createdAt?: Date;

    @Field(() => String, { nullable: true })
    @Column({ type: 'varchar', nullable: true })
    reaction: string;
}