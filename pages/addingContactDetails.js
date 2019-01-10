import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import css from './../App.scss';
// import 'firebase/storage'; 
import app from './../src/firebase';
import FileUploader from "react-firebase-file-uploader";


class AddingContactDetails extends Component {
    state = {
        descEng: '',
        descMar: '',
        image: '',
        isUploading: false,
        progress: 0
    }
    handleChangeUsername = event =>
        this.setState({ username: event.target.value });
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        app
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ image: url }));
    };
    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
    };
    render() {
        return (
            <div>
                <p>Add</p>
                <FileUploader
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={app.storage().ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />
                <TextField
                    id="standard-multiline-static"
                    label="Multiline"
                    multiline
                    rows="4"
                    defaultValue="Default Value"
                    margin="normal"
                />
            </div>
        );
    }
}

export default AddingContactDetails;
