module.exports = {
  test: /\.svelte$/,
  use: [
    {
      loader: "svelte-loader",
      options: {
        hotReload: true,
        // customElement: true
      }
    }
  ]
};
