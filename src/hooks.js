import { useState, useEffect } from 'react';
import axios from 'axios';

const useFlip = (originalState = true) => {
    const [isFlipped, setFlipped] = useState(originalState), flip = () => setFlipped(up => !up);
    return [isFlipped, flip];
}

const useAxios = (lsKey, baseUrl) => {
    const [responses, setResponses] = useLocalStorage(lsKey);

    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        const response = await axios.get(`${baseUrl}${restOfUrl}`);
        setResponses(data => [...data, formatter(response.data)]);
    };

    const clearResponses = () => setResponses([]);
    return [responses, addResponseData, clearResponses];
}

const useLocalStorage = (key, initialValue = []) => {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export { useFlip, useAxios, useLocalStorage };