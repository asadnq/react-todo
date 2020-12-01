import { Button } from 'components';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const TodoCard = styled.div`
  box-shadow: 0px 0px 8px 1px hsla(0, 0%, 72%, 0.35);
  padding: 0.75rem 1rem;
  background-color: #fff;
  border-radius: 5px;
  transition: 0.3s;
  min-height: 96px;
`;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: 900;
  font-size: 24px;
  color: #131313;
  display: block;
`;

const TodoStatus = styled.span<{ completed: boolean }>`
  font-weight: 900;
  font-size: 16px;
  color: ${(props) => (!props.completed ? '#4c566a' : '#8fbcbb')};
  opacity: 0.75;
  display: block;
`;

const Description = styled.span`
  color: #68737a;
  font-size: 18px;
`;

interface TodoItemProps {
  title: string;
  description: string;
  completed: boolean;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onStatusToggle: () => void;
}

const CheckBoxContainer = styled.div`
  margin-top: 0.15rem;
  margin-right: 0.25rem;
`;

const CheckBox = styled.input.attrs((props) => ({
  type: 'checkbox',
}))`
  width: 18px;
  height: 18px;
`;

export const TodoItem: React.FC<TodoItemProps> = ({
  title,
  description,
  completed,
  onDeleteClick,
  onEditClick,
  onStatusToggle,
}) => {
  return (
    <TodoCard>
      <TodoContainer>
        <Row>
          <CheckBoxContainer>
            <CheckBox checked={completed} onChange={onStatusToggle} />
          </CheckBoxContainer>
          <div>
            <TodoStatus completed={completed}>
              {completed ? 'completed' : 'pending'}
            </TodoStatus>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </div>
        </Row>
        <div>
          <Row>
            <Button bg="#5e81ac" onClick={onEditClick}>
              Edit
            </Button>
            <div style={{ width: '12px' }} />
            <Button bg="#bf616a" onClick={onDeleteClick}>
              delete
            </Button>
          </Row>
        </div>
      </TodoContainer>
    </TodoCard>
  );
};
