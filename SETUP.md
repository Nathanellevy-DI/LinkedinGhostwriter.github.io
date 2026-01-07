# 🎉 Get Your FREE Google Gemini API Key

Google Gemini has a **generous free tier** - perfect for testing and building!

## Step-by-Step Instructions

### 1. Visit Google AI Studio
Go to: **https://aistudio.google.com/app/apikey**

### 2. Sign In
- Use your Google account (Gmail)
- If you don't have one, create a free Google account

### 3. Create API Key
- Click **"Create API Key"**
- Select **"Create API key in new project"** (or use existing project)
- Copy your API key (it looks like: `AIzaSy...`)

### 4. Add to Your Project

Create a `.env.local` file in your project root:

```bash
# Stop the dev server first (Ctrl+C in terminal)

# Create the file
echo "GEMINI_API_KEY=your_api_key_here" > .env.local
```

**Replace `your_api_key_here` with your actual API key!**

Example:
```
GEMINI_API_KEY=AIzaSyABCDEF1234567890
```

### 5. Restart the Server

```bash
npm run dev
```

### 6. Test It Out!
- Go to http://localhost:3000
- Type some messy notes
- Select a style
- Click "Generate LinkedIn Post"
- Watch the magic happen! ✨

---

## 🆓 Free Tier Details

**Google Gemini Free Tier:**
- ✅ **60 requests per minute**
- ✅ **1,500 requests per day**
- ✅ **1 million requests per month**
- ✅ **Completely FREE**

This is **more than enough** for:
- Testing and development
- Personal use
- Small projects
- Demos and prototypes

---

## 🔒 Security Tips

**IMPORTANT:**
- ✅ Never share your API key with anyone
- ✅ Never commit `.env.local` to git (it's already in `.gitignore`)
- ✅ Don't post your API key online
- ✅ If exposed, delete it and create a new one

---

## ❓ Troubleshooting

### Error: "API key not configured"
- Make sure you created `.env.local` in the project root (not in a subfolder)
- Make sure the file contains `GEMINI_API_KEY=your_key`
- Make sure there are no spaces around the `=`
- Restart the dev server after adding the key

### Error: "Invalid API key"
- Double-check you copied the entire key
- Make sure there are no extra spaces or quotes
- Try creating a new API key

### Still not working?
- Check the terminal for error messages
- Make sure you're using the latest version of the code
- Try restarting your computer (sometimes environment variables need a fresh start)

---

## 🎯 What Model Are We Using?

**Gemini 2.0 Flash Exp** - The latest and fastest model!
- ⚡ Super fast responses
- 🎯 Great quality for LinkedIn posts
- 💰 Free tier available
- 🚀 Perfect for this use case

---

## 🚀 Ready to Go!

Once you add your API key, you'll be able to:
1. Transform messy notes into polished posts
2. Try different writing styles
3. Generate professional content in seconds
4. Copy and paste directly to LinkedIn

**Let's make some amazing content!** 🎉
