import React, { useState } from 'react';
import styled from 'styled-components';
import { Slider, Select, MenuItem, Button, TextField } from '@mui/material';

const SubtitleSettings = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const SubtitleExample = styled.div<{ bgColor: string; color: string; fontSize: number }>`
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize}px;
  padding: 5px;
  margin-top: 10px;
`;


interface SubtitleCustomizerProps {
  setSubSettings: React.Dispatch<React.SetStateAction<{
    fontSize: number;
    color: string;
    bgColor: string;
    enabled: boolean;
    text: string;
  }>>;
}

const SubtitleCustomizer: React.FC<SubtitleCustomizerProps> = ({ setSubSettings }) => {
  const [fontSize, setFontSize] = useState(20);
  const [color, setColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const [subtitleEnabled, setSubtitleEnabled] = useState(true);
  const [text, setText] = useState('Subtitle text goes here.');

  const handleSettingsChange = (newSettings: Partial<{ fontSize: number; color: string; bgColor: string; enabled: boolean; text: string }>) => {
    setSubSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SubtitleSettings>
      <Button onClick={() => {
        setSubtitleEnabled(!subtitleEnabled);
        handleSettingsChange({ enabled: !subtitleEnabled });
      }}>
        {subtitleEnabled ? 'Disable' : 'Enable'} Subtitles
      </Button>
      <Slider
        value={fontSize}
        onChange={(e, value) => {
          setFontSize(value as number);
          handleSettingsChange({ fontSize: value as number });
        }}
        min={10}
        max={40}
        valueLabelDisplay="auto"
        aria-labelledby="font-size-slider"
      />
      <Select
        value={color}
        onChange={(e) => {
          setColor(e.target.value as string);
          handleSettingsChange({ color: e.target.value as string });
        }}
      >
        <MenuItem value="#ffffff">White</MenuItem>
        <MenuItem value="#000000">Black</MenuItem>
        <MenuItem value="#ff0000">Red</MenuItem>
      </Select>
      <Select
        value={bgColor}
        onChange={(e) => {
          setBgColor(e.target.value as string);
          handleSettingsChange({ bgColor: e.target.value as string });
        }}
      >
        <MenuItem value="#000000">Black</MenuItem>
        <MenuItem value="#ffffff">White</MenuItem>
        <MenuItem value="#0000ff">Blue</MenuItem>
      </Select>
      <TextField
        label="Subtitle Text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          handleSettingsChange({ text: e.target.value });
        }}
        multiline
        rows={2}
      />
      <SubtitleExample fontSize={fontSize} color={color} bgColor={bgColor}>
        {text}
      </SubtitleExample>
    </SubtitleSettings>
  );
};

export default SubtitleCustomizer;
