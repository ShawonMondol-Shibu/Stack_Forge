import { useMemo } from 'react'

export default function JoditConfig() {
    const config = useMemo(
    () => ({
      removeButtons: ["source", "audio"],
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
      ],
    }),
    [],
  );
  return config
}
