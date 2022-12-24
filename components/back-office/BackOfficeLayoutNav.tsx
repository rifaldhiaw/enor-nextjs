import {
  Group,
  Paper,
  ScrollArea,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChecklist,
  IconReportAnalytics,
  IconReportMoney,
  IconUsers,
  TablerIcon,
} from "@tabler/icons";
import { useRouter } from "next/router";

const backofficeNavLinkData = [
  {
    title: "General",
    href: "general",
    icon: IconReportAnalytics,
  },
  {
    title: "Employees",
    href: "employees",
    icon: IconUsers,
  },
  {
    title: "Finance",
    href: "finance",
    icon: IconReportMoney,
  },
  {
    title: "Presence",
    href: "presence",
    icon: IconChecklist,
  },
];

export const BackOfficeLayoutNav = (props: { title: string }) => {
  const router = useRouter();
  const dummy = router.query.dummy;

  return (
    <Paper
      w={240}
      h="100vh"
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        borderRight: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2]
        }`,
      })}
    >
      <Title
        order={4}
        p="md"
        sx={(theme) => ({
          position: "sticky",
          borderBottom: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2]
          }`,
        })}
      >
        {props.title}
      </Title>

      <ScrollArea
        py="lg"
        sx={{
          height: "calc(100vh - var(--mantine-header-height, 60px))",
          flex: 1,
        }}
      >
        {backofficeNavLinkData.map((item) => (
          <MainLink
            key={item.title}
            label={item.title}
            onClick={() => router.push(`/back-office/${item.href}`)}
            Icon={item.icon}
            active={dummy === item.href}
          />
        ))}
      </ScrollArea>
    </Paper>
  );
};

interface MainLinkProps {
  Icon: TablerIcon;
  active: boolean;
  label: string;
  onClick: () => void;
}

function MainLink({ Icon, active, label, onClick }: MainLinkProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      px="md"
      py="sm"
      sx={(theme) => ({
        display: "block",
        width: "100%",
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[7],
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
        },
        backgroundColor: active ? theme.colors.blue[0] : "transparent",
        borderLeft: active
          ? `4px solid ${theme.colors.blue[4]}`
          : "4px solid transparent",
      })}
    >
      <Group>
        <Icon size={20} />
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
