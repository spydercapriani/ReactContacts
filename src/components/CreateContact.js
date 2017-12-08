import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from '../utils/ImageInput';
import serializeForm from 'form-serialize';
import PropTypes from "prop-types";

export default class CreateContact extends Component {
    static propTypes = {
        onCreateContact: PropTypes.func.isRequired
      };
    
    handleSubmit = (event) => {
        event.preventDefault()
        const values = serializeForm(event.target, { hash: true })
        this.props.onCreateContact(values)
    }
    
    render() {
        return (
            <div>
                <Link className='close-create-contact' to='/'>Close</Link>
                <form className='create-contact-form' onSubmit={this.handleSubmit}>
                    <ImageInput 
                        className='create-contact-avatar-input'
                        name='avatarURL'
                        maxHeight={64}
                    />
                    <div className='create-contact-details'>
                        <input type='text' name='name' placeholder='Name'/>
                        <input type='text' name='email' placeholder='Email'/>
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        );
    }
}