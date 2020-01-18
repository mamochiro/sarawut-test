## เริ่มใช้งาน

1) สั่ง `yarn` เพื่อติดตั้ง Dependencies
2) สั่ง `docker-compose up` เพื่อให้ Backend ทุกตัวทำงาน
3) `cd app/api` และ `npx sequelize-cli db:migrate` เพื่อทำการ migrate db ใน maraidb 
3) สั่ง `cd app/www` และสั่ง `yarn dev` เพื่อให้ Frontend สำหรับหน้าบ้านทำงาน [ตอนนี้มีปัญหา Node-sass ยังcompile ในdocker contianer ไม่ได้]

## Services

- API จะเข้าผ่าน `http://localhost:3000`
- WWW จะเข้าผ่าน `http://localhost:8000`
- Mongo Express จะเข้าผ่าน `http://localhost:8081/`
- phpmyadmin จะเข้าผ่าน `http://localhost:8080/`


## วิธีสร้าง Migration scripts (marai)
`cd app/api/` และ
`npx sequelize-cli migration:create --name (ชื่อ db ใน MaraiDB) ` สำหรับ mariadb`
[ของMongodbไม่ต้องสร้างเพราะใช้Modelเรียกได้เลย]

## วิธี commit code 
- ใช้ git hook husky ต้องใช้ commit lint ในการ commit

## รายละเอียดของหน้า frontend
- `http://localhost:8000/`หน้าแรกของ app
- `http://localhost:8000/register` เพื่อสมัครสมาขิก (หน้านี้ใช้ MaraiDB)
- `http://localhost:8000/login` เพื่อทำการ login  (หน้านี้ใช้ MaraiDB)
- `http://localhost:8000/list` เพื่อทำการทดลอง add data ลงใน `Mongo DB` และแสดงรายละเอียดของข้อมูลนั้น (หน้านี้มีการใช้ middleware)