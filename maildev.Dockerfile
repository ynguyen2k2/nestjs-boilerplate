FROM node:22.21.1-alpine

RUN npm i -g maildev@2.0.5
EXPOSE 1080 1025
CMD ["maildev", "--web", "1080", "--smtp", "1025"]
