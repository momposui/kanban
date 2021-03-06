import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from 'react-textarea-autosize';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList,addCard, deleteCard} from "../actions";



class KanbanCardActionButton extends React.Component {



    deleteCard= () => {
        const { dispatch } = this.props;
        dispatch(deleteCard(this.props.cardId))
    };


    renderRemoveButton = () => {
        return (
            <div 
            onClick ={this.deleteCard}
            style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                cursor:"pointer"
            }}
            > 
                <Icon>clear</Icon>
            </div>
        );
    };



    render() {
        
        return [this.renderRemoveButton()];
    }
}

export default connect() (KanbanCardActionButton);