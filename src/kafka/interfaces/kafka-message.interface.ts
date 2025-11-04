export interface KafkaMessage {
    key?: string;
    value: any;
    timestamp?: number;
    headers?: Record<string, string>;
}

export interface KafkaMessagePayload {
    topic: string;
    partition: number;
    message: {
        key?: string;
        value: Buffer;
        timestamp: string;
        headers?: Record<string, string>;
    };
    offset: string;
    size: number;
    attributes: number;
}

export interface KafkaProducerOptions {
    topic: string;
    messages: KafkaMessage[];
    partition?: number;
    timeout?: number;
}

export interface KafkaConsumerOptions {
    topic: string;
    groupId?: string;
    fromBeginning?: boolean;
}
