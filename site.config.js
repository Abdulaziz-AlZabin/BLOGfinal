const CONFIG = {
  // profile setting (required)
  profile: {
    name: "Abdulaziz Al-Zabin",
    image: "/avatar.png",
    role: "CyberSecurity Enthusiast",
    bio: "Hey, I'm 4ΣiΣ, A CyberSec guy, and this is my blog",
    email: "zabinaziz0@gmail.com",
    linkedin: "abdulaziz-al-zabin",
    github: "Abdulaziz-AlZabin",
    instagram: "",
  },
  projects: [
    {
      name: `Malware Detection ML Model`,
      href: "https://github.com/Abdulaziz-AlZabin/Mal-Detect-ML-Model",
    },
  ],
  // blog setting (required)
  blog: {
    title: "Abdulaziz Al-Zabin",
    description: "welcome to My World Stranger :)",
    scheme: "dark", // 'light' | 'dark' | 'system'
  },

  // CONFIG configuration (required)
  link: "https://abdulazizalzabin.com",
  since: 2025,
  lang: "en-US",
  ogImageGenerateURL: "https://og-image-korean.vercel.app",

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: false,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "",
    },
  },
  isProd: process.env.VERCEL_ENV === "production",
  revalidateTime: 21600 * 7,
}

module.exports = { CONFIG }
