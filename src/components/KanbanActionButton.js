import React from "react";
import Icon from "@material-ui/core/Icon";
import Textarea from 'react-textarea-autosize';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addList,addCard, deleteList} from "../actions";



class KanbanActionButton extends React.Component {

    state = {
        formOpen: false,
        text:"",
        color:"white",
        date: ''
    };
    
    openForm = () => {
        this.setState({
            formOpen: true
        });

    };

    deleteList= () => {
        const { dispatch } = this.props;
        dispatch(deleteList(this.props.listID))
    };



    closeForm = (e) => {
        this.setState({
            formOpen:false
        });

    };
    handleInputChange= (e) => {
        this.setState({
            text: e.target.value
        });
    };
    handleColorChange= (e) => {
        this.setState({
            color: e.target.value
        });
    };
    handleDateChange= (e) => {
        this.setState({
            date: e.target.value
        });
    };
    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;

        if (text) {
            this.setState({
                text: ""
            });
            dispatch(addList(text));
        }
        return;
    };
    handleAddCard = () => {
        const { dispatch,listID } = this.props;
        const { text,color,date } = this.state;

        if (text) {
            this.setState({
                text: "",
                color: "white"
            });
            dispatch(addCard(listID, text,color,date))
        }
    }


    renderAddButton = () => {
        const { list } = this.props;

        const buttonText = list ? "Добавить колонку" : "Добавить карточку";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";
        const width300 = list ? "300px" : "inherit";
        const padding15 = list ? "10px" : "inherit";
        const height50 = list ? "80px" : "inherit";

        return (
            <div 
            onClick ={this.openForm}
            style={{
                ...styles.openForButtonGroup,
                opacity: buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonTextBackground,
                width: width300,
                padding: padding15,
                height: height50
            }}
            > 
                <Icon>add</Icon> {buttonText}
                
            </div>
        );
    };

    renderRemoveButton = () => {
        const { list } = this.props;
        const disp = list ? "none" : "inline-block";

        return (
            <div 
            onClick ={this.deleteList}
            style={{
                position: "absolute",
                top: "3px",
                right: "3px",
                display: disp,
                cursor: "pointer",
            }}
            > 
                <Icon>clear</Icon>
            </div>
        );
    };



    renderForm  = () => {
        const { list }  = this.props;

        const placeholder = list 
        ? "Введите название колонки..." 
        : "Введите название карточки...";

        const buttonTitle = list ? "Добавить колонку" : "Добавить карточку";

        return <div>
                <Card 
                style= {{
                    overflow:"visible",
                    minHeight:85,
                    minWidth:272,
                    padding:"6px 8px 2px"
                }}
                > 
                    <Textarea
                    placeholder={placeholder}
                    autoFocus
                    value={this.state.text}
                    onChange={this.handleInputChange} 
                    style={{
                        resize:"none",
                        width:"100%",
                        overflow:"hidden",
                        outline:"none",
                        border:"none"
                    }}            
                    />
                    <div  className={"my-2 " + (list ? 'd-none' : '')}>
                        <hr/>
                        <label className={'text-secondary'}>Цвет</label>
                        <select onChange={this.handleColorChange} value={this.state.color}  className={'form-control'}>
                            <option value={'white'}>Белый</option>
                            <option value={'Salmon'}>Красный</option>
                            <option  value={'PaleGreen'}>Зеленый</option>
                            <option  value={'SteelBlue'}>Синий</option>
                        </select>

                        <label className={'text-secondary mt-2'}>Срок</label>
                        <input onChange={this.handleDateChange} className={'form-control'} type={'date'} />
                    </div>
                </Card>
                <div style={styles.formButtonGroup}>
                    <Button 
                    onMouseDown={ list ? this.handleAddList : this.handleAddCard }
                    variant="contained"
                    style={{ color:"white", backgroundColor:"#5aac44" }}
                    > 
                    {buttonTitle} {" "}
                    </Button>
                    <Button 
                    onMouseDown={ this.closeForm}
                    variant="contained"
                    style={{ color:"000", backgroundColor:"#fff",marginLeft:8, cursor:"pointer" }}
                    > 
                    <Icon> close</Icon>
                    </Button>
                </div>
        </div>
};

    render() {
        
        return [this.state.formOpen ? this.renderForm() : this.renderAddButton(),this.renderRemoveButton()];
    }
}
const styles = {
    openFormButtonGroup: {
        display: "flex",
        alignItems:"center",
        cursor:"pointer",
        borderRadius:3,
        height:36,
        width:272,
        paddingLeft:10
    },
    formButtonGroup:{
        marginTop: 8,
        display:"flex",
        alignItems:"center"
    }
};

export default connect() (KanbanActionButton);