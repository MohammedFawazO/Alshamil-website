# Al Shamil Turning LLC Website

A Django-based website for Al Shamil Turning LLC, a machining company in the UAE.

## Features

- Responsive design with static pages (Home, About, Services, Contact)
- Contact form with email notifications
- Privacy Policy and Terms & Conditions pages
- SEO-friendly with sitemaps
- Production-ready with WhiteNoise for static files

## Local Development Setup

1. **Clone the repository** (if not already done)

2. **Create virtual environment:**
   ```bash
   python -m venv env
   # On Windows:
   env\Scripts\activate
   # On macOS/Linux:
   source env/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your values (especially email settings and secret key)
   - For local development, keep `DEBUG=True`

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Collect static files:**
   ```bash
   python manage.py collectstatic --noinput
   ```

7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```
   - Visit `http://127.0.0.1:8000` in your browser

## Production Deployment (Render)

1. **Push code to Git repository**

2. **Create a Render account** and connect your repo

3. **Set environment variables in Render:**
   - `DEBUG=False`
   - `DJANGO_SECRET_KEY` (generate a new one)
   - `DATABASE_URL` (PostgreSQL URL provided by Render)
   - Email settings (same as local)

4. **Build command:** `bash build.sh`

5. **Start command:** `bash start.sh`

## Email Configuration

The site uses Hostinger SMTP for sending emails. Configure the following in your `.env`:

- `EMAIL_HOST_USER`: Your full Hostinger email address
- `EMAIL_HOST_PASSWORD`: Your Hostinger mailbox password
- `CONTACT_EMAIL`: Where contact form emails are sent
- `DEFAULT_FROM_EMAIL`: The from address for emails

## Database

- **Local:** SQLite (automatic setup)
- **Production:** PostgreSQL (via Render's DATABASE_URL)

## Static Files

Static files are served using WhiteNoise in production. Run `collectstatic` before deployment.

## Security

- HTTPS enforced in production
- CSRF protection enabled
- Secure cookies in production
- HSTS headers set

## Troubleshooting

- **SSL errors locally:** Ensure `DEBUG=True` in `.env`
- **Email not sending:** Check Hostinger SMTP settings
- **Static files not loading:** Run `collectstatic` and check WhiteNoise config

## License

Private project for Al Shamil Turning LLC.