# Résidanat · Smart Learning (Cloud Version)

Full-stack application with Supabase (backend/database) and Vercel (hosting).

## 🚀 Setup Instructions

### 1. Supabase Setup (Database & Auth)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project"
3. Choose a name (e.g., `sa-memorise`) and region
4. Generate a strong password and save it
5. Wait for project to be created (~2 minutes)

### 2. Run SQL Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and click **Run**
4. This creates:
   - `profiles` table (user profiles)
   - `flashcards` table (SRS flashcard data)
   - `notes` table (user notes with images)
   - `progress` table (stats and progress)

### 3. Get Supabase Credentials

1. In Supabase dashboard, go to **Settings → API**
2. Copy:
   - `Project URL` → This is `VITE_SUPABASE_URL`
   - `anon public` key → This is `VITE_SUPABASE_ANON_KEY`

### 4. Local Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Run dev server
npm run dev
```

### 5. Vercel Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
6. Click **Deploy**

## 📁 Project Structure

```
sa-memorise-cloud/
├── src/
│   ├── contexts/
│   │   └── AuthContext.jsx    # Auth state management
│   ├── lib/
│   │   ├── supabase.js        # Supabase client
│   │   └── database.js        # Database operations
│   ├── pages/
│   │   ├── LoginPage.jsx      # Login/Signup
│   │   └── DashboardPage.jsx  # Main dashboard
│   └── App.jsx                # Router setup
├── supabase/
│   └── schema.sql             # Database schema
└── .env.example               # Environment variables template
```

## 🔐 Security

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Auth handled by Supabase (secure, no passwords in your code)
- Anon key allows public access but RLS restricts by user

## 📊 Database Schema

### `profiles`
- Extends Supabase auth.users
- Stores user info (email, full_name)

### `flashcards`
- User's flashcard data
- SRS intervals, ratings, etc.
- Linked to user_id

### `notes`
- User notes for cards
- Supports text and image URLs
- Linked to user_id

### `progress`
- User statistics and progress
- Reviews completed, streak, etc.
- One row per user

## 🔄 Data Sync

Data is automatically synced across devices because it's stored in Supabase cloud:
- Study on PC → Data saved to Supabase
- Open on phone → Data loaded from Supabase
- No manual sync needed!

## 🎯 Next Steps

1. Import existing flashcards from HTML app
2. Build review interface with SRS algorithm
3. Add quiz and true/false modes
4. Implement gamification (XP, achievements)
5. Add image upload support (using Supabase Storage)
6. Build statistics dashboard

## 📱 Usage

1. Open app → Login or create account
2. Data automatically saved to Supabase
3. Use on any device → Same data everywhere
4. No manual sync required!
