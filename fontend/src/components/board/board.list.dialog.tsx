import {
  faBug,
  faLink,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Col,
  Modal,
  Row,
  Button,
  Divider,
  Dropdown,
  Menu,
} from "antd";
import ReactQuill from "react-quill";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import RichTextEditor from "../rich.texteditor";
// const RichTextExample = () => {
//   const [value, setValue] = useState<Descendant[]>(initialValue)
//   const renderElement = useCallback(props => <Element {...props} />, [])
//   const renderLeaf = useCallback(props => <Leaf {...props} />, [])
//   const editor = useMemo(() => withHistory(withReact(createEditor())), [])

//   return (
//     <Slate editor={editor} value={value} onChange={value => setValue(value)}>

//       <Editable
//         renderElement={renderElement}
//         renderLeaf={renderLeaf}
//         placeholder="Enter some rich text…"
//         spellCheck
//         autoFocus
//         onKeyDown={event => {
//           for (const hotkey in HOTKEYS) {
//             if (isHotkey(hotkey, event as any)) {
//               event.preventDefault()
//               const mark = HOTKEYS[hotkey]
//               toggleMark(editor, mark)
//             }
//           }
//         }}
//       />
//     </Slate>
//   )
// }

interface IBoardListDialog {
  isVisible: boolean;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface IEditorModules {
  toolbar: Array<any>;
  clipboard: object;
}

const BoardListDialog = ({
  isVisible,
  onCancel,
  onOk,
}: IBoardListDialog) => {
  return (
    <Modal
      title="Drag and drop issue"
      visible={isVisible}
      style={{ backdropFilter: "blur( 3.0px )" }}
      onOk={onOk}
      onCancel={onCancel}
      width={window.innerWidth / 1.8}
      className="board--list--dialog"
    >
      <Row>
        <Col span={16}>
          <div className="actions">
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPaperclip} />}
              onClick={(e) => {
                console.log(e.currentTarget);
              }}
            >
              Attach
            </Button>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faBug} />}
            >
              Add a child issue
            </Button>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faLink} />}
            >
              Link Issue
            </Button>
          </div>
          <Row>
            <Col span={24}>
              <p>Description</p>
              <TextArea placeholder={"Add a description"} />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={2}>
              <Avatar icon={<UserOutlined />} size={40} />
            </Col>
            <Col span={22}>
              <RichTextEditor htmlString={""} />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Dropdown.Button
            onClick={(e: any) => {}}
            overlay={
              <Menu onClick={(e: any) => {}}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                  1st menu item
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                  2nd menu item
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                  3rd menu item
                </Menu.Item>
              </Menu>
            }
          >
            To Do
          </Dropdown.Button>
        </Col>
      </Row>
      {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
    </Modal>
  );
};

export default BoardListDialog;
