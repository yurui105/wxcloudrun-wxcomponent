import React, { useState } from 'react';
import { Textarea } from 'tdesign-react';

interface JSONEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: string | number) => {
    const stringValue = String(newValue);
    try {
      if (stringValue.trim()) {
        JSON.parse(stringValue);
      }
      setError(null);
    } catch (e) {
      setError('JSON格式不正确');
    }
    onChange(stringValue);
  };

  return (
    <div>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder="请输入JSON格式数据"
        autosize={{ minRows: 4, maxRows: 10 }}
        style={{ fontFamily: 'monospace' }}
      />
      {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
    </div>
  );
};

export default JSONEditor; 