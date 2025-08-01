# AI Response Generation Setup

The Riley AI Host sandbox now supports both template-based and AI-powered responses using OpenAI's GPT-3.5 model.

## Quick Setup

1. **Get OpenAI API Key**
   - Visit https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key (starts with `sk-proj-...`)

2. **Configure Environment**
   ```bash
   # Edit the .env file in your project root
   echo "VITE_OPENAI_API_KEY=your-actual-api-key-here" > .env
   echo "VITE_OPENAI_MODEL=gpt-3.5-turbo" >> .env
   ```

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

4. **Test AI Responses**
   - Open the sandbox in your browser
   - Toggle from "📋 Templates" to "🤖 AI" in the input section
   - You should see "AI Mode Active" indicator
   - Submit a scenario to test AI-generated responses

## Features

### AI vs Template Modes
- **Template Mode (📋)**: Fast, consistent responses using predefined templates
- **AI Mode (🤖)**: Dynamic, contextual responses powered by configurable OpenAI models

### Model Selection
Available models (set in `.env` file):
- **gpt-3.5-turbo**: Low cost, fast responses (default)
- **gpt-4o-mini**: Low cost, smarter than 3.5
- **gpt-4o**: Higher cost, best quality responses
- **gpt-4-turbo**: High cost, very smart
- **gpt-4**: Highest cost, most capable

To change models, update your `.env` file:
```bash
VITE_OPENAI_MODEL=gpt-4o-mini
```

### AI Response Features
- **Personality-Driven**: Responses match your personality slider settings exactly
- **Context-Aware**: Uses all sandbox settings (game type, players, flow steps, etc.)
- **Length Control**: Respects short/medium/long response length settings
- **Game-Specific**: Understands SongQuiz, Wheel of Fortune, and Jeopardy contexts

### Response Analysis
- View detailed breakdown of generated responses
- See personality analysis and context used
- Track response metadata (processing time, word count, etc.)
- Identify AI vs Template responses in the interface

## Troubleshooting

### AI Button Disabled
- Check that your API key is set in `.env`
- Ensure the key starts with `sk-proj-` or `sk-`
- Restart the development server after adding the key

### API Errors
- Verify your OpenAI account has credits
- Check API key permissions
- Ensure network connectivity

### Response Quality
- Adjust personality sliders for different response styles
- Try different response lengths (short/medium/long)
- Provide detailed scenario descriptions for better context

## Cost Considerations

- GPT-3.5-turbo costs approximately $0.0015-0.002 per 1K tokens
- Typical response generation uses 200-500 tokens
- Template mode is free and unlimited
- Switch between modes based on your needs

## Development Notes

The AI integration is designed to:
- Fail gracefully to template mode if API is unavailable
- Provide clear configuration guidance
- Maintain response format compatibility
- Support easy switching between modes

For production deployment, consider using environment variables for API key management and implementing rate limiting.