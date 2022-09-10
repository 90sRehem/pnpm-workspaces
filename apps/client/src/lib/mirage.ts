// eslint-disable-next-line import/no-extraneous-dependencies
import { IAuthResponse } from "@/features/authentication";
import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name() {
          return faker.name.fullName();
        },
        email() {
          return faker.internet.email();
        },
        createdAt() {
          return faker.date.recent(10);
        },
        // token() {
        //   return "string";
        // },
        // refreshToken() {
        //   return "string";
        // },
      }),
    },
    seeds(schema) {
      schema.create("user", {
        id: "1",
        email: "jonathan.de.oliveira@live.com",
        name: "jonathan rehem",
        createdAt: new Date(),
      });
      schema.createList("user", 100);
    },
    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.post("/auth/login", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const user = schema.findBy("user", { email: attrs.email });
        if (user?.email === attrs.email) {
          return new Response(
            200,
            {},
            {
              data: {
                createdAt: user?.createdAt,
                email: user?.email,
                id: user?.id,
                name: user?.name,
                refreshToken: "string",
                token: "string",
              },
            },
          );
        }

        return new Response(
          400,
          {},
          { success: false, message: "Usuário não encontrado." },
        );
      });

      this.post("auth/register", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return {
          data: {
            user: attrs.email,
            token: "string",
            refreshToken: "string",
          },
        };
      });

      this.get("/users", (schema, request) => {
        const { page = 1, limit = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(limit);
        const pageEnd = pageStart + Number(limit);

        const users = schema
          .all("user")
          .models.slice(pageStart, pageEnd)
          .sort((a, b) => {
            return a?.id < b?.id;
          });

        return new Response(
          200,
          { "x-total-count": String(total) },
          { data: users },
        );
      });
    },
  });

  return server;
}
