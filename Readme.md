                         Internet
                            │
                         HTTPS :443
                            │
                    ┌───────▼────────┐
                    │ NGINX Ingress  │
                    │   Controller   │
                    └───────┬────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              /                         /api
              │                           │
      ┌───────▼───────┐           ┌──────▼───────┐
      │ Frontend SVC  │           │ Backend SVC  │
      │ ClusterIP     │           │ ClusterIP    │
      └───────┬───────┘           └──────┬───────┘
              │                           │
       ┌──────▼──────┐              ┌─────▼──────┐
       │ Frontend    │              │ Backend    │
       │ Deployment  │              │ Deployment │
       │ 2 replicas  │              │ 2 replicas │
       └─────────────┘              └─────┬──────┘
                                         │
                                  ┌──────▼──────┐
                                  │ Database    │
                                  │ / RDS       │
                                  └─────────────┘

                         Monitoring
                             │
                  ┌──────────┴──────────┐
                  │                     │
             Prometheus              Grafana

                    cert-manager
                         │
                         ▼
                  TLS Certificate





Project Structure:

k8s-production-app/
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── src/
│
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│
├── k8s/
│   │
│   ├── namespace/
│   │   └── namespace.yaml
│   │
│   ├── config/
│   │   ├── frontend-config.yaml
│   │   ├── backend-config.yaml
│   │   └── backend-secret.yaml
│   │
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── hpa.yaml
│   │   └── pdb.yaml
│   │
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── hpa.yaml
│   │   └── pdb.yaml
│   │
│   ├── ingress/
│   │   ├── ingress.yaml
│   │   └── certificate.yaml
│   │
│   ├── security/
│   │   ├── service-account.yaml
│   │   ├── role.yaml
│   │   ├── role-binding.yaml
│   │   └── network-policy.yaml
│   │
│   └── monitoring/
│       ├── servicemonitor.yaml
│       └── prometheus-rules.yaml
│
├── helm/
│   └── production-app/
│
├── .github/
│   └── workflows/
│       └── ci.yaml
│
├── docker-compose.yml
├── README.md
└── .gitignore



 
