## เริ่มใช้งาน

1) สั่ง `yarn` เพื่อติดตั้ง Dependencies
2) สั่ง `docker-compose up` เพื่อให้ Backend ทุกตัวทำงาน
3) สั่ง `cd app/www` เพื่อให้ Frontend สำหรับหน้าบ้านทำงาน [ตอนนี้มีปัญหา Node-sass ยังcompile ในdocker contianer ไม่ได้]

ื..note : ยังยิง request graphql ไม่ได้ติด error Bad Request

## Services

- API จะเข้าผ่าน `http://localhost:3000`
- WWW จะเข้าผ่าน `http://localhost:8000`

## วิธีสร้าง Migration scripts
npx sequelize-cli migration:create --name users `สำหรับ mariadb`
[ของMongodbไม่ต้องสร้างเพราะใช้Modelเรียกได้เลย]

## วิธี commit code 
- ใช้ git hook husky ต้องใช้ commit lint ในการ commit