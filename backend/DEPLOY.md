# Deployment Guide: AWS Free Tier (EC2 + RDS) with GitHub Actions

This guide explains how to deploy the Online Shopping Store to AWS using Free Tier eligible resources:
- **Compute**: Amazon EC2 (`t2.micro` or `t3.micro`)
- **Database**: Amazon RDS for PostgreSQL (`db.t3.micro`)
- **CI/CD**: GitHub Actions

## 0. Prerequisites
- AWS Account
- GitHub Repository
- AWS CLI, Docker, Git installed locally

## 1. Create Amazon RDS (PostgreSQL)

1.  **Go to RDS Console** -> Create database.
2.  **Engine**: PostgreSQL
3.  **Template**: **Free Tier**
4.  **Settings**:
    - Identifier: `shopping-db`
    - Username: `postgres`
    - Password: (Create a strong password, save it)
5.  **Instance Config**: `db.t3.micro` or `db.t4g.micro`
6.  **Connectivity**:
    - **Compute resource**: Don't connect to an EC2 instance yet (we'll do it manually).
    - **VPC Security Group**: Create new `rds-sg`.
    - **Public Access**: **No** (Database remains private).
7.  **Create Database**.

## 2. Create Amazon EC2 Instance

1.  **Go to EC2 Console** -> Launch Instance.
2.  **Name**: `shopping-server`
3.  **AMI**: Amazon Linux 2023 AMI.
4.  **Instance Type**: `t2.micro` (Free Tier eligible).
5.  **Key Pair**: Create new `shopping-key`, download `.pem` file.
6.  **Network Settings**:
    - Allow SSH traffic from Anywhere (or My IP).
    - Allow HTTP traffic from the internet.
    - Create security group `ec2-sg`.
7.  **Launch Instance**.

## 3. Network Configuration (Allow EC2 -> RDS)

1.  Go to **VPC Console** -> **Security Groups**.
2.  Select `rds-sg` (created in Step 1).
3.  **Inbound Rules** -> Edit inbound rules.
4.  Add Rule:
    - **Type**: PostgreSQL
    - **Source**: Custom -> Select `ec2-sg` (from Step 2).
    - *This allows the EC2 instance to talk to the RDS database.*

## 4. Setup EC2 Instance

1.  **Connect to instance**:
    ```bash
    chmod 400 shopping-key.pem
    ssh -i "shopping-key.pem" ec2-user@<EC2-PUBLIC-IP>
    ```

2.  **Install Docker**:
    ```bash
    sudo yum update -y
    sudo yum install docker -y
    
    # Install Docker Compose Plugin
    sudo mkdir -p /usr/local/lib/docker/cli-plugins/
    sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
    sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
    
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    # Log out and log back in to pick up group changes
    exit
    ssh -i "shopping-key.pem" ec2-user@<EC2-PUBLIC-IP>
    
    # Verify installation
    docker compose version
    ```

3.  **Install AWS CLI (if missing) & Configure**:
    ```bash
    aws configure
    # Enter Access Key and Secret Key (create new IAM user if needed)
    ```

4.  **Authenticate Docker with ECR**:
    ```bash
    aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <account-id>.dkr.ecr.<region>.amazonaws.com
    ```
    *(You need to create the ECR repository first if not done: `aws ecr create-repository --repository-name shopping-store`)*

## 5. Configure GitHub Secrets

Go to **GitHub Repo -> Settings -> Secrets -> Actions** and add:

| Secret Name | Description |
| :--- | :--- |
| `AWS_ACCESS_KEY_ID` | IAM User Access Key |
| `AWS_SECRET_ACCESS_KEY` | IAM User Secret Key |
| `AWS_REGION` | e.g., `us-east-1` |
| `ECR_REPOSITORY` | `shopping-store` |
| `EC2_HOST` | Public IP of your EC2 instance |
| `EC2_USERNAME` | `ec2-user` |
| `EC2_SSH_KEY` | Content of your `shopping-key.pem` |
| `DB_HOST` | RDS Endpoint (e.g., `shopping-db.xyz.us-east-1.rds.amazonaws.com`) |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | Your RDS password |
| `DB_NAME` | `postgres` (Default RDS database name. Do NOT set to identifiers like `shopping-db` unless you manually created it.) |

## 6. Deployment

Push to the `main` branch. GitHub Actions will:
1.  Build the Docker image.
2.  Push to ECR.
3.  SSH into EC2.
4.  Pull the new image.
5.  Run/Restart the application using `docker-compose.prod.yml`.

## 7. Verification

Visit `http://<EC2-PUBLIC-IP>` to access your API.
Check logs on EC2: `docker logs nest-app`.
