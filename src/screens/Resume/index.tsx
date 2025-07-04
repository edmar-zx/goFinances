
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { FlatList, TouchableWithoutFeedback } from "react-native";
import { VictoryPie } from "victory-native";
import { getResume } from "../../api/api";
import {
  MonthNavigation, MonthText, IconButton, LegendItem, ColorBox, Text, SpaceText, Graphic, Container,
  Header, Title, SlideContainer, PaginationContainer, Dot, PriceText
} from "./styles";

/* Remove warning no celular da versão do victory-native */
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components'
]);

export function Resume() {
  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [type, setType] = useState<'positive' | 'negative'>('positive');
  const { total, chartDataLimited, colors, topCategories, OTHER_COLOR } = processChartData(chartData);
  const isCurrentMonth = currentMonthIndex === today.getMonth() && currentYear === today.getFullYear();

  const fetchData = useCallback(async () => {
    try {
      const entries = await getResume(currentYear, currentMonthIndex + 1, type);
      const formatted = entries.map(e => ({
        x: e.categoria,
        y: Number(e.total)
      }));
      setChartData(formatted);
    } catch (err) {
      console.error("Erro ao buscar dados de resumo:", err);
    }
  }, [currentYear, currentMonthIndex, type]);

  /*  --- ATUALIZA OS DADOS --- */
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  /*  --- UTILITÁRIOS --- */
  type ChartItem = { x: string; y: number };

  function processChartData(chartData: ChartItem[]) {
    const total = chartData.reduce((sum, item) => sum + item.y, 0);
    const sortedData = [...chartData].sort((a, b) => b.y - a.y);
    const topCategories = sortedData.slice(0, 7);

    const otherCategories = sortedData.slice(7);
    const otherTotal = otherCategories.reduce((sum, item) => sum + item.y, 0);

    const chartDataLimited = otherTotal > 0
      ? [...topCategories, { x: "Outros", y: otherTotal }]
      : [...topCategories];

    const OTHER_COLOR = "#999999";
    const colors = chartDataLimited.map((item, index) =>
      item.x === "Outros"
        ? OTHER_COLOR
        : `hsl(${(index * 360) / chartDataLimited.length}, 70%, 50%)`
    );
    return { total, chartDataLimited, colors, topCategories, OTHER_COLOR };
  }

  function handlePrevMonth() {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonthIndex(i => i - 1);
    }
  }

  function handleNextMonth() {
    if (isCurrentMonth) return;
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonthIndex(i => i + 1);
    }
  }

  function formatPrice(value: number): string {
    const [int, decimal] = value.toFixed(2).split('.');
    if (decimal === '00') {
      return int.replace('.', ',');
    }
    return `${int},${decimal}`;
  }

  return (
    <Container>
      <TouchableWithoutFeedback
        onPress={() => {
          setType((prev) => (prev === "positive" ? "negative" : "positive"));
        }}
      >
        <Header type={type}>
          <SlideContainer>
            <Title>
              {type === "positive" ? "Entradas" : "Saídas"}
            </Title>
          </SlideContainer>

          <PaginationContainer pointerEvents="box-none">
            <Dot active={type === "positive"} type="positive" />
            <Dot active={type === "negative"} type="negative" />
          </PaginationContainer>
        </Header>
      </TouchableWithoutFeedback>

      <MonthNavigation>
        <IconButton onPress={handlePrevMonth}>
          <Feather name="chevron-left" size={26} />
        </IconButton>

        <MonthText>
          {`${["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][currentMonthIndex]}, ${currentYear}`}
        </MonthText>

        <IconButton onPress={handleNextMonth} disabled={isCurrentMonth}>
          <Feather
            name="chevron-right"
            size={26}
            color={isCurrentMonth ? "#ccc" : "#000"}
          />
        </IconButton>
      </MonthNavigation>

      <Graphic>
        <VictoryPie
          data={chartDataLimited}
          colorScale={colors}
          labelRadius={90}
          width={350}
          height={350}
          style={{
            labels: { fill: "#fff", fontSize: 12, fontWeight: "bold" },
            data: { stroke: "#000", strokeWidth: 1 }
          }}
          labels={({ datum }) =>
            total > 0 ? `${Math.round((datum.y / total) * 100)}%` : ""
          }
        />
      </Graphic>
      <FlatList
        data={chartData}
        keyExtractor={item => item.x}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        renderItem={({ item }) => {
          const isInTop = topCategories.find(top => top.x === item.x);
          const colorIndex = topCategories.findIndex(top => top.x === item.x);
          const color = isInTop ? colors[colorIndex] : OTHER_COLOR;

          return (
            <LegendItem>
              <ColorBox bgColor={color} />
              <SpaceText>
                <Text>{item.x}</Text>
                <PriceText>R${formatPrice(item.y)}</PriceText>
              </SpaceText>
            </LegendItem>
          );
        }}
      />
    </Container>
  );
}