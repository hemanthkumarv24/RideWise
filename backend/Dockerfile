# Use the official Python image as the base
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY backend/ /app/

# Collect static files
# RUN python manage.py collectstatic --noinput

# Expose port 8000
EXPOSE 8000

# Start the Django server using Gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
# CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]