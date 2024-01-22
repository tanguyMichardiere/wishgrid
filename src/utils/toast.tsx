import "client-only";
import { toast as _toast } from "react-hot-toast";
import Alert from "../components/Alert";

export function toast(text: string): void {
  _toast.custom(<Alert text={text} />);
}

toast.info = function (text: string) {
  _toast.custom(<Alert text={text} type="info" />);
};

toast.success = function (text: string) {
  _toast.custom(<Alert text={text} type="success" />);
};

toast.warning = function (text: string) {
  _toast.custom(<Alert text={text} type="warning" />);
};

toast.error = function (text: string) {
  _toast.custom(<Alert text={text} type="error" />);
};
