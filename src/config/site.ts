export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: {
    en: "Blueprint",
    ar: "Blueprint",
  },
  description: {
    en: "",
    ar: "",
  },

  keywords: {
    en: "",
    ar: "",
  },

  navItems: [
    {
      label: "home",
      href: "/",
      id: "home",
    },
    {
      label: "comments",
      href: "/comments",
      id: "comments",
    },
    {
      label: "link1",
      href: "#",
      id: "link1",
    },
    {
      label: "link2",
      href: "#",
      id: "link3",
    },
  ],
  settings: [
    { key: "settings", name: "My Settings" },
    { key: "team_settings", name: "Team Settings" },
    { key: "analytics", name: "Analytics" },
    { key: "system", name: "System" },
    { key: "configurations", name: "Configurations" },
    { key: "help_and_feedback", name: "Help & Feedback" },
  ],
  socialLinks: [
    {
      label: "linked_in",
      url: "",
    },
  ],
};
