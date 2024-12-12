import { useState, useEffect } from 'react';
import axios from 'axios';

const useFlip = (originalState = true) => {
    const [isFlipped, setFlipped] = useState(initialFlipState), flip = () => setFlipped(up => !up);
    return [isFlipped, flip];
}

export { useFlip };