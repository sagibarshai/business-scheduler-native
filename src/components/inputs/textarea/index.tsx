import TextInput from "../text";

import { type Props } from "./types";

const Textarea = ({ ...props }: Props) => {
  return <TextInput {...props} isTextArea />;
};
export default Textarea;
