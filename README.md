
# AI Chat Assistant

A modern AI-powered chat interface built with Next.js and powered by Puter's AI API. This application provides a conversational interface with customizable AI personas and persistent chat history.

## Features

- 💬 Real-time AI chat powered by GPT-4o-mini
- 🎭 Customizable AI persona with system prompts
- 📱 Responsive design for mobile and desktop
- 🔄 Conversation context with up to 20 messages
- ⚡ Built with Next.js 16 and React 19
- 🎨 Styled with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/surajit20107/puter-chat-app.git
cd puter-chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Set AI Persona**: Customize the AI's behavior by modifying the system prompt at the top of the chat interface.
2. **Send Messages**: Type your message in the text area and click "Send" or press Enter.
3. **View Conversation**: The chat history displays up to 20 messages for context.

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **AI Integration**: Puter.js v2
- **Language**: TypeScript
- **Linting**: ESLint

## Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout with Puter.js script
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   └── ChatInterface.tsx # Main chat component
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Features in Detail

### AI Persona Customization
You can customize how the AI responds by changing the system prompt. Examples:
- "You are a helpful, friendly AI assistant named Alex."
- "You are a pirate captain who speaks in nautical terms."
- "You are a professional coding mentor."

### Message Context
The application maintains the last 20 messages in context to provide coherent conversations while managing API token usage efficiently.

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Puter.js](https://puter.com) for the AI API
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Author

**surajit20107**

- GitHub: [@surajit20107](https://github.com/surajit20107)

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
