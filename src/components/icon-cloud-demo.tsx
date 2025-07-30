"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "88%", // Aumentado em 10% de 80% para 88%
      height: "88%", // Aumentado em 10% de 80% para 88%
      margin: "auto", // Centralização adicional
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 0.8,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.03,
    minSpeed: 0.015,
    // dragControl: false,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 64, // Dobrado de 32 para 64
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export function IconCloudDemo() {
  const slugs = [
    "instagram", "facebook", "twitter", "linkedin", "youtube", "tiktok", "whatsapp", "telegram", "discord", "slack",
    "notion", "openai", "chatgpt", "googleanalytics", "facebookads", "googleads", "mailchimp", "canva", "figma", "adobecreativecloud",
    "clickup", "trello", "asana", "n8n", "zapier", "ifttt", "hubspot", "salesforce", "zendesk", "intercom",
    "dropbox", "googlecloud", "monday", "jira", "github", "gitlab", "bitbucket", "pinterest", "dribbble", "behance"
  ];
  return <IconCloud iconSlugs={slugs.slice(0, 40)} />;
}

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light")
    );
  }, [data, theme]);

  // Não renderiza no servidor para evitar erro de hidratação
  if (!isMounted) {
    return (
      <div 
        className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "88%",
          height: "88%",
          margin: "auto",
        }}
      >
        <div className="text-gray-500 dark:text-gray-400">Carregando...</div>
      </div>
    );
  }

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
} 