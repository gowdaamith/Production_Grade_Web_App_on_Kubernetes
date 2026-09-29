FROM python:3.14-slim 
RUN groupadd --system --gid 10001 appgroup && \
    useradd --system --uid 10001 --gid 10001 appuser

WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
RUN chown -R appuser:appgroup /app
USER appuser
EXPOSE 8000
CMD [ "uvicorn","app:app","--host","0.0.0.0","--port","8000"]


