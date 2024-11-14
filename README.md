# Snake Game

A simple Snake Game implemented in HTML, CSS, and JavaScript. This project is designed to demonstrate basic web development concepts and game mechanics.

## Prerequisites

Ensure you have the following installed on your machine:

- A web browser (e.g., Google Chrome, Firefox, etc.)
- Node.js and npm (optional, if you wish to use the development server or build tools)

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/ela-ubiqube/snake-game.git
   ```

2. Navigate to the project directory:
   ```bash
   cd snake-game
   ```

3. Open the `index.html` file directly in your browser:
   - Double-click on the `index.html` file in the project folder to launch the game.

   OR

   - Use a local web server to run the project (recommended for development):
     ```bash
     # Install a simple HTTP server (if not already installed)
     npm install -g serve

     # Run the server
     serve -s .
     ```

4. Open your browser and navigate to the provided URL (e.g., `http://localhost:3000`).

## How to Play

- Use the arrow keys (`Up`, `Down`, `Left`, `Right`) to control the snake.
- The objective is to eat the food and grow longer while avoiding collisions with the walls or yourself.
- The game ends if the snake crashes into itself or the boundaries.

## Project Structure

```
project/
├── index.html          # Main HTML file
├── src/                # Source files
│   ├── styles.css      # CSS for styling
│   └── app.js          # Game logic in JavaScript
├── package.json        # (Optional) Node.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Development

If you're using a Node.js environment for development, you can set up the project as follows:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. The game will be available at `http://localhost:3000` (or another port, depending on your setup).

## Contribution

Feel free to fork the repository, submit issues, or make pull requests to contribute to this project.

## License

This project is open-source and available under the [MIT License](LICENSE).
