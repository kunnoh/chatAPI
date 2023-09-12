FROM postgres:latest

# Install the 'dotenv' tool
RUN apt-get update && apt-get install -y dos2unix
COPY .env .env
RUN dos2unix .env && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/* && rm .env

# Set environment variables from the .env file
ENV $(cat .env | xargs)

CMD ["postgres"]