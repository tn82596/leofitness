# Leo Server

Welcome to Leo! This is the backend built on Node.js, Express.js, and MongoDB, with TypeScript throughout. This README will guide you through the steps to get started with the development of this app.


## Prerequisites

Before you begin, make sure you have the following software installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to set up your development environment:

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/yourusername/leoserver.git
   cd leoserver
   ```

2. Install project dependencies using npm or yarn:

   ```
   npm install
   # or
   yarn install
   ```

## Development

To start developing with LeoServer, you can use the following npm scripts:

- **Start the Server:** Start the Express.js server in development mode using `nodemon`. The server will automatically restart on code changes, usig nodemon:

  ```
  npm run dev
  ```

- **Build TypeScript:** Transpile TypeScript code to JavaScript (required before running the server):

  ```
  npm run build
  ```

## Usage

After following the steps above, you can start building your application on top of LeoServer. Here are some important files and directories in the project:

- `src/`: This directory contains your TypeScript source code. You can modify and extend the Express.js application in the `index.ts` file.
- `dist/`: This directory will be created after running `npm run build`, and it contains the transpiled JavaScript code.

## Before You Start

Before you start working on the project, please follow these best practices to develop smoothly:

1. Pull the Latest Changes: Always start your work by pulling the latest changes from the remote repository to your local branch. This ensures that you're working with the most up-to-date codebase.
    ```bash
    git pull origin main
    ```

2. Create a New Branch: Before making changes, create a new branch to isolate your work from the main branch. Use a descriptive branch name that indicates the purpose of your changes, and replace feature/new-feature with an appropriate branch name.
    ```bash
    git checkout -b feature/new-feature
    ```

3. Push Your Branch: As you work on your changes, regularly commit your work and push the branch to the remote repository to keep a backup of your work and collaborate with others.
    ```bash
    git push origin feature/new-feature
    ```

## Contributing

Please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and test them thoroughly.
3. Ensure that your code follows the project's coding style and conventions.
4. Create a pull request (PR) with a clear description of your changes and their purpose.
