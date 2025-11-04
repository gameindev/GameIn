# Kafka Configuration Guide

## Environment Variables

Add the following environment variables to your `.env` file:

### Local Development (Docker)

```env
# Kafka Configuration
KAFKA_CLIENT_ID=gamein-backend
KAFKA_BROKERS=localhost:9092
KAFKA_GROUP_ID=gamein-group
KAFKA_RETRY_INITIAL_TIME=100
KAFKA_RETRIES=8
KAFKA_CONNECTION_TIMEOUT=3000
KAFKA_REQUEST_TIMEOUT=30000

# Consumer Configuration (optional - defaults provided)
KAFKA_SESSION_TIMEOUT=30000
KAFKA_HEARTBEAT_INTERVAL=3000
KAFKA_CONSUMER_MAX_RETRIES=10
KAFKA_CONSUMER_RETRY_DELAY=2000
```

### DigitalOcean VPC Network with SASL/SSL

For production environments using DigitalOcean Kafka on VPC network:

```env
# Kafka Configuration
KAFKA_CLIENT_ID=gamein-backend
KAFKA_BROKERS=private-db-kafka-do-user-26674595-0.f.db.ondigitalocean.com:25080
KAFKA_GROUP_ID=gamein-group
KAFKA_RETRY_INITIAL_TIME=100
KAFKA_RETRIES=8
KAFKA_CONNECTION_TIMEOUT=3000
KAFKA_REQUEST_TIMEOUT=30000

# SSL Configuration
KAFKA_USE_SSL=true
KAFKA_CA_CERT_PATH=./certs/kafka-ca-certificate.crt

# SASL Authentication
KAFKA_USE_SASL=true
KAFKA_SASL_MECHANISM=plain
KAFKA_SASL_USERNAME=doadmin
KAFKA_SASL_PASSWORD=your-kafka-password-here

# Consumer Configuration (optional - defaults provided)
# These settings help handle group coordinator errors gracefully
KAFKA_SESSION_TIMEOUT=30000
KAFKA_HEARTBEAT_INTERVAL=3000
KAFKA_CONSUMER_MAX_RETRIES=10
KAFKA_CONSUMER_RETRY_DELAY=2000
```

**Important Notes:**
1. Download the CA certificate from DigitalOcean console and place it in `certs/kafka-ca-certificate.crt`
2. Replace `your-kafka-password-here` with your actual Kafka password from DigitalOcean
3. The `KAFKA_BROKERS` should match the `service URI` from your DigitalOcean connection details (host:port format)

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

## DigitalOcean VPC Setup Steps

1. **Download CA Certificate**: 
   - In DigitalOcean console, click "Download CA certificate"
   - Save it as `certs/kafka-ca-certificate.crt` in your project root

2. **Configure Environment Variables**:
   - Use the DigitalOcean VPC configuration above
   - Update `KAFKA_BROKERS` with your actual service URI
   - Set `KAFKA_SASL_USERNAME` and `KAFKA_SASL_PASSWORD` from DigitalOcean console

3. **Network Requirements**:
   - Ensure your application server is in the same VPC network as the Kafka cluster
   - Or configure proper network routing/firewall rules if using different VPCs

## Kafka Server Configuration

### Local Development (Docker Compose)

The `docker-compose.yml` file includes optimized Kafka server settings for group coordination:

- **`KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: 3000`** - Gives the broker time to initialize before starting consumer group rebalancing
- **`KAFKA_GROUP_MAX_SESSION_TIMEOUT_MS: 60000`** - Maximum allowed session timeout for consumers
- **`KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1`** - Required for single-node setup (must be ≥1 and ≤ number of brokers)
- **`KAFKA_OFFSETS_TOPIC_NUM_PARTITIONS: 1`** - Number of partitions for the offsets topic

**Important**: If you modify `docker-compose.yml`, restart Kafka:
```bash
docker-compose down kafka
docker-compose up kafka -d
```

### Production (DigitalOcean/Managed Kafka)

For managed Kafka services (like DigitalOcean), you typically **cannot modify server-side settings**. The client-side retry logic handles these cases automatically.

**What to check**:
1. ✅ Ensure the Kafka cluster is healthy in the DigitalOcean console
2. ✅ Verify network connectivity (VPC, firewall rules)
3. ✅ Check that the service URI matches your `KAFKA_BROKERS` environment variable
4. ✅ Verify SSL certificates are up to date

## Troubleshooting

### Group Coordinator Not Available Error

If you encounter errors like "The group coordinator is not available", the service now includes automatic retry logic with exponential backoff. The following configuration options help:

- **KAFKA_CONSUMER_MAX_RETRIES**: Maximum number of retry attempts (default: 10)
- **KAFKA_CONSUMER_RETRY_DELAY**: Base delay in milliseconds between retries (default: 2000ms)
- **KAFKA_SESSION_TIMEOUT**: Consumer session timeout in milliseconds (default: 30000ms)
- **KAFKA_HEARTBEAT_INTERVAL**: Heartbeat interval in milliseconds (default: 3000ms)

The service will automatically:
1. Detect group coordinator errors
2. Retry with exponential backoff
3. Log warnings during retry attempts
4. Continue operating even if initial connection fails (will retry on next message send)

### Common Issues

1. **Connection Timeout**: Increase `KAFKA_CONNECTION_TIMEOUT` if Kafka broker takes longer to respond
2. **Group Coordinator Errors**: Usually resolves automatically with retry logic. If persistent, check:
   - Kafka broker is running and healthy
   - Network connectivity to Kafka broker
   - Broker configuration allows group coordination
3. **SSL Certificate Errors**: Ensure CA certificate path is correct and file is readable

## Production Considerations

For production environments, consider:

1. **Security**: ✅ Enable SASL/SSL authentication (configured above)
2. **Monitoring**: Set up Kafka metrics and alerting
3. **Scaling**: Configure multiple brokers and partitions
4. **Persistence**: Use external volumes for data persistence
5. **Backup**: Implement topic backup strategies
6. **Secrets Management**: Store sensitive credentials in environment variables or secrets management service
7. **Resilience**: The retry logic handles transient failures automatically
