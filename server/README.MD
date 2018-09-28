
## nginx 配置

`
server {
    listen 80;
    server_name blog.zenghongtu.com www.blog.zenghongtu.com;
    rewrite ^(.*)$ https://${server_name}$1 permanent;
    }
server {
    listen 443;
    server_name blog.zenghongtu.com www.blog.zenghongtu.com;
    ssl on;
    index index.html;
    ssl_certificate   /root/.acme.sh/zenghongtu.com/zenghongtu.com.cer;
    ssl_certificate_key  /root/.acme.sh/zenghongtu.com/zenghongtu.com.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    location /admin {
        root   /data/www/tu-blog;
        try_files $uri $uri/ /index.html;
    }
    location / {
        root   /data/www/tu-blog/client;
        try_files $uri $uri/ /index.html;
    }
}
`
