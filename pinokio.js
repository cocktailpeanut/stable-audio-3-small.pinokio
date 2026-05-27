const path = require('path')

module.exports = {
  version: "7.0",
  title: "Stable Audio 3",
  description: "Launcher for Stable Audio 3 Small Music, Small SFX, and NVIDIA Medium using public cocktailpeanut Hugging Face mirrors. https://github.com/Stability-AI/stable-audio-3",
  icon: "icon.png",
  menu: async (kernel) => {
    let installing = await kernel.running(__dirname, "install.js")
    let installed = await kernel.exists(__dirname, "app", "env")
    let running = await kernel.running(__dirname, "start.js")
    let link = await kernel.running(__dirname, "link.js")
    let supportsMedium = kernel.gpu === "nvidia" && (kernel.platform === "win32" || kernel.platform === "linux")

    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js"
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local) {
          if (!local.url) {
            return [{
              default: true,
              icon: "fa-solid fa-terminal",
              text: "Terminal",
              href: "start.js"
            }]
          }
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }]
        } else {
          return [{
            default: true,
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js"
          }]
        }
      } else if (link) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Deduplicating",
          href: "link.js",
        }]
      } else {
        let menu = [{
          icon: "fa-solid fa-music",
          text: "Start Small Music",
          href: "start.js",
          params: {
            model: "small-music",
            title: "Stable Audio 3 Small Music",
            prompt: "lo-fi hip hop beat, 90 BPM"
          }
        }, {
          icon: "fa-solid fa-wave-square",
          text: "Start Small SFX",
          href: "start.js",
          params: {
            model: "small-sfx",
            title: "Stable Audio 3 Small SFX",
            prompt: "cinematic whoosh impact"
          }
        }]

        if (supportsMedium) {
          menu.push({
            icon: "fa-solid fa-compact-disc",
            text: "Start Medium",
            href: "start.js",
            params: {
              model: "medium",
              title: "Stable Audio 3 Medium",
              prompt: "cinematic electronic track, melodic, 124 BPM"
            }
          })
        }

        menu.push({
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js"
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js"
        }, {
          icon: "fa-solid fa-file-zipper",
          text: "<div><strong>Save Disk Space</strong><div>Deduplicates redundant library files</div></div>",
          href: "link.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
          confirm: "Are you sure you wish to reset the app?"
        })

        return menu
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }]
    }
  }
}
