# 🚀 Production-Grade Web Application on Kubernetes

A production-oriented full-stack web application deployed on **Kubernetes** with containerized frontend and backend services, internal service discovery, NGINX Ingress, TLS, autoscaling, configuration management, secrets, RBAC, security hardening, and availability controls.

This project demonstrates how a typical web application can be transformed from a locally running application into a **containerized and production-style Kubernetes deployment**.

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌──────────────────────┐
                         │    NGINX Ingress     │
                         │      Controller      │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
                  /api/                              /
                    │                               │
                    ▼                               ▼
          ┌──────────────────┐             ┌──────────────────┐
          │ Backend Service  │             │ Frontend Service │
          │   ClusterIP      │             │    ClusterIP     │
          └────────┬─────────┘             └────────┬─────────┘
                   │                                │
            ┌──────┴──────┐                  ┌──────┴──────┐
            │             │                  │             │
            ▼             ▼                  ▼             ▼
       ┌─────────┐   ┌─────────┐       ┌─────────┐   ┌─────────┐
       │ Backend │   │ Backend │       │Frontend │   │Frontend │
       │  Pod    │   │  Pod    │       │  Pod    │   │  Pod    │
       └─────────┘   └─────────┘       └─────────┘   └─────────┘
```

---

## ✨ Features

* Containerized React frontend
* Containerized FastAPI backend
* Multi-stage Docker build for the frontend
* Kubernetes Deployments with multiple replicas
* Kubernetes ClusterIP Services
* Internal Kubernetes DNS/service discovery
* NGINX Ingress Controller
* HTTPS/TLS using cert-manager
* Helm-based cert-manager installation
* Kubernetes ConfigMap for application configuration
* Kubernetes Secrets for sensitive configuration
* Horizontal Pod Autoscaler (HPA)
* CPU and memory resource requests/limits
* Dedicated Kubernetes ServiceAccount
* RBAC using Role and RoleBinding
* Non-root container execution
* SecurityContext hardening
* PodDisruptionBudget (PDB)
* Git-safe secret handling
* NetworkPolicy configuration
* Designed for future Calico-based NetworkPolicy enforcement

---

# 🛠️ Technology Stack

## Application

| Component           | Technology |
| ------------------- | ---------- |
| Frontend            | React      |
| Backend             | FastAPI    |
| Backend Server      | Uvicorn    |
| Frontend Web Server | NGINX      |

## Containerization

| Technology                | Purpose                           |
| ------------------------- | --------------------------------- |
| Docker                    | Application containerization      |
| Multi-stage builds        | Smaller frontend production image |
| Docker Hub / Local Images | Container image storage           |

## Kubernetes

| Kubernetes Feature | Purpose                                   |
| ------------------ | ----------------------------------------- |
| Namespace          | Application isolation                     |
| Deployment         | Application lifecycle and replicas        |
| Service            | Internal service discovery                |
| Ingress            | HTTP/HTTPS routing                        |
| ConfigMap          | Non-sensitive configuration               |
| Secret             | Sensitive configuration                   |
| HPA                | Automatic horizontal scaling              |
| ServiceAccount     | Pod identity                              |
| RBAC               | API permissions                           |
| SecurityContext    | Container security                        |
| PDB                | Availability during voluntary disruptions |
| NetworkPolicy      | Network-level access control              |

## Additional Tools

* Minikube
* Helm
* cert-manager
* Git
* Linux / Bash

---

# 📁 Project Structure

```text
Production_Grade_Web_App_on_Kubernetes/
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── k8s/
│   │
│   ├── namespace/
│   │   └── namespace.yaml
│   │
│   ├── backend/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   │
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   │
│   ├── ingress/
│   │   └── ingress.yaml
│   │
│   ├── config/
│   │   ├── configmap.yaml
│   │   └── secret.yaml
│   │
│   ├── cert-manager/
│   │   ├── clusterissuer.yaml
│   │   └── certificate.yaml
│   │
│   ├── hpa/
│   │   └── backend-hpa.yaml
│   │
│   ├── serviceaccount/
│   │   └── backend-serviceaccount.yaml
│   │
│   ├── rbac/
│   │   ├── backend-role.yaml
│   │   └── backend-rolebinding.yaml
│   │
│   ├── networkpolicy/
│   │   └── backend-networkpolicy.yaml
│   │
│   └── pdb/
│       └── backend-pdb.yaml
│
├── .gitignore
└── README.md
```

---

# 🚀 Application

## Backend

The backend is a FastAPI application exposing:

```text
GET /
GET /api/health
GET /api/products
```

Example health response:

```json
{
  "status": "healthy"
}
```

Example product response:

```json
{
  "products": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 75000
    },
    {
      "id": 2,
      "name": "Keyboard",
      "price": 2500
    },
    {
      "id": 3,
      "name": "Mouse",
      "price": 1200
    }
  ]
}
```

---

# 🐳 Docker

## Backend Image

The backend uses a lightweight Python image:

```dockerfile
FROM python:3.12-slim
```

The container runs the FastAPI application using Uvicorn.

The application was also configured to run as a **non-root user**.

---

## Frontend Image

The frontend uses a multi-stage Docker build:

```text
Node.js
   │
   ├── Install dependencies
   ├── Build React application
   │
   ▼
NGINX Alpine
   │
   └── Serve production build
```

This keeps build dependencies out of the final production image.

---

# ☸️ Kubernetes Deployment

## 1. Create the Namespace

```bash
kubectl apply -f k8s/namespace/namespace.yaml
```

Verify:

```bash
kubectl get namespace production
```

---

## 2. Deploy the Backend

```bash
kubectl apply -f k8s/backend/
```

Verify:

```bash
kubectl get deployment -n production
kubectl get pods -n production
```

---

## 3. Deploy the Frontend

```bash
kubectl apply -f k8s/frontend/
```

Verify:

```bash
kubectl get pods -n production
```

The application uses multiple replicas for both frontend and backend.

---

# 🔎 Kubernetes Service Discovery

The backend is exposed internally using:

```text
backend-service:8000
```

The frontend NGINX configuration forwards API requests to:

```nginx
proxy_pass http://backend-service:8000/api/;
```

This demonstrates Kubernetes' built-in DNS-based service discovery.

The frontend does not need to know the backend Pod IP address.

Instead:

```text
Frontend Pod
     │
     ▼
backend-service
     │
     ▼
Backend Pod
```

Kubernetes automatically handles Service-to-Pod routing.

---

# 🌐 NGINX Ingress

The application uses an NGINX Ingress Controller to route traffic based on the request path.

```text
https://app.local/
        │
        ▼
   Frontend Service

https://app.local/api
        │
        ▼
   Backend Service
```

Ingress configuration:

```text
/api  → backend-service:8000
/     → frontend-service:80
```

---

# 🔐 TLS with cert-manager

TLS certificates are managed using **cert-manager**.

cert-manager was installed using Helm:

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true
```

A self-signed ClusterIssuer is used for the local development environment.

```text
Browser
   │
   │ HTTPS
   ▼
NGINX Ingress
   │
   ▼
Application Services
```

> The self-signed certificate is intended for local development/testing. A public CA such as Let's Encrypt should be used for a real internet-facing deployment.

---

# ⚙️ ConfigMap

Non-sensitive application configuration is stored in a ConfigMap.

Example:

```yaml
data:
  APP_ENV: "production"
```

The backend receives the value through:

```yaml
env:
  - name: APP_ENV
    valueFrom:
      configMapKeyRef:
        name: backend-config
        key: APP_ENV
```

This separates application configuration from the container image.

---

# 🔑 Kubernetes Secrets

Sensitive values such as database credentials are provided through Kubernetes Secrets.

The application references the Secret rather than hardcoding credentials into the Deployment.

```text
Kubernetes Secret
       │
       ▼
Backend Deployment
       │
       ▼
Environment Variables
```

Sensitive local files are excluded from Git using `.gitignore`.

For a production AWS deployment, the recommended next step would be integrating **AWS Secrets Manager** with Kubernetes rather than storing long-lived credentials directly in Kubernetes manifests.

---

# 📈 Horizontal Pod Autoscaler

The backend uses an HPA:

```text
Minimum replicas: 2
Maximum replicas: 5
CPU target: 60%
```

Architecture:

```text
                     HPA
                      │
                      │ monitors CPU
                      ▼
                Backend Deployment
                      │
            ┌─────────┼─────────┐
            ▼         ▼         ▼
         Pod 1      Pod 2      Pod N
```

Check HPA:

```bash
kubectl get hpa -n production
```

Watch scaling:

```bash
kubectl get hpa -n production -w
```

---

# 🛡️ Security

## Non-root Containers

The backend container runs as a dedicated non-root user instead of root.

Kubernetes also uses:

```yaml
securityContext:
  runAsNonRoot: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
```

This reduces the privileges available to the application process.

---

# 👤 ServiceAccount

The backend uses a dedicated ServiceAccount:

```text
backend-serviceaccount
```

instead of relying on the namespace's default ServiceAccount.

```yaml
serviceAccountName: backend-serviceaccount
```

A ServiceAccount provides an identity for workloads interacting with the Kubernetes API.

---

# 🔐 RBAC

RBAC was implemented using:

```text
ServiceAccount
      │
      ▼
RoleBinding
      │
      ▼
Role
```

The Role demonstrates least-privilege permissions for Kubernetes resources.

For example:

```text
ConfigMaps
 ├── get
 ├── list
 └── watch
```

The application does not receive cluster-admin privileges.

> If the application does not need Kubernetes API access, the RBAC permissions should be removed in the final production configuration.

---

# 🧱 NetworkPolicy

A NetworkPolicy was created to restrict incoming traffic to backend Pods.

The intended rule is:

```text
Frontend Pods
     │
     │ TCP 8000
     ▼
Backend Pods
     ✅
```

while unauthorized Pods should be blocked.

The current Minikube networking setup does not enforce the policy because it does not include a NetworkPolicy-capable CNI such as Calico.

The policy configuration has therefore been retained as part of the project's Kubernetes security design, with **Calico planned for the next iteration**.

---

# 🛡️ PodDisruptionBudget

A PodDisruptionBudget protects application availability during voluntary disruptions.

Configuration:

```text
Backend replicas: 2
Minimum available: 1
```

This means Kubernetes should maintain at least one available backend Pod during supported voluntary eviction operations.

```text
Pod 1 ✅
Pod 2 ❌

Backend remains available
```

PDB does not protect against unexpected node failures or hardware failures.

---

# 🧪 Useful Commands

## Check all application resources

```bash
kubectl get all -n production
```

## Check Pods

```bash
kubectl get pods -n production -o wide
```

## Check Services

```bash
kubectl get services -n production
```

## Check Ingress

```bash
kubectl get ingress -n production
```

## Check TLS certificate

```bash
kubectl get certificate -n production
```

## Check HPA

```bash
kubectl get hpa -n production
```

## Check PDB

```bash
kubectl get pdb -n production
```

## Check RBAC

```bash
kubectl get role -n production
kubectl get rolebinding -n production
kubectl get serviceaccount -n production
```

## Check NetworkPolicy

```bash
kubectl get networkpolicy -n production
```

## Debug a Pod

```bash
kubectl describe pod <pod-name> -n production
```

## View logs

```bash
kubectl logs <pod-name> -n production
```

---

# 🧹 Cleanup

To remove the application:

```bash
kubectl delete namespace production
```

To remove cert-manager:

```bash
helm uninstall cert-manager -n cert-manager
kubectl delete namespace cert-manager
```

---

# 📚 Key Kubernetes Concepts Demonstrated

This project was built to understand the relationship between the major Kubernetes components:

```text
Deployment
    │
    ├── manages Pods
    │
    ▼
Pods
    │
    ▼
Service
    │
    ▼
Ingress
```

And the security architecture:

```text
Pod
 │
 ├── SecurityContext
 │
 ├── ServiceAccount
 │       │
 │       ▼
 │    RBAC
 │
 ├── Secret
 │
 └── NetworkPolicy
```

Availability and scaling:

```text
Deployment
    │
    ├── replicas
    │
    ├── HPA
    │
    └── PDB
```

---

# 🎯 Project Objectives

The primary objectives of this project were:

* Learn Kubernetes application deployment
* Understand Pod-to-Pod and Service communication
* Implement Kubernetes service discovery
* Configure HTTP/HTTPS routing using Ingress
* Implement TLS using cert-manager
* Separate configuration from application images
* Handle sensitive configuration using Kubernetes Secrets
* Implement horizontal autoscaling
* Apply Kubernetes security best practices
* Understand ServiceAccounts and RBAC
* Run containers as non-root
* Improve application availability using PDB
* Understand NetworkPolicy and CNI-based enforcement

---

# 🚀 Future Improvements

The following improvements can be added in future iterations:

* Calico-based NetworkPolicy enforcement
* AWS EKS deployment
* Terraform infrastructure provisioning
* AWS Secrets Manager integration
* CI/CD using GitHub Actions or Jenkins
* Helm chart for application deployment
* Blue-Green / Canary deployments
* Centralized logging
* Persistent storage
* AWS Load Balancer integration
* GitOps using Argo CD
* Image vulnerability scanning
* Container image signing
* Supply-chain security




