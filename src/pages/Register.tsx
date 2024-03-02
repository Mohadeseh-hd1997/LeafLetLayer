import { UploadChangeParam } from "antd/lib/upload/interface";
import TakePhoto from "../module/TakePhoto";
import { CheckPermission } from "../Hook/DetectBrowser";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Upload,
  Row,
  Col,
} from "antd";
import { useState } from "react";

const { TextArea } = Input;
const normFile = (e: UploadChangeParam | UploadChangeParam[]) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormDisabledDemo = () => {
  const [permission, setPermission] = useState(CheckPermission());
  console.log(permission);
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          disabled={false}
          style={{ maxWidth: 600, marginTop: 6 }}
        >
          <Form.Item label="Marital Status">
            <Radio.Group>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
              <Radio value="other"> Other </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Name">
            <Input />
          </Form.Item>
          <Form.Item label="Family">
            <Input />
          </Form.Item>
          <Form.Item label="City">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="BirthDay">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Description About Yourself">
            <TextArea rows={4} />
          </Form.Item>
          {permission ? (
            <Form.Item
              label="Upload Profile Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{ marginTop: 4 }}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                accept="image/x-png,image/jpeg,image/gif"
              >
                <TakePhoto />
              </Upload>
            </Form.Item>
          ) : (
            ""
          )}
          <Form.Item label="Button">
            <Button>Register</Button>
          </Form.Item>
          <Form.Item label="Button">
            <Button>SignIn</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default FormDisabledDemo;
