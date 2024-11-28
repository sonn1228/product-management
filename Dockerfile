# Sử dụng phiên bản Node.js làm base image
FROM node:23-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng Express sẽ chạy
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["node", "src/index.js"]
