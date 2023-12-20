import { useState } from 'react';

export const useFeetState = () => {
    const [feet, setFeet] = useState<number>(-1);

    const setFeetValue = (value: number) => {
        setFeet(value >= 0 && value <= 11 ? value : -1)
    }

    return {feet, setFeet: setFeetValue}
}

export const useInchesState = () => {
    const [inches, setInches] = useState<number>(-1);

    const setInchesValue = (value: number) => {
        setInches(value >= 0 && value <= 14 ? value : -1)
    }

    return {inches, setInches: setInchesValue}
}

export const useStoneState = () => {
    const [stone, setStone] = useState<number>(-1);

    const setStoneValue = (value: number) => {
        setStone(value >= 0 && value <= 50 ? value : -1)
    }

    return {stone, setStone: setStoneValue}
}

export const usePoundsState = () => {
    const [pounds, setPounds] = useState<number>(-1);

    const setPoundsValue = (value: number) => {
        setPounds(value >= 0 && value <= 14 ? value : -1)
    }

    return {pounds, setPounds: setPoundsValue}
}

export const useKilogramsState= () => {
    const [kilograms, setKilograms] = useState<number>(-1);

    const setKilogramsValue = (value: number) => {
        setKilograms(value >= 0 && value <= 300 ? value : -1)
    }

    return {kilograms, setKilograms: setKilogramsValue}
}

export const useMetresState = () => {
    const [metres, setMetres] = useState<number>(-1);

    const setMetresValue = (value: number) => {
        setMetres(value >= 0 && value <= 5 ? value : -1)
    }

    return {metres, setMetres: setMetresValue}
}