# Step 1: Build stage
FROM gradle:8.5-jdk17 AS builder
WORKDIR /app

# Copy Gradle files first (for caching)
COPY build.gradle settings.gradle /app/
COPY src /app/src

# Run build (bootJar) -> output goes to /app/build/libs/*.jar
RUN gradle bootJar --no-daemon

# Step 2: Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy jar from build stage
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
