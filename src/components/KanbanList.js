import React from "react";
import KanbanCard from "./KanbanCard";
import KanbanActionButton from "./KanbanActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 7px;
  min-width: 300px;
  padding: 8px;
  height: 100%;
  margin-right: 8px;
  position:relative;
`;


const KanbanList = ({ title, cards, listID, index }) => {
  return (

      <Draggable className={'col'} draggableId={String(listID)} index={index}>
      {provided => (
           <ListContainer
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                >
        <Droppable droppableId={String(listID)}>
          {provided => (
           <div {...provided.droppableProps} ref={provided.innerRef}>
              <h4>{title} <span className={'text-secondary'}>({cards.length}) </span></h4>

              {cards.map((card, index) => (
                <KanbanCard
                  key={card.id}
                  index={index}
                  text={card.text}
                  id={card.id}
                  color={card.color}
                  date={card.date}
                />
              ))}
               {provided.placeholder}
              <KanbanActionButton listID={listID} />
                 </div>
          )}
        </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};

export default KanbanList;
