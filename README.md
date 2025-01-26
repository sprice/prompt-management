# Personal Prompt Management System

A modern web application for managing, organizing, and executing Large Language Model (LLM) prompts, built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- 📚 **Prompt Library**: Organize and manage your LLM prompts in a structured way
- 🔄 **Live Preview**: View both raw and rendered versions of your prompts
- ⚡ **Direct Execution**: Test prompts directly within the application
- 📋 **Easy Copying**: Quick copy functionality for both template and filled versions
- 🎨 **Modern UI**: Clean, responsive interface built with Shadcn components

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sprice/prompt-management.git
    cd prompt-management
    ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Project Structure

```
├── prompts/                # Prompt storage directory
│   ├── [prompt-name]/     # Individual prompt folders
│   │   ├── prompt.md      # Prompt template
│   │   └── config.yml     # Prompt configuration
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   └── lib/              # Utility functions
```

## Creating Prompts

### Prompt Structure

Each prompt consists of two files in its own directory under `prompts/`:

1. `prompt.md`: Contains the prompt template with variables in the format `{{variableName}}`
2. `config.yml`: Contains prompt configuration including:
   - Provider settings (OpenAI, Anthropic, etc.)
   - Model selection
   - Temperature and other parameters
   - Variable definitions

### Example Configuration

```yaml
provider: openai
model: gpt-4
temperature: 0.7
system_message: You are an AI assistant specialized in spelling.
user_message: How many letter R's are there in the word strawberry?
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality React components
- **PromptL**: Prompt templating and execution
- **AI SDK**: Integration with various LLM providers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.