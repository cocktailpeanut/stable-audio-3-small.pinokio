module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: {
          _: ["git", "pull"]
        }
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: {
          _: ["git", "pull"]
        }
      }
    },
    {
      method: "shell.run",
      params: {
        bluefairy: "off",
        venv: "env",
        path: "app",
        message: {
          _: ["uv", "sync", "--extra", "ui", "--active"]
        }
      }
    },
    {
      when: "{{gpu === 'nvidia' && (platform === 'win32' || platform === 'linux')}}",
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          flashattention: true
        }
      }
    }
  ]
}
