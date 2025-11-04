import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { UserEventsService } from './events/user-events.service';
import { KafkaHealthService } from './kafka-health.service';
import kafkaConfig from './kafka.config';

@Module({
    imports: [
        ConfigModule.forFeature(kafkaConfig),
    ],
    controllers: [KafkaController],
    providers: [KafkaService, UserEventsService, KafkaHealthService],
    exports: [KafkaService, UserEventsService, KafkaHealthService],
})
export class KafkaModule { }
