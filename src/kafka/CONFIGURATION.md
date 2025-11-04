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

## Production Considerations

For production environments, consider:

1. **Security**: ✅ Enable SASL/SSL authentication (configured above)
2. **Monitoring**: Set up Kafka metrics and alerting
3. **Scaling**: Configure multiple brokers and partitions
4. **Persistence**: Use external volumes for data persistence
5. **Backup**: Implement topic backup strategies
6. **Secrets Management**: Store sensitive credentials in environment variables or secrets management service
