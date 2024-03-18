import React, { useState } from 'react';
import Layout from '../../Layout';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import styles from './Chats.module.css'; 

function Chats() {
  const [searchOption, setSearchOption] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearchOptionChange = (option) => {
    setSearchOption(option);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestionText) => {
    setInputValue(suggestionText);
  };

  return (
    <Layout>
      <div className={styles.chatContainer}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <label className={styles.chatLabel}>
              <input
                type="radio"
                value="acrossFiles"
                checked={searchOption === 'acrossFiles'}
                onChange={() => handleSearchOptionChange('acrossFiles')}
              />
              Search across files
            </label>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <label className={styles.chatLabel}>
              <input
                type="radio"
                value="specificFileText"
                checked={searchOption === 'specificFileText'}
                onChange={() => handleSearchOptionChange('specificFileText')}
              />
              Search specific file
            </label>
          </Grid>
          {searchOption === 'specificFileText' && (
            <Grid item xs={12} sm={6} md={4}>
              <FormControl className={styles.chatFormControl} size="small" variant="outlined" fullWidth>
                <InputLabel id="file-select-label">Select files</InputLabel>
                <Select
                  labelId="file-select-label"
                  id="file-select"
                  value={selectedFile}
                  onChange={handleFileChange}
                  label="Select files"
                  className={styles.chatSelect}
                >
                  <MenuItem value="">
                    <em>Select file</em>
                  </MenuItem>
                  <MenuItem value="file1">File 1</MenuItem>
                  <MenuItem value="file2">File 2</MenuItem>
                  <MenuItem value="file3">File 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </div>
      <div className={styles.chatCardContainer}>
      <div className={styles.chatScroll}>
        <Card className={styles.chatCardNew}>
          <div className={styles.chatCard}>
          <CardContent className={styles.chatCardContent}>
            <h1 className={styles.chatHeading}>AM-Chat</h1>
            <p className={styles.chatParagraph}>Hello, I’m AM-Chat</p>
            <p className={styles.chatParagraphText}>How can I help you today?</p>

          </CardContent>
          </div>
          <CardContent>
          <Grid container spacing={2}>
                <Grid item>
                  <p className={styles.chatParagraphSuggestion} onClick={() => handleSuggestionClick("Could you help me with the maternity policy of my organization?")}>
                    Could you help me with the maternity policy of my organization?
                  </p>
                </Grid>
                <Grid item >
                  <p className={styles.chatParagraphSuggestion} onClick={() => handleSuggestionClick("Can you tell me about GDPR compliance.  Which I should follow in my organization?")}>
                  Can you tell me about GDPR compliance.  Which I should follow in my organization?
                  </p>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <p className={styles.chatParagraphSuggestion} onClick={() => handleSuggestionClick("Can you explain me the Pythagoras theorem based on. ")}>
                  Can you explain me the Pythagoras theorem based on. 
                  </p>
                </Grid>
                <Grid item >
                  <p className={styles.chatParagraphSuggestion} onClick={() => handleSuggestionClick("Can you tell me what's wrong in my lab reports? ")}>
                  Can you tell me what's wrong in my lab reports?  
                  </p>
                </Grid>
                <Grid item >
                  <p className={styles.chatParagraphSuggestion} onClick={() => handleSuggestionClick("Can you explain me the quantum? ")}>
                  Can you explain me the quantum? 
                  </p>
                </Grid>
              </Grid>
          </CardContent>
          <CardContent>
          <textarea
              className={styles.bigInput}
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Ask anything..."
            />
          </CardContent>

        </Card>
      </div>
      </div>

    </Layout>
  );
}

export default Chats;
