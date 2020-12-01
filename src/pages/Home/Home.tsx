import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';

import { deleteTodo, createTodo, updateTodo } from 'store/todo/actions';
import { selectTodos } from 'selectors';
import { Button, TodoItem } from 'components';
import { TodoFormModal } from 'components/TodoFormModal/TodoFormModal';
import { TodoItem as TodoItemType } from 'store/todo/types';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 2rem 0.5rem;
  max-width: 720px;
  margin: 0 auto;
`;

const FilterContainer = styled(Row)`
  justify-content: space-between;
  width: 55%;
  min-width: 390px;
  margin-left: auto;
  align-self: flex-end;
`;

const TodosContainer = styled.div`
  margin-top: 1.25rem;
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  & > div {
    margin-bottom: 18px;
  }
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NotFoundText = styled.span`
  font-size: 32px;
  color: hsla(0, 0%, 70%, 0.75);
`;

interface HomeProps {}

enum Modals {
  none,
  todoForm,
}

enum Filter {
  all,
  completed,
  pending,
}

export const Home: React.FC<HomeProps> = (props) => {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const [selectedTodo, setSelectedTodo] = useState<TodoItemType | null>(null);

  const handleEditTodo = (todo: TodoItemType) => {
    setSelectedTodo(todo);
    setVisibleModal(Modals.todoForm);
  };

  const handleToggleTodoStatus = (todo: TodoItemType) => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  const [visibleModal, setVisibleModal] = useState<Modals>(Modals.none);
  const handleCloseModal = () => setVisibleModal(Modals.none);

  const [activeFilter, setActiveFilter] = useState<Filter>(Filter.all);

  const filteredTodos = (() => {
    if (activeFilter === Filter.completed) {
      return todos.filter((todo) => todo.completed);
    }

    if (activeFilter === Filter.pending) {
      return todos.filter((todo) => !todo.completed);
    }

    return todos;
  })();

  return (
    <Container>
      <Column>
        <Row>
          <div style={{ marginRight: '.5rem' }} />
          <Button
            bg="#a3be8c"
            onClick={() => {
              setSelectedTodo(null);
              setVisibleModal(Modals.todoForm);
            }}>
            Create
          </Button>
          <FilterContainer>
            <span>filter: </span>
            <Button bg="#d8dee9" onClick={() => setActiveFilter(Filter.all)}>
              all
            </Button>
            <Button
              bg="#4c566a"
              onClick={() => setActiveFilter(Filter.pending)}>
              pending
            </Button>
            <Button
              bg="#8fbcbb"
              onClick={() => setActiveFilter(Filter.completed)}>
              completed
            </Button>
          </FilterContainer>
        </Row>
        <TodosContainer>
          {filteredTodos.length > 0 &&
            filteredTodos.map((todo, idx) => (
              <TodoItem
                key={idx}
                title={todo.title}
                onDeleteClick={() => handleDeleteTodo(todo.id)}
                onEditClick={() => handleEditTodo(todo)}
                description={todo.description}
                completed={todo.completed}
                onStatusToggle={() => handleToggleTodoStatus(todo)}
              />
            ))}
          {filteredTodos.length === 0 && (
            <NotFoundContainer>
              <NotFoundText>Todo list is empty :((</NotFoundText>
            </NotFoundContainer>
          )}
        </TodosContainer>
      </Column>
      <TodoFormModal
        isOpen={visibleModal === Modals.todoForm}
        onRequestClose={handleCloseModal}
        selectedTodo={selectedTodo}
        mode={selectedTodo === null ? 'create' : 'edit'}
      />
    </Container>
  );
};