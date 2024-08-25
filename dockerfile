FROM node:latest
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3600
CMD ["npm", "run", "start"]
