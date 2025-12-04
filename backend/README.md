# SaeJaeDang Backend API

Express TypeScript backend for the SaeJaeDang cafe website.

## Features

- RESTful API endpoints for cafe items and information
- TypeScript for type safety
- CORS enabled for frontend integration
- Hot reload with nodemon during development

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## API Endpoints

- `GET /` - Health check
- `GET /api/items` - Get all items
- `GET /api/items?category={category}` - Filter by category
- `GET /api/items/:id` - Get item by ID
- `GET /api/info` - Get cafe information
- `GET /api/categories` - Get categories

## Future Enhancements

- Add database integration (MongoDB/PostgreSQL)
- Implement authentication
- Add admin endpoints for CRUD operations
- Add image upload functionality
- Implement contact form endpoint
