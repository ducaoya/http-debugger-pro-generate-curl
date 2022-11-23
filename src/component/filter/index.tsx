import { Select } from "antd";
import { useEffect, useState } from "react";
import { Item } from "../table/config";

const { Option } = Select;

interface Props {
  data?: Item[];
  changeData?: (data: Item[]) => void;
}

interface FilterType {
  application: string;
  domain: string;
  method: string;
  type: string;
  status: string;
}

const Ifilter = ({ data, changeData }: Props) => {
  const [application, setApplication] = useState<string[]>([]);
  const [domain, setDomain] = useState<string[]>([]);
  const [method, setMethod] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);

  const [fileType, setFileType] = useState<FilterType>({
    application: "",
    domain: "",
    method: "",
    type: "",
    status: "",
  });

  useEffect(() => {
    if (data) {
      const _application: string[] = [];
      const _domain: string[] = [];
      const _method: string[] = [];
      const _type: string[] = [];
      const _status: string[] = [];
      data.forEach((item) => {
        if (
          !_application.includes(item.application) &&
          item.application.trim()
        ) {
          _application.push(item.application);
        }
        if (!_domain.includes(item.domain) && item.domain.trim()) {
          _domain.push(item.domain);
        }
        if (!_method.includes(item.method) && item.method.trim()) {
          _method.push(item.method);
        }
        if (!_type.includes(item.type) && item.type.trim()) {
          _type.push(item.type);
        }
        if (!_status.includes(item.status) && item.status.trim()) {
          _status.push(item.status);
        }
      });
      setApplication([..._application]);
      setDomain([..._domain]);
      setMethod([..._method]);
      setType([..._type]);
      setStatus([..._status]);
      setFileType({
        application: "",
        domain: "",
        method: "",
        type: "",
        status: "",
      });
    }
  }, [data]);

  const onChange = (type: string, value: string) => {
    fileType[type as keyof FilterType] = value || "";
    setFileType({ ...fileType });
  };

  useEffect(() => {
    if (changeData) {
      let newData: Item[] = [];
      const { application, domain, method, type, status } = fileType;
      if (!application && !domain && !method && !type && !status) {
        newData = data || [];
      } else {
        if (data) {
          data.forEach((item) => {
            if (
              !(
                (application && item.application !== application) ||
                (domain && item.domain !== domain) ||
                (method && item.method !== method) ||
                (type && item.type !== type) ||
                (status && item.status !== status)
              )
            ) {
              newData.push(item);
            }
          });
        }
      }
      changeData(newData);
    }
  }, [fileType]);

  return (
    <div className="select">
      <div>
        <span>application: </span>
        <Select
          placeholder="application"
          style={{ width: 150 }}
          onChange={(value) => {
            onChange("application", value);
          }}
          allowClear
          optionFilterProp="children"
        >
          {application.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <span>domain: </span>
        <Select
          placeholder="domain"
          style={{ width: 250 }}
          onChange={(value) => {
            onChange("domain", value);
          }}
          allowClear
          optionFilterProp="children"
        >
          {domain.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <span>method: </span>
        <Select
          placeholder="method"
          style={{ width: 150 }}
          onChange={(value) => {
            onChange("method", value);
          }}
          allowClear
          optionFilterProp="children"
        >
          {method.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <span>type: </span>
        <Select
          placeholder="type"
          style={{ width: 200 }}
          onChange={(value) => {
            onChange("type", value);
          }}
          allowClear
          optionFilterProp="children"
        >
          {type.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>

      <div>
        <span>status: </span>
        <Select
          placeholder="status"
          style={{ width: 150 }}
          onChange={(value) => {
            onChange("status", value);
          }}
          allowClear
          optionFilterProp="children"
        >
          {status.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Ifilter;
