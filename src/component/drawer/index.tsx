import { Button, Descriptions, Drawer, List } from "antd";
import { Item } from "../table/config";

interface Props {
  open: boolean;
  data?: Item;
  onClose?: () => void;
  copyCURL?: () => void;
}

const Idrawer = ({ data, open, onClose, copyCURL }: Props) => {
  return (
    <div>
      <Drawer
        title={data?.url}
        placement="right"
        onClose={onClose}
        size="large"
        open={open}
      >
        <Button type="primary" onClick={copyCURL}>
          复制 cURL
        </Button>

        <div style={{ margin: 10 }}></div>

        <Descriptions column={1} bordered>
          {data &&
            Object.keys(data).map((key) => {
              const value = data[key as keyof Item];
              if (typeof value === "string" || typeof value === "number") {
                return (
                  <Descriptions.Item key={key} label={key}>
                    {value}
                  </Descriptions.Item>
                );
              } else {
                return (
                  <Descriptions.Item key={key} label={key}>
                    <List>
                      {value.header
                        .split("\r\n")
                        .map((i) => i && <List.Item key={i}>{i}</List.Item>)}
                    </List>
                  </Descriptions.Item>
                );
              }
            })}
        </Descriptions>
      </Drawer>
    </div>
  );
};

export default Idrawer;
