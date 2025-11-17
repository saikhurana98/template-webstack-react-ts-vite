# Deployment Guide

This guide covers deploying your Template WebApp to various platforms.

## 📦 Frontend Deployment (GitHub Pages)

### Automatic Deployment

The template includes automated deployment to GitHub Pages via GitHub Actions.

**Setup Steps:**

1. **Enable GitHub Pages**
   ```
   Repository Settings → Pages → Source: GitHub Actions
   ```

2. **Configure Base Path** (for project pages)
   
   If using `https://username.github.io/repo-name/`, update `frontend/vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/repo-name/',
     // ... rest of config
   });
   ```

3. **Push to Main**
   ```bash
   git push origin main
   ```

The deployment workflow will automatically run and deploy your frontend.

### Manual Deployment

```bash
# Build the frontend
yarn build:frontend

# Deploy to GitHub Pages (using gh-pages package)
yarn workspace frontend add -D gh-pages
yarn workspace frontend deploy
```

## 🚀 Backend Deployment

The backend needs to be deployed separately. Here are recommended options:

### Option 1: Railway

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect GitHub** repository
3. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   DB_PATH=/data/database.sqlite
   ```
4. **Deploy automatically** on push to main

### Option 2: Render

1. **Sign up** at [render.com](https://render.com)
2. **Create New Web Service**
3. **Connect repository** and configure:
   ```
   Build Command: cd backend && yarn install && yarn build
   Start Command: cd backend && yarn start
   ```
4. **Add Environment Variables**

### Option 3: Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku  # macOS
# or download from heroku.com

# Login
heroku login

# Create app
heroku create your-app-name

# Add buildpack
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DB_PATH=/app/database.sqlite

# Deploy
git push heroku main
```

### Option 4: DigitalOcean App Platform

1. **Sign up** at [digitalocean.com](https://digitalocean.com)
2. **Create New App** from GitHub
3. **Configure:**
   - Build Command: `cd backend && yarn install && yarn build`
   - Run Command: `cd backend && yarn start`
4. **Add Environment Variables**

### Option 5: AWS (Advanced)

**Using Elastic Beanstalk:**

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js your-app-name

# Create environment
eb create production

# Deploy
eb deploy
```

## 🗄️ Database Considerations

### SQLite in Production

**Pros:**
- Simple setup
- No external dependencies
- Works well for small to medium apps

**Cons:**
- Not suitable for high-traffic sites
- Limited concurrent writes
- No built-in replication

### Migrating to PostgreSQL/MySQL

For production with higher traffic, consider migrating to PostgreSQL:

1. **Update dependencies:**
   ```bash
   yarn workspace backend add pg
   yarn workspace backend add @types/pg -D
   ```

2. **Update `backend/src/config/database.ts`:**
   ```typescript
   export const AppDataSource = new DataSource({
     type: 'postgres',
     host: process.env.DB_HOST,
     port: parseInt(process.env.DB_PORT || '5432'),
     username: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     synchronize: false, // Use migrations in production!
     logging: false,
     entities: [Item],
     migrations: ['dist/migrations/*.js'],
   });
   ```

3. **Use a managed database:**
   - **Supabase** (PostgreSQL)
   - **PlanetScale** (MySQL)
   - **Neon** (PostgreSQL)
   - **AWS RDS**

## 🔐 Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME=Your App Name
```

### Backend (.env)

```env
NODE_ENV=production
PORT=5000

# Database
DB_PATH=/data/database.sqlite
# Or for PostgreSQL:
# DB_HOST=your-host
# DB_PORT=5432
# DB_USER=your-user
# DB_PASSWORD=your-password
# DB_NAME=your-database

# CORS
ALLOWED_ORIGINS=https://your-frontend-domain.com

# Optional: JWT Secret
JWT_SECRET=your-super-secret-key
```

## 🔄 CI/CD Pipeline

The repository includes GitHub Actions workflows:

### Pull Request Checks (`ci.yml`)

Runs on every PR:
- ✅ Linting
- ✅ Type checking
- ✅ Build verification

### Deployment (`deploy.yml`)

Runs on push to main:
- ✅ Linting
- ✅ Build
- ✅ Deploy to GitHub Pages
- ✅ Auto-rollback on failure

## 🐳 Docker Deployment (Optional)

Create a `Dockerfile` in the backend:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY . .
RUN yarn build

EXPOSE 5000

CMD ["yarn", "start"]
```

Create `docker-compose.yml` at root:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DB_PATH=/data/database.sqlite
    volumes:
      - db-data:/data

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  db-data:
```

Deploy with:
```bash
docker-compose up -d
```

## 📊 Monitoring

### Frontend Monitoring

- **Sentry** - Error tracking
- **Google Analytics** - User analytics
- **LogRocket** - Session replay

### Backend Monitoring

- **PM2** - Process management
- **Winston** - Logging
- **New Relic** - APM
- **Datadog** - Infrastructure monitoring

## 🔧 Production Optimizations

### Frontend

1. **Enable compression:**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     build: {
       minify: 'terser',
       terserOptions: {
         compress: {
           drop_console: true,
         },
       },
     },
   });
   ```

2. **Use CDN** for static assets

3. **Enable caching** headers

### Backend

1. **Add compression:**
   ```bash
   yarn workspace backend add compression
   ```

   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add rate limiting:**
   ```bash
   yarn workspace backend add express-rate-limit
   ```

3. **Enable CORS properly:**
   ```typescript
   app.use(cors({
     origin: process.env.ALLOWED_ORIGINS?.split(','),
   }));
   ```

4. **Use process manager:**
   ```bash
   npm install -g pm2
   pm2 start backend/dist/index.js --name api
   ```

## 🚨 Rollback Strategy

If deployment fails:

1. **Automatic:** GitHub Actions creates an issue with rollback instructions
2. **Manual:**
   ```bash
   # Revert last commit
   git revert HEAD
   git push origin main
   
   # Or checkout previous version
   git checkout <previous-commit-hash>
   git push origin main --force
   ```

## ✅ Pre-Deployment Checklist

- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] CORS settings updated
- [ ] Error tracking configured
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] SSL certificate configured
- [ ] Custom domain setup (if applicable)
- [ ] Rate limiting enabled
- [ ] Security headers configured

## 🆘 Troubleshooting

### Build Fails in CI/CD

- Check Node.js version matches `.nvmrc`
- Verify all dependencies in `package.json`
- Review build logs in GitHub Actions

### Database Connection Issues

- Verify environment variables
- Check network connectivity
- Ensure database service is running
- Review firewall rules

### CORS Errors

- Update `ALLOWED_ORIGINS` environment variable
- Check backend CORS configuration
- Verify frontend API URL

## 📚 Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Express Production Best Practices](https://expressjs.com/en/advanced/best-practice-production.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [TypeORM Migrations](https://typeorm.io/migrations)

---

Need help with deployment? Open an issue or discussion in the repository!
