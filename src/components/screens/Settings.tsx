import ThemeChanger from "../ThemeChanger";

export default function SettingsScreen(): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <ThemeChanger />
    </div>
  );
}
