import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createCompletionRoute } from "./routes/create-completion";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>(); // serve para registrar o provider de tipos no caso o Zod

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler); // serve para registrar o compilador de validação
app.setSerializerCompiler(serializerCompiler); // serve para registrar o compilador de serialização

app.register(createGoalRoute); // serve para registrar a rota de criação de metas
app.register(createCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
