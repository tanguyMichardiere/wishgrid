export type Props = {
  position: "left" | "right";
};

export type ClientProps = Props & {
  system: string;
  dark: string;
  light: string;
};
