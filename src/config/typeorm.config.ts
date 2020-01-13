import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  port: 7777,
  database: "taskmanagement",
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  //   sunchronize for production should be false probably - dbl check that
  synchronize: true,
  poolErrorHandler: (err: any) => console.log("Error: " + err),
  logging: true
};
