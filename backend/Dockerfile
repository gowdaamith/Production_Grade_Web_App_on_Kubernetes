FROM python:3.14-slim 
RUN groupadd --system appgroup && \
    useradd --system --gid appgroup appuser

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 8000
CMD [ "uvicorn","app:app","--host","0.0.0.0","--port","8000"]


