import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
const { Dragger } = Upload;

interface Props {
  parseFile: (file: File) => void;
}

const Iupload = ({ parseFile }: Props) => {
  const DraggerProps: UploadProps = {
    name: "file",
    multiple: false,
    fileList: [],
    beforeUpload: (file) => {
      const isJSON = file.type === "application/json";
      if (!isJSON) {
        message.error(`${file.name} 不是 JSON 文件`);
      }
      return isJSON || Upload.LIST_IGNORE;
    },
    customRequest(data) {
      if (data && data.file) {
        parseFile(data.file as File);
        message.success("上传文件成功");
      } else {
        message.error("上传文件失败");
      }
    },
  };

  return (
    <div className="input">
      <Dragger {...DraggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或者拖拽文件上传</p>
        <p className="ant-upload-hint">
          仅支持上传 JSON 文件，请现在 Http Debugger Pro 中导出 JSON
          格式文件后上传
        </p>
      </Dragger>
    </div>
  );
};

export default Iupload;
