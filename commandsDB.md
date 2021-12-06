npx sequelize db:create
npx sequelize db:drop

npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
npx sequelize-cli model:generate --name Scoure --attributes body:string,user_id:string
npx sequelize-cli model:generate --name Letter --attributes letter:string

                                  
npx sequelize-cli seed:generate --name User
npx sequelize-cli seed:generate --name Scoure
npx sequelize-cli seed:generate --name Letter



npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all


npx sequelize-cli db:migrate:undo:all
