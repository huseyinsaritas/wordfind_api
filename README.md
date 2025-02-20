# WordFind API

WordFind API is a REST API service developed for a word-finding game. It is built using the NestJS framework with TypeScript.

## Features

- RESTful API endpoints
- Swagger API documentation
- TypeScript support
- Modular NestJS architecture
- Data validation with Validation pipe
- CORS support

## Requirements

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the project
```bash
git clone [repository-url]
cd wordfind-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Edit the .env file
```env
PORT=8000
# Add other required environment variables
```

## Development

To run in development mode:
```bash
npm run start:dev
```

The application will run at http://localhost:8000 by default.

## Production

To create a production build:
```bash
npm run build
```

To run in production mode:
```bash
npm run start:prod
```

## API Documentation

Access the API documentation through Swagger UI:

1. Start the application
2. Visit http://localhost:8000/api in your browser

Swagger UI features:
- View all API endpoints categorized
- Detailed request/response schemas for each endpoint
- Test API endpoints directly
- Filter and search endpoints
- Request duration display

## Testing

To run unit tests:
```bash
npm run test
```

To run E2E tests:
```bash
npm run test:e2e
```

For test coverage report:
```bash
npm run test:cov
```

## API Endpoint Categories

- **/game** - Game management
- **/game-config** - Game configuration
- **/user** - User management

## License

Distributed under the [MIT License](LICENSE).

## Contact

ayiyazilim Team - hsynsrtss@gmail.com

Project Link: [https://github.com/huseyinsaritas/wordfind_api](https://github.com/huseyinsaritas/wordfind_api)