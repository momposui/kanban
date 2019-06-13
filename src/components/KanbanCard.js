import React from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import KanbanCardActionButton from "./KanbanCardActionButton";

import {Draggable}  from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
    margin-bottom:8px;
    position:relative;
`;

const Span = styled.span`
    position:absolute;
    bottom:0;
    right:0;
    margin-right:5px;
`;



const KanbanCard = ({text, id, index,color,date }) => {
    return (
    <Draggable draggableId={String(id)} index= {index} >
        {provided=> (
        <CardContainer
        
            ref={provided.innerRef}
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
            >

        <Card> 
        <CardContent style={{background: color}} >
            <Typography gutterBottom>{text}</Typography>
            <Span className={''}>{date}</Span>
            <KanbanCardActionButton cardId={id} />

        </CardContent>

        </Card>
        </CardContainer>
        
        )}

     </Draggable>
    );
};



export default KanbanCard;