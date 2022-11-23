import { Item } from "../component/table/config";

export function generateCURL(data: Item) {
  let curl = `  curl '${data.url}' \\\n`;
  const method = data.method;
  if (method === "POST") {
    curl += "  -X 'POST' \\\n";
  }

  const headers = data.request.header.split("\r\n");

  headers.forEach((header, index) => {
    if (index > 0 && header) {
      curl += `  -H '${header}' \\\n`;
    }
  });

  curl += "  --compressed";

  return curl;
}
