export const channelTypes = [
  "textRoom",
  "voiceRoom",
  "drawBoard",
  "document",
  "kanban",
] as const;

export type ChannelType = typeof channelTypes[number];

export type NavLinkData = {
  label: string;
  href: string;
  type: typeof channelTypes[number];
};

type NavLinkGroup = {
  title: string;
  links: NavLinkData[];
};

export const navLinkGroups: NavLinkGroup[] = [
  {
    title: "Main",
    links: [
      {
        label: "Home",
        href: "home",
        type: "textRoom",
      },
      {
        label: "Audio",
        href: "audio",
        type: "voiceRoom",
      },
      {
        label: "Draw",
        href: "draw",
        type: "drawBoard",
      },
      {
        label: "Kanban",
        href: "kanban",
        type: "kanban",
      },
      {
        label: "Readme",
        href: "readme",
        type: "document",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        label: "Help",
        href: "help",
        type: "document",
      },
      {
        label: "Terms",
        href: "terms",
        type: "textRoom",
      },
      {
        label: "Sprint",
        href: "sprint",
        type: "kanban",
      },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "Facebook",
        href: "facebook",
        type: "textRoom",
      },
      {
        label: "Twitter",
        href: "twitter",
        type: "textRoom",
      },
      {
        label: "Instagram",
        href: "instagram",
        type: "textRoom",
      },
    ],
  },
];

export const navLinkData: NavLinkData[] = navLinkGroups
  .map((group) => group.links)
  .flat();
