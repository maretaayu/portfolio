# Portfolio - Mareta's Personal Website

A modern, full-stack portfolio website built with Next.js, featuring a dynamic blog system powered by Firebase.

## 🚀 Features

- **Dynamic Blog System**: Complete CRUD blog with Firebase backend
- **Admin Interface**: Full admin panel for content management
- **Tag System**: Dynamic tag filtering and categorization  
- **Dark/Light Theme**: Seamless theme switching
- **Responsive Design**: Mobile-first responsive design
- **SEO Optimized**: Server-side rendering for better SEO
- **Real-time Updates**: Live content updates via Firebase
- **Markdown Support**: Rich text formatting with markdown

## 🛠 Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Admin SDK
- **Deployment**: Vercel
- **Animation**: Framer Motion

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- Firebase Project
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/maretaayu/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

4. **Configure Firebase**
   - Create a Firebase project
   - Set up Firestore database
   - Get your Firebase config
   - Generate service account key
   - Update `.env.local` with your Firebase credentials

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Set up environment variables**
   - Use the automated script: `./scripts/setup-vercel-env.sh`
   - Or manually add via Vercel dashboard
   - See `VERCEL_DEPLOYMENT.md` for detailed instructions

3. **Deploy**
```bash
vercel --prod
```

### Required Environment Variables

See `.env.local.example` for all required environment variables.

**Important**: Make sure to set `FIREBASE_SERVICE_ACCOUNT_KEY` in your deployment platform.

## 📁 Project Structure

```
├── components/          # Reusable React components
├── pages/              # Next.js pages and API routes
├── services/           # Firebase service layer
├── lib/               # Firebase configuration
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── styles/            # Global styles
└── public/            # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript check

## 📝 Blog Admin

Access the admin interface at `/admin` to:
- Create new blog posts
- Edit existing posts
- Delete posts
- Manage tags
- Toggle featured posts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mareta** - [GitHub](https://github.com/maretaayu)

## 🐛 Issues & Support

If you encounter any issues during deployment or development, check:
- `VERCEL_DEPLOYMENT.md` for deployment troubleshooting
- `FIREBASE_STATUS.md` for Firebase setup status
- GitHub Issues for known problems

---

Built with ❤️ using Next.js and Firebase
