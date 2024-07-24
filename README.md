# M8_StorageHotels_Mysql

This microservice is responsible for storing hotel information in a MySQL database.

## Installation

1. Clone the repository.
2. Navigate to the microservice directory.
3. Run `npm install` to install the dependencies.

## Use

To start the microservice, run:

```bash
npm start

## To build and run the Docker container

docker build -t storage_hotels_microservice .
docker run -p 4000:4000 storage_hotels_microservice .
