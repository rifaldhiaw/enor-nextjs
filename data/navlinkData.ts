type NavLinkData = {
  label: string;
  href: string;
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
        href: "/home",
      },
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        label: "Help",
        href: "/help",
      },
      {
        label: "Terms",
        href: "/terms",
      },
      {
        label: "Privacy",
        href: "/privacy",
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "Facebook",
        href: "/facebook",
      },
      {
        label: "Twitter",
        href: "/twitter",
      },
      {
        label: "Instagram",
        href: "/instagram",
      },
    ],
  },
];
