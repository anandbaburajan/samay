#!/bin/sh
# Checking for dependencies on system
if ! command -v git &> /dev/null; then
  printf "ERROR: Please install Git before running the script.\n"
  exit 1
fi

if ! command -v openssl &> /dev/null; then
  printf "ERROR: Please install OpenSSL before running the script. It is needed for generation of encryption key and IV.\n"
  exit 1
fi

compose_ver=""
if command -v docker &> /dev/null; then
    compose_ver=`docker compose version --short 2>/dev/null || echo`
fi

if test -z "$compose_ver"
then
    printf "ERROR: Please install Docker Compose before running this script.\n"
    exit 1
fi

compose_ver_maj=`echo "$compose_ver" | cut -d . -f 1`

if test \( "$compose_ver_maj" -lt 2 \)
then
    printf "ERROR: You need Docker Compose version 2 for running this script.\n"
    exit 1
fi

# Check if 'samay' directory is present on the system
if test -d samay ; then
  printf "Directory 'samay' already exists. To start the cluster: \n\n"
  printf "  \033[1m $ cd samay && docker compose up --build\033[0m\n\n"
  exit 1
fi

# Helper function for password generation
gen_password() {
  password=`head -c 12 /dev/urandom | base64 | tr -d '=+' | cut -c1-16`
  echo "$password"
}


# Clone the project
git clone https://github.com/anandbaburajan/samay
cd samay
cp .env.example .env


# Encryption key and IV for encryption and decryption of data
encryption_key=`openssl rand -hex 16`
encryption_iv=`openssl rand -hex 8`

# Variables to be used for environment variable substitution
frontend_url=http://localhost:3000
mongo_user=samay
mongo_pw=`gen_password`
mongo_db=samayPolls
mongo_uri=mongodb://${mongo_user}:${mongo_pw}@database:27017/${mongo_db}?authSource=admin

# Get values for frontend and connection string from end user
read -p "Enter frontend URL (default: http://localhost:3000): " frontend_uri
read -p "Enter MongoDB connection string (leave it empty for default connection string): " mongo_uri

if [ -n "$frontend_uri" ]; then
  if [[ "$frontend_uri" == http://* || "$frontend_uri" == https://* ]]; then
    frontend_url=$frontend_uri
  else
    printf "ERROR: frontend URL must start with http:// or https://"
    exit 1
  fi
fi

if [ -n "$mongo_uri" ]; then
  if [[ "$mongo_uri" == mongodb://* || "$mongo_uri" == mongodb+srv://* ]]; then
    frontend_url=$frontend_url
  else
    printf "ERROR: MongoDB connection string must start with mongodb:// or mongodb+srv://"
    exit 1
  fi
fi

# Replace values in the copied .env file to make sure the cluster uses the correct values
sed -i "s|^NEXT_PUBLIC_BASE_URL=.*|NEXT_PUBLIC_BASE_URL=$frontend_url|" .env
sed -i "s|^NEXT_MONGODB_URI=.*|NEXT_MONGODB_URI=$mongo_uri|" .env
sed -i "s|^NEXT_PUBLIC_ENCRYPTION_KEY=.*|NEXT_PUBLIC_ENCRYPTION_KEY=$encryption_key|" .env
sed -i "s|^NEXT_PUBLIC_ENCRYPTION_IV=.*|NEXT_PUBLIC_ENCRYPTION_IV=$encryption_iv|" .env
sed -i "s|^MONGO_INITDB_ROOT_PASSWORD=.*|MONGO_INITDB_ROOT_PASSWORD=$mongo_pw|" .env

# Starting cluster
printf "\033[1mCreating cluster...\n\n"

sleep 1

docker compose up --build -d

sleep 1

printf "\033[1mYou should be able to access your web app at $frontend_url\n"
