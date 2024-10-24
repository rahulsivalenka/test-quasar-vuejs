import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  const queryClientConfig = {
    refetchOnWindowFocus: false,
  }; // Will update this obj If we need any default query client configs globally
  const myClient = new QueryClient(queryClientConfig);
  const vueQueryPluginOptions = {
    queryClient: myClient,
  };
  app.use(VueQueryPlugin, vueQueryPluginOptions);
});
