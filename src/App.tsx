import { message } from "antd";
import "antd/dist/reset.css";
import { useState } from "react";
import "./App.css";
import Itable from "./component/table";
import { Result } from "./component/table/config";
import Iupload from "./component/upload";

function App() {
  const [result, setResult] = useState<Result>();

  const parseFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          const res = JSON.parse(e.target?.result as string);
          if (res) {
            setResult({
              fileName: file.name,
              data: res,
            });
          }
        } catch (error) {
          message.error("解析 JSON 失败，请检查你的 JSON 文件");
          console.error(error);
        }
      }
    };

    reader.onerror = (e) => {
      message.error("加载文件失败 ！");
      console.error(e);
    };

    reader.readAsText(file);
  };

  return (
    <div className="App">
      <Iupload parseFile={parseFile} />
      <Itable result={result} />
    </div>
  );
}

export default App;
