import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';
import { WarningOutlined } from '@ant-design/icons';

function CustomDialog({ open, onClose, onOk, title, content, okButtonText, cancelButtonText }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <WarningOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography>
                    {content}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onOk} type="primary">
                    <Typography variant="button">{okButtonText}</Typography>
                </Button>
                <Button onClick={onClose}>
                    <Typography variant="button">{cancelButtonText}</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CustomDialog;
