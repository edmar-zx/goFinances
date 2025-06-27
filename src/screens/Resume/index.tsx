import React, { useState } from "react";
import { Container, Header, Title } from "../Register/styles";
import { MonthNavigation, MonthText, IconButton } from "./styles";
import { Feather } from '@expo/vector-icons';

const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio",
    "Junho", "Julho", "Agosto", "Setembro", "Outubro",
    "Novembro", "Dezembro"
];

export function Resume() {
    const today = new Date();
    const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const isCurrentMonth =
        currentMonthIndex === today.getMonth() &&
        currentYear === today.getFullYear();

    function handlePrevMonth() {
        if (currentMonthIndex === 0) {
            setCurrentMonthIndex(11);
            setCurrentYear(prev => prev - 1);
        } else {
            setCurrentMonthIndex(prev => prev - 1);
        }
    }

    function handleNextMonth() {
        if (isCurrentMonth) return;

        if (currentMonthIndex === 11) {
            setCurrentMonthIndex(0);
            setCurrentYear(prev => prev + 1);
        } else {
            setCurrentMonthIndex(prev => prev + 1);
        }
    }

    return (
        <Container>
            <Header>
                <Title>Resumo</Title>
            </Header>

            <MonthNavigation>
                <IconButton onPress={handlePrevMonth}>
                    <Feather name="chevron-left" size={26} />
                </IconButton>

                <MonthText>{`${months[currentMonthIndex]}, ${currentYear}`}</MonthText>

                <IconButton onPress={handleNextMonth} disabled={isCurrentMonth}>
                    <Feather
                        name="chevron-right"
                        size={26}
                        color={isCurrentMonth ? "#ccc" : "#000"}
                    />
                </IconButton>
            </MonthNavigation>
        </Container>
    );
}
