type NavLinkData = {
  label: string;
  href: string;
  current: boolean;
};

type NavLinkGroup = {
  title: string;
  links: NavLinkData[];
};

export const navLinkData: NavLinkGroup[] = [
  {
    title: "Main",
    links: [
      {
        label: "Home",
        href: "/",
        current: true,
      },
      {
        label: "About",
        href: "/about",
        current: false,
      },
      {
        label: "Contact",
        href: "/contact",
        current: false,
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        label: "Help",
        href: "/help",
        current: false,
      },
      {
        label: "Terms",
        href: "/terms",
        current: false,
      },
      {
        label: "Privacy",
        href: "/privacy",
        current: false,
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "Facebook",
        href: "https://facebook.com",
        current: false,
      },
      {
        label: "Twitter",
        href: "https://twitter.com",
        current: false,
      },
      {
        label: "Instagram",
        href: "https://instagram.com",
        current: false,
      },
    ],
  },
];
