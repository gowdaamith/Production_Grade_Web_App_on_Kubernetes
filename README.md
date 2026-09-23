                    Internet
                       |
                       | HTTPS
                       v
              +-------------------+
              |   NGINX Ingress   |
              |   Controller      |
              +---------+---------+
                        |
              +---------+---------+
              |                   |
          / (frontend)         /api (backend)
              |                   |
              v                   v
       +-------------+      +-------------+
       | Frontend    |      | Backend     |
       | Deployment  |      | Deployment  |
       | 2+ Pods     |      | 2+ Pods     |
       +------+------+      +------+------+
              |                    |
       Frontend Service      Backend Service
                                   |
                                   v
                            Application logic
