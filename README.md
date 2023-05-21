<h1 id="top" align="center">
  Fluently 🌱
</h1>

![license](https://img.shields.io/badge/license-MIT-green)
![status](https://img.shields.io/badge/status-active-blue)
![release](https://img.shields.io/badge/release-v1.0.0-red)

Fluently is a language exchange platform designed to optimize learning efficiency by helping users find ideal language learning partners. It also offers anonymous chat functionality, creating a comfortable space for engaging conversations.

---

<br>

<p align="center">
  <a href="#website-and-demo-account">Website & Demo Account</a>  •
  <a href="#key-features">Key Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#mongodb-data-model">MongoDB Data Model</a> •
  <a href="#technologies">Technologies</a>
</p>

<br>

![community](https://fluently-upload-s3-bucket.s3.ap-northeast-1.amazonaws.com/community.png)

<br>

<h2 id="website-and-demo-account">🌱 Website and Test Account</h2>

---

Website: [https://fluently.social](https://fluently.social)

You can use test accounts below to explore the Fluently platform:

|        Email        | Password |
| :-----------------: | :------: |
| admin@fluently.com  | admin123 |
| admin2@fluently.com | admin123 |

> **Note**
>
> 1. In the chatroom, fluently.social provides a "summary" feature. If you would like to receive summaries via email, please sign up with an email address that can receive them.
> 2. For testing purposes, the restriction based on last login time has been temporarily disabled. (originally users who hadn't logged in for five days would not be displayed in the user list.)

<br>

<h2 id="key-features">🌱 Key Features</h2>

---

- ### Algorithm

  - Sort community page members based on their chosen topics (`Jaccard Similarity`)

- ### Chat

  - Connect with language learning partners through real-time messaging (`Socket.IO & RabbitMQ`)

    ![chatroom](https://fluently-upload-s3-bucket.s3.ap-northeast-1.amazonaws.com/chat.gif)

  - Engage in anonymous chat conversations without any concerns (`Redis`)

    ![anonymous](https://fluently-upload-s3-bucket.s3.ap-northeast-1.amazonaws.com/anonymous.gif)

- ### Search & Summarization

  - Search and Highlight keyword (`MongoDB Atlas Search index`)
  - Summarize daily chat conversations and identify relevant vocabulary in email

    ![summary](https://fluently-upload-s3-bucket.s3.ap-northeast-1.amazonaws.com/summary.gif)

- ### Near Me

  - Discover and connect with users in proximity (`Redis geospatial indexes`)

    ![nearme](https://fluently-upload-s3-bucket.s3.ap-northeast-1.amazonaws.com/nearme.gif)

<br>

<h2 id="architecture">🌱 Architecture</h2>

---

![architecture](https://fluently-upload-s3-bucket.s3.ap-northeast-1.amazonaws.com/fluently_readme.png)

<br>

<h2 id="mongodb-data-model">🌱 MongoDB Data Model (Schema)</h2>

---

![DB](https://fluently-upload-s3-bucket.s3.ap-northeast-1.amazonaws.com/fluently_DB_diagram.png)

<br>

<h2 id="technologies">🌱 Technologies</h2>

---

- ### Front-end Technologies

  - React
  - Recoil
  - styled-components

- ### Back-end Technologies

  - Node.js
  - Express
  - Docker

- ### Database Technologies

  - MongoDB Atlas
  - Redis

- ### Cloud Platforms(AWS)

  - EC2
  - S3
  - ElastiCache
  - CloudFront
  - Elastic Load Balancing
  - Auto Scaling

- ### Real-time Communication

  - Socket.IO
  - RabbitMQ (AMQP)

- ### Algorithm

  - Jaccard similarity analysis

- ### Third-party API Integrations
  - OpenAI API
  - Mailgun API

<div style="text-align: right;">
  <a href="#top" style="display: inline-block; padding: 10px 20px; background-color: rgb(99, 137, 95); color: #fff; border-radius:8px; text-decoration: none;">Back to top</a>
</div>

---

> Chiang I Ming &nbsp;&middot;&nbsp;
> GitHub: [@chiangming07](https://github.com/chiangming07/Fluently-Social) &nbsp;&middot;&nbsp;
> Email: [chiangming07@gmail.com](chiangming07@gmail.com)
