import React from 'react';
import TruncateMarkup from 'react-truncate-markup';

import { processMarkup } from './process-markup';

const QuillText = ({ lines, content, removeBr = false }) => (
    <TruncateMarkup lines={lines} tokenize="words">
        <div>{processMarkup(content, removeBr)}</div>
    </TruncateMarkup>
);

export default QuillText;
