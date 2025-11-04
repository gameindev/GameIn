# Kafka Configuration Guide

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Kafka Configuration
KAFKA_CLIENT_ID=gamein-backend
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=gamein-group
KAFKA_RETRY_INITIAL_TIME=100
KAFKA_RETRIES=8
KAFKA_CONNECTION_TIMEOUT=3000
KAFKA_REQUEST_TIMEOUT=30000
```

## Docker Services

The following services are available in docker-compose.yml:

- **Kafka**: `localhost:9092` - Main Kafka broker
- **Kafka UI**: `http://localhost:8080` - Web interface for Kafka management

## Starting Services

```bash
# Start Kafka and Kafka UI
docker-compose up kafka kafka-ui -d

# Start all services
docker-compose up -d
```

## Testing the Integration

1. Start your NestJS application
2. Visit `http://localhost:8080` for Kafka UI
3. Use the API endpoints to test Kafka functionality:
   - `GET /kafka/health` - Check Kafka service health
   - `POST /kafka/send` - Send a test message
   - `POST /kafka/topic/create` - Create a new topic

## Production Considerations

For production environments, consider:

1. **Security**: Enable SASL/SSL authentication
2. **Monitoring**: Set up Kafka metrics and alerting
3. **Scaling**: Configure multiple brokers and partitions
4. **Persistence**: Use external volumes for data persistence
5. **Backup**: Implement topic backup strategies
