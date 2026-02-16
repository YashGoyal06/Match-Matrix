# Use Python 3.10
FROM python:3.10

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install production server
RUN pip install gunicorn

# Copy project files
COPY . .

# Create a writable directory for SQLite (if using SQLite) or Static files
RUN mkdir -p /app/staticfiles && chmod 777 /app/staticfiles

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port Hugging Face expects (7860)
EXPOSE 7860

# Start the application
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:7860"]