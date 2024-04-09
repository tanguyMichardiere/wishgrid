import "client-only";
import { toast as _toast } from "react-hot-toast";
import { Alert } from "../components/alert";

export function toast(text: string): void {
	_toast.custom(<Alert text={text} />);
}

toast.info = (text: string) => {
	_toast.custom(<Alert text={text} type="info" />);
};

toast.success = (text: string) => {
	_toast.custom(<Alert text={text} type="success" />);
};

toast.warning = (text: string) => {
	_toast.custom(<Alert text={text} type="warning" />);
};

toast.error = (text: string) => {
	_toast.custom(<Alert text={text} type="error" />);
};
