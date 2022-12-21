import { useCallback } from "react";

import { signOut as _signOut } from "next-auth/react";

import Separator from "../components/Separator";
import ThemeMenu from "../components/ThemeMenu";

export default function SettingsScreen(): JSX.Element {
  const signOut = useCallback(async function () {
    await _signOut();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p>Theme</p>
        <ThemeMenu />
      </div>
      <Separator />
      <button onClick={signOut} type="button">
        Disconnect
      </button>
    </div>
  );
}
