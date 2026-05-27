module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: {
          _: ["git", "clone", "https://github.com/Stability-AI/stable-audio-3", "app"]
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
    },
    {
      method: "notify",
      params: {
        html: "Install complete. Click Start Music or Start SFX to launch Stable Audio 3 Small."
      }
    }
  ]
}
