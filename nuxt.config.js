const envPath = `config/.env.${process.env.NODE_ENV}`;
require("dotenv").config({ path: envPath });

module.exports = {
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    title: "Sakepedia Nuxt",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@/assets/style/app.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vueselect.js",
    "@/plugins/moment-filter.js",
    "@/plugins/string-filter.js",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/moment"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    ["bootstrap-vue/nuxt", { icons: true }],
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "semantic-ui-vue/nuxt",
  ],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseUrl: process.env.BASE_URL || "http://localhost:3030",
    browserBaseURL: process.env.BASE_URL || "http://localhost:3030",
  },
  /*
   ** monent.js Configurtion
   */
  moment: {
    timezone: true,
    locales: ["ja"],
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },

  buildDir: "dist",

  server: {
    host: "0.0.0.0",
    port: 3030,
  },
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3030",
  },
  serverMiddleware: ["~/api/index.js"],
};
