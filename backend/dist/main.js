"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const body_parser_1 = require("body-parser");
const app_module_1 = require("./app.module");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors());
    app.use(body_parser_1.json());
    app.use(body_parser_1.urlencoded({ extended: true }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map