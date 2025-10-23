# 第一阶段：构建阶段，基于 node:22 镜像，命名为 build
FROM node:lts AS build
# 设置容器内的工作目录为 /app
WORKDIR /app
# 复制宿主机当前目录下的 package.json 和 package-lock.json（如果有）到容器的 /app 目录
COPY package*.json ./
# 执行 npm install 安装项目依赖
RUN npm config set registry https://registry.npmjs.org/ && npm install
# 复制宿主机当前目录下的所有文件到容器的 /app 目录
COPY . .
# 执行 npm run build 命令，构建前端项目（生成生产环境的静态文件）
RUN npm run build
   
# 第二阶段：运行阶段，基于 nginx:alpine 镜像
FROM nginx:alpine
# 从 build 阶段的 /app/build 目录，复制构建好的静态文件到 Nginx 容器的默认网站目录 /usr/share/nginx/html
COPY --from=build /app/build /usr/share/nginx/html
# 复制宿主机的 nginx.conf 配置文件到 Nginx 容器的 /etc/nginx/conf.d/default.conf 路径，覆盖默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 声明容器运行时监听 81 端口（Nginx 默认端口）
EXPOSE 81