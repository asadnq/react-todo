import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import { TodoItem } from 'store/todo/types';
import { createTodo, updateTodo } from 'store/todo/actions';
import { Button } from 'components';
import { TypeOfExpression } from 'typescript';
import { initial } from 'lodash';

const Heading = styled.h3`
  font-weight: 900;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.25rem;
  height: 24px;
  border-radius: 5px;
  border: solid 1px hsla(0, 0%, 37%, 0.8);
  margin-bottom: 8px;
`;

const Textarea = styled.textarea`
  resize: none;
  height: 72px;
  padding: 0.25rem;
  border-radius: 5px;
  border: solid 1px hsla(0, 0%, 37%, 0.8);
  margin-bottom: 8px;
`;

const CheckBox = styled.input.attrs((props) => ({
  type: 'checkbox',
}))`
  width: 18px;
  height: 18px;
`;

const CREATE = 'create';
const EDIT = 'edit';

interface TodoFormModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  mode: typeof CREATE | typeof EDIT;
  selectedTodo: TodoItem | null;
}

const initialTodo: TodoItem = {
  id: '',
  title: '',
  description: '',
  completed: false,
};
export const TodoFormModal: React.FC<TodoFormModalProps> = ({
  isOpen,
  onRequestClose,
  mode,
  selectedTodo,
}) => {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState<TodoItem>(initialTodo);

  useEffect(() => {
    if (mode === 'edit' && selectedTodo !== null) {
      setTodo(selectedTodo);
    } else {
      setTodo(initialTodo);
    }
  }, [mode, selectedTodo]);

  const handleSubmit = () => {
    if (mode === 'edit') {
      dispatch(updateTodo(todo));
    } else {
      dispatch(createTodo({ ...todo, id: String(new Date().valueOf()) }));
    }
    setTodo(initialTodo);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        },
        content: {
          position: 'static',
          width: '520px',
          height: '440px',
        },
      }}>
      <Column>
        <Heading>
          {mode === 'create' ? 'Create a new Todo' : 'Edit todo'}
        </Heading>
        <label>Title</label>
        <Input
          name="title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          placeholder="todo title"
        />
        <label>Description</label>
        <Textarea
          placeholder="todo description"
          name="description"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <div style={{ display: 'flex' }}>
          <CheckBox
            checked={todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: !todo.completed })}
          />
          <label>completed</label>
        </div>
        <div style={{ marginTop: '24px' }} />
        <Button bg="#88c0d0" onClick={handleSubmit}>
          {mode === 'create' ? 'Create' : 'update'}
        </Button>
      </Column>
    </Modal>
  );
};
