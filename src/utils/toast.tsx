import "client-only";
import { toast as rht } from "react-hot-toast";
import Alert from "../components/Alert";

export function toast(text: string): void {
  rht.custom(<Alert text={text} />);
}

toast.info = function (text: string) {
  rht.custom(<Alert text={text} type="info" />);
};

toast.success = function (text: string) {
  rht.custom(<Alert text={text} type="success" />);
};

toast.warning = function (text: string) {
  rht.custom(<Alert text={text} type="warning" />);
};

toast.error = function (text: string) {
  rht.custom(<Alert text={text} type="error" />);
};
