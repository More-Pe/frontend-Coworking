import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CSurferProps } from '../../types';


export const CSurfer: React.FC<CSurferProps> = ({ content, path, className }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(path)} className={className}>
      {content}
    </div>
  );
};
