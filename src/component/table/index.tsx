import { Button, message, Table } from "antd";
import { useState } from "react";
import { generateCURL } from "../../util/generateCURL";
import Idrawer from "../drawer";
import Ifilter from "../filter";
import { Item, Result } from "./config";

interface Props {
  result?: Result;
}

const Itable = ({ result }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<Item>();
  const [showData, setShowData] = useState<Item[]>([]);

  // 点击查看信息
  const onCheckInfo = (data: Item) => {
    setSelectedData(data);
    setOpen(true);
  };

  //   复制 cURL
  const copyCURL = (data?: Item) => {
    if (data) {
      try {
        const curl = generateCURL(data);
        const textarea = document.createElement("textarea");
        textarea.value = curl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        message.success("复制成功");
      } catch (error) {
        message.error("复制失败");
      }
    } else {
      message.error("复制失败");
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 40,
    },
    {
      title: "method",
      dataIndex: "method",
      key: "method",
      width: 70,
    },
    {
      title: "url",
      dataIndex: "url",
      key: "url",
      width: 600,
      ellipsis: true,
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      width: 60,
    },

    {
      title: "type",
      dataIndex: "type",
      key: "type",
      width: 240,
      ellipsis: true,
    },
    {
      title: "size",
      dataIndex: "size",
      key: "size",
      width: 60,
    },
    {
      title: "domain",
      dataIndex: "domain",
      key: "domain",
      width: 200,
    },
    {
      title: "ip",
      dataIndex: "ip",
      key: "ip",
      width: 150,
    },

    {
      title: "action",
      key: "id",
      width: 200,
      render: (item: Item) => (
        <div className="action">
          <Button type="primary" size="small" onClick={() => onCheckInfo(item)}>
            详细信息
          </Button>
          <Button size="small" onClick={() => copyCURL(item)}>
            复制 cURL
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="table">
      <Ifilter data={result?.data} changeData={setShowData} />
      <h4>
        文件名：
        {result?.fileName && <span>{result.fileName}</span>}
      </h4>
      <Table dataSource={showData} columns={columns} rowKey="id" size="small" />
      <Idrawer
        data={selectedData}
        open={open}
        onClose={() => setOpen(false)}
        copyCURL={() => copyCURL(selectedData)}
      />
    </div>
  );
};

export default Itable;
